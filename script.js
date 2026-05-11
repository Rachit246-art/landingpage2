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

// --- Chatbot Logic ---
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const closeChat = document.getElementById('closeChat');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInputArea = document.getElementById('chatbotInputArea');

if (chatbotToggle && chatbotContainer && closeChat) {
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            // Only initialize if it's the first time
            if (chatbotMessages.children.length === 0) {
                startChat();
            }
        }
    });

    closeChat.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });
}

const chatData = {
    userData: {},
    currentStep: 'welcome'
};

function addMessage(text, type = 'bot') {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type === 'bot' ? 'bot-message' : 'user-message');
    messageDiv.innerHTML = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function clearInputArea() {
    chatbotInputArea.innerHTML = '';
}

function addButton(text, value, nextStep) {
    const btn = document.createElement('button');
    btn.classList.add('chat-btn');
    btn.innerText = text;
    btn.onclick = () => handleChoice(text, value, nextStep);
    chatbotInputArea.appendChild(btn);
}

function handleChoice(text, value, nextStep) {
    addMessage(text, 'user');
    chatData.userData[chatData.currentStep] = value;
    chatData.currentStep = nextStep;
    clearInputArea();
    
    // Small delay for natural feel
    setTimeout(() => {
        renderStep(nextStep);
    }, 500);
}

function startChat() {
    renderStep('welcome');
}

function renderStep(step) {
    clearInputArea();
    switch (step) {
        case 'welcome':
            addMessage("Welcome to RV Global Aviation. We specialize in premium private jet, helicopter, and international charter services for business leaders, VIP travelers, leisure trips, and urgent aviation requirements.");
            addMessage("How may we assist you today?");
            addButton("Domestic Charter", "Domestic Charter", "charter_type");
            addButton("International Charter", "International Charter", "charter_type");
            addButton("Helicopter Charter", "Helicopter Charter", "charter_type");
            addButton("Corporate Travel", "Corporate Travel", "charter_type");
            addButton("Pilgrimage Charter", "Pilgrimage Charter", "charter_type");
            addButton("Emergency Charter", "Emergency Charter", "charter_type");
            addButton("Speak to Aviation Expert", "Speak to Aviation Expert", "charter_type");
            break;

        case 'charter_type':
            addMessage("Please select your travel requirement.");
            addButton("One Way", "One Way", "departure");
            addButton("Round Trip", "Round Trip", "departure");
            addButton("Multi-City", "Multi-City", "departure");
            addButton("Same Day Return", "Same Day Return", "departure");
            addButton("Urgent Departure", "Urgent Departure", "departure");
            break;

        case 'departure':
            addMessage("Please enter your departure city or airport.");
            createTextInput("Enter departure city", "destination");
            break;

        case 'destination':
            addMessage("Please enter your destination city or airport.");
            createTextInput("Enter destination city", "travel_date");
            break;

        case 'travel_date':
            addMessage("When would you like to fly?");
            createDateInput("travel_time");
            break;

        case 'travel_time':
            addMessage("Please select your preferred departure timing.");
            addButton("Early Morning", "Early Morning", "passengers");
            addButton("Morning", "Morning", "passengers");
            addButton("Afternoon", "Afternoon", "passengers");
            addButton("Evening", "Evening", "passengers");
            addButton("Flexible Timing", "Flexible Timing", "passengers");
            break;

        case 'passengers':
            addMessage("How many passengers will be traveling?");
            addButton("1-3 Passengers", "1-3", "purpose");
            addButton("4-6 Passengers", "4-6", "purpose");
            addButton("7-10 Passengers", "7-10", "purpose");
            addButton("10+ Passengers", "10+", "purpose");
            break;

        case 'purpose':
            addMessage("Please select the purpose of your charter.");
            addButton("Business Travel", "Business", "aircraft");
            addButton("Leisure / Family", "Leisure", "aircraft");
            addButton("Religious Trip", "Religious", "aircraft");
            addButton("Wedding / Event", "Wedding", "aircraft");
            addButton("Medical Emergency", "Medical", "aircraft");
            addButton("VIP Movement", "VIP", "aircraft");
            addButton("Corporate Team Travel", "Team", "aircraft");
            break;

        case 'aircraft':
            addMessage("Do you have a preferred aircraft category?");
            addButton("Light Jet", "Light Jet", "services");
            addButton("Mid-Size Jet", "Mid-Size", "services");
            addButton("Heavy Jet", "Heavy Jet", "services");
            addButton("Turbo Prop", "Turbo Prop", "services");
            addButton("Helicopter", "Helicopter", "services");
            addButton("Suggest Best Option", "Suggest", "services");
            break;

        case 'services':
            addMessage("Would you require any additional premium services?");
            addButton("Luxury Ground Transfer", "Ground", "experience");
            addButton("In-Flight Catering", "Catering", "experience");
            addButton("Hotel Assistance", "Hotel", "experience");
            addButton("Visa Assistance", "Visa", "experience");
            addButton("Concierge Services", "Concierge", "experience");
            addButton("Fast Track Airport Assistance", "Airport", "experience");
            addButton("No Additional Services", "None", "experience");
            break;

        case 'experience':
            addMessage("Please select your preferred charter experience.");
            addButton("Most Efficient Option", "Efficient", "lead_capture");
            addButton("Premium Comfort", "Comfort", "lead_capture");
            addButton("Ultra Luxury Experience", "Luxury", "lead_capture");
            break;

        case 'lead_capture':
            addMessage("Please share your details so our aviation specialist can prepare aircraft availability and charter quotations.");
            createLeadForm();
            break;

        case 'final':
            addMessage("Thank you for choosing RV Global Aviation.");
            addMessage("Your charter request has been successfully submitted. Our aviation specialist will contact you shortly with suitable aircraft options, availability, and estimated charter pricing.");
            addMessage("For urgent departures, our team prioritizes immediate assistance.");
            break;
    }
}

function createTextInput(placeholder, nextStep) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.classList.add('chat-input');
    
    const sendBtn = document.createElement('button');
    sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
    sendBtn.classList.add('chat-send-btn');
    
    sendBtn.onclick = () => {
        if (input.value.trim()) {
            handleChoice(input.value, input.value, nextStep);
        }
    };

    input.onkeypress = (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            handleChoice(input.value, input.value, nextStep);
        }
    };

    chatbotInputArea.appendChild(input);
    chatbotInputArea.appendChild(sendBtn);
}

function createDateInput(nextStep) {
    const input = document.createElement('input');
    input.type = 'date';
    input.classList.add('chat-input');
    
    const sendBtn = document.createElement('button');
    sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
    sendBtn.classList.add('chat-send-btn');
    
    sendBtn.onclick = () => {
        if (input.value) {
            handleChoice(input.value, input.value, nextStep);
        }
    };

    chatbotInputArea.appendChild(input);
    chatbotInputArea.appendChild(sendBtn);
}

function createLeadForm() {
    const form = document.createElement('div');
    form.style.width = '100%';
    form.style.display = 'flex';
    form.style.flexDirection = 'column';
    form.style.gap = '10px';

    const fields = [
        { id: 'name', type: 'text', placeholder: 'Full Name' },
        { id: 'phone', type: 'tel', placeholder: 'Mobile Number' },
        { id: 'email', type: 'email', placeholder: 'Email Address' },
        { id: 'company', type: 'text', placeholder: 'Company Name (Optional)' }
    ];

    fields.forEach(f => {
        const input = document.createElement('input');
        input.type = f.type;
        input.placeholder = f.placeholder;
        input.id = 'chat-' + f.id;
        input.classList.add('chat-input');
        form.appendChild(input);
    });

    const submitBtn = document.createElement('button');
    submitBtn.innerText = 'Get Charter Quote';
    submitBtn.classList.add('btn-primary');
    submitBtn.style.width = '100%';
    submitBtn.style.marginTop = '10px';
    
    submitBtn.onclick = () => {
        const nameInput = document.getElementById('chat-name');
        const phoneInput = document.getElementById('chat-phone');
        const emailInput = document.getElementById('chat-email');
        const companyInput = document.getElementById('chat-company');
        
        if (nameInput.value && phoneInput.value && emailInput.value) {
            chatData.userData.contact = {
                name: nameInput.value,
                phone: phoneInput.value,
                email: emailInput.value,
                company: companyInput.value
            };
            addMessage("Details submitted: " + nameInput.value, 'user');
            clearInputArea();
            setTimeout(() => {
                renderStep('final');
            }, 500);
        } else {
            alert("Please fill in all required fields.");
        }
    };

    chatbotInputArea.appendChild(form);
    chatbotInputArea.appendChild(submitBtn);
}
