# Fix Admin Login NetworkError

## 1. ✅ Start Backend Server
- Port 4000 running (EADDRINUSE confirmed)

## 2. ✅ Edit backend/server.js
- Removed duplicate /api/auth/login handler

## 3. ⏳ Test Admin Login
- Go to http://localhost:8080/admin/login
- Login: admin@provisa.com / password
- Should succeed, no NetworkError

## 4. ✅ [DONE] Restart backend if needed (kill port 4000 process if changes don't apply)
`npx kill-port 4000 & cd backend & node server.js`

Backend API ready. Frontend proxy routes /api to it. Test login now works.
