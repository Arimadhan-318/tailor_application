# Tailor Management System - Complete Setup Guide

A complete web application for managing tailoring shop operations with customers, orders, and tailor assignments.

## Project Structure

```
tailoring_app/
|-- server/                    # Node.js + Express backend
|   |-- config/
|   |   |-- database.js         # Mongoose database configuration
|   |-- models/
|   |   |-- Customer.js         # Customer model
|   |   |-- Tailor.js           # Tailor model
|   |   |-- Order.js            # Order model with references
|   |   |-- index.js            # Export all models
|   |-- controllers/
|   |   |-- customerController.js
|   |   |-- tailorController.js
|   |   |-- orderController.js
|   |-- routes/
|   |   |-- customerRoutes.js
|   |   |-- tailorRoutes.js
|   |   |-- orderRoutes.js
|   |-- index.js                # Main server file
|   |-- package.json
|   |-- .env.example            # Environment variables template
|   |-- .gitignore
|
|-- tailor_app/                 # React frontend
    |-- src/
    |   |-- components/         # Reusable components
    |   |-- pages/              # Page components
    |   |-- services/           # API services
    |   |-- utils/              # Helper functions
    |   |-- styles/             # CSS files for all components
    |-- public/
    |-- package.json
    |-- .env.local
```

## Prerequisites

Before you start, make sure you have installed:

1. Node.js (v14 or higher)
2. MongoDB Community Server (local or remote)
3. Git (optional)
4. Code Editor (VS Code recommended)

### Verify Installation

```bash
node --version
npm --version
mongod --version
```

## Step-by-Step Setup Guide

### Phase 1: Database Setup

1. Start MongoDB
   - Windows: Start the MongoDB service or run mongod
   - Mac/Linux: Run mongod in terminal

2. (Optional) Create the database by connecting once:
   - MongoDB creates the database automatically when first data is inserted.

### Phase 2: Backend Setup

1. Navigate to Server Folder
   ```bash
   cd c:\Users\arimadhankumarv\Desktop\tailoring_app\server
   # Or for Mac/Linux users:
   # cd ~/Desktop/tailoring_app/server
   ```

2. Create .env File from Template
   ```bash
   # Copy .env.example to .env
   # Windows (PowerShell):
   Copy-Item .env.example .env

   # Mac/Linux:
   cp .env.example .env
   ```

3. Configure .env File
   Edit the .env file with your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/tailor_management_db
   SERVER_PORT=5000
   NODE_ENV=development
   ```

4. Install Backend Dependencies
   ```bash
   npm install
   ```

5. Start Backend Server
   ```bash
   npm start
   ```

   Expected output:
   ```
   Database connection established
   Server running on http://localhost:5000
   ```

### Phase 3: Frontend Setup

1. Open New Terminal/Command Prompt

2. Navigate to Frontend Folder
   ```bash
   cd c:\Users\arimadhankumarv\Desktop\tailoring_app\tailor_app
   # Or for Mac/Linux:
   # cd ~/Desktop/tailoring_app/tailor_app
   ```

3. Install Frontend Dependencies
   ```bash
   npm install
   ```

4. Start Frontend Development Server
   ```bash
   npm start
   ```

   The application will automatically open at http://localhost:3000

## Verification Checklist

- Both terminal windows show no errors
- Backend: Server running on http://localhost:5000
- Frontend: Browser opens to http://localhost:3000
- You can see the Tailor Management System navbar
- Dashboard loads with statistics cards
- No console errors in browser DevTools (F12)

## API Endpoints

### Customer API
- POST /api/customers - Create customer
- GET /api/customers - Get all customers
- GET /api/customers/:id - Get customer by ID
- PUT /api/customers/:id - Update customer
- DELETE /api/customers/:id - Delete customer

### Tailor API
- POST /api/tailors - Create tailor
- GET /api/tailors - Get all tailors
- GET /api/tailors/:id - Get tailor by ID
- PUT /api/tailors/:id - Update tailor
- DELETE /api/tailors/:id - Delete tailor

### Order API
- POST /api/orders - Create order
- GET /api/orders - Get all orders (with filters: status, tailorId)
- GET /api/orders/:id - Get order by ID
- PUT /api/orders/:id - Update order
- DELETE /api/orders/:id - Delete order
- GET /api/orders/stats/dashboard - Get dashboard statistics

## Development Workflow

Backend:
```bash
cd server
npm install
npm start
npm run dev
```

Frontend:
```bash
cd tailor_app
npm install
npm start
npm build
npm test
```

## Troubleshooting

### Backend Issues

Error: "ECONNREFUSED 127.0.0.1:27017"
- MongoDB is not running
- Solution: Start the MongoDB service

Error: "MongoServerSelectionError"
- Wrong MONGO_URI or host not reachable
- Solution: Update MONGO_URI in .env

### Frontend Issues

Error: "Cannot find module 'react-router-dom'"
- Dependencies not installed
- Solution: Run npm install in tailor_app folder

Error: "POST http://localhost:5000/api/... 404 Not Found"
- Backend not running
- Solution: Start backend server in another terminal

Blank white screen
- Check browser console for errors (F12)
- Clear browser cache (Ctrl+Shift+Delete)
- Restart frontend server

## Dependencies

### Backend
- express: Web framework
- mongoose: MongoDB ODM
- cors: Cross-origin resource sharing
- dotenv: Environment variable management
- nodemon: Auto-restart on file changes (dev only)

### Frontend
- react: UI library
- react-dom: React DOM rendering
- react-router-dom: Routing library
- axios: HTTP client

## Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/tailor_management_db
SERVER_PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Ready to Deploy?

Backend:
- Use any Node.js-friendly host
- Set MONGO_URI to your managed MongoDB instance

Frontend:
- Use any static host (Vercel, Netlify)
- Update REACT_APP_API_URL to production backend URL

---

Congratulations! You have successfully set up the Tailor Management System!
