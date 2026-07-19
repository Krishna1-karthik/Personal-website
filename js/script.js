/* ============================================
   MAIN JAVASCRIPT - Navigation & Form Handling
   ============================================ */

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }

    // Smooth scroll and active link highlighting
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Highlight active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form
            if (!validateForm()) {
                return;
            }

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };

            // Store in localStorage for demonstration
            try {
                let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
                submissions.push(formData);
                localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

                // Show success message
                showFormMessage('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
                clearErrorMessages();
            } catch (error) {
                showFormMessage('Error sending message. Please try again.', 'error');
            }
        });
    }

    // Form Validation
    function validateForm() {
        clearErrorMessages();
        let isValid = true;

        // Validate Name
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            showErrorMessage('nameError', 'Please enter your name');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            showErrorMessage('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }

        // Validate Email
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim()) {
            showErrorMessage('emailError', 'Please enter your email');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showErrorMessage('emailError', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate Subject
        const subjectInput = document.getElementById('subject');
        if (!subjectInput.value.trim()) {
            showErrorMessage('subjectError', 'Please enter a subject');
            isValid = false;
        } else if (subjectInput.value.trim().length < 5) {
            showErrorMessage('subjectError', 'Subject must be at least 5 characters');
            isValid = false;
        }

        // Validate Message
        const messageInput = document.getElementById('message');
        if (!messageInput.value.trim()) {
            showErrorMessage('messageError', 'Please enter your message');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showErrorMessage('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }

        return isValid;
    }

    function showErrorMessage(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    function clearErrorMessages() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.classList.remove('show');
        });
    }

    function showFormMessage(message, type) {
        const messageElement = document.getElementById('formMessage');
        if (messageElement) {
            messageElement.textContent = message;
            messageElement.className = `form-message ${type}`;

            // Auto-hide after 5 seconds
            setTimeout(() => {
                messageElement.className = 'form-message';
            }, 5000);
        }
    }
});

// Intersection Observer for animations
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.portfolio-card, .blog-card, .skill-category').forEach(el => {
        observer.observe(el);
    });
}
