document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Function to handle navbar style
        const handleNavbarStyle = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.classList.remove('navbar-dark');
                navbar.classList.add('navbar-light');
            } else {
                // Only make it dark if it's on a hero section
                if (document.querySelector('.hero-section') || document.querySelector('.hero-subpage')) {
                   navbar.classList.remove('scrolled');
                   navbar.classList.add('navbar-dark');
                   navbar.classList.remove('navbar-light');
                } else {
                    // For pages without a hero, keep it light
                    navbar.classList.add('scrolled', 'navbar-light');
                    navbar.classList.remove('navbar-dark');
                }
            }
        };

        // Initial check on page load
        handleNavbarStyle();
        // Add event listener for scroll
        window.addEventListener('scroll', handleNavbarStyle);
    }
    
    // --- Firebase SDKs Configuration ---
    // IMPORTANT: Storing keys here is insecure for production. Use environment variables and server-side logic.
    const firebaseConfig = {
        apiKey: "AIzaSyByyvBBlzSary6QoHgPX0AcQCVyLXYuoKk",
        authDomain: "successmeetsacademydata.firebaseapp.com",
        projectId: "successmeetsacademydata",
        storageBucket: "successmeetsacademydata.appspot.com",
        messagingSenderId: "444995824282",
        appId: "1:444995824282:web:07953b8989c4ab5b1c0d23"
    };

    // Initialize Firebase if not already initialized
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const db = firebase.firestore();

    // Contact Form Handler (Homepage)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            submitButton.disabled = true;

            try {
                await db.collection('contacts').add({
                    name: contactForm.querySelector('#name').value,
                    email: contactForm.querySelector('#email').value,
                    message: contactForm.querySelector('#message').value,
                    submittedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                alert('Message sent successfully!');
                contactForm.reset();
            } catch (error) {
                console.error("Error adding contact document: ", error);
                alert('Failed to send message.');
            } finally {
                submitButton.innerHTML = 'Send Message';
                submitButton.disabled = false;
            }
        });
    }

    // Newsletter Form Handler (Homepage)
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('#newsletterEmail');
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
            submitButton.disabled = true;

            try {
                await db.collection('newsletterSubscriptions').add({
                    email: emailInput.value,
                    pageSource: "Homepage",
                    subscribedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                alert('Successfully subscribed!');
                newsletterForm.reset();
            } catch (error) {
                console.error("Error subscribing: ", error);
                alert('Failed to subscribe.');
            } finally {
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i>';
                submitButton.disabled = false;
            }
        });
    }

    // Enrollment Form Handler
    const enrollmentForm = document.getElementById('enrollmentForm');
    if (enrollmentForm) {
        const submitButton = document.getElementById('submitButton');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonSpinner = submitButton.querySelector('.spinner-border');
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        
        // Conditional logic for course selection
        const courseOptionsDiv = document.getElementById('courseOptions');
        const courseSelect = document.getElementById('courseSelect');
        document.querySelectorAll('input[name="programType"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                const isSpecialized = (e.target.id === 'specializedCourse');
                courseOptionsDiv.style.display = isSpecialized ? 'block' : 'none';
                courseSelect.required = isSpecialized;
            });
        });

        enrollmentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!enrollmentForm.checkValidity()) {
                e.stopPropagation();
                enrollmentForm.classList.add('was-validated');
                return;
            }

            buttonText.textContent = 'Submitting...';
            buttonSpinner.classList.remove('d-none');
            submitButton.disabled = true;

            const programType = enrollmentForm.querySelector('input[name="programType"]:checked').value;
            const enrollmentData = {
                firstName: enrollmentForm.querySelector('#firstName').value,
                lastName: enrollmentForm.querySelector('#lastName').value,
                email: enrollmentForm.querySelector('#email').value,
                phone: enrollmentForm.querySelector('#phone').value,
                programType: programType,
                course: (programType === 'Specialized Course') ? courseSelect.value : 'N/A',
                additionalInfo: enrollmentForm.querySelector('#additionalInfo').value || 'None',
                termsAgreed: enrollmentForm.querySelector('#terms').checked,
                submittedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            try {
                await db.collection('enrollments').add(enrollmentData);
                successModal.show();
                enrollmentForm.reset();
                enrollmentForm.classList.remove('was-validated');
                courseOptionsDiv.style.display = 'none';
            } catch (error) {
                console.error("Error submitting enrollment: ", error);
                alert('There was an error submitting your enrollment. Please try again.');
            } finally {
                buttonText.textContent = 'Submit My Enrollment';
                buttonSpinner.classList.add('d-none');
                submitButton.disabled = false;
            }
        });
    }
});