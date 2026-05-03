# 🚀 CureFindr - Drug Intelligence Platform

## 🎯 What is CureFindr?

CureFindr is a **production-ready MERN stack platform** for **drug research, toxicity analysis, and clinical data management**. Researchers, pharmacologists, and medical professionals can upload, search, and visualize comprehensive drug data with images.

## 🌟 Key Features

### 1. **Complete Drug Profiles**

```
Drug Name • API • Group/Class • Chemical Structure (w/ image)
Mode of Action (w/ image) • Use • Toxophore • Toxicity Type
Reason of Toxicity • Min Concentration • Success Rate
Clinical Status • ADRs
```

### 2. **Image-First Research**

- Upload chemical structure + mechanism of action diagrams
- Instant visual reference in search results
- Professional static serving

### 3. **Smart Search**

- Search by drug name, API, or group
- Instant results with full profiles + images
- Responsive results cards

### 4. **Secure & Professional**

- JWT authentication + bcrypt passwords
- Role-based upload access
- Production CORS/HTTPS ready

### 5. **Researcher-Friendly**

```
✅ Upload structured drug data + images
✅ Search & visualize instantly
✅ Track toxicity patterns
✅ Monitor clinical success rates
✅ Mobile-responsive interface
```

## 🎨 Why Researchers Love It

**\"Visual drug data at your fingertips - upload once, research forever.\"**

1. **Toxicity Research**: Track toxophores across compounds
2. **Clinical Analysis**: Success rates + current status
3. **Visual Learning**: Chemical diagrams + mechanisms side-by-side
4. **Collaborative**: Secure sharing platform
5. **Production Scale**: MongoDB + optimized serving

## 🛠 Tech Stack

```
Frontend: React 19 + Vite + TailwindCSS + React Router
Backend: Express 5 + MongoDB + Multer + JWT
Deployment: Render/Vercel ready
```

## ⚡ Quick Start (5 mins)

### Prerequisites

- Node.js 18+
- MongoDB Atlas (free tier)

### 1. Clone & Install

```bash
git clone <repo> && cd curefindr
```

### 2. Backend

```bash
cd server
npm install
# Add server/.env (MONGO_URI, JWT_SECRET)
node index.js
```

### 3. Frontend

```bash
cd client
npm install
# Add client/.env (VITE_BASE_API_URL=http://localhost:5000)
npm run dev
```

### 4. Test Drive

```
1. Login (pankaj0172004@gmail.com)
2. Upload: Form + 2 images
3. Search drug → See images + full profile!
```

## 🌐 API Ready for Live

```
Auth: POST /api/user/login
Data: POST /api/data/createdata | GET /api/data/search
Images: POST /api/data/upload-image | GET /uploads/*.jpg
```

## 🚀 Deploy to Production

**Backend** (Render):

```
npm install && node index.js
Env: MONGO_URI | JWT_SECRET
```

**Frontend** (onrender):

```
npm run build
Env: VITE_BASE_API_URL=https://your-backend.onrender.com
```

## 📱 Live Demo Structure

```
your-app.com → Client (Vercel)
api.your-app.com → Backend (Render)
your-app.com/uploads/ → Images served
```

## 🤝 For Researchers

**Immediate Value**:

- Build drug toxicity database
- Share chemical diagrams
- Track clinical trial progress
- Mobile research access

**Enterprise Ready**:

- User management
- Image hosting (1GB+ free)
- Search analytics ready
- API-first architecture

## 📈 Future Roadmap

```
[ ] Rate limiting + validation
[ ] Drug comparison tool
[ ] Export CSV/PDF
[ ] Team collaboration
[ ] AI toxicity prediction
```

## 📄 License

MIT - Free for research/education/commercial use

**Start building your drug intelligence platform today! 🔬**
