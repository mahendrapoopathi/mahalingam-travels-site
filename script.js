// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Language toggle functionality
function toggleLanguage() {
    // This is a placeholder for language switching functionality
    // You can implement actual translation logic here
    alert('Language switching functionality can be implemented here');
}

// Booking form functionality
function openBookingForm() {
    document.getElementById('booking-modal').style.display = 'block';
}

function closeBookingForm() {
    document.getElementById('booking-modal').style.display = 'none';
}

// Book specific vehicle
function bookVehicle(vehicleType) {
    document.getElementById('vehicle-preference').value = vehicleType;
    openBookingForm();
}

// Book specific package
function bookPackage(packageName) {
    // Pre-fill form with package details
    const packageDetails = {
        'Chennai to Ooty': {
            pickup: 'Chennai',
            destination: 'Ooty',
            vehicle: 'Maxi Cab'
        },
        'Madurai to Kodaikanal': {
            pickup: 'Madurai',
            destination: 'Kodaikanal',
            vehicle: 'Mahindra Van'
        },
        'Rameswaram to Kanyakumari': {
            pickup: 'Rameswaram',
            destination: 'Kanyakumari',
            vehicle: 'Innova Car'
        }
    };
    
    const details = packageDetails[packageName];
    if (details) {
        document.getElementById('pickup-location').value = details.pickup;
        document.getElementById('destination').value = details.destination;
        document.getElementById('vehicle-preference').value = details.vehicle;
    }
    
    openBookingForm();
}

// Fare calculator
function calculateFare() {
    const distance = document.getElementById('distance').value;
    const vehicleType = document.getElementById('vehicle-type').value;
    
    if (!distance || distance <= 0) {
        alert('Please enter a valid distance');
        return;
    }
    
    const rates = {
        '8': 12,   // Mahindra Van
        '7': 15,   // Innova Car
        '30': 22,  // Coach Bus
        '45': 28   // Luxury Coach
    };
    
    const rate = rates[vehicleType];
    const totalFare = distance * rate;
    
    const resultDiv = document.getElementById('fare-result');
    resultDiv.innerHTML = `
        <h3>Estimated Fare: ₹${totalFare}</h3>
        <p>Distance: ${distance} KM × ₹${rate}/KM</p>
        <p><small>*This is an approximate fare. Final price may vary based on actual route and additional services.</small></p>
    `;
    resultDiv.style.display = 'block';
}

// Real-time booking preview
function updateBookingPreview() {
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const pickup = document.getElementById('pickup-location').value;
    const destination = document.getElementById('destination').value;
    const travelDate = document.getElementById('travel-date').value;
    const vehicle = document.getElementById('vehicle-preference').value;
    const passengers = document.getElementById('passenger-count').value;
    
    const preview = document.getElementById('booking-preview');
    
    if (name || phone || pickup || destination) {
        let previewText = '';
        if (name) previewText += `👤 ${name}<br>`;
        if (phone) previewText += `📱 ${phone}<br>`;
        if (pickup && destination) previewText += `🚗 ${pickup} → ${destination}<br>`;
        if (travelDate) previewText += `📅 ${new Date(travelDate).toLocaleDateString()}<br>`;
        if (vehicle && passengers) previewText += `🚐 ${vehicle} (${passengers} passengers)<br>`;
        
        preview.innerHTML = previewText || 'Fill the form to see booking details';
    } else {
        preview.innerHTML = 'Fill the form to see booking details';
    }
}

// Add event listeners for real-time preview
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = ['customer-name', 'customer-phone', 'pickup-location', 'destination', 'travel-date', 'vehicle-preference', 'passenger-count'];
    
    formInputs.forEach(inputId => {
        const element = document.getElementById(inputId);
        if (element) {
            element.addEventListener('input', updateBookingPreview);
            element.addEventListener('change', updateBookingPreview);
        }
    });
});

// Enhanced booking form submission
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('customer-name').value,
        phone: document.getElementById('customer-phone').value,
        email: document.getElementById('customer-email').value,
        pickup: document.getElementById('pickup-location').value,
        destination: document.getElementById('destination').value,
        travelDate: document.getElementById('travel-date').value,
        returnDate: document.getElementById('return-date').value,
        vehicle: document.getElementById('vehicle-preference').value,
        passengers: document.getElementById('passenger-count').value,
        tripType: document.getElementById('trip-type').value,
        requirements: document.getElementById('special-requirements').value
    };
    
    // Generate unique booking ID
    const bookingId = 'MT' + Date.now().toString().slice(-6);
    
    // Create comprehensive WhatsApp message
    const message = `🚐 *MAHALINGAM TRAVELS - BOOKING REQUEST*

📋 *Booking ID:* ${bookingId}
👤 *Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
${formData.email ? `Email: ${formData.email}` : ''}

🗺️ *Trip Details:*
From: ${formData.pickup}
To: ${formData.destination}
Travel Date: ${new Date(formData.travelDate).toLocaleDateString()}
${formData.returnDate ? `Return Date: ${new Date(formData.returnDate).toLocaleDateString()}` : 'One-way trip'}

🚗 *Vehicle & Passengers:*
Vehicle: ${formData.vehicle}
Passengers: ${formData.passengers}
Trip Type: ${formData.tripType}

${formData.requirements ? `📝 *Special Requirements:*\n${formData.requirements}` : ''}

Please confirm availability and share fare details. Thank you!`;
    
    const whatsappURL = `https://wa.me/919865782932?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
    
    // Show success message
    alert(`✅ Booking request sent!\n\nBooking ID: ${bookingId}\n\nWe'll contact you on ${formData.phone} shortly.`);
    
    closeBookingForm();
});

// Gallery functionality
function showGallery(type, clickedButton) {
    // Hide all gallery contents
    document.querySelectorAll('.gallery-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected gallery
    const targetGallery = document.getElementById(`${type}-gallery`);
    if (targetGallery) {
        targetGallery.classList.add('active');
    }
    
    // Add active class to clicked tab
    if (clickedButton) {
        clickedButton.classList.add('active');
    } else if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Enhanced Media Lightbox functionality
function openMedia(src, type) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    
    lightbox.style.display = 'block';
    
    if (type === 'video') {
        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'block';
        lightboxVideo.src = src;
        lightboxVideo.load(); // Reload the video element
    } else {
        lightboxVideo.style.display = 'none';
        lightboxImg.style.display = 'block';
        lightboxImg.src = src;
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');
    
    lightbox.style.display = 'none';
    
    // Pause video when closing lightbox
    if (lightboxVideo.style.display === 'block') {
        lightboxVideo.pause();
        lightboxVideo.currentTime = 0;
    }
}

// Legacy function for backward compatibility
function openLightbox(src) {
    openMedia(src, 'image');
}

// Enhanced FAQ functionality with better visibility
function toggleFAQ(element) {
    console.log('FAQ clicked!'); // Debug log
    
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items first
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const icon = item.querySelector('.faq-question i');
        if (icon) {
            icon.style.transform = 'rotate(0deg)';
        }
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
        const chevronIcon = element.querySelector('i');
        if (chevronIcon) {
            chevronIcon.style.transform = 'rotate(180deg)';
        }
        
        // Force visibility for debugging
        const answer = faqItem.querySelector('.faq-answer');
        if (answer) {
            answer.style.display = 'block';
            answer.style.maxHeight = '600px';
            answer.style.opacity = '1';
            answer.style.padding = '2rem 1.5rem';
        }
        
        console.log('FAQ opened!'); // Debug log
    }
}

// Initialize FAQ system
document.addEventListener('DOMContentLoaded', function() {
    console.log('FAQ system initialized'); // Debug log
    
    // Ensure all FAQ answers are properly hidden initially
    document.querySelectorAll('.faq-answer').forEach(answer => {
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.padding = '0 1.5rem';
    });
    
    // Add click handlers to FAQ questions
    document.querySelectorAll('.faq-question').forEach(question => {
        question.style.cursor = 'pointer';
        question.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleFAQ(this);
        });
    });
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const bookingModal = document.getElementById('booking-modal');
    const lightbox = document.getElementById('lightbox');
    
    if (event.target === bookingModal) {
        closeBookingForm();
    }
    
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Set minimum date for booking form
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('travel-date').setAttribute('min', today);
    document.getElementById('return-date').setAttribute('min', today);
    
    // Update return date minimum when travel date changes
    document.getElementById('travel-date').addEventListener('change', function() {
        document.getElementById('return-date').setAttribute('min', this.value);
    });
});

// Initialize Google Maps (placeholder)
function initMap() {
    // This is a placeholder for Google Maps initialization
    // You'll need to add your Google Maps API key and implement the map
    console.log('Google Maps would be initialized here with your API key');
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.vehicle-card, .package-card, .safety-item, .testimonial-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Validate phone number
function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

// Form validation
document.getElementById('customer-phone').addEventListener('blur', function() {
    const phone = this.value.replace(/\D/g, '');
    if (phone && !validatePhone(phone)) {
        this.setCustomValidity('Please enter a valid 10-digit Indian mobile number');
    } else {
        this.setCustomValidity('');
    }
});

// Auto-format phone number
document.getElementById('customer-phone').addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    this.value = value;
});

// Toggle Features functionality
function toggleFeatures() {
    const featuresSection = document.getElementById('features-section');
    const button = event.target.closest('.cta-button.secondary');
    
    if (featuresSection.classList.contains('active')) {
        featuresSection.classList.remove('active');
        button.innerHTML = '<i class="fas fa-star"></i> Our Features';
    } else {
        featuresSection.classList.add('active');
        button.innerHTML = '<i class="fas fa-times"></i> Hide Features';
        
        // Smooth scroll to features
        setTimeout(() => {
            featuresSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 200);
    }
}

// Scroll indicator functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.getElementById('fleet').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

// Hero animations on scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        // Parallax effect
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        
        // Fade out hero content on scroll
        const opacity = Math.max(0, 1 - scrolled / (window.innerHeight * 0.8));
        heroContent.style.opacity = opacity;
    }
});