const express = require('express');
const router = express.Router();
const { getAll } = require('../database');

// GET /api/gallery - Get all active gallery images
router.get('/', (req, res) => {
    try {
        const { category } = req.query;

        let query = 'SELECT * FROM gallery WHERE is_active = 1';
        const params = [];

        if (category && category !== 'All') {
            query += ' AND category = ?';
            params.push(category);
        }

        query += ' ORDER BY id DESC';

        const images = getAll(query, params);

        res.json({
            success: true,
            data: images
        });

    } catch (error) {
        console.error('Error fetching gallery:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch gallery images'
        });
    }
});

// GET /api/gallery/categories - Get gallery categories
router.get('/categories', (req, res) => {
    try {
        const categories = getAll('SELECT DISTINCT category FROM gallery WHERE is_active = 1');

        res.json({
            success: true,
            data: ['All', ...categories.map(c => c.category)]
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories'
        });
    }
});

module.exports = router;
