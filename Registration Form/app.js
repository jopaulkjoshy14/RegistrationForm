// ===============================
// SELECTORS
// ===============================
const form = document.getElementById('registrationForm');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordToggle = document.getElementById('passwordToggle');
const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
const darkModeToggle = document.getElementById('darkModeToggle');

// ===============================
// DARK MODE TOGGLE
// ===============================
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// ===============================
// PASSWORD VISIBILITY TOGGLE
// ===============================
passwordToggle.addEventListener('click', () => {
    const type =
        passwordInput.getAttribute('type') === 'password'
            ? 'text'
            : 'password';

    passwordInput.setAttribute('type', type);

    passwordToggle.querySelector('i').className =
        type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
});

// ===============================
// CONFIRM PASSWORD VISIBILITY TOGGLE  (FIXED)
// ===============================
confirmPasswordToggle.addEventListener('click', () => {
    const type =
        confirmPasswordInput.getAttribute('type') === 'password'
            ? 'text'
            : 'password';

    confirmPasswordInput.setAttribute('type', type);

    confirmPasswordToggle.querySelector('i').className =
        type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
});

// ===============================
// PASSWORD MATCH VALIDATION
// ===============================
function validatePasswords() {
    const errorMsg = document.getElementById('confirmPasswordError');

    if (passwordInput.value !== confirmPasswordInput.value) {
        errorMsg.style.display = 'block';
        return false;
    } else {
        errorMsg.style.display = 'none';
        return true;
    }
}

confirmPasswordInput.addEventListener('input', validatePasswords);

// ===============================
// FORM SUBMISSION (BACKEND CONNECTED)
// ===============================
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Check password match before sending
    if (!validatePasswords()) {
        alert("Passwords do not match!");
        return;
    }

    const userData = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch("https://your-backend.onrender.com/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const result = await response.json();

        if (result.success) {
            alert("Registration successful!");
            form.reset();
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error(error);
        alert("Unable to connect to server.");
    }
});
