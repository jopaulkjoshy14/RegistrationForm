        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');
        const themeText = themeToggle.querySelector('span');

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.className = 'fas fa-sun';
                themeText.textContent = 'Light Mode';
            } else {
                themeIcon.className = 'fas fa-moon';
                themeText.textContent = 'Dark Mode';
            }
        });

        // Password Toggle
        const passwordToggle = document.getElementById('passwordToggle');
        const passwordInput = document.getElementById('password');
        const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        passwordToggle.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            passwordToggle.querySelector('i').className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        });

        confirmPasswordToggle.addEventListener('click', () => {
    const type =
        confirmPasswordInput.getAttribute('type') === 'password'
            ? 'text'
            : 'password';

    confirmPasswordInput.setAttribute('type', type);
    confirmPasswordToggle.querySelector('i').className =
        type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
});


        // Form Validation
        const form = document.getElementById('registrationForm');
        const nameInput = document.getElementById('fullName');
        const userIDInput = document.getElementById('userID');
        const emailInput = document.getElementById('email');
        const idNumberInput = document.getElementById('idNumber');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const termsInput = document.getElementById('terms');

        // Real-time validation
        nameInput.addEventListener('blur', validateName);
        userIDInput.addEventListener('input', validateUserID);
        emailInput.addEventListener('blur', validateEmail);
        idNumberInput.addEventListener('blur', validateIDNumber);
        passwordInput.addEventListener('input', validatePassword);
        confirmPasswordInput.addEventListener('input', validateConfirmPassword);

        function validateName() {
            const nameError = document.getElementById('nameError');
            if (nameInput.value.trim().length < 2) {
                nameError.style.display = 'block';
                return false;
            } else {
                nameError.style.display = 'none';
                return true;
            }
        }

        function validateUserID() {
            const userIDError = document.getElementById('userIDError');
            const userIDSuccess = document.getElementById('userIDSuccess');
            
            if (userIDInput.value.length < 4) {
                userIDError.style.display = 'block';
                userIDSuccess.style.display = 'none';
                return false;
            } else {
                userIDError.style.display = 'none';
                userIDSuccess.style.display = 'block';
                return true;
            }
        }

        function validateEmail() {
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(emailInput.value)) {
                emailError.style.display = 'block';
                return false;
            } else {
                emailError.style.display = 'none';
                return true;
            }
        }

        function validateIDNumber() {
            const idNumberError = document.getElementById('idNumberError');
            if (idNumberInput.value.trim().length < 5) {
                idNumberError.style.display = 'block';
                return false;
            } else {
                idNumberError.style.display = 'none';
                return true;
            }
        }

        function validatePassword() {
            const passwordError = document.getElementById('passwordError');
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            
            if (!passwordRegex.test(passwordInput.value)) {
                passwordError.style.display = 'block';
                return false;
            } else {
                passwordError.style.display = 'none';
                return true;
            }
        }

        function validateConfirmPassword() {
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            
            if (confirmPasswordInput.value !== passwordInput.value) {
                confirmPasswordError.style.display = 'block';
                return false;
            } else {
                confirmPasswordError.style.display = 'none';
                return true;
            }
        }

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isNameValid = validateName();
            const isUserIDValid = validateUserID();
            const isEmailValid = validateEmail();
            const isIDNumberValid = validateIDNumber();
            const isPasswordValid = validatePassword();
            const isConfirmPasswordValid = validateConfirmPassword();
            
            const termsError = document.getElementById('termsError');
            if (!termsInput.checked) {
                termsError.style.display = 'block';
            } else {
                termsError.style.display = 'none';
            }
            
            if (isNameValid && isUserIDValid && isEmailValid && 
                isIDNumberValid && isPasswordValid && isConfirmPasswordValid && termsInput.checked) {
                // In a real application, you would send the data to a server here
                alert('Registration successful! Welcome to our platform.');
                form.reset();
                
                // Reset success messages
                document.getElementById('userIDSuccess').style.display = 'none';
            } else {
                alert('Please fix the errors in the form before submitting.');
            }
        });
