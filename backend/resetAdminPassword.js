const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error('Error: MONGO_URI or MONGODB_URI is not defined in the .env file');
  process.exit(1);
}

async function resetPassword() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB successfully.');

    const email = 'najadahammed34@gmail.com';
    const password = '787878';
    const saltRounds = 10;

    console.log(`Generating bcrypt hash for "${password}"...`);
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const adminsCollection = mongoose.connection.db.collection('admins');

    console.log(`Searching for admin with email: ${email}...`);
    const existingAdmin = await adminsCollection.findOne({ email });

    if (existingAdmin) {
      console.log('Admin document found. Updating password hash...');
      await adminsCollection.updateOne(
        { email },
        { $set: { password: passwordHash, role: 'admin', updatedAt: new Date() } }
      );
      console.log('Admin password updated successfully');
    } else {
      console.log('Admin document not found. Creating a new admin user...');
      await adminsCollection.insertOne({
        email,
        password: passwordHash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('Admin created successfully');
    }

    await mongoose.disconnect();
    console.log('Disconnected from database.');
    process.exit(0);
  } catch (error) {
    console.error('Error running reset script:', error);
    process.exit(1);
  }
}

resetPassword();
