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

// Certificate Carousel
const carouselTrack = document.getElementById('carousel-track');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const dotsContainer = document.getElementById('carousel-dots');

if (carouselTrack) {
    const cards = carouselTrack.querySelectorAll('.carousel-card');
    const totalSlides = cards.length;
    let currentIndex = 0;
    let autoPlayInterval;

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function goToSlide(index) {
        currentIndex = index;
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() {
        goToSlide((currentIndex + 1) % totalSlides);
    }

    function prevSlide() {
        goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    let startX = 0;
    let isDragging = false;

    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
            resetAutoPlay();
        }
        isDragging = false;
    }, { passive: true });

    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 10000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    startAutoPlay();

    // Pause on hover
    const wrapper = document.querySelector('.carousel-wrapper');
    wrapper.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    wrapper.addEventListener('mouseleave', startAutoPlay);
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
