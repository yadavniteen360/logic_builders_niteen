# Micro-Influencer Brand Collaboration Hub

CollabHub is a full-stack marketplace web application connecting local brands with highly-engaged micro-influencers. Built for agility, impact, and a premium user experience, this platform helps brands skip the agency fees and directly source authentic creators for their campaigns.

## 🚀 Features

- **Role-Based Workflows**: Separate tailored experiences for Brands and Influencers.
- **Brand Dashboard**: Create campaigns, track applicants, and manage accepted collaborations.
- **Influencer Dashboard**: View applications status and discover matching niches.
- **Campaign Marketplace**: Dynamic feed of local campaigns with advanced niche filtering.
- **Premium UI/UX**: Soft shadows, vibrant gradients, animated transitions (Framer Motion), and responsive design via Tailwind CSS.

## 💻 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, React Router.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose).
- **Authentication**: JWT (JSON Web Tokens).

## 🛠️ Local Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB running locally (default: `mongodb://127.0.0.1:27017/collabhub`), or an Atlas connection string.

### 1. Clone & Install Dependencies
Navigate to the root directory `h:\Kalpathon` and install dependencies for both ends:

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 2. Configure Environment
1. In the `backend/` folder, copy `.env.example` to `.env` (already done by default).
2. If using MongoDB Atlas, replace the `MONGO_URI` in `backend/.env` with your Atlas connection string.

### 3. Seed Demo Data (Optional but recommended!)
Populate the database with realistic brands, influencers, campaigns, and applications.
```bash
cd backend
node seed/seedData.js
```
*(You will see "Data Imported successfully")*

### 4. Run the Application
Open two terminal windows:

**Terminal 1 (Backend - Port 5000):**
```bash
cd backend
node server.js
```

**Terminal 2 (Frontend - Port 5173):**
```bash
cd frontend
npm run dev
```

### 5. Test Accounts
Use these pre-seeded accounts to explore the platform:
- **Brand:** `brand1@test.com` / Password: `password`
- **Influencer:** `inf1@test.com` / Password: `password`

## ☁️ Deployment Notes

### Backend Deployment (Render / Heroku)
1. Add a `start` script to `backend/package.json`: `"start": "node server.js"`.
2. Push the code to GitHub and connect to Render Web Services.
3. Add Environment Variables (`MONGO_URI`, `JWT_SECRET`, `PORT`).

### Frontend Deployment (Vercel / Netlify)
1. Update `baseURL` in `frontend/src/api/index.js` to point to your live backend URL.
2. Build the project using `npm run build`.
3. Deploy the `dist` folder to Vercel.

---

### Hackathon Pitch Summary 🎤
*"We bring authenticity back to marketing. **CollabHub** solves the 'middleman problem' by connecting thriving local businesses directly with highly-engaged micro-influencers. Brands get higher ROI, influencers get paid opportunities, and communities stay connected—all packaged in a scalable, beautifully designed platform."*
