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

// Check if Google Sign-In is configured
window.addEventListener('load', function() {
  setTimeout(() => {
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      
      console.log('Google Sign-In loaded successfully');
    } else {
    
      document.getElementById('google-error').textContent = 'Google Sign-In is not configured. Please set up OAuth credentials in Google Cloud Console.';
      document.getElementById('google-error').style.display = 'block';
    }
  }, 2000); // Wait 2 seconds for script to load
});


document.getElementById('student').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userInfo = {
    role: 'student',
    email: formData.get('email'),
    studentId: formData.get('studentId'),
    authProvider: 'form'
  };
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  window.location.href = 'student_dashboard/student_dashboard.html';
});

document.getElementById('company').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userInfo = {
    role: 'company',
    email: formData.get('email'),
    companyId: formData.get('companyId'),
    authProvider: 'form'
  };
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  window.location.href = 'company_dashboard/companydashboard.html';
});

document.getElementById('admin').addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const userInfo = {
    role: 'admin',
    email: formData.get('email'),
    adminId: formData.get('adminId'),
    authProvider: 'form'
  };
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  window.location.href = 'admin_dashboard/Admin_Dashboard.html';
});

function handleCredentialResponse(response) {
  try {
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
  } catch (error) {
    console.error('Google Sign-In error:', error);
    document.getElementById('google-error').textContent = 'Google Sign-In failed. Please try again or use email login.';
    document.getElementById('google-error').style.display = 'block';
  }
}

function decodeJwtResponse(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
