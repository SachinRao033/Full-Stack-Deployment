import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { v4 as uuid } from "uuid";

const app = express();
const db = new sqlite3.Database('/home/jenkins/data/contacts.db');

app.use(express.json());
app.use(cors());

app.get("/health", (_, res) => res.send("ok"));

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS contacts (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT
)`);

// ------------------------
// API ROUTES WITH PREFIX (exactly your original structure)
// ------------------------
const router = express.Router();

router.get("/contacts", (req, res) => {
  db.all('SELECT * FROM contacts', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows || []);
  });
});

router.post("/contacts", (req, res) => {
  const { name, phone, email } = req.body;
  const id = uuid();
  db.run('INSERT INTO contacts (id, name, phone, email) VALUES (?, ?, ?, ?)',
    [id, name, phone, email],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, name, phone, email });
    });
});

router.put("/contacts/:id", (req, res) => {
  const { name, phone, email } = req.body;
  db.run('UPDATE contacts SET name = ?, phone = ?, email = ? WHERE id = ?',
    [name, phone, email, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: req.params.id, name, phone, email });
    });
});

router.delete("/contacts/:id", (req, res) => {
  db.run('DELETE FROM contacts WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "deleted" });
  });
});

// mount API prefix
app.use("/api", router);

app.listen(3000, () => console.log("Contact API running on port 3000"));
