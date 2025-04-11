// Utility Functions Module
const Utils = {
    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    validatePhone: function(phone) {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    }
};

// Form Validation Module
const FormValidator = {
    validateForm: function(form) {
        let isValid = true;
        const fields = form.querySelectorAll('input, textarea, select');

        fields.forEach(field => {
            field.classList.remove('is-invalid');

            if (field.hasAttribute('required') && !field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            }

            if (field.type === 'email' && !Utils.validateEmail(field.value)) {
                field.classList.add('is-invalid');
                isValid = false;
            }

            if (field.type === 'tel' && !Utils.validatePhone(field.value)) {
                field.classList.add('is-invalid');
                isValid = false;
            }
        });

        return isValid;
    }
};

// Error Handling Module
const ErrorHandler = {
    displayError: function(message) {
        console.error("Error:", message);
        alert(`Error: ${message}\nPlease try again or contact support.`);
    }
};

// Main Initialization Function
function initializeApplication() {
    const enrollmentForm = document.getElementById('enrollmentForm');
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!FormValidator.validateForm(enrollmentForm)) {
                return;
            }

            try {
                // Collect form data
                const formData = {
                    firstName: document.getElementById('firstNameInput').value,
                    lastName: document.getElementById('lastNameInput').value,
                    email: document.getElementById('emailInput').value,
                    phone: document.getElementById('phoneInput').value,
                    institution: document.getElementById('institutionInput').value,
                    additionalInfo: document.getElementById('additionalInfoInput').value || ''
                };

                // Determine enrollment type
                const domain = document.querySelector('input[name="domain"]:checked').value;
                if (domain === 'Placement Training') {
                    formData.training = Array.from(document.querySelectorAll('input[name="training"]:checked')).map(el => el.value).join(', ');
                } else {
                    formData.courses = Array.from(document.querySelectorAll('input[name="course"]:checked')).map(el => el.value).join(', ');
                }

                // Send data using EmailJS
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData);

                // Show success modal
                const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                const confirmationDetails = document.getElementById('confirmationDetails');
                
                confirmationDetails.innerHTML = `
                    <strong>Name:</strong> ${formData.firstName} ${formData.lastName}<br>
                    <strong>Email:</strong> ${formData.email}<br>
                    <strong>Additional Info:</strong> ${formData.additionalInfo || 'N/A'}
                `;

                successModal.show();
                enrollmentForm.reset();
            } catch (error) {
                ErrorHandler.displayError('Enrollment failed. Please try again.');
            }
        });
    }
}

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApplication);