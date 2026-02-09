const express = require('express');
const router = express.Router();
const { runQuery, getAll, getCount } = require('../database');

// Validation helper
const validateContact = (data) => {
    const errors = [];

    if (!data.name || data.name.trim() === '') {
        errors.push('Name is required');
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push('Valid email is required');
    }

    if (!data.message || data.message.trim() === '') {
        errors.push('Message is required');
    }

    return errors;
};

// POST /api/contact - Submit contact form
router.post('/', (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // Validate input
        const errors = validateContact(req.body);
        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors
            });
        }

        // Insert contact message
        const result = runQuery(
            `INSERT INTO contact_messages (name, email, phone, message, created_at)
       VALUES (?, ?, ?, ?, datetime('now'))`,
            [
                name.trim(),
                email.trim(),
                phone?.trim() || null,
                message.trim()
            ]
        );

        res.status(201).json({
            success: true,
            message: 'Thank you for reaching out! We will get back to you within 24 hours.',
            messageId: result.lastInsertRowid
        });

    } catch (error) {
        console.error('Error submitting contact form:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit your message. Please try again.'
        });
    }
});

// GET /api/contact - Get all contact messages (admin)
router.get('/', (req, res) => {
    try {
        const { status } = req.query;

        let query = 'SELECT * FROM contact_messages';
        const params = [];

        if (status) {
            query += ' WHERE status = ?';
            params.push(status);
        }

        query += ' ORDER BY created_at DESC';

        const messages = getAll(query, params);
        const total = getCount('contact_messages');

        res.json({
            success: true,
            data: messages,
            total: total
        });

    } catch (error) {
        console.error('Error fetching contact messages:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch messages'
        });
    }
});

// PUT /api/contact/:id/status - Mark message as read/replied
router.put('/:id/status', (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['unread', 'read', 'replied'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
            });
        }

        runQuery('UPDATE contact_messages SET status = ? WHERE id = ?', [status, parseInt(id)]);

        res.json({
            success: true,
            message: 'Message status updated successfully'
        });

    } catch (error) {
        console.error('Error updating message status:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update message status'
        });
    }
});

module.exports = router;
