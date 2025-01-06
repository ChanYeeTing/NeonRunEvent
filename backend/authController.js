// authController.js
const express = require("express");
const { db, auth, bucket } = require("./firebase-admin"); // Import from the centralized firebase.js
const cors = require("cors");

const router = express.Router();
const app = express();

const multer = require('multer');

// Set up memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const corsOptions = {
  origin: 'http://localhost:3000', // React dev server
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));

// Register User
router.post("/api/register", async (req, res) => {
  const { user, userName, email, role } = req.body;
  try {
    // Send email verification
    await auth.updateUser(user.uid, { emailVerified: false });

    // Save user to Firestore
    await db.collection("users").doc(user.uid).set({
      userName,
      email,
      role,
    });

    res.status(200).json({ message: "User registered successfully. Verify email to log in." });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login User
router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await auth.getUserByEmail(email);
    const userSnapshot = await db.collection("users").doc(userRecord.uid).get();

    if (!userSnapshot.exists|| userSnapshot.data().role !== "user") {
      return res.status(404).json({ error: "User does not exist." });
    }

    if (!userRecord.emailVerified) {
      return res.status(403).json({ error: "Please verify your email." });
    }

    const customClaims = {
      email: userRecord.email,
      role: "user",
    };

    const token = await auth.createCustomToken(userRecord.uid, customClaims);


    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: "Login failed. Please check credentials." });
  }
});

// Admin Login
router.post("/api/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await auth.getUserByEmail(email);
    const userSnapshot = await db.collection("users").doc(userRecord.uid).get();

    if (!userSnapshot.exists || userSnapshot.data().role !== "admin") {
      return res.status(403).json({ error: "Unauthorized access." });
    }

    const customClaims = {
      email: userRecord.email,
      role: "admin",
    };

    const token = await auth.createCustomToken(userRecord.uid, customClaims);


    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: "Login failed. Please try again." });
  }
});

router.get("/api/participantList", async (req, res) => {
  try {
    const userSnapshot = await db.collection("users").where("status", "!=", null).get();
    
    // Map through each document and add the doc.id (uid) to the user data
    const users = userSnapshot.docs.map((doc) => ({
      uid: doc.id,  // Add the document ID as uid
      ...doc.data()  // Spread the rest of the user data
    }));

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({ error: "Failed to fetch participants" });
  }
});


// Route to fetch event statistics
router.get("/api/event-stats", async (req, res) => {
  try {
    const participantsRef = db.collection("users");
    const snapshot = await participantsRef.get();

    // Initialize counters
    let totalParticipants = 0;
    const categories = {};
    const packages = {};
    const tshirtSizes = {};

    // Aggregate counts
    snapshot.forEach((doc) => {
      const data = doc.data();

      if (data.status === "Approved") {
        totalParticipants++;
  
        // Count by category
        if (data.category) {
          categories[data.category] = (categories[data.category] || 0) + 1;
        }
  
        // Count by package
        if (data.package) {
          packages[data.package] = (packages[data.package] || 0) + 1;
        }
  
        // Count by T-shirt size
        if (data.tshirtSize!=="N/A") {
          tshirtSizes[data.tshirtSize] = (tshirtSizes[data.tshirtSize] || 0) + 1;
        }
      }
    });

    // Transform objects to arrays for easier consumption on the frontend
    const categoryArray = Object.entries(categories).map(([name, value]) => ({ name, value }));
    const packageArray = Object.entries(packages).map(([name, value]) => ({ name, value }));
    const tshirtSizeArray = Object.entries(tshirtSizes).map(([size, count]) => ({ size, count }));

    // Response object
    const statistics = {
      totalParticipants,
      categories: categoryArray,
      packages: packageArray,
      tshirtSizes: tshirtSizeArray,
    };

    res.status(200).json(statistics);
  } catch (error) {
    console.error("Error fetching event statistics:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});

router.post("/api/register-participant", async (req, res) => {
  const { userId, createdAt, status, ...data } = req.body;
  try {

    await db.collection("users").doc(userId).set(
      {
        createdAt,
        status,
        ...data,
      },
      { merge: true }
    );

    res.status(200).json({ message: "User data save successfully. Pending review." });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/api/upload-memory", upload.array('images', 10), async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedImages = [];

    for (const file of files) {
      const fileName = `memories/${Date.now()}_${file.originalname}`;
      const fileUpload = bucket.file(fileName);

      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.on('error', (error) => {
        console.error('Upload error:', error);
        throw error;
      });

      await new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.end(file.buffer);
      });

      await fileUpload.makePublic();

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      uploadedImages.push(publicUrl);
    }

    res.status(200).json({ message: 'Images uploaded successfully', urls: uploadedImages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/api/get-memories', async (req, res) => {
  try {
    const [files] = await bucket.getFiles({ prefix: 'memories/' });  // List all files under 'memories' folder

    // Generate download URLs for each file in the 'memories' folder
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const url = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' });
        return url[0]; // Get the URL from the array returned by getSignedUrl
      })
    );

    res.status(200).json({ message: 'Images fetched successfully', urls: imageUrls });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images', details: error.message });
  }
});

router.post("/api/upload-winners", upload.array('winners', 10), async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedImages = [];

    for (const file of files) {
      const fileName = `winners/${Date.now()}_${file.originalname}`;
      const fileUpload = bucket.file(fileName);

      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      stream.on('error', (error) => {
        console.error('Upload error:', error);
        throw error;
      });

      await new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.end(file.buffer);
      });

      await fileUpload.makePublic();

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      uploadedImages.push(publicUrl);
    }

    res.status(200).json({ message: 'Images uploaded successfully', urls: uploadedImages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/api/get-winners', async (req, res) => {
  try {
    const [files] = await bucket.getFiles({ prefix: 'winners/' });  // List all files under 'memories' folder

    // Generate download URLs for each file in the 'memories' folder
    const imageUrls = await Promise.all(
      files.map(async (file) => {
        const url = await file.getSignedUrl({ action: 'read', expires: '03-09-2491' });
        return url[0]; // Get the URL from the array returned by getSignedUrl
      })
    );

    res.status(200).json({ message: 'Images fetched successfully', urls: imageUrls });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images', details: error.message });
  }
});

// Route to fetch approved participants for ranking
router.get("/api/approved-list", async (req, res) => {
  try {
    const userSnapshot = await db.collection("users").where("status", "==", "Approved").get();

    // Map through documents and extract relevant fields
    const users = userSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        name: data.fullName || "N/A", // Use default if the field is missing
        icNumber: data.icNumber || "N/A",
        contactNo: data.contactNumber || "N/A",
        category: data.category || "N/A",
        matricNo: data.school || "N/A",
        package: data.package || "N/A",
        rankAssign: data.rank || "N/A",
      };
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching approved participants:", error);
    res.status(500).json({ error: "Failed to fetch approved participants" });
  }
});

// Route to update winner list
router.post("/api/update-winner-list", async (req, res) => {
  const { winnersData } = req.body;  // Receiving 'winnersData' array

  try {
    // Reference to the 'users' collection in Firestore
    const winnerListRef = db.collection("users");

    // Loop through each winner data
    await Promise.all(
      winnersData.map(async (winner) => {
        // Query the 'users' collection to find the document where icNumber matches
        const userSnapshot = await winnerListRef.where("icNumber", "==", winner.icNumber).get();

        if (!userSnapshot.empty) {
          // If a match is found, use 'set' with 'merge: true' to add/update the rank field
          const userDocRef = userSnapshot.docs[0].ref;
          await userDocRef.set({
            rank: winner.rank,
          }, { merge: true });
        } else {
          // If no matching user is found, handle the case (optional)
          console.log(`No user found with icNumber: ${winner.icNumber}`);
        }
      })
    );

    res.status(200).json({ message: 'Winner list updated successfully.' });
  } catch (error) {
    console.error("Error updating winner list:", error);
    res.status(500).json({ error: 'Failed to update winner list.' });
  }
});

// Route to fetch approved participants for ranking
router.get("/api/kit-list", async (req, res) => {
  try {
    const userSnapshot = await db.collection("users").where("status", "==", "Approved").get();

    // Map through documents and extract relevant fields
    const users = userSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        name: data.fullName || "N/A", // Use default if the field is missing
        icNumber: data.icNumber || "N/A",
        contactNo: data.contactNumber || "N/A",
        category: data.category || "N/A",
        matricNo: data.school || "N/A",
        package: data.package || "N/A",
        tshirtSize: data.tshirtSize || "N/A",
        raceKit: data.raceKit || "N/A",
      };
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching approved participants:", error);
    res.status(500).json({ error: "Failed to fetch approved participants" });
  }
});

// Route to update kit list
router.post("/api/update-kit-list", async (req, res) => {
  const { kitData } = req.body;  // Receiving 'winnersData' array

  try {
    // Reference to the 'users' collection in Firestore
    const kitListRef = db.collection("users");

    await Promise.all(
      kitData.map(async (kit) => {
        // Query the 'users' collection to find the document where icNumber matches
        const userSnapshot = await kitListRef.where("icNumber", "==", kit.icNumber).get();

        if (!userSnapshot.empty) {
          // If a match is found, use 'set' with 'merge: true' to add/update the rank field
          const userDocRef = userSnapshot.docs[0].ref;
          await userDocRef.set({
            raceKit: kit.collected ? "Collected" : "Not Collected",
          }, { merge: true });
        } else {
          // If no matching user is found, handle the case (optional)
          console.log(`No user found with icNumber: ${kit.icNumber}`);
        }
      })
    );

    res.status(200).json({ message: 'Kit Collection list updated successfully.' });
  } catch (error) {
    console.error("Error updating kit collection list:", error);
    res.status(500).json({ error: 'Failed to update kit collection list.' });
  }
});

module.exports = router;
