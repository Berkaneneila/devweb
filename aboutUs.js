// Navbar functionality
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  
  hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      hamburger.classList.toggle('active');
  });

  // User dropdown toggle
  const userProfileBtn = document.getElementById('userProfileBtn');
  const userDropdown = document.getElementById('userDropdown');
  
  if (userProfileBtn) {
      userProfileBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          userDropdown.classList.toggle('show');
      });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
      if (userDropdown) userDropdown.classList.remove('show');
  });

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });

  // Existing reveal animation code follows...
  const revealOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
  };
  
  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('reveal-visible');
              revealObserver.unobserve(entry.target);
          }
      });
  }, revealOptions);
  
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
              
              // Close mobile menu if open
              if (navLinks.classList.contains('show')) {
                  hamburger.classList.remove('active');
                  navLinks.classList.remove('show');
              }
          }
      });
  });
});

// Scroll-reveal using IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealOptions);
  
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  
  // Navbar scroll effect

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navLinks.classList.contains('show')) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('show');
        }
      }
    });
  });
});