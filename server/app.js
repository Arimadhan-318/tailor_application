import express from 'express';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes.js';
import tailorRoutes from './routes/tailorRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/tailors', tailorRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get(['/health', '/api/health'], (req, res) => {
  res.json({ message: 'Server is running' });
});

export default app;
