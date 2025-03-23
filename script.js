// Utility Functions Module
const Utils = {
    debounce: function(func, delay) {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    },

    validateEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    validatePhone: function(phone) {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    },

    sanitizeInput: function(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    },

    formatDate: function(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
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
        Swal.fire({
            icon: 'error',
            title: 'Submission Error',
            html: `
                <p>${message}</p>
                <small>Please try again or contact support.</small>
            `,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Try Again'
        });
    },

    logDetailedError: function(error) {
        console.group("Detailed Error Log");
        console.error("Error Message:", error.message);
        console.error("Error Stack:", error.stack);
        console.error("Full Error Object:", error);
        console.groupEnd();
    }
};
// Google Forms Handler Module
const GoogleFormsHandler = {
    FORMS_CONFIG: {
        ENROLLMENT: {
            // Replace with your actual Google Form submission URL
            URL: 'https://docs.google.com/forms/d/e/1FAIpQLSdYHn_l6N9o2E94Kjr2hgwuoX8POHEk4VH5UiZdv6fLqa0MSQ/formResponse',
            FIELDS: {
                FIRST_NAME: 'entry.1738812687',
                LAST_NAME: 'entry.441809842',
                EMAIL: 'entry.48306933',
                PHONE: 'entry.1719525943',
                INSTITUTION: 'entry.1248646777',
                TRAINING_PROGRAM: 'entry.1884316333',
                COURSE: 'entry.727454542',
                ADDITIONAL_INFO: 'entry.1804922025'
            }
        }
    },

    submitEnrollmentForm: function(formData) {
        return new Promise((resolve, reject) => {
            const payload = new FormData();

            // Map form data to Google Forms entry fields
            Object.keys(this.FORMS_CONFIG.ENROLLMENT.FIELDS).forEach(key => {
                const fieldName = this.FORMS_CONFIG.ENROLLMENT.FIELDS[key];
                const value = formData[key.toLowerCase()] || '';
                
                if (value) {
                    payload.append(fieldName, Utils.sanitizeInput(value));
                }
            });

            // Submission with fetch
            fetch(this.FORMS_CONFIG.ENROLLMENT.URL, {
                method: 'POST',
                mode: 'no-cors', // This is correct for Google Forms
                body: payload
            })
            .then(() => {
                resolve({ 
                    status: 'success', 
                    message: 'Enrollment submitted successfully' 
                });
            })
            .catch((error) => {
                ErrorHandler.logDetailedError(error);
                reject(error);
            });
        });
    }
};

// Dynamic Content Module
const DynamicContent = {
    updateCoursePrice: function() {
        const courseSelect = document.getElementById('course');
        const priceDisplay = document.getElementById('coursePriceDisplay');

        if (courseSelect && priceDisplay) {
            courseSelect.addEventListener('change', () => {
                const selectedOption = courseSelect.options[courseSelect.selectedIndex];
                priceDisplay.textContent = selectedOption.value 
                    ? `Course Price: ₹${selectedOption.dataset.price}` 
                    : '';
            });
        }
    },

    toggleEnrollmentType: function() {
        const trainingBtn = document.querySelector('.enrollment-type-btn[data-type="training"]');
        const coursesBtn = document.querySelector('.enrollment-type-btn[data-type="courses"]');
        const trainingSection = document.getElementById('trainingSection');
        const coursesSection = document.getElementById('coursesSection');

        if (trainingBtn && coursesBtn && trainingSection && coursesSection) {
            trainingBtn.addEventListener('click', () => {
                trainingBtn.classList.add('active');
                coursesBtn.classList.remove('active');
                trainingSection.style.display = 'block';
                coursesSection.style.display = 'none';
                document.getElementById('trainingProgram').setAttribute('required', 'required');
                document.getElementById('course').removeAttribute('required');
            });

            coursesBtn.addEventListener('click', () => {
                coursesBtn.classList.add('active');
                trainingBtn.classList.remove('active');
                coursesSection.style.display = 'block';
                trainingSection.style.display = 'none';
                document.getElementById('course').setAttribute('required', 'required');
                document.getElementById('trainingProgram').removeAttribute('required');
            });
        }
    }
};

// Analytics Tracking Module
const AnalyticsTracker = {
    trackPageView: function() {
        console.log('Page viewed:', window.location.pathname);
        // Integrate with your preferred analytics service
    },

    trackEvent: function(eventName, eventData) {
        console.log('Event tracked:', eventName, eventData);
        // Integrate with your preferred analytics service
    }
};

// Smooth Scroll Module
const SmoothScroll = {
    init: function() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// Main Initialization Function
function initializeApplication() {
    // Initialize modules
    SmoothScroll.init();
    AnalyticsTracker.trackPageView();

    // Enrollment Form Handling
    const enrollmentForm = document.getElementById('enrollmentForm');
    if (enrollmentForm) {
        // Dynamic content setup
        DynamicContent.updateCoursePrice();
        DynamicContent.toggleEnrollmentType();

        enrollmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!FormValidator.validateForm(enrollmentForm)) {
                return;
            }

            try {
                // Collect form data
                const formData = {
                    firstName: document.getElementById('firstName').value,
                    lastName: document.getElementById('lastName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    institution: document.getElementById('institution').value,
                    additionalInfo: document.getElementById('additionalInfo').value || ''
                };

                // Determine enrollment type
                const isTrainingSelected = document.querySelector('.enrollment-type-btn[data-type="training"]').classList.contains('active');
                
                if (isTrainingSelected) {
                    formData.trainingProgram = document.getElementById('trainingProgram').value;
                } else {
                    formData.course = document.getElementById('course').value;
                }

                // Submit enrollment form
                await GoogleFormsHandler.submitEnrollmentForm(formData);

                // Show success modal
                const successModal = new bootstrap.Modal(document.getElementById('successModal'));
                const confirmationDetails = document.getElementById('confirmationDetails');
                
                confirmationDetails.innerHTML = `
                    Name: ${formData.firstName} ${formData.lastName}<br>
                    Email: ${formData.email}
                `;

                successModal.show();
                enrollmentForm.reset();

                // Track enrollment event
                AnalyticsTracker.trackEvent('enrollment', formData);
            } catch (error) {
                ErrorHandler.logDetailedError(error);
                ErrorHandler.displayError('Enrollment failed. Please try again.');
            }
        });
    }
}

// Global error handling
window.addEventListener('error', (event) => {
    ErrorHandler.logDetailedError(event.error);
});

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApplication);

// Export modules for potential external use
export {
    Utils,
    FormValidator,
    ErrorHandler,
    GoogleFormsHandler,
    DynamicContent,
    AnalyticsTracker,
    SmoothScroll
};