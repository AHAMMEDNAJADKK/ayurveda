const mongoose = require('mongoose');

const connectDB = async () => {
  const localURI = 'mongodb://localhost:27017/hca_ayurveda';
  let connectionURI = process.env.MONGO_URI || localURI;

  // Check if it's the Atlas template with placeholders
  if (connectionURI.includes('<db_username>') || connectionURI.includes('<db_password>')) {
    console.warn('⚠️ Warning: MongoDB Atlas placeholders detected in .env. Falling back to local MongoDB.');
    connectionURI = localURI;
  }

  try {
    const conn = await mongoose.connect(connectionURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    
    // If Atlas connection failed, attempt to fall back to local MongoDB
    if (connectionURI !== localURI) {
      console.warn('⚠️ Warning: Failed to connect to MongoDB Atlas. Attempting fallback to local MongoDB...');
      try {
        const localConn = await mongoose.connect(localURI);
        console.log(`MongoDB Connected (Fallback Local): ${localConn.connection.host}`);
      } catch (localError) {
        console.error(`Local MongoDB Fallback Error: ${localError.message}`);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
