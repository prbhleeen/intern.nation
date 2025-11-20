// Show form based on role
const forms = document.querySelectorAll(".form");
const radios = document.querySelectorAll("input[name='role']");

function showForm(role) {
  forms.forEach(f => f.style.display = "none");
  document.getElementById(role).style.display = "block";
}

radios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.id === "student-tab") showForm("student");
    if (radio.id === "company-tab") showForm("company");
    if (radio.id === "admin-tab") showForm("admin");
  });
});

showForm("student");

// Decode JWT
function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
}

// Google Sign-In callback (must be global)
function handleCredentialResponse(response) {
  try {
    const payload = decodeJwt(response.credential);

    const userInfo = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      id: payload.sub,
      authProvider: "google"
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    // Detect selected role
    const selectedRole = document.querySelector("input[name='role']:checked").id;

    // Redirect based on role
    if (selectedRole === "student-tab") {
      window.location.href = "student_dashboard/student_dashboard.html";
    } else if (selectedRole === "company-tab") {
      window.location.href = "company_dashboard/companydashboard.html";
    } else if (selectedRole === "admin-tab") {
      window.location.href = "admin_dashboard/Admin_Dashboard.html";
    }

  } catch (err) {
    console.error("Google Sign-in Error:", err);
    document.getElementById("google-error").style.display = "block";
  }
}

// Process form-based login
function processForm(id, role, redirect) {
  document.getElementById(id).addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userInfo = {
      role: role,
      email: formData.get("email"),
      id: formData.get(role + "Id") || null,
      authProvider: "form"
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    window.location.href = redirect;
  });
}

processForm("student", "student", "student_dashboard/student_dashboard.html");
processForm("company", "company", "company_dashboard/companydashboard.html");
processForm("admin", "admin", "admin_dashboard/Admin_Dashboard.html");
