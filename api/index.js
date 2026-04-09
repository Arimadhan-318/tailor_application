import dotenv from 'dotenv';
import app from '../server/app.js';
import mongoose from '../server/config/database.js';
import { connectDB } from '../server/config/database.js';

dotenv.config();

const ensureDbConnection = async () => {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }
};

export default async function handler(req, res) {
  try {
    await ensureDbConnection();
    return app(req, res);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
}
