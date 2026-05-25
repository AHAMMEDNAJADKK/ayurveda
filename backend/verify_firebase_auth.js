const admin = require('./config/firebaseAdmin');

async function testSignatureValidation() {
  console.log('--- Firebase Admin SDK Connection & Token Validation Test ---');
  
  if (admin.apps.length === 0) {
    console.warn('⚠️ Warning: Firebase Admin App is not initialized. Please configure credentials in backend/.env or firebase-service-account.json.');
    console.log('Token signature test skipped as Admin SDK is uninitialized.');
    return;
  }

  console.log('Firebase Admin SDK initialized successfully.');
  
  const invalidToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImZha2UifQ.eyJzdWIiOiJmYWtlIiwiZXhwIjoxfQ.fakesignature';
  console.log('Testing invalid token signature verification (expecting rejection)...');
  
  try {
    await admin.auth().verifyIdToken(invalidToken);
    console.error('❌ Test failed: An invalid signature was verified without throwing an error.');
    process.exit(1);
  } catch (error) {
    console.log(`✅ Test passed: Invalid token was rejected as expected.`);
    console.log(`   Error Code: ${error.code || 'None'}`);
    console.log(`   Error Message: ${error.message}`);
  }
}

testSignatureValidation().catch(err => {
  console.error('❌ Verification script error:', err);
  process.exit(1);
});
