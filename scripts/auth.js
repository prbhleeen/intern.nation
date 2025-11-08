// ==========================
// auth.js — shared login + signup logic
// ==========================

// Auto-detect backend URL
const BASE_URL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:5000"
    : "https://intern-nation.vercel.app";

console.log("🔗 Connected to backend:", BASE_URL);

// Detect current page
const isSignup = window.location.pathname.includes("signup");
const isLogin = window.location.pathname.includes("login");

// --- Role toggle ---
const forms = document.querySelectorAll(".form");
const radios = document.querySelectorAll("input[name='role']");

function showForm(role) {
  forms.forEach(f => (f.style.display = "none"));
  const form = document.getElementById(role);
  if (form) form.style.display = "block";
}

radios?.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.id === "student-tab") showForm("student");
    if (radio.id === "company-tab") showForm("company");
    if (radio.id === "admin-tab") showForm("admin");
  });
});

showForm("student");

// ==========================
// SIGNUP HANDLERS
// ==========================
if (isSignup) {
  console.log("📘 Signup page detected");

  document.getElementById("student")?.addEventListener("submit", async e => {
    e.preventDefault();
    console.log("Submitting student signup...");
    const formData = new FormData(e.target);
    const password = formData.get("password");
    const confirm = formData.get("confirmPassword");

    if (password !== confirm) return alert("Passwords do not match!");

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password,
      studentId: formData.get("studentId"),
      college: formData.get("college"),
      department: formData.get("department"),
      role: "student",
    };

    try {
      const res = await fetch(`${BASE_URL}/api/register/student`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log("🟢 API result:", result);
      if (!res.ok) throw new Error(result.message || "Signup failed");

      alert(result.message);
      localStorage.setItem("userInfo", JSON.stringify(result.user));
      window.location.href = "../student_dashboard/student_dashboard.html";
    } catch (err) {
      alert("❌ " + err.message);
    }
  });

  document.getElementById("company")?.addEventListener("submit", async e => {
    e.preventDefault();
    console.log("Submitting company signup...");
    const formData = new FormData(e.target);
    const password = formData.get("password");
    const confirm = formData.get("confirmPassword");

    if (password !== confirm) return alert("Passwords do not match!");

    const data = {
      companyName: formData.get("companyName"),
      email: formData.get("email"),
      password,
      companyId: formData.get("companyId"),
      industry: formData.get("industry"),
      location: formData.get("location"),
      role: "company",
    };

    try {
      const res = await fetch(`${BASE_URL}/api/register/company`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log("🟢 API result:", result);
      if (!res.ok) throw new Error(result.message || "Signup failed");

      alert(result.message);
      localStorage.setItem("userInfo", JSON.stringify(result.user));
      window.location.href = "../company_dashboard/companydashboard.html";
    } catch (err) {
      alert("❌ " + err.message);
    }
  });
}

// ==========================
// LOGIN HANDLERS
// ==========================
if (isLogin) {
  console.log("🔐 Login page detected");

  document.getElementById("student")?.addEventListener("submit", async e => {
    e.preventDefault();
    console.log("Logging in student...");
    const formData = new FormData(e.target);
    const data = {
      role: "student",
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log("🟢 API result:", result);
      if (!res.ok) throw new Error(result.message || "Login failed");

      alert("✅ Welcome, " + result.user.name);
      localStorage.setItem("userInfo", JSON.stringify(result.user));
      window.location.href = "../student_dashboard/student_dashboard.html";
    } catch (err) {
      alert("❌ " + err.message);
    }
  });

  document.getElementById("company")?.addEventListener("submit", async e => {
    e.preventDefault();
    console.log("Logging in company...");
    const formData = new FormData(e.target);
    const data = {
      role: "company",
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log("🟢 API result:", result);
      if (!res.ok) throw new Error(result.message || "Login failed");

      alert("✅ Welcome, " + result.user.companyName);
      localStorage.setItem("userInfo", JSON.stringify(result.user));
      window.location.href = "../company_dashboard/companydashboard.html";
    } catch (err) {
      alert("❌ " + err.message);
    }
  });

  document.getElementById("admin")?.addEventListener("submit", async e => {
    e.preventDefault();
    console.log("Logging in admin...");
    const formData = new FormData(e.target);
    const data = {
      role: "admin",
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log("🟢 API result:", result);
      if (!res.ok) throw new Error(result.message || "Login failed");

      alert("✅ Welcome Admin!");
      localStorage.setItem("userInfo", JSON.stringify(result.user));
      window.location.href = "../admin_dashboard/Admin_Dashboard.html";
    } catch (err) {
      alert("❌ " + err.message);
    }
  });
}

// ==========================
// GOOGLE SIGN-IN
// ==========================
function handleCredentialResponse(response) {
  const responsePayload = decodeJwtResponse(response.credential);
  const userInfo = {
    name: responsePayload.name,
    email: responsePayload.email,
    picture: responsePayload.picture,
    id: responsePayload.sub,
    authProvider: "google",
  };
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  window.location.href = "../student_dashboard/student_dashboard.html";
}

function decodeJwtResponse(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}
