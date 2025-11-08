import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, "db.json");

// Load database
function loadDB() {
  const data = fs.readFileSync(DB_PATH, "utf8");
  return JSON.parse(data);
}

// Save database
function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Initialize db.json if not present
if (!fs.existsSync(DB_PATH)) {
  saveDB({
    students: [],
    companies: [],
    admins: [
      {
        id: 1,
        name: "Shipra",
        email: "admin@internnation.com",
        password: "Admin@123",
        role: "admin"
      }
    ],
    drives: [],
    applications: []
  });
}

// 🧑‍🎓 Register Student
app.post("/api/register/student", (req, res) => {
  const db = loadDB();
  const student = req.body;

  const exists = db.students.find((s) => s.email === student.email);
  if (exists) return res.status(400).json({ message: "Student already exists" });

  student.id = Date.now();
  db.students.push(student);
  saveDB(db);
  res.json({ message: "Student registered successfully", user: student });
});

// 🏢 Register Company
app.post("/api/register/company", (req, res) => {
  const db = loadDB();
  const company = req.body;

  const exists = db.companies.find((c) => c.email === company.email);
  if (exists) return res.status(400).json({ message: "Company already exists" });

  company.id = Date.now();
  db.companies.push(company);
  saveDB(db);
  res.json({ message: "Company registered successfully", user: company });
});

// 🔐 Login
app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;
  const db = loadDB();
  let user;

  if (role === "student") user = db.students.find(u => u.email === email && u.password === password);
  if (role === "company") user = db.companies.find(u => u.email === email && u.password === password);
  if (role === "admin") user = db.admins.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  res.json({ message: "Login successful", user });
});

// ✅ Health Check
app.get("/", (req, res) => {
  res.send("Intern.Nation backend is running ✅");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
