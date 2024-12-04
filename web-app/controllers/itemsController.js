const db = require('../models/db');

// Get all items
exports.getAllItems = (req, res) => {
    db.all('SELECT * FROM items', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Add a new item
exports.addItem = (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    db.run(
        'INSERT INTO items (name, description) VALUES (?, ?)',
        [name, description],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        }
    );
};

// Update an item
exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.run(
        'UPDATE items SET name = ?, description = ? WHERE id = ?',
        [name, description, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ changes: this.changes });
        }
    );
};

// Partially update an item
exports.partialUpdateItem = (req, res) => {
    const { id } = req.params;
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const placeholders = fields.map((field) => `${field} = ?`).join(', ');

    db.run(
        `UPDATE items SET ${placeholders} WHERE id = ?`,
        [...values, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ changes: this.changes });
        }
    );
};

// Delete an item
exports.deleteItem = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM items WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ changes: this.changes });
    });
};
