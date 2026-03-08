import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();
const { MessagingResponse } = twilio.twiml;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("sahayata.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aadhaar TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    age INTEGER NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    farm_size REAL NOT NULL,
    annual_income REAL DEFAULT 0,
    primary_crop TEXT DEFAULT '',
    occupation TEXT DEFAULT 'Farmer',
    category TEXT DEFAULT 'General',
    gender TEXT DEFAULT 'Male',
    password TEXT NOT NULL,
    whatsapp_enabled INTEGER DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS eligibility_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    aadhaar TEXT,
    name TEXT,
    phone TEXT,
    age INTEGER,
    state TEXT,
    district TEXT,
    farm_size REAL,
    language TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

// Add missing columns if they don't exist (for existing databases)
const columnsToAdd = [
  { name: 'annual_income', type: 'REAL DEFAULT 0' },
  { name: 'primary_crop', type: 'TEXT DEFAULT \'\'' },
  { name: 'occupation', type: 'TEXT DEFAULT \'Farmer\'' },
  { name: 'category', type: 'TEXT DEFAULT \'General\'' },
  { name: 'gender', type: 'TEXT DEFAULT \'Male\'' }
];

for (const col of columnsToAdd) {
  try {
    db.exec(`ALTER TABLE users ADD COLUMN ${col.name} ${col.type}`);
    console.log(`Added column ${col.name} to users table`);
  } catch (e: any) {
    if (e.message.includes('duplicate column name')) {
      // Column already exists, ignore
    } else {
      console.error(`Failed to add column ${col.name}:`, e.message);
    }
  }
}

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_123_";

// Twilio Client
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

if (!twilioClient) {
  console.warn("Twilio credentials missing. Some features will run in simulation mode.");
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Auth Routes
app.post("/api/register", async (req, res) => {
  const { 
    aadhaar, name, phone, age, state, district, farmSize, 
    password, annualIncome, primaryCrop, occupation, category, gender 
  } = req.body;
  
  console.log("Registration attempt:", { aadhaar, name, phone, age, state, district, farmSize });
  
  // Basic server-side validation
  if (!aadhaar || !name || !phone || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const parsedAge = parseInt(age);
  const parsedFarmSize = parseFloat(farmSize);
  const parsedAnnualIncome = parseFloat(annualIncome || "0");

  if (isNaN(parsedAge) || isNaN(parsedFarmSize)) {
    return res.status(400).json({ error: "Invalid age or farm size" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare(`
      INSERT INTO users (
        aadhaar, name, phone, age, state, district, farm_size, 
        password, annual_income, primary_crop, occupation, category, gender
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      aadhaar, name, phone, parsedAge, state, district, parsedFarmSize, 
      hashedPassword, parsedAnnualIncome, primaryCrop || '', 
      occupation || 'Farmer', category || 'General', gender || 'Male'
    );
    
    console.log("Registration successful, user ID:", result.lastInsertRowid);
    const token = jwt.sign({ id: result.lastInsertRowid, aadhaar }, JWT_SECRET);
    
    res.json({ 
      token, 
      user: { 
        id: result.lastInsertRowid, 
        name, 
        aadhaar,
        phone,
        age: parsedAge,
        state,
        district,
        farmSize: parsedFarmSize,
        annualIncome: parsedAnnualIncome,
        primaryCrop: primaryCrop || '',
        occupation: occupation || 'Farmer',
        category: category || 'General',
        gender: gender || 'Male',
        whatsappEnabled: 1
      } 
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      res.status(400).json({ error: "Aadhaar number already registered" });
    } else {
      res.status(500).json({ error: "Registration failed: " + error.message });
    }
  }
});

app.post("/api/login", async (req, res) => {
  const { aadhaar, password } = req.body;
  try {
    const user = db.prepare("SELECT * FROM users WHERE aadhaar = ?").get(aadhaar) as any;
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, aadhaar: user.aadhaar }, JWT_SECRET);
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        aadhaar: user.aadhaar,
        phone: user.phone,
        age: user.age,
        state: user.state,
        district: user.district,
        farmSize: user.farm_size,
        annualIncome: user.annual_income,
        primaryCrop: user.primary_crop,
        occupation: user.occupation,
        category: user.category,
        gender: user.gender,
        whatsappEnabled: user.whatsapp_enabled
      } 
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Save Eligibility Results
app.post("/api/save-results", (req, res) => {
  const authHeader = req.headers.authorization;
  let userId = null;

  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      userId = decoded.id;
    } catch (e) {
      // Token invalid, proceed as guest
    }
  }

  const { aadhaar, name, phone, age, state, district, farmSize, language } = req.body;
  try {
    const stmt = db.prepare(`
      INSERT INTO eligibility_results 
      (user_id, aadhaar, name, phone, age, state, district, farm_size, language) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(userId, aadhaar, name, phone, age, state, district, farmSize, language);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to save results" });
  }
});

// Get User Results
app.get("/api/my-results", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const results = db.prepare("SELECT * FROM eligibility_results WHERE user_id = ? ORDER BY created_at DESC").all(decoded.id);
    res.json(results);
  } catch (e) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Update Notification Settings
app.post("/api/update-notifications", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const { whatsappEnabled } = req.body;
    
    db.prepare("UPDATE users SET whatsapp_enabled = ? WHERE id = ?")
      .run(whatsappEnabled ? 1 : 0, decoded.id);
    
    res.json({ success: true });
  } catch (e) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Trigger Notification (Simulated Government Site Update)
app.post("/api/admin/trigger-new-scheme", async (req, res) => {
  const { schemeName, targetState, description } = req.body;
  
  try {
    // Find matching users
    const users = db.prepare("SELECT * FROM users WHERE state = ?").all(targetState) as any[];
    
    const notifications = users.map(async (user) => {
      const results = [];
      
      if (user.whatsapp_enabled && twilioClient) {
        const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER || "whatsapp:+14155238886";
        
        // Ensure phone number is in E.164 format for Twilio
        let cleanPhone = user.phone.replace(/\D/g, '');
        if (cleanPhone.length === 10) {
          cleanPhone = '+91' + cleanPhone; // Default to India
        } else if (!cleanPhone.startsWith('+')) {
          cleanPhone = '+' + cleanPhone;
        }

        console.log(`Attempting WhatsApp to ${cleanPhone} from ${fromNumber}`);
        try {
          await twilioClient.messages.create({
            from: fromNumber,
            to: `whatsapp:${cleanPhone}`,
            body: `नमस्ते ${user.name}! \n\nएक नई सरकारी योजना " ${schemeName} " आपके राज्य (${user.state}) के लिए उपलब्ध है। \n\nविवरण: ${description} \n\nअधिक जानकारी के लिए सहायाता (SahaYata) ऐप देखें।`
          });
          results.push("WhatsApp Sent");
        } catch (err: any) {
          console.error(`WhatsApp failed for ${cleanPhone}:`, err.message);
          results.push(`WhatsApp Failed: ${err.message}`);
        }
      }
      
      return { user: user.name, phone: user.phone, results };
    });

    const summary = await Promise.all(notifications);
    res.json({ message: "Notifications processed", summary });
  } catch (error) {
    res.status(500).json({ error: "Failed to trigger notifications" });
  }
});

// WhatsApp Webhook (Twilio)
app.post("/api/whatsapp/webhook", async (req, res) => {
  const { Body, From } = req.body;
  const twiml = new MessagingResponse();

  console.log(`Incoming WhatsApp from ${From}: ${Body}`);

  // To comply with guidelines, we don't call Gemini from the backend.
  // Instead, we guide the user to the in-app AI assistant which is more powerful.
  twiml.message(`नमस्ते! सहायाता (SahaYata) में आपका स्वागत है। 🙏

स्वचालित सहायता के लिए, कृपया हमारे ऐप में "SahaYata AI" चैटबॉट का उपयोग करें। यह आपको योजनाओं की पात्रता और आवेदन प्रक्रिया में तुरंत मदद करेगा।

ऐप लिंक: ${process.env.APP_URL || 'https://sahayata.app'}`);

  res.type("text/xml").send(twiml.toString());
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
