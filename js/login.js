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

    window.location.href = "student_dashboard/student_dashboard.html";

  } catch (err) {
    console.error("Google Sign-in Error:", err);
    document.getElementById("google-error").style.display = "block";
  }
}

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

document.getElementById("student").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const userInfo = {
    role: "student",
    email: formData.get("email"),
    studentId: formData.get("studentId"),
    authProvider: "form"
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  window.location.href = "student_dashboard/student_dashboard.html";
});

document.getElementById("company").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const userInfo = {
    role: "company",
    email: formData.get("email"),
    companyId: formData.get("companyId"),
    authProvider: "form"
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  window.location.href = "company_dashboard/companydashboard.html";
});

document.getElementById("admin").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const userInfo = {
    role: "admin",
    email: formData.get("email"),
    adminId: formData.get("adminId"),
    authProvider: "form"
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  window.location.href = "admin_dashboard/Admin_Dashboard.html";
});
