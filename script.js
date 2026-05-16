// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
const contactForm = document.getElementById('contact-form');
const currentYearSpan = document.getElementById('year');

// Set current year in footer
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        mobileNav.classList.add('open');
        // Change icon to X using Lucide
        menuToggle.innerHTML = '<i data-lucide="x"></i>';
    } else {
        mobileNav.classList.remove('open');
        // Change icon to Menu using Lucide
        menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    }
    lucide.createIcons();
}

menuToggle.addEventListener('click', toggleMenu);

// Close mobile menu when clicking a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});

// Form Submission Simulation
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submit-btn');
        const submitText = document.getElementById('submit-text');
        
        // Simulating the form submit process
        submitBtn.classList.add('success');
        submitBtn.innerHTML = '<i data-lucide="check" style="margin-right:8px;"></i> <span>Sent Successfully!</span>';
        lucide.createIcons();
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.classList.remove('success');
            submitBtn.innerHTML = '<i data-lucide="send" style="margin-right:8px;"></i> <span>Send Message</span>';
            lucide.createIcons();
        }, 3000);
    });
}

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            element.classList.add('active');
        }
    });
}

// Initial check
checkReveal();

// Check on scroll
window.addEventListener('scroll', checkReveal);
