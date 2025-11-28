// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Password Toggle
const passwordToggle = document.getElementById('passwordToggle');
const passwordInput = document.getElementById('password');
const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
const confirmPasswordInput = document.getElementById('confirmPassword');

passwordToggle.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    passwordToggle.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

confirmPasswordToggle.addEventListener('click', () => {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    confirmPasswordToggle.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

// Form Validation and Submission
const registrationForm = document.getElementById('registrationForm');
const messageDiv = document.getElementById('message');

registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Basic validation
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters long!', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = registrationForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    try {
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            password: password,
            country: document.getElementById('country').value,
            terms: document.getElementById('terms').checked
        };
        
        const response = await fetch('https://registrationform-backend-5d3t.onrender.com/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('Registration successful! Welcome to our community.', 'success');
            registrationForm.reset();
        } else {
            showMessage(data.message || 'Registration failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('Network error. Please check your connection and try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}
