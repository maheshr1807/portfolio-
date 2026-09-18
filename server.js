// ============================================================
// server.js — Portfolio Backend Server
// Node.js + Express + MongoDB (Mongoose)
// Run: node server.js
// Open: http://localhost:3001
// ============================================================

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const Portfolio = require('./models/Portfolio');

const app = express();
const PORT = process.env.PORT || 3001;

// ---- Default data (used to seed DB on first run) ----
const DEFAULT_DATA = {
  hero: {
    name: 'Mahesh R',
    roles: ['"Full Stack Web Developer"', '"MERN Stack Developer"', '"Freelance Web Developer"'],
    description: 'I build fast, responsive, and scalable websites using React, Node.js, Express, and MongoDB — from e-commerce platforms to admin dashboards.',
    ctaPrimary: { label: '$ view-projects', href: '#projects' },
    ctaSecondary: { label: '$ hire-me', href: '#contact' },
    ctaGhost: { label: '↓ download-resume', href: '#' },
    stackLayers: [
      { tech: 'React + Tailwind CSS', label: 'FRONTEND' },
      { tech: 'Node.js + Express', label: 'BACKEND' },
      { tech: 'MongoDB + JWT Auth', label: 'DATA & AUTH' },
      { tech: 'Vercel · Render · Netlify · Github', label: 'DEPLOY' }
    ]
  },
  about: {
    paragraphs: [
      "I'm a <b>Full Stack Web Developer</b> based in Salem, Tamil Nadu, specializing in modern web applications built on the <b>MERN stack</b> (MongoDB, Express, React, Node.js).",
      "I design and build e-commerce websites, admin dashboards, business websites, and custom web applications — focused on clean code, solid architecture, and interfaces that actually work well for the people using them.",
      "My goal is simple: help businesses and founders turn ideas into fast, reliable, production-ready web products, and keep learning and shipping along the way."
    ],
    stats: [
      { label: 'education', value: 'B.E. Computer Science' },
      { label: 'location', value: 'Salem, IN' },
      { label: 'stack', value: 'MERN' },
      { label: 'focus', value: 'Full Stack Dev' },
      { label: 'status', value: 'Available for freelance' }
    ]
  },
  skills: [
    { category: 'Frontend', chips: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap'] },
    { category: 'Backend', chips: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth'] },
    { category: 'Tools', chips: ['Git', 'GitHub', 'Postman', 'VS Code', 'Vercel', 'Render', 'Netlify'] }
  ],
  projects: [
    {
      id: 'p1',
      title: 'gym-website',
      category: 'gym-website',
      description: 'A responsive gym website featuring membership plans, trainer profiles, fitness programs, and contact information with a modern user interface.',
      image: 'img/gym-img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      features: ['Responsive Design', 'Membership Plans', 'Trainer Profiles'],
      liveLink: 'https://maheshr1807.github.io/gym-site/',
      sourceLink: '#'
    },
    {
      id: 'p2',
      title: 'Hotel Booking Website',
      category: 'hotel-booking',
      description: 'A modern and responsive hotel website that showcases luxury rooms, amenities, and online booking with an elegant and user-friendly design.',
      image: 'img/hotel-img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      features: ['Room Listings', 'Online Booking', 'Contact & Location'],
      liveLink: 'https://maheshr1807.github.io/hotel-booking/',
      sourceLink: '#'
    },
    {
      id: 'p3',
      title: 'Catering Service Website',
      category: 'catering-service',
      description: 'A modern and responsive catering website showcasing delicious menus, event catering services, and easy booking for weddings, parties, and corporate events.',
      image: 'img/catering-img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      features: ['Delicious Menus', 'Event Catering Services', 'Easy Booking'],
      liveLink: 'https://maheshr1807.github.io/Karthika-catering-service/',
      sourceLink: '#'
    },
    {
      id: 'p4',
      title: 'Hospital & Clinic Website',
      category: 'hospital-website',
      description: 'A modern and responsive hospital website that provides healthcare services, doctor profiles, appointment booking, and emergency contact information.',
      image: 'img/hospital-img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      features: ['Healthcare Services', 'Doctor Profiles', 'Appointment Booking'],
      liveLink: 'https://maheshr1807.github.io/travels/',
      sourceLink: '#'
    },
    {
      id: 'p5',
      title: 'Travel & Tourism Website',
      category: 'travels-website',
      description: 'A modern and responsive travel website that showcases destinations, tours, and provides an easy booking experience for tourists.',
      image: 'img/travels img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      features: ['Destinations Gallery', 'Tours', 'Easy Booking'],
      liveLink: 'https://maheshr1807.github.io/travels/',
      sourceLink: '#'
    }
  ],
  services: [
    { title: 'Business Website', desc: 'Fast, professional sites that represent your brand well.' },
    { title: 'E-commerce Website', desc: 'Full online stores with cart, checkout, and payments.' },
    { title: 'Portfolio Website', desc: 'Personal or agency portfolios that convert visitors to clients.' },
    { title: 'Admin Dashboard', desc: 'Internal tools to manage data, users, and operations.' },
    { title: 'Landing Page', desc: 'Focused, high-converting pages for campaigns and launches.' },
    { title: 'API Development', desc: 'Clean REST APIs built for your web or mobile app.' },
    { title: 'Bug Fixing & Maintenance', desc: 'Diagnosing and fixing issues in existing MERN applications.' }
  ],
  experience: {
    title: 'Personal & Portfolio Projects',
    body: 'Built multiple full-stack web applications using the MERN stack — including an e-commerce platform with authentication, payments, and an admin panel — and deployed them on cloud platforms like Vercel and Render.'
  },
  testimonials: [
    { quote: '"Mahesh built a clean and responsive website with excellent performance."', author: '— raja m' },
    { quote: '"Communicated clearly through the whole project and delivered on time."', author: '— rajesh' }
  ],
  contact: {
    name: 'Mahesh R',
    email: 'rm683443@gmail.com',
    phone: '+91 9342763246',
    linkedin: 'https://www.linkedin.com/in/mahesh-r-18062006r/',
    linkedinLabel: 'linkedin.com/in/mahesh-r-18062006r/',
    github: 'https://github.com/maheshr1807',
    githubLabel: 'github.com/maheshr1807',
    whatsapp: 'https://wa.me/919342763246'
  }
};

// ---- Middleware ----
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname)));

// ============================================================
// DB HELPERS & STORAGE FALLBACK
// ============================================================
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
const DATA_FILE = path.join(__dirname, 'portfolio-data.json');
let isDbConnected = false;

/** Read portfolio data (from MongoDB if connected, else from local JSON file) */
async function readData() {
  if (isDbConnected) {
    try {
      let doc = await Portfolio.findOne({ key: 'main' }).lean();
      if (doc) {
        const { _id, __v, key, createdAt, updatedAt, ...data } = doc;
        return data;
      }
    } catch (err) {
      console.error('Error reading from MongoDB, falling back to local file:', err.message);
    }
  }

  // Fallback: Read from local portfolio-data.json file
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading local data file:', e.message);
  }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

/** Write portfolio data (to MongoDB if connected + local JSON backup) */
async function writeData(data) {
  if (isDbConnected) {
    try {
      await Portfolio.findOneAndUpdate(
        { key: 'main' },
        { $set: { ...data, key: 'main' } },
        { upsert: true, new: true, runValidators: false }
      );
    } catch (err) {
      console.error('Error writing to MongoDB:', err.message);
    }
  }

  // Always write to local portfolio-data.json as backup / persistent store
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving local JSON file:', e.message);
  }
}

// ============================================================
// API ROUTES
// ============================================================

// GET /api/portfolio — return all data
app.get('/api/portfolio', async (req, res) => {
  try {
    const data = await readData();
    res.json({ success: true, data });
  } catch (err) {
    console.error('GET /api/portfolio error:', err);
    res.status(500).json({ success: false, error: 'Failed to read portfolio data' });
  }
});

// POST /api/portfolio — save all data
app.post('/api/portfolio', async (req, res) => {
  try {
    const data = req.body;
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid data format' });
    }
    await writeData(data);
    const storageTarget = isDbConnected ? 'MongoDB & Local JSON' : 'Local JSON file';
    console.log(`✓ Portfolio data saved (${storageTarget}) — ${new Date().toLocaleTimeString()}`);
    res.json({ success: true, message: `Data saved successfully (${storageTarget})` });
  } catch (err) {
    console.error('POST /api/portfolio error:', err);
    res.status(500).json({ success: false, error: 'Failed to save portfolio data' });
  }
});

// POST /api/portfolio/reset — reset to defaults
app.post('/api/portfolio/reset', async (req, res) => {
  try {
    await writeData(JSON.parse(JSON.stringify(DEFAULT_DATA)));
    console.log('✓ Portfolio data reset to default configuration');
    res.json({ success: true, message: 'Reset to defaults' });
  } catch (err) {
    console.error('POST /api/portfolio/reset error:', err);
    res.status(500).json({ success: false, error: 'Failed to reset portfolio data' });
  }
});

// Catch-all: serve index.html for any unmatched route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================================
// SERVER INITIALIZATION & MONGODB CONNECT WITH AUTO-FALLBACK
// ============================================================
async function startServer() {
  console.log('');
  console.log('  🔄 Initializing Portfolio Server...');

  if (MONGO_URI) {
    try {
      console.log('  ⏳ Attempting MongoDB connection...');
      await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
      isDbConnected = true;
      console.log('  ✅ Connected to MongoDB:', MONGO_URI.includes('@') ? MONGO_URI.split('@')[1] : MONGO_URI);

      // Seed DB with defaults if empty
      const existing = await Portfolio.findOne({ key: 'main' });
      if (!existing) {
        await writeData(JSON.parse(JSON.stringify(DEFAULT_DATA)));
        console.log('  📄 Database seeded with initial portfolio data');
      } else {
        console.log('  📄 Existing portfolio data loaded from MongoDB');
      }
    } catch (err) {
      console.log('  ⚠️  Primary MongoDB connection failed:', err.message);

      // Attempt local MongoDB fallback
      if (MONGO_URI.includes('mongodb+srv') || MONGO_URI.includes('mongodb.net')) {
        try {
          console.log('  ⏳ Trying local MongoDB (mongodb://127.0.0.1:27017/portfolio)...');
          await mongoose.connect('mongodb://127.0.0.1:27017/portfolio', { serverSelectionTimeoutMS: 3000 });
          isDbConnected = true;
          console.log('  ✅ Connected to local MongoDB');
        } catch (localErr) {
          console.log('  ⚠️  Local MongoDB not active.');
        }
      }
    }
  }

  if (!isDbConnected) {
    console.log('  📂 Mode: Local File Storage (portfolio-data.json)');
    console.log('  💡 Tip: To sync with MongoDB Atlas Cloud, add your current IP address');
    console.log('          to your Atlas cluster IP Whitelist (0.0.0.0/0).');
  }

  app.listen(PORT, () => {
    console.log('');
    console.log('  ╔════════════════════════════════════════════════════════════╗');
    console.log(`  ║  🚀 Portfolio Server running successfully!                 ║`);
    console.log(`  ║                                                            ║`);
    console.log(`  ║  Storage Mode : ${isDbConnected ? 'MongoDB (Cloud/Local)' : 'Local File Storage (JSON)'}        ║`);
    console.log(`  ║  Portfolio    : http://localhost:${PORT}                        ║`);
    console.log(`  ║  Admin Panel  : http://localhost:${PORT}/admin.html                  ║`);
    console.log('  ╚════════════════════════════════════════════════════════════╝');
    console.log('');
  });
}

startServer();
