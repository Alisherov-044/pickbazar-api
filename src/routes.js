const express = require("express");
const db = require("./database");
const router = express.Router();

// Helper function to format arrays as strings for SQLite
const arrayToString = (arr) => JSON.stringify(arr);

// Helper function to parse strings as arrays from SQLite
const stringToArray = (str) => JSON.parse(str);

// Categories routes
router.get("/categories", (req, res) => {
    db.all("SELECT * FROM categories", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.post("/categories", (req, res) => {
    const { name, slug, icon } = req.body;
    const query = "INSERT INTO categories (name, slug, icon) VALUES (?, ?, ?)";
    db.run(query, [name, slug, icon], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

router.patch("/categories/:id", (req, res) => {
    const { id } = req.params;
    const { name, slug, icon } = req.body;
    const query =
        "UPDATE categories SET name = ?, slug = ?, icon = ? WHERE id = ?";
    db.run(query, [name, slug, icon, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

router.delete("/categories/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM categories WHERE id = ?";
    db.run(query, id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

// Products routes
router.get("/products", (req, res) => {
    db.all("SELECT * FROM products", (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        rows = rows.map((row) => ({
            ...row,
            images: stringToArray(row.images),
        }));
        res.json(rows);
    });
});

router.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM products WHERE id = ?";
    db.run(query, id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

router.post("/categories/clear", (req, res) => {
    const query = "DELETE * FROM categories";
    db.run(query, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

router.post("/products/clear", (req, res) => {
    const query = "DELETE * FROM products";
    db.run(query, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

router.post("/products", (req, res) => {
    const { name, images, price, discount, description, rating, category_id } =
        req.body;
    const query = `
    INSERT INTO products (name, images, price, discount, description, rating, category_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
    db.run(
        query,
        [
            name,
            arrayToString(images),
            price,
            discount,
            description,
            rating,
            category_id,
        ],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
});

router.patch("/products/:id", (req, res) => {
    const { id } = req.params;
    const { name, images, price, discount, description, rating, category_id } =
        req.body;
    const query = `
    UPDATE products
    SET name = ?, images = ?, price = ?, discount = ?, description = ?, rating = ?, category_id = ?
    WHERE id = ?
  `;
    db.run(
        query,
        [
            name,
            arrayToString(images),
            price,
            discount,
            description,
            rating,
            category_id,
            id,
        ],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID });
        }
    );
});

module.exports = router;
