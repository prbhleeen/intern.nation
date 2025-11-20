document.addEventListener('DOMContentLoaded', () => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || userInfo.role !== 'company') {
        window.location.href = 'login.html'; 
        return;
    }

    const header = document.querySelector('header');
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.textContent = 'Logout';
    logoutLink.style.cssText =
        'position: absolute; top: 10px; right: 10px; color: white; text-decoration: none; font-weight: bold;';
    header.appendChild(logoutLink);

    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('userInfo');
        window.location.href = 'login.html';
    });

    const profileNameElement = document.getElementById("profileName");
    const profileEmailElement = document.getElementById("profileEmail");

    if (userInfo.name && profileNameElement) {
        profileNameElement.textContent = userInfo.name;
    }
    if (userInfo.email && profileEmailElement) {
        profileEmailElement.textContent = "Email: " + userInfo.email;
    }

    const jobPostForm = document.getElementById('jobPostForm');
    const postConfirmation = document.getElementById('postConfirmation');

    jobPostForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        // Read form values
        const formData = {
            postType: document.getElementById('postType').value,
            jobTitle: document.getElementById('jobTitle').value.trim(),
            department: document.getElementById('department').value.trim(),
            locationType: document.getElementById('locationType').value,
            openings: parseInt(document.getElementById('openings').value),
            salary: document.getElementById('salary').value.trim(),
            duration: document.getElementById('duration').value.trim(),
            description: document.getElementById('description').value.trim(),
            skills: document.getElementById('skills').value
                .split(',')
                .map(s => s.trim())
                .filter(s => s.length > 0),
            deadline: document.getElementById('deadline').value,
            postedOn: new Date().toISOString(),

            // 🟢 Store which company posted it
            companyId: userInfo.id,
            companyName: userInfo.companyName
        };

        // Validate required fields
        if (!formData.postType || !formData.jobTitle || !formData.department || !formData.locationType ||
            !formData.openings || !formData.description || !formData.deadline) {

            alert('⚠️ Please fill all required fields (marked with *)');
            return;
        }

        try {
    const response = await fetch("http://localhost:5000/api/drives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log("Saved to backend:", result);

    alert("Drive Posted Successfully!");  

    jobPostForm.reset();

} catch (error) {
    console.error("Error posting drive:", error);
    alert("Failed to publish. Check backend server.");
}

    });

});
