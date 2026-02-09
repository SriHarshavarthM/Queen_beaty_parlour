const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'glamour_studio.db');

let db = null;

// Initialize database
async function initDatabase() {
    const SQL = await initSqlJs();

    // Load existing database or create new one
    if (fs.existsSync(dbPath)) {
        const buffer = fs.readFileSync(dbPath);
        db = new SQL.Database(buffer);
    } else {
        db = new SQL.Database();
    }

    // Create tables
    db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      service TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      notes TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      status TEXT DEFAULT 'unread',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price TEXT,
      category TEXT,
      icon TEXT,
      features TEXT,
      is_active INTEGER DEFAULT 1
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT,
      content TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Seed initial data if tables are empty
    const serviceCount = db.exec('SELECT COUNT(*) as count FROM services')[0];
    if (!serviceCount || serviceCount.values[0][0] === 0) {
        const services = [
            ['Bridal Makeup', 'Your wedding day deserves nothing but perfection. Our expert bridal makeup artists create stunning looks that photograph beautifully and last all day.', 'Starting ₹25,000', 'bridal', 'Crown', 'HD Airbrush Makeup,Traditional & Contemporary Styles,Pre-Bridal Packages,Groom Grooming'],
            ['Skin Care Treatments', 'Rejuvenate your skin with our premium treatments. From deep cleansing facials to advanced anti-aging therapies.', 'Starting ₹2,500', 'skincare', 'Sparkles', 'Hydrafacials,Chemical Peels,Anti-Aging Treatments,Acne Treatment'],
            ['Nail Art & Manicure', 'Express yourself through beautiful nail designs. From elegant French tips to intricate nail art.', 'Starting ₹1,200', 'nails', 'Hand', 'Gel Extensions,Nail Art,Spa Manicure,Pedicure'],
            ['Baby Shower Makeup', 'Celebrate the joy of motherhood looking radiant with our gentle makeup services.', 'Starting ₹8,000', 'special', 'Baby', 'Pregnancy-Safe Products,Soft Glam Looks,Hair Styling,Photography Ready'],
            ['Party & Event Makeup', 'Stand out at every celebration with our party makeup services.', 'Starting ₹5,000', 'party', 'PartyPopper', 'Evening Glam,Festival Looks,Sangeet Makeup,Reception Styling'],
            ['Hair Services', 'Complete hair care from styling to treatments.', 'Starting ₹1,500', 'hair', 'Scissors', 'Hair Styling,Treatments,Color & Highlights,Bridal Hairstyles'],
            ['Mehendi', 'Traditional henna artistry for all occasions.', 'Starting ₹3,000', 'additional', 'Heart', 'Bridal Mehendi,Arabic Designs,Indo-Arabic,Tattoo Mehendi'],
            ['Pre-Bridal Package', 'Complete pre-wedding beauty regime for the bride-to-be.', 'Starting ₹15,000', 'bridal', 'Flower2', 'Facial Treatments,Body Polishing,Hair Spa,Skin Consultation'],
        ];

        for (const service of services) {
            db.run(`INSERT INTO services (name, description, price, category, icon, features) VALUES (?, ?, ?, ?, ?, ?)`, service);
        }
    }

    const testimonialCount = db.exec('SELECT COUNT(*) as count FROM testimonials')[0];
    if (!testimonialCount || testimonialCount.values[0][0] === 0) {
        const testimonials = [
            ['Priya Sharma', 'Bride', 'Glamour Studio made my wedding day absolutely magical. The bridal makeup was flawless and lasted throughout the entire ceremony and reception. The team understood exactly what I wanted and exceeded my expectations.', 5],
            ['Anjali Patel', 'Regular Client', 'I have been coming to Glamour Studio for over 3 years now. Their skin care treatments have transformed my skin completely. The staff is always friendly, professional, and makes every visit a relaxing experience.', 5],
            ['Meera Kapoor', 'Baby Shower Client', 'The team did an amazing job with my baby shower makeup. I felt so beautiful and confident. They were patient and understanding, making the whole experience stress-free and enjoyable.', 5],
            ['Ritu Agarwal', 'Bride', 'I cannot thank Glamour Studio enough for making me feel like a princess on my wedding day. The attention to detail was incredible, and they made sure I looked perfect in every photo.', 5],
            ['Sneha Reddy', 'Party Client', 'Booked their services for a family function and was blown away by the results. The makeup artist listened to all my preferences and created exactly the look I wanted.', 5],
        ];

        for (const testimonial of testimonials) {
            db.run(`INSERT INTO testimonials (name, role, content, rating) VALUES (?, ?, ?, ?)`, testimonial);
        }
    }

    const galleryCount = db.exec('SELECT COUNT(*) as count FROM gallery')[0];
    if (!galleryCount || galleryCount.values[0][0] === 0) {
        const gallery = [
            ['Royal Bridal Look', 'Bridal', '/assets/bridal-portrait.jpg'],
            ['Traditional Bride', 'Bridal', '/assets/hero-bridal.jpg'],
            ['Radiant Mother-to-be', 'Baby Shower', '/assets/baby-shower.jpg'],
            ['Gold Accent Nails', 'Nail Art', '/assets/nail-art.jpg'],
            ['Facial Treatment', 'Skin Care', '/assets/skincare-treatment.jpg'],
            ['Our Salon', 'Skin Care', '/assets/salon-interior.jpg'],
            ['Contemporary Bride', 'Bridal', '/assets/bridal-portrait.jpg'],
            ['Bridal Makeup Session', 'Bridal', '/assets/hero-bridal.jpg'],
            ['Bridal Nail Design', 'Nail Art', '/assets/nail-art.jpg'],
            ['Soft Glam Look', 'Baby Shower', '/assets/baby-shower.jpg'],
            ['Spa Day', 'Skin Care', '/assets/skincare-treatment.jpg'],
            ['South Indian Bride', 'Bridal', '/assets/bridal-portrait.jpg'],
        ];

        for (const item of gallery) {
            db.run(`INSERT INTO gallery (title, category, image_url) VALUES (?, ?, ?)`, item);
        }
    }

    // Save to file
    saveDatabase();

    console.log('✅ Database initialized successfully');
    return db;
}

// Save database to file
function saveDatabase() {
    if (db) {
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(dbPath, buffer);
    }
}

// Helper functions for queries
function getDatabase() {
    return db;
}

function runQuery(sql, params = []) {
    try {
        db.run(sql, params);
        saveDatabase();
        const result = db.exec('SELECT last_insert_rowid()');
        return { lastInsertRowid: result[0]?.values[0][0] || 0, changes: 1 };
    } catch (error) {
        console.error('Query error:', error);
        throw error;
    }
}

function getAll(sql, params = []) {
    try {
        const stmt = db.prepare(sql);
        if (params.length > 0) {
            stmt.bind(params);
        }
        const results = [];
        while (stmt.step()) {
            const row = stmt.getAsObject();
            results.push(row);
        }
        stmt.free();
        return results;
    } catch (error) {
        console.error('Query error:', error);
        throw error;
    }
}

function getOne(sql, params = []) {
    const results = getAll(sql, params);
    return results[0] || null;
}

function getCount(table) {
    const result = db.exec(`SELECT COUNT(*) as count FROM ${table}`);
    return result[0]?.values[0][0] || 0;
}

module.exports = {
    initDatabase,
    getDatabase,
    runQuery,
    getAll,
    getOne,
    getCount,
    saveDatabase
};
