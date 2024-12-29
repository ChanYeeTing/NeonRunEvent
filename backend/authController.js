// authController.js
const express = require("express");
const { db, auth } = require("./firebase-admin"); // Import from the centralized firebase.js
const cors = require("cors");

const router = express.Router();
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // React dev server
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));

// Register User
router.post("/api/register", async (req, res) => {
  const { user } = req.body;
  try {
    // Send email verification
    await auth.updateUser(user, { emailVerified: false });

    // Save user to Firestore
    await db.collection("users").doc(user).set({
      userName,
      email,
      role: "user",
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
    const users = userSnapshot.docs.map((doc) => doc.data());

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching participants:", error);
    res.status(500).json({ error: "Failed to fetch participants" });
  }
});


module.exports = router;
