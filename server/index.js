import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import app from './app.js';

dotenv.config();

const PORT = process.env.SERVER_PORT || 5000;

// Connect database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });
