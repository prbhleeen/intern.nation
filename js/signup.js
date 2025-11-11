const forms = document.querySelectorAll(".form");
const radios = document.querySelectorAll("input[name='role']");

function showForm(role) {
  forms.forEach(f => f.classList.remove("active"));
  document.getElementById(role).classList.add("active");
}

radios.forEach(radio => {
  radio.addEventListener("change", () => {
    if (radio.id === "student-tab") showForm("student");
    if (radio.id === "company-tab") showForm("company");
  });
});


showForm("student");

// Handle form submits for registration
document.getElementById('student').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userInfo = {
    role: 'student',
    name: formData.get('name'),
    email: formData.get('email'),
    studentId: formData.get('studentId'),
    college: formData.get('college'),
    department: formData.get('department'),
    authProvider: 'form'
  };
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  window.location.href = 'student_dashboard/student_dashboard.html';
});

document.getElementById('company').addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userInfo = {
    role: 'company',
    companyName: formData.get('companyName'),
    email: formData.get('email'),
    companyId: formData.get('companyId'),
    industry: formData.get('industry'),
    location: formData.get('location'),
    authProvider: 'form'
  };
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  window.location.href = 'company_dashboard/companydashboard.html';
});

function handleCredentialResponse(response) {
  const responsePayload = decodeJwtResponse(response.credential);
  const userInfo = {
    name: responsePayload.name,
    email: responsePayload.email,
    picture: responsePayload.picture,
    id: responsePayload.sub,
    authProvider: 'google'
  };
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  // Redirect to student dashboard (default role)
  window.location.href = 'student_dashboard/student_dashboard.html';
}

function decodeJwtResponse(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
