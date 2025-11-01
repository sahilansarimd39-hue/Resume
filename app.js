// Navigation functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Page navigation
function navigateToPage(pageId) {
  // Hide all pages
  pages.forEach(page => {
    page.classList.remove('active');
  });

  // Show selected page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Update active nav link
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    }
  });

  // Close mobile menu
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add click listeners to nav links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = link.getAttribute('data-page');
    navigateToPage(pageId);
  });
});

// Add click listeners to CTA buttons
const ctaButtons = document.querySelectorAll('.cta-buttons a');
ctaButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const pageId = button.getAttribute('data-page');
    navigateToPage(pageId);
  });
});

// Expandable sections on Resume page
const expandableTitles = document.querySelectorAll('.section-title.expandable');

expandableTitles.forEach(title => {
  title.addEventListener('click', () => {
    const sectionId = title.getAttribute('data-section');
    const content = document.getElementById(sectionId);
    
    if (content) {
      content.classList.toggle('collapsed');
      title.classList.toggle('collapsed');
    }
  });
});

// Download Resume button (mock functionality)
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    alert('Resume download would start here. In a production environment, this would trigger a PDF download.');
  });
}

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => {
      error.textContent = '';
    });

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Validate name
    if (name === '') {
      document.getElementById('nameError').textContent = 'Name is required';
      isValid = false;
    } else if (name.length < 2) {
      document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
      isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      document.getElementById('emailError').textContent = 'Email is required';
      isValid = false;
    } else if (!emailPattern.test(email)) {
      document.getElementById('emailError').textContent = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate message
    if (message === '') {
      document.getElementById('messageError').textContent = 'Message is required';
      isValid = false;
    } else if (message.length < 10) {
      document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
      isValid = false;
    }

    // If form is valid, show success message
    if (isValid) {
      contactForm.style.display = 'none';
      formSuccess.style.display = 'block';
      
      // Reset form after 3 seconds
      setTimeout(() => {
        contactForm.reset();
        contactForm.style.display = 'block';
        formSuccess.style.display = 'none';
      }, 3000);
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && !this.hasAttribute('data-page')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Scroll animations (fade in elements on scroll)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.achievement-card, .experience-item, .education-item, .biodata-section, .contact-form-wrapper, .contact-info-wrapper');

animateElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(element);
});

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    navigateToPage(hash);
  } else {
    navigateToPage('home');
  }
});

// Initialize page based on URL hash
window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.substring(1);
  if (hash && document.getElementById(hash)) {
    navigateToPage(hash);
  } else {
    navigateToPage('home');
  }
});