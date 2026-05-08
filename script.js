// Scroll to change navbar background
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const animationElements = document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animationElements.forEach(el => {
    observer.observe(el);
});

// Generalized Popup functionality
const openBtns = document.querySelectorAll('.open-popup');
const closeBtns = document.querySelectorAll('.close-popup');
const popups = document.querySelectorAll('.popup-overlay');

// Open specific popup based on data-popup attribute
openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const popupId = btn.getAttribute('data-popup');
        if (popupId) {
            const popup = document.getElementById(popupId);
            if (popup) {
                popup.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        }
    });
});

// Close functionality
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        popups.forEach(p => p.classList.remove('active'));
        document.body.style.overflow = 'auto';
    });
});

// Close on outside click
popups.forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"], .scroll-to').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href') || this.getAttribute('data-target');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Form submission logic (Mock)
const handleFormSubmit = (formId, successMsg) => {
    const form = document.getElementById(formId);
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Processing...';
            btn.style.opacity = '0.7';
            btn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                btn.innerText = successMsg || 'Submitted Successfully!';
                btn.style.backgroundColor = '#27ae60';
                btn.style.color = 'white';
                btn.style.opacity = '1';
                
                setTimeout(() => {
                    // If it's a popup, close it
                    const parentPopup = form.closest('.popup-overlay');
                    if (parentPopup) {
                        parentPopup.classList.remove('active');
                        document.body.style.overflow = 'auto';
                    }
                    
                    form.reset();
                    
                    // Reset button
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                        btn.disabled = false;
                    }, 500);
                }, 2000);
            }, 1500);
        });
    }
};

handleFormSubmit('heroLeadForm', 'Slot Reserved Successfully!');
handleFormSubmit('popupInquiryForm', 'Slot Reserved Successfully!');
handleFormSubmit('itineraryDownloadForm', 'PDF Download Started!');

// Hero Background Slider
const slides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

if (slides.length > 1) {
    setInterval(nextSlide, 5000); // Change image every 5 seconds
}

// Mobile Menu Toggle (Simplified)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Scroll Spy - highlight active nav link based on current section
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function updateActiveNavLink() {
    const scrollPos = window.scrollY + 150; // offset for navbar height

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            allNavLinks.forEach(link => {
                link.classList.remove('current');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('current');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Testimonial Slider Logic
const testimonialSlider = document.getElementById('testimonialSlider');
const prevTestimonial = document.getElementById('prevTestimonial');
const nextTestimonial = document.getElementById('nextTestimonial');

if (testimonialSlider && prevTestimonial && nextTestimonial) {
    const scrollStep = 350; // Amount to scroll
    
    const scrollSlider = (direction) => {
        const maxScroll = testimonialSlider.scrollWidth - testimonialSlider.clientWidth;
        const currentScroll = testimonialSlider.scrollLeft;
        
        if (direction === 'next') {
            if (currentScroll >= maxScroll - 10) {
                testimonialSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                testimonialSlider.scrollBy({ left: scrollStep, behavior: 'smooth' });
            }
        } else {
            if (currentScroll <= 10) {
                testimonialSlider.scrollTo({ left: maxScroll, behavior: 'smooth' });
            } else {
                testimonialSlider.scrollBy({ left: -scrollStep, behavior: 'smooth' });
            }
        }
    };

    nextTestimonial.addEventListener('click', () => {
        scrollSlider('next');
        resetAutoSlide();
    });

    prevTestimonial.addEventListener('click', () => {
        scrollSlider('prev');
        resetAutoSlide();
    });

    let autoSlideTimer = setInterval(() => scrollSlider('next'), 5000);

    const resetAutoSlide = () => {
        clearInterval(autoSlideTimer);
        autoSlideTimer = setInterval(() => scrollSlider('next'), 5000);
    };

    // Pause on hover
    testimonialSlider.addEventListener('mouseenter', () => clearInterval(autoSlideTimer));
    testimonialSlider.addEventListener('mouseleave', () => resetAutoSlide());
}

// Scroll Triggered Popup Logic
const destinationsSection = document.getElementById('destinations');
const scrollPopup = document.getElementById('scrollInquiryPopup');

if (destinationsSection && scrollPopup) {
    let popupShown = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Trigger when section is 20% visible
            if (entry.isIntersecting && !popupShown) {
                setTimeout(() => {
                    scrollPopup.classList.add('active');
                    popupShown = true;
                    // Stop observing after showing once
                    observer.unobserve(destinationsSection);
                }, 500); // Slight delay for better UX
            }
        });
    }, { threshold: 0.2 });

    observer.observe(destinationsSection);
}

