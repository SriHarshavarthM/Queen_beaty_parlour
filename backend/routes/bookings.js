const express = require('express');
const router = express.Router();
const { runQuery, getAll, getCount } = require('../database');

// Validation helper
const validateBooking = (data) => {
    const errors = [];

    if (!data.name || data.name.trim() === '') {
        errors.push('Name is required');
    }

    if (!data.phone || !/^[0-9]{10}$/.test(data.phone.replace(/\s/g, ''))) {
        errors.push('Valid 10-digit phone number is required');
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Invalid email format');
    }

    if (!data.service || data.service.trim() === '') {
        errors.push('Service is required');
    }

    if (!data.date) {
        errors.push('Date is required');
    }

    if (!data.time) {
        errors.push('Time is required');
    }

    return errors;
};

// POST /api/bookings - Create a new booking
router.post('/', (req, res) => {
    try {
        const { name, phone, email, service, date, time, notes } = req.body;

        // Validate input
        const errors = validateBooking(req.body);
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        // Insert booking
        const result = runQuery(
            `INSERT INTO bookings (name, phone, email, service, date, time, notes, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
            [
                name.trim(),
                phone.replace(/\s/g, ''),
                email?.trim() || null,
                service.trim(),
                date,
                time,
                notes?.trim() || null
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Booking created successfully! We will contact you shortly to confirm.',
            bookingId: result.lastInsertRowid
        });

    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create booking. Please try again.'
        });
    }
});

// GET /api/bookings - Get all bookings (admin)
router.get('/', (req, res) => {
    try {
        const { status } = req.query;

        let query = 'SELECT * FROM bookings';
        const params = [];

        if (status) {
            query += ' WHERE status = ?';
            params.push(status);
        }

        query += ' ORDER BY created_at DESC';

        const bookings = getAll(query, params);
        const total = getCount('bookings');

        res.json({
            success: true,
            data: bookings,
            total: total
        });

    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings'
        });
    }
});

// PUT /api/bookings/:id/status - Update booking status
router.put('/:id/status', (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
            });
        }

        runQuery('UPDATE bookings SET status = ? WHERE id = ?', [status, parseInt(id)]);

        res.json({
            success: true,
            message: 'Booking status updated successfully'
        });

    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update booking status'
        });
    }
});

module.exports = router;
