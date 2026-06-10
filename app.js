/**
 * ARIYAARTH ENTERPRISES - Core Interactive Javascript Engine
 * Version: 1.0.0
 * Author: Antigravity AI
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  /* =========================================================
     1. GLASSMORPHIC STICKY NAVBAR OFFSET
     ========================================================= */
  const header = document.getElementById('main-header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check on load

  /* =========================================================
     2. MOBILE DRAWER NAVIGATION MENU
     ========================================================= */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Prevent background scrolling when menu is active
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
  };

  mobileToggle.addEventListener('click', toggleMenu);

  // Close mobile drawer when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  /* =========================================================
     3. HIGH-PERFORMANCE SCROLLSPY (ACTIVE SECTIONS)
     ========================================================= */
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px', // Target middle viewport trigger zone
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  const spyObserver = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => spyObserver.observe(section));

  /* =========================================================
     4. SMOOTH ACCELERATED COUNTER ANIMATIONS
     ========================================================= */
  const statsSection = document.getElementById('about');
  const counterRetailers = document.getElementById('stat-retailers');
  const counterCategories = document.getElementById('stat-categories');
  
  let animationTriggered = false;

  const countUp = (element, target, duration, suffix = '') => {
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    
    const timer = setInterval(() => {
      start += 1;
      if (target > 100) {
        start += 4; // accelerate large numbers
      }
      if (start >= target) {
        element.innerHTML = `${target}${suffix}`;
        clearInterval(timer);
      } else {
        element.innerHTML = `${start}${suffix}`;
      }
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animationTriggered) {
        animationTriggered = true;
        countUp(counterRetailers, 40, 1500, '+');
        countUp(counterCategories, 5, 1000, '+');
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  /* =========================================================
     5. PRODUCT CARD ENQUIRY NAVIGATION BRIDGE
     ========================================================= */
  const cardEnquiryLinks = document.querySelectorAll('.product-enquiry-link');
  const categorySelect = document.getElementById('category');
  const quantityInput = document.getElementById('quantity');

  cardEnquiryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Auto-select corresponding product category
      const targetCatName = link.getAttribute('data-category');
      if (categorySelect && targetCatName) {
        for (let i = 0; i < categorySelect.options.length; i++) {
          if (categorySelect.options[i].value.toLowerCase().includes(targetCatName.toLowerCase())) {
            categorySelect.selectedIndex = i;
            break;
          }
        }
      }
      
      // Auto-focus quantity field after brief delay (let scroll complete)
      setTimeout(() => {
        if (quantityInput) quantityInput.focus();
      }, 800);
    });
  });

  /* =========================================================
     6. FADE-UP INTERSECTION OBSERVING SCROLL EFFECTS
     ========================================================= */
  const animateElements = document.querySelectorAll('.animate-fade-up');
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animateElements.forEach(el => fadeObserver.observe(el));

  /* =========================================================
     7. FORM INTERACTION & DYNAMIC WHATSAPP LINK PREFILL
     ========================================================= */
  const enquiryForm = document.getElementById('bulk-enquiry-form');
  const successToast = document.getElementById('success-toast');
  const btnReset = document.getElementById('btn-reset-form');
  const waQuickBtn = document.getElementById('btn-wa-quick');

  // Dynamically update WhatsApp Quick-link message as form details are typed
  const updateWhatsAppLink = () => {
    const name = encodeURIComponent(document.getElementById('fullName').value.trim() || '');
    const phone = encodeURIComponent(document.getElementById('phone').value.trim() || '');
    const location = encodeURIComponent(document.getElementById('location').value.trim() || '');
    const businessName = encodeURIComponent(document.getElementById('businessName').value.trim() || '');
    const category = encodeURIComponent(categorySelect.value || '');
    const qty = encodeURIComponent(quantityInput.value.trim() || '');
    const msg = encodeURIComponent(document.getElementById('message').value.trim() || '');

    let text = "Hello AriyaArth Enterprises! I would like to make a wholesale enquiry.";
    if (name) text += `%0A- *Name:* ${name}`;
    if (phone) text += `%0A- *Phone:* ${phone}`;
    if (location) text += `%0A- *Location:* ${location}`;
    if (businessName) text += `%0A- *Shop Name:* ${businessName}`;
    if (category) text += `%0A- *Garment Category:* ${category}`;
    if (qty) text += `%0A- *Order Quantity:* ${qty} pcs`;
    if (msg) text += `%0A- *Special Requirements:* ${msg}`;

    waQuickBtn.href = `https://wa.me/919022202927?text=${text}`;
  };

  // Add event listeners on input change to keep WhatsApp text accurate
  const formInputs = [
    document.getElementById('fullName'),
    document.getElementById('phone'),
    document.getElementById('location'),
    document.getElementById('businessName'),
    categorySelect,
    quantityInput,
    document.getElementById('message')
  ];

  formInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', updateWhatsAppLink);
      input.addEventListener('change', updateWhatsAppLink);
    }
  });

  // Intercept Enquiry Form Submissions
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Native browser validation triggered automatically prior to this
      const nameVal = document.getElementById('fullName').value.trim();
      const phoneVal = document.getElementById('phone').value.trim();
      const locationVal = document.getElementById('location').value.trim();

      if (!nameVal || !phoneVal || !locationVal) {
        return; // safeguard check
      }

      // Display dynamic success toast feedback overlay immediately for UX
      successToast.classList.add('active');

      const formData = new FormData(enquiryForm);
      
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          console.error("Failed to send email via Web3Forms");
        }
      } catch (err) {
        console.error("Error submitting form:", err);
      }
    });
  }

  // Handle Reset button click inside the Success Toast overlay
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (enquiryForm) {
        enquiryForm.reset();
      }
      successToast.classList.remove('active');
      updateWhatsAppLink(); // reset the WhatsApp link parameters
    });
  }
});
