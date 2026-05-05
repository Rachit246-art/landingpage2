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

// Image Gallery Popup functionality
const imagePopup = document.getElementById('imagePopup');
const popupImage = document.getElementById('popupImage');
const imageTriggers = document.querySelectorAll('.open-image-popup img');

imageTriggers.forEach(img => {
    img.parentElement.addEventListener('click', () => {
        popupImage.src = img.src;
        imagePopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Exit Intent Popup (triggers once when mouse leaves top of viewport)
let exitPopupShown = false;
document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 0 && !exitPopupShown) {
        const exitPopup = document.getElementById('exitPopup');
        if(exitPopup) {
            exitPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
            exitPopupShown = true;
        }
    }
});

// Form submission mock
const form = document.getElementById('inquiryForm');
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
            btn.innerText = 'Request Sent Successfully!';
            btn.style.backgroundColor = '#27ae60';
            btn.style.color = 'white';
            btn.style.opacity = '1';
            
            setTimeout(() => {
                document.getElementById('inquiryPopup').classList.remove('active');
                document.body.style.overflow = 'auto';
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

// Show image popup instantly when the website is opened
window.addEventListener('load', () => {
    const mainPopup = document.getElementById('exitPopup');
    if (mainPopup) {
        // Optional slight delay to ensure page renders first, set to 0 for instant
        setTimeout(() => {
            mainPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 100); 
    }
});
