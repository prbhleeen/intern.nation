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

// 🆕 Create a new Drive (Job/Internship)
app.post("/api/drives", (req, res) => {
  const db = loadDB();
  const drive = req.body;

  drive.id = Date.now(); // generate unique ID
  db.drives.push(drive);
  saveDB(db);

  res.json({ message: "Drive created successfully!", drive });
});

// 🔍 Get all drives for students
app.get("/api/drives", (req, res) => {
  const db = loadDB();
  res.json(db.drives);
});

// 📝 Student applies for a drive
app.post("/api/applications", (req, res) => {
  const db = loadDB();
  const application = req.body;

  // Prevent duplicate applications
  const exists = db.applications.find(
    a => a.studentId === application.studentId && a.driveId === application.driveId
  );

  if (exists) {
    return res.status(400).json({ message: "Already applied to this drive" });
  }

  application.id = Date.now();
  application.status = "Applied";
  application.appliedOn = new Date().toISOString();

  db.applications.push(application);
  saveDB(db);

  res.json({ message: "Application submitted successfully", application });
});

app.put("/api/applications/:id", (req, res) => {
  const db = loadDB();
  const appId = parseInt(req.params.id);

  const application = db.applications.find(a => a.id === appId);

  if (!application) return res.status(404).json({ message: "Application not found" });

  application.status = req.body.status || application.status;
  saveDB(db);

  res.json({ message: "Application updated", application });
});

app.get("/api/applications", (req, res) => {
  const db = loadDB();
  res.json(db.applications);
});

// ✅ Health Check
app.get("/", (req, res) => {
  res.send("Intern.Nation backend is running ✅");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
