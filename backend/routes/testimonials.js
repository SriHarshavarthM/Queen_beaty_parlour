const express = require('express');
const router = express.Router();
const { getAll } = require('../database');

// GET /api/testimonials - Get all active testimonials
router.get('/', (req, res) => {
    try {
        const { limit } = req.query;

        let query = 'SELECT * FROM testimonials WHERE is_active = 1 ORDER BY id DESC';

        if (limit) {
            query += ' LIMIT ' + parseInt(limit);
        }

        const testimonials = getAll(query);

        res.json({
            success: true,
            data: testimonials
        });

    } catch (error) {
        console.error('Error fetching testimonials:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch testimonials'
        });
    }
});

module.exports = router;
