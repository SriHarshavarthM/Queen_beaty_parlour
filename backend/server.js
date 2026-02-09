const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDatabase } = require('./database');

// Import routes
const bookingsRouter = require('./routes/bookings');
const contactRouter = require('./routes/contact');
const servicesRouter = require('./routes/services');
const galleryRouter = require('./routes/gallery');
const testimonialsRouter = require('./routes/testimonials');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:8080', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/bookings', bookingsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/services', servicesRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/testimonials', testimonialsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Glamour Studio API is running' });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Initialize database and start server
async function startServer() {
    try {
        await initDatabase();

        app.listen(PORT, () => {
            console.log(`
╔═══════════════════════════════════════════════╗
║     🌸 Glamour Studio Backend Server 🌸       ║
╠═══════════════════════════════════════════════╣
║  Server running on: http://localhost:${PORT}     ║
║  Environment: ${(process.env.NODE_ENV || 'development').padEnd(23)}║
╚═══════════════════════════════════════════════╝
      `);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

module.exports = app;
