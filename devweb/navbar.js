// navbar.js
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  }
  
  function setupNavbar() {
    // Setup hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
      hamburger.addEventListener('click', toggleMenu);
    }
  
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        
        if (hamburger?.classList.contains('active')) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        }
      });
    });
  }
  
  // Initialize when navbar is loaded
  document.addEventListener('DOMContentLoaded', setupNavbar);