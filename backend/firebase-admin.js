var admin = require("firebase-admin");

var serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://neonrun-d9e96-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "neonrun-d9e96.firebasestorage.app",
});

const db = admin.firestore();
const auth = admin.auth();
const bucket = admin.storage().bucket();

module.exports = { db, auth,bucket };
