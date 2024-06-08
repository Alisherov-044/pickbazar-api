const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database();

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    icon TEXT
  )`);

    db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    images TEXT,
    price REAL NOT NULL,
    discount REAL,
    description TEXT,
    rating REAL,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories (id)
  )`);
});

module.exports = db;
