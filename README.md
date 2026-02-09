# 🚀 Insurance Claims AI Agent - Autonomous FNOL Processing System

> **Production-grade MERN stack application with AI-powered claims processing using Claude API**

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)](https://github.com/yourusername/insurance-claims-agent)
[![Security](https://img.shields.io/badge/Security-✓-success)](https://github.com/yourusername/insurance-claims-agent)
[![AI Powered](https://img.shields.io/badge/AI-Claude%204.5-blueviolet)](https://github.com/yourusername/insurance-claims-agent)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Security Features](#security-features)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## 🎯 Overview

This project is a fully automated Insurance Claims Processing Agent that leverages **Claude 4.5 Sonnet AI** to intelligently process First Notice of Loss (FNOL) documents. It extracts key information, identifies missing/inconsistent fields, classifies claims, and routes them to appropriate queues with detailed reasoning.

### **Assignment Completion**

✅ **Extracts key fields** from FNOL documents (policy info, incident details, parties, assets)  
✅ **Identifies missing/inconsistent fields** with severity classification  
✅ **Classifies claims** and routes to correct workflow (fast-track, manual-review, specialist, investigation)  
✅ **Provides routing explanations** with confidence scores  
✅ **Production-grade architecture** with security best practices  
✅ **Professional UI/UX** with real-time feedback  

---

## ✨ Features

### 🤖 AI-Powered Processing
- **Intelligent Document Extraction**: Automatically extracts structured data from PDF/TXT FNOL documents
- **Smart Field Validation**: Identifies missing mandatory fields and inconsistencies
- **Automated Routing**: Routes claims to appropriate queues based on complexity and risk
- **Fraud Detection**: AI-powered fraud risk analysis (bonus feature)
- **Natural Language Reasoning**: Provides human-readable explanations for all decisions

### 🔒 Security Features
- JWT authentication with secure token management
- Role-based access control (User, Adjuster, Manager, Admin)
- Input validation and sanitization
- XSS and NoSQL injection protection
- Rate limiting on all API endpoints
- Helmet.js security headers
- Encrypted password storage with bcrypt

### 📊 Analytics & Reporting
- Real-time dashboard with key metrics
- Claims distribution by status, queue, and type
- Trend analysis and performance metrics
- Downloadable reports (future enhancement)

### 🎨 Modern UI/UX
- Responsive design (mobile, tablet, desktop)
- Real-time toast notifications
- Loading states and error handling
- Intuitive drag-and-drop file upload
- Professional color schemes and typography

---

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Anthropic Claude API** - AI processing
- **JWT** - Authentication
- **Multer** - File upload handling
- **PDF-Parse** - PDF text extraction
- **Winston** - Logging

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **Zustand** - State management
- **React Query** - Server state
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons

### DevOps & Tools
- **Git** - Version control
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Jest** - Testing (configured)

---

## 🏗 Architecture

```
insurance-claims-agent/
├── backend/
│   ├── config/              # Database & app configuration
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Auth, error handling, file upload
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── services/            # Business logic (AI, document processing)
│   ├── utils/               # Helpers & utilities
│   ├── logs/                # Application logs
│   ├── uploads/             # Uploaded documents
│   ├── server.js            # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── api/             # API client & endpoints
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages
│   │   ├── store/           # Zustand stores
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── docs/                    # Additional documentation
└── README.md               # This file
```

---

## 🚀 Installation

### Prerequisites
- Node.js >= 18.x
- MongoDB >= 6.x (local or Atlas)
- Anthropic API key ([Get one here](https://console.anthropic.com/))
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd insurance-claims-agent
```

### Step 2: Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env and add your credentials:
# - MONGODB_URI (MongoDB connection string)
# - ANTHROPIC_API_KEY (Claude API key)
# - JWT_SECRET (random secret key)
```

### Step 3: Frontend Setup
```bash
cd ../frontend
npm install
```

### Step 4: Create Required Directories
```bash
# In backend directory
mkdir -p uploads logs
```

---

## ⚙️ Configuration

### Backend Environment Variables (`.env`)

```env
# Server
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/insurance-claims
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/insurance-claims

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRE=30d

# Anthropic API
ANTHROPIC_API_KEY=sk-ant-api03-xxx...your-key

# CORS
CLIENT_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Logging
LOG_LEVEL=info
```

### Frontend Environment Variables (Optional)

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🎮 Usage

### Start the Application

#### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
App runs on: `http://localhost:3000`

#### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

### Default Credentials

After starting, register a new account or use these demo credentials (if seeded):
- **Email**: `admin@demo.com`
- **Password**: `demo123`

### Using the Application

1. **Register/Login**: Create an account or login
2. **Process Claim**: 
   - Go to "Process Claim" page
   - Upload a FNOL document (PDF or TXT)
   - Click "Process Claim"
   - View AI-extracted data and routing decision
3. **View Claims**: Browse all processed claims with filters
4. **Analytics**: View dashboard metrics and charts
5. **Profile**: Manage your account settings

---

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "role": "user",
  "department": "claims"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

#### GET `/api/auth/me`
Get current user (requires auth token)

### Claims Endpoints

#### POST `/api/claims/process`
Process FNOL document (multipart/form-data)
- Upload field: `document` (PDF or TXT file)
- Returns: Extracted data, routing decision, missing fields

#### GET `/api/claims`
Get all claims with filters
Query params: `status`, `queue`, `minAmount`, `maxAmount`, `page`, `limit`

#### GET `/api/claims/:id`
Get single claim details

#### PATCH `/api/claims/:id/status`
Update claim status (Adjuster/Manager/Admin only)
```json
{
  "status": "approved",
  "notes": "Claim verified and approved"
}
```

#### POST `/api/claims/:id/fraud-check`
Run AI fraud analysis (Manager/Admin only)

#### GET `/api/claims/:id/summary`
Generate AI claim summary

### Analytics Endpoints

#### GET `/api/analytics/dashboard`
Get dashboard statistics

#### GET `/api/analytics/trends`
Get claims trends over time

#### GET `/api/analytics/performance`
Get performance metrics (Manager/Admin only)

### Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Error message",
  "stack": "..." // Only in development
}
```

---

## 🔐 Security Features

### Implemented Security Measures

1. **Authentication & Authorization**
   - JWT tokens with secure signing
   - Role-based access control
   - Protected routes

2. **Input Validation**
   - Express-validator for request validation
   - Mongoose schema validation
   - File type and size restrictions

3. **Attack Prevention**
   - Helmet.js for security headers
   - XSS protection with xss-clean
   - NoSQL injection prevention with mongo-sanitize
   - HTTP parameter pollution prevention
   - Rate limiting to prevent DDoS

4. **Data Protection**
   - Bcrypt password hashing
   - Sensitive data excluded from responses
   - Secure cookie settings (when implemented)

5. **Error Handling**
   - Centralized error handling
   - No sensitive data in error messages
   - Detailed logging for debugging

---

## 🚢 Deployment

### Deployment Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong `JWT_SECRET`
- [ ] Configure production MongoDB (MongoDB Atlas recommended)
- [ ] Set up proper CORS origins
- [ ] Enable HTTPS
- [ ] Set up proper logging
- [ ] Configure rate limiting
- [ ] Set up monitoring (e.g., PM2, New Relic)
- [ ] Configure backup strategy
- [ ] Set up CI/CD pipeline

### Recommended Platforms

**Backend:**
- Heroku
- Railway
- Render
- AWS EC2/Elastic Beanstalk
- DigitalOcean

**Frontend:**
- Vercel
- Netlify
- AWS Amplify
- Cloudflare Pages

**Database:**
- MongoDB Atlas (recommended)
- AWS DocumentDB
- Azure Cosmos DB

### Environment Variables for Production

Ensure all production environment variables are set securely (use platform environment variable managers, not committed `.env` files).

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests (when configured)
cd frontend
npm test
```

---

## 📝 Sample FNOL Documents

Create sample documents in `backend/test-documents/`:

**sample-fnol.txt:**
```
FIRST NOTICE OF LOSS

Policy Number: POL-2024-001234
Policyholder: John Smith
Effective Date: 2023-01-15

Incident Date: 2024-02-01
Incident Time: 14:30
Location: 123 Main Street, Mumbai, MH 400001

Description: Vehicle collision at intersection. Minor front-end damage to insured vehicle. Other party fled the scene. No injuries reported.

Claimant: John Smith
Phone: +91-9876543210
Email: john.smith@example.com

Asset Type: Vehicle
Vehicle ID: MH-01-AB-1234
Estimated Damage: 15000
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Sumit Kumar**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- Anthropic for Claude AI API
- MERN stack community
- All open-source contributors

---

## 📞 Support

For issues or questions:
1. Check the [Issues](https://github.com/yourusername/insurance-claims-agent/issues) page
2. Create a new issue with detailed description
3. Contact: your-email@example.com

---

**Built with ❤️ using MERN Stack & Claude AI**
