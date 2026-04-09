import dotenv from 'dotenv';
import app from '../app.js';
import mongoose from '../config/database.js';
import { connectDB } from '../config/database.js';

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
