// JavaScript for Ian Kariuki's Portfolio Website
// This file contains all the interactive functionality

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing interactive features');
    
    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            const icon = menuToggle.querySelector('i');
            
            if (navMenu.classList.contains('show')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // ===== THEME TOGGLE FUNCTIONALITY =====
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference or respect OS preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Set initial theme
        if (savedTheme) {
            document.body.setAttribute('data-theme', savedTheme);
            updateThemeIcon(savedTheme);
        } else {
            const currentTheme = prefersDarkScheme.matches ? 'dark' : 'light';
            document.body.setAttribute('data-theme', currentTheme);
            updateThemeIcon(currentTheme);
        }
        
        // Toggle theme on button click
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
        
        function updateThemeIcon(theme) {
            const themeIcon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
        }
    }
    
    // ===== FAQ ACCORDION FUNCTIONALITY =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('h3');
            
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }
    
    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => {
                msg.style.display = 'none';
            });
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                document.getElementById('nameError').textContent = 'Please enter your name';
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                document.getElementById('emailError').textContent = 'Please enter your email address';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            
            // Validate subject
            if (subject === '') {
                document.getElementById('subjectError').textContent = 'Please enter a subject';
                document.getElementById('subjectError').style.display = 'block';
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                document.getElementById('messageError').textContent = 'Please enter your message';
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            }
            
            // If form is valid, simulate submission
            if (isValid) {
                // In a real application, you would send the form data to a server here
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }
        });
        
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    }
    
    // ===== SMOOTH SCROLLING FOR INTERNAL LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Only handle internal links on the same page
            if (this.getAttribute('href').startsWith('#') && 
                window.location.pathname === this.pathname) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== UPDATE COPYRIGHT YEAR =====
    const yearElement = document.querySelector('footer .footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2025', currentYear);
    }
    
    console.log('All JavaScript functionality initialized successfully');
});