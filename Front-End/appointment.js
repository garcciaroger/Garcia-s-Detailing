document.addEventListener('DOMContentLoaded', function() {
    // Initialize date picker
    if (flatpickr) {
        flatpickr("#appointmentDate", {
            enableTime: false,
            dateFormat: "Y-m-d",
            minDate: "today",
            disable: [
                function(date) {
                    // Disable Sundays
                    return date.getDay() === 0;
                }
            ],
            locale: {
                firstDayOfWeek: 1 // Monday
            }
        });
    }
    
    // Service prices
    const servicePrices = {
        'basic-wash': 49.99,
        'interior-detail': 129.99,
        'exterior-detail': 149.99,
        'full-detail': 249.99,
        'ceramic-coating': 599.99,
        'paint-correction': 349.99
    };
    
    // Addon prices
    const addonPrices = {
        'engine-detail': 49.99,
        'headlight-restoration': 39.99,
        'odor-elimination': 29.99,
        'leather-treatment': 59.99
    };
    
    // Update booking summary when form changes
    const serviceSelect = document.getElementById('service');
    const addons = document.querySelectorAll('input[name="addons"]');
    const promoCodeInput = document.getElementById('promoCode');
    
    // Form elements
    const serviceSummary = document.getElementById('serviceSummary');
    const addonsSummary = document.getElementById('addonsSummary');
    const totalPrice = document.getElementById('totalPrice');
    
    // Update summary on service selection
    if (serviceSelect) {
        serviceSelect.addEventListener('change', updateBookingSummary);
    }
    
    // Update summary on addon selection
    addons.forEach(addon => {
        addon.addEventListener('change', updateBookingSummary);
    });
    
    // Update summary on promo code entry
    if (promoCodeInput) {
        promoCodeInput.addEventListener('input', updateBookingSummary);
    }
    
    // Function to update booking summary
    function updateBookingSummary() {
        let total = 0;
        let serviceText = '-';
        let addonsText = '-';
        
        // Calculate service price
        if (serviceSelect.value) {
            const servicePrice = servicePrices[serviceSelect.value];
            total += servicePrice;
            
            const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
            serviceText = `${serviceName}`;
        }
        
        // Calculate addons price
        let selectedAddons = [];
        addons.forEach(addon => {
            if (addon.checked) {
                const addonPrice = addonPrices[addon.value];
                total += addonPrice;
                selectedAddons.push(addon.nextElementSibling.textContent);
            }
        });
        
        if (selectedAddons.length > 0) {
            addonsText = selectedAddons.join(', ');
        }
        
        // Apply promo code if valid
        if (promoCodeInput.value.toUpperCase() === 'FIRSTDETAIL') {
            // 10% discount
            const discount = total * 0.1;
            total -= discount;
            
            // Show applied discount
            document.querySelector('.booking-summary').classList.add('discount-applied');
        } else {
            document.querySelector('.booking-summary').classList.remove('discount-applied');
        }
        
        // Update the summary
        serviceSummary.querySelector('.value').textContent = serviceText;
        addonsSummary.querySelector('.value').textContent = addonsText;
        totalPrice.querySelector('.value').textContent = `$${total.toFixed(2)}`;
    }
    
    // Form validation and submission
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Here you would normally submit the form or send data via AJAX
                // For demo purposes, show success message
                showSuccessMessage();
            }
        });
    }
    
    function validateForm() {
        // Basic validation
        const requiredFields = bookingForm.querySelectorAll('[required]');
        let valid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('invalid');
                valid = false;
            } else {
                field.classList.remove('invalid');
            }
        });
        
        return valid;
    }
    
    function showSuccessMessage() {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'booking-success';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Booking Successful!</h3>
            <p>Thank you for booking with Garcia's Detailing. We've received your appointment request and will send a confirmation shortly.</p>
            <a href="index.html" class="btn-return">Return to Home</a>
        `;
        
        // Replace form with success message
        const formContainer = document.querySelector('.appointment-form');
        formContainer.innerHTML = '';
        formContainer.appendChild(successMessage);
        
        // Scroll to success message
        formContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Add CSS for form validation and success message
    const style = document.createElement('style');
    style.textContent = `
        .invalid {
            border-color: #dc3545 !important;
        }
        
        .booking-success {
            text-align: center;
            padding: 3rem 1rem;
        }
        
        .booking-success i {
            font-size: 4rem;
            color: var(--success-color);
            margin-bottom: 1.5rem;
        }
        
        .booking-success h3 {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        
        .booking-success p {
            margin-bottom: 2rem;
            color: #666;
        }
        
        .btn-return {
            display: inline-block;
            background-color: var(--primary-color);
            color: var(--text-color);
            padding: 0.75rem 2rem;
            border-radius: 5px;
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .btn-return:hover {
            background-color: var(--accent-color);
            transform: translateY(-3px);
        }
        
        .discount-applied::after {
            content: "10% Discount Applied!";
            display: block;
            color: green;
            font-weight: bold;
            margin-top: 0.5rem;
            text-align: right;
        }
    `;
    document.head.appendChild(style);
});