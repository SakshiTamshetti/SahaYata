
# SahaYata 🌾

## 1. IDEA TITLE
**SahaYata** - AI-Powered Farmer Welfare Scheme Eligibility Assistant

---

## 2. IDEA DESCRIPTION
A digital platform helping Indian farmers discover and check eligibility for government welfare schemes using AI. Features include multi-language support (EN/HI), secure authentication, AI-powered scheme recommendations via Google Gemini, WhatsApp integration, and results tracking.

**Key Features:**
- AI-powered eligibility assessment with personalized recommendations
- Secure registration/login with JWT & bcryptjs encryption
- Real-time WhatsApp notifications via Twilio
- AI Chat assistant for instant query resolution
- Dark/Light theme with responsive design

---

## 3. TECHNICAL DETAILS

### 🖥️ TECHNOLOGIES USED

**Frontend:**
- React 19, TypeScript, Vite, Tailwind CSS, Motion, Lucide React

**Backend:**
- Express.js, Node.js, TypeScript, JWT, bcryptjs

**Database:**
- Better SQLite3

**AI/ML:**
- Google Gemini 3.1 Pro (via GenAI SDK)

**APIs & Cloud:**
- Twilio API (WhatsApp integration)
- Google Gemini API
- Vite SSR deployment capability

---

### 🏗️ ARCHITECTURE OVERVIEW

```
User Interface (React + Vite)
    ↓
Express.js Backend (Auth, Routes, APIs)
    ↓
AI Service Layer (Google Gemini Integration)
    ↓
Data Persistence (SQLite3 Database)
    ↓
External Services (Twilio WhatsApp, Gemini API)
```

**Flow:**
1. User registers with Aadhaar credentials
2. Submits eligibility form (farm details, income, etc.)
3. Backend processes & sends to Google Gemini AI
4. AI returns personalized scheme recommendations
5. Results stored in SQLite database
6. User receives WhatsApp notifications if enabled
7. AI Chat available for additional queries

---

### 📊 DATABASE USED

**SQLite3** (Better SQLite3) - Lightweight, zero-config, perfect for single-server deployment

**Tables:**

**users table:**
- id, aadhaar (UNIQUE), name, phone, age, state, district
- farm_size, annual_income, primary_crop, occupation, category, gender
- password (hashed), whatsapp_enabled

**eligibility_results table:**
- id, user_id, aadhaar, name, phone, age, state, district
- farm_size, language, created_at

---

### 🔌 THIRD-PARTY INTEGRATIONS

1. **Google Gemini API** - AI-powered scheme recommendations & NLP
2. **Twilio Communications API** - WhatsApp messaging for notifications
3. **Lucide React Icons** - UI icon library

---

## 4. SUBMISSION LINKS

### ⭐ GITHUB REPOSITORY
[SahaYata GitHub Repo](https://github.com/SakshiTamshetti/sahayata)


### 🚀 DEMO / PITCH VIDEO
[SahaYata Demo](https://drive.google.com/drive/u/0/folders/1WyPsO94IO1TZr90YarMFBtYZda3aIzKf)


### 🎨 PPT
[SahaYata PPT]((https://drive.google.com/file/d/14ydzWq202MI8hPhtD1NWwhYxi3l3wQz8/view?usp=sharing))


---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set environment variables in .env.local
GEMINI_API_KEY=your_key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_WHATSAPP_NUMBER=your_number

# Run development server
npm run dev  # http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📱 Key Features

✅ Multi-Language Support (EN/HI)  
✅ AI-Powered Scheme Recommendations  
✅ Secure JWT Authentication  
✅ WhatsApp Integration  
✅ Responsive Design  
✅ Dark/Light Theme  
✅ Real-time AI Chat  
✅ Results History Tracking  

---

## 📦 Main Dependencies

**Production:** react@19.0.0, express@4.21.2, @google/genai@1.29.0, twilio@5.12.2, better-sqlite3@12.4.1, tailwindcss@4.1.14, bcryptjs@3.0.3, jsonwebtoken@9.0.3

**Dev:** typescript@5.8.2, vite@6.2.0, tsx@4.21.0

---

## 📝 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/schemes/check-eligibility` - Get recommendations
- `GET /api/results/:userId` - Fetch assessment history
- `POST /api/user/whatsapp/subscribe` - Enable notifications

---

## 🔒 Security

- Password hashing (bcryptjs)
- JWT authentication
- Environment variable protection
- SQL injection prevention

---

**Made with ❤️ for Indian Farmers**
