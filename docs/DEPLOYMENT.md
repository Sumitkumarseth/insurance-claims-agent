# 🚀 Deployment Guide

## Quick Start Deployment

### Option 1: Deploy to Railway (Recommended - Easiest)

#### Backend Deployment
1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables:
   ```
   MONGODB_URI=<your-mongodb-atlas-url>
   ANTHROPIC_API_KEY=<your-claude-api-key>
   JWT_SECRET=<random-32-char-string>
   NODE_ENV=production
   ```
5. Railway will auto-detect and deploy

#### Frontend Deployment
1. Go to [Vercel.com](https://vercel.com)
2. Import your repository
3. Set build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Root Directory: `frontend`
4. Add environment variable:
   ```
   VITE_API_URL=<your-railway-backend-url>/api
   ```
5. Deploy

---

### Option 2: Deploy to Heroku

#### Backend
```bash
cd backend
heroku create your-app-name
heroku config:set MONGODB_URI=<your-uri>
heroku config:set ANTHROPIC_API_KEY=<your-key>
heroku config:set JWT_SECRET=<your-secret>
git push heroku main
```

#### Frontend
```bash
cd frontend
# Build for production
npm run build

# Deploy to Netlify, Vercel, or any static host
```

---

### Option 3: Docker Deployment

#### Create Dockerfile for Backend
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

#### Create docker-compose.yml
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/insurance-claims
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongo
  
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
  
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - VITE_API_URL=http://localhost:5000/api

volumes:
  mongo-data:
```

Run with:
```bash
docker-compose up -d
```

---

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (for development)
5. Get connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/insurance-claims
   ```

---

## Getting Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or login
3. Navigate to API Keys
4. Create a new API key
5. Copy the key (starts with `sk-ant-api03-...`)
6. Keep it secure!

---

## Environment Variables for Production

### Backend Required Variables
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=<your-production-mongodb-uri>
JWT_SECRET=<min-32-characters-random-string>
ANTHROPIC_API_KEY=<your-api-key>
CLIENT_URL=<your-frontend-url>
```

### Frontend Required Variables
```env
VITE_API_URL=<your-backend-url>/api
```

---

## Post-Deployment Checklist

- [ ] All environment variables set correctly
- [ ] Database connection working
- [ ] API endpoints responding
- [ ] Frontend connecting to backend
- [ ] Authentication working
- [ ] File uploads working
- [ ] Logs being generated
- [ ] Error handling working
- [ ] HTTPS enabled
- [ ] CORS configured properly

---

## Monitoring & Logging

### Recommended Tools
- **PM2** - Process manager for Node.js
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **New Relic** - Performance monitoring
- **Datadog** - Infrastructure monitoring

### Setup PM2
```bash
npm install -g pm2
pm2 start server.js --name insurance-api
pm2 startup
pm2 save
```

---

## Performance Optimization

1. **Enable Compression** (already implemented)
2. **Use CDN** for static assets
3. **Enable Caching** for API responses
4. **Database Indexing** (already implemented)
5. **Load Balancing** for high traffic
6. **Redis** for session storage (future)

---

## Security Recommendations

1. Use HTTPS (Let's Encrypt for free SSL)
2. Set secure JWT expiration
3. Implement refresh tokens
4. Add request logging
5. Set up monitoring alerts
6. Regular security audits
7. Keep dependencies updated

---

## Troubleshooting

### Common Issues

**Issue: "MongoNetworkError"**
- Solution: Check MongoDB URI and network access

**Issue: "CORS Error"**
- Solution: Ensure CLIENT_URL is set correctly in backend

**Issue: "Anthropic API Error"**
- Solution: Verify API key and check quota

**Issue: "File Upload Failed"**
- Solution: Check file size limits and upload directory permissions

---

## Backup Strategy

### Database Backups
```bash
# Manual backup
mongodump --uri="<your-mongodb-uri>"

# Automated with MongoDB Atlas
# Enable automatic backups in Atlas console
```

### File Backups
- Use cloud storage (AWS S3, Google Cloud Storage)
- Implement automated backup scripts
- Keep at least 30 days of backups

---

## Scaling Considerations

### Horizontal Scaling
- Load balancer (Nginx, AWS ELB)
- Multiple backend instances
- Session store (Redis)
- Database sharding

### Vertical Scaling
- Upgrade server resources
- Optimize database queries
- Implement caching strategies

---

For more help, check the main [README.md](../README.md) or create an issue.
