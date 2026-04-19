# ProVisa Consultancy App

## Setup

### 1. MongoDB
- **Local**: Install MongoDB Community, run `mongod`.
- **Cloud (recommended)**: 
  1. Sign up at [MongoDB Atlas](https://www.mongodb.com/atlas)
  2. Create cluster (free tier)
  3. Get connection string, replace `<password>` with DB user password
  4. Example: `mongodb+srv://user:<password>@cluster0.xxxxx.mongodb.net/provisa?retryWrites=true&w=majority`

### 2. Backend
```bash
cd backend
bun install  # or npm install
cp .env.example .env
# Edit .env: Set MONGODB_URI and JWT_SECRET
bun run dev   # Starts on http://localhost:4000
```

### 3. Frontend
```bash
bun install  # or npm install
bun run dev  # Starts on http://localhost:8080 (from logs)
```

### 4. Admin Panel
1. Open http://localhost:8080/admin/login
2. Login: `admin@provisa.com` / `admin123`
3. Redirects to /admin dashboard

### Troubleshooting
- Check backend console for MongoDB connection.
- API calls to localhost:4000.
- CORS allows 8080/4173.

Enjoy! 🚀
# provisa
