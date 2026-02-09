const express = require('express');
const router = express.Router();
const { getAll, getOne } = require('../database');

// GET /api/services - Get all active services
router.get('/', (req, res) => {
    try {
        const { category } = req.query;

        let query = 'SELECT * FROM services WHERE is_active = 1';
        const params = [];

        if (category) {
            query += ' AND category = ?';
            params.push(category);
        }

        query += ' ORDER BY id ASC';

        const services = getAll(query, params);

        // Parse features from comma-separated string to array
        const formattedServices = services.map(service => ({
            ...service,
            features: service.features ? service.features.split(',') : []
        }));

        res.json({
            success: true,
            data: formattedServices
        });

    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch services'
        });
    }
});

// GET /api/services/categories - Get service categories
router.get('/categories', (req, res) => {
    try {
        const categories = getAll('SELECT DISTINCT category FROM services WHERE is_active = 1');

        res.json({
            success: true,
            data: categories.map(c => c.category)
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories'
        });
    }
});

// GET /api/services/:id - Get single service
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const service = getOne('SELECT * FROM services WHERE id = ?', [parseInt(id)]);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.json({
            success: true,
            data: {
                ...service,
                features: service.features ? service.features.split(',') : []
            }
        });

    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch service'
        });
    }
});

module.exports = router;
