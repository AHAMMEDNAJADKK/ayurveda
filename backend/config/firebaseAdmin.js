const admin = require('firebase-admin');

const privateKey = process.env.FIREBASE_PRIVATE_KEY 
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') 
  : null;

if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && privateKey) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    })
  });
  console.log('Firebase Admin SDK Initialized (via Environment Variables)');
} else {
  try {
    const serviceAccount = require('../firebase-service-account.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin SDK Initialized (via Service Account JSON)');
  } catch (error) {
    console.warn('⚠️ Warning: Firebase Admin credentials not configured. Firebase login will fail.');
  }
}

module.exports = admin;
