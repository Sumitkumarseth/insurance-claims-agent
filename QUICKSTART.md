# ⚡ QUICK START GUIDE

## 🚀 Get Running in 5 Minutes

### Step 1: Prerequisites Check
```bash
node --version  # Should be >= 18.x
npm --version   # Should be >= 9.x
mongod --version # Should be >= 6.x (or use MongoDB Atlas)
```

### Step 2: Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd insurance-claims-agent

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ../frontend
npm install
```

### Step 3: Configure Environment

**Backend (.env file):**
```bash
cd backend
cp .env.example .env

# Edit .env with your favorite editor:
# nano .env
# OR
# code .env

# Required values:
# - MONGODB_URI (get from MongoDB Atlas or use local: mongodb://localhost:27017/insurance-claims)
# - ANTHROPIC_API_KEY (get from https://console.anthropic.com/)
# - JWT_SECRET (any random 32+ character string)
```

**Quick MongoDB Atlas Setup:**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account → Create cluster (Free tier)
3. Create database user
4. Whitelist IP: 0.0.0.0/0 (for dev)
5. Copy connection string

**Get Anthropic API Key:**
1. Go to https://console.anthropic.com/
2. Sign up/login
3. Create API key
4. Copy key (starts with sk-ant-api03-)

### Step 4: Start Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Backend running on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Frontend running on http://localhost:3000

### Step 5: Use the App

1. Open http://localhost:3000
2. Click "Sign up" and create account
3. Go to "Process Claim"
4. Upload a test document from `backend/test-documents/`
5. Click "Process Claim"
6. View AI-extracted data! 🎉

---

## 🧪 Testing with Sample Documents

We've included 3 sample FNOL documents in `backend/test-documents/`:

1. **sample-fnol-1.txt** - Complete claim with all fields
   - Expected route: **Manual Review** (moderate value)
   
2. **sample-fnol-simple.txt** - Low-value, straightforward claim  
   - Expected route: **Fast-track** (< ₹25,000)
   
3. **sample-fnol-fraud.txt** - Suspicious high-value claim
   - Expected route: **Investigation** (fraud indicators)

Upload these to see different AI routing decisions!

---

## 🎯 What to Expect

### After Processing a Claim:

You'll see:
- ✅ **Extracted Fields**: All data pulled from document
- ✅ **Routing Decision**: Which queue (fast-track/manual/specialist/investigation)
- ✅ **Confidence Score**: AI's confidence in its decision
- ✅ **Reasoning**: Why it made that decision
- ⚠️ **Missing Fields**: What information is missing
- ⚠️ **Inconsistencies**: Any data conflicts found

### Example Routing Rules:

- **Fast-track**: Damage < ₹25,000 + no missing critical fields + no fraud indicators
- **Manual Review**: Missing mandatory fields
- **Specialist Queue**: Injury claims or multiple parties
- **Investigation**: Fraud keywords or suspicious patterns

---

## 🔧 Common Issues & Solutions

### "Cannot connect to MongoDB"
```bash
# Solution 1: Start local MongoDB
mongod

# Solution 2: Use MongoDB Atlas (recommended)
# Get connection string from Atlas and add to .env
```

### "Anthropic API Error"
```bash
# Check your API key is correct in .env
# Ensure you have credits in your Anthropic account
# Verify key starts with: sk-ant-api03-
```

### "Port 5000 already in use"
```bash
# Change port in backend/.env:
PORT=5001

# Or kill process on port 5000:
# Mac/Linux: lsof -ti:5000 | xargs kill -9
# Windows: netstat -ano | findstr :5000 (then TaskManager kill)
```

### "CORS Error"
```bash
# Ensure CLIENT_URL in backend/.env matches frontend URL:
CLIENT_URL=http://localhost:3000
```

---

## 📱 Default User Roles

When you register, you can choose:
- **User**: Can process claims, view own claims
- **Adjuster**: + Can update claim status
- **Manager**: + Can run fraud checks
- **Admin**: + Full access, can delete claims

For testing, create a **Manager** account to access all features!

---

## 🎨 Key Features to Try

1. **Dashboard**: View analytics and recent claims
2. **Process Claim**: Upload FNOL → Get AI analysis
3. **All Claims**: Browse with filters (status, queue)
4. **Claim Details**: View full extracted data
5. **Analytics**: Charts and performance metrics

---

## 📚 Next Steps

- ✅ Process sample claims
- ✅ Explore dashboard analytics
- ✅ Try different user roles
- ✅ Read full [README.md](../README.md)
- ✅ Check [API Documentation](../README.md#api-documentation)
- ✅ Deploy using [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🆘 Need Help?

1. Check main [README.md](../README.md)
2. Review [DEPLOYMENT.md](DEPLOYMENT.md)
3. Open an issue on GitHub
4. Contact: your-email@example.com

---

**Happy Claim Processing! 🎉**
