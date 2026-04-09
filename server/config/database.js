import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/tailor_management_db';

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      autoIndex: true
    });
    console.log('✓ Database connection established');
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    throw error;
  }
};

export default mongoose;
