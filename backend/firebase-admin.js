var admin = require("firebase-admin");

var serviceAccount = require("./firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://neonrun-d9e96-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { db, auth };
