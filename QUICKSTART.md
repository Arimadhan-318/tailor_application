# Quick Start Guide - Tailor Management System

## 5-Minute Setup

### Prerequisites Check
```bash
# Check Node.js installed
node --version

# Check npm installed
npm --version

# Check MongoDB installed
mongod --version
```

### 1. Database (2 minutes)

Make sure MongoDB is running locally (default port 27017).

### 2. Backend Server (2 minutes)

Open Terminal 1:
```bash
# Navigate to server
cd server

# Create .env file (copy from .env.example or create new)
# Edit the .env file with your MongoDB connection string

# Install dependencies
npm install

# Start backend
npm start
```

Expected output:
```
Database connection established
Server running on http://localhost:5000
```

### 3. Frontend App (1 minute)

Open Terminal 2:
```bash
# Navigate to frontend
cd tailor_app

# Install dependencies
npm install

# Start frontend
npm start
```

Browser opens automatically at http://localhost:3000

## Verify Everything Works

1. Both terminals show no errors
2. Browser shows app with navbar and dashboard
3. You can see 4 stat cards on dashboard
4. Navigation links work (click Dashboard, Add Order, Orders, Tailors)

## Next: Create Some Sample Data

1. Go to Tailors page
2. Add 2-3 tailors (e.g., "Rajesh", "Priya", "Amit")
3. Go to Add Order page
4. Create an order:
   - Customer Name: "John Doe"
   - Phone: "9876543210"
   - Address: "123 Main Street"
   - Dress Type: "Shirt"
   - Tailor: Select one
   - Given Date: Today
   - Delivery Date: Pick a future date

5. Go to Orders page to see your order

## Common Issues & Quick Fixes

| Issue | Solution |
|-------|----------|
| Backend won't start | Check MongoDB is running, verify MONGO_URI in .env |
| Frontend won't start | Run npm install in tailor_app folder |
| API calls fail | Check backend is running on port 5000 |
| Blank page | Press F12, check console for errors |
| Database error | Ensure MongoDB is running and the database is reachable |

## Project Files Location

```
Desktop/
|-- tailoring_app/
    |-- server/          <- Backend (port 5000)
    |-- tailor_app/      <- Frontend (port 3000)
    |-- SETUP_GUIDE.md   <- Full setup guide
    |-- README.md        <- This file
```

## Stop the Application

Press Ctrl + C in both terminal windows

## Need Help?

Check SETUP_GUIDE.md for:
- Detailed setup steps
- Troubleshooting section
- API documentation
- Deployment guide

---

You're all set! Start managing tailoring orders now!
