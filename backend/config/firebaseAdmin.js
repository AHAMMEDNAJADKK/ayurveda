const admin = require('firebase-admin');

// Ensure Firebase Admin initializes only once
if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.error('❌ CRITICAL ERROR: Missing Firebase environment variables. Please ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set.');
    // Do not halt local dev immediately if they don't use firebase locally, but for production it's critical. 
    // We log error but let the app continue, or we can halt. The prompt asks for production-level error handling.
  } else {
    // Safely parse the private key string from the environment variable (handling Render's literal \n strings)
    privateKey = privateKey.replace(/\\n/g, '\n');

    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      console.log('✅ Firebase Admin SDK Initialized Successfully');
    } catch (error) {
      console.error('❌ Firebase Admin SDK Initialization Error:', error.message);
    }
  }
}

module.exports = admin;
