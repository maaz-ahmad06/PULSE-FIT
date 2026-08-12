document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. PRELOADER LOGIC
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loaderBar');
  const body = document.body;

  // Add no-scroll class while loader is active
  body.classList.add('no-scroll');

  let progress = 0;
  const loadTime = 2500; // 2.5 seconds total loading duration
  const intervalTime = 25; // 25ms update intervals
  const increment = 100 / (loadTime / intervalTime);

  const loaderInterval = setInterval(() => {
    progress += increment;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loaderInterval);
      
      // Delay slightly before fading out
      setTimeout(() => {
        preloader.classList.add('fade-out');
        body.classList.remove('no-scroll');
        
        // Trigger initial scroll reveals
        triggerScrollReveal();
      }, 200);
    }
    loaderBar.style.width = `${progress}%`;
  }, intervalTime);


  /* ==========================================================================
     2. STICKY HEADER & ACTIVE NAV LINKS
     ========================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScrollEffects = () => {
    // Sticky Header
    if (window.scrollY > 50) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }

    // Active Navigation Link on Scroll
    const scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // offset header height
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-menu a[href*=${sectionId}]`)?.classList.add('active-link');
        
        // Fallback standard selector
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active-link');
          } else {
            link.classList.remove('active-link');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScrollEffects);


  /* ==========================================================================
     3. MOBILE NAVIGATION MENU
     ========================================================================== */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const toggleIcon = navToggle.querySelector('i');

  const toggleMenu = () => {
    navMenu.classList.toggle('open');
    // Change menu icon to close icon
    if (navMenu.classList.contains('open')) {
      toggleIcon.className = 'fa-solid fa-xmark';
      body.classList.add('no-scroll');
    } else {
      toggleIcon.className = 'fa-solid fa-bars-staggered';
      body.classList.remove('no-scroll');
    }
  };

  navToggle.addEventListener('click', toggleMenu);

  // Close menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleIcon.className = 'fa-solid fa-bars-staggered';
      body.classList.remove('no-scroll');
    });
  });


  /* ==========================================================================
     4. SCROLL REVEAL & STATS COUNTER
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const animateStats = () => {
    if (statsAnimated) return;
    statsAnimated = true;

    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const duration = 1500; // 1.5 seconds animation time
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime >= duration) {
          stat.textContent = target.toLocaleString();
        } else {
          const progress = elapsedTime / duration;
          // Ease-out quad formula
          const easeOutProgress = progress * (2 - progress);
          const currentCount = Math.floor(easeOutProgress * target);
          stat.textContent = currentCount.toLocaleString();
          requestAnimationFrame(updateCount);
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-active');
        
        // If the stats section is in view, animate numbers
        if (entry.target.classList.contains('stats') || entry.target.closest('.stats')) {
          animateStats();
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  const triggerScrollReveal = () => {
    revealElements.forEach(el => {
      revealObserver.observe(el);
    });

    // Also observe stats container for numbers animation
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      revealObserver.observe(statsSection);
    }
  };


  /* ==========================================================================
     5. BMI CALCULATOR LOGIC
     ========================================================================== */
  const bmiForm = document.getElementById('bmiForm');
  const bmiHeightInput = document.getElementById('bmiHeight');
  const bmiWeightInput = document.getElementById('bmiWeight');
  const bmiResultCard = document.getElementById('bmiResultCard');
  const bmiVal = document.getElementById('bmiVal');
  const bmiStatus = document.getElementById('bmiStatus');
  const bmiGuideline = document.getElementById('bmiGuideline');
  const bmiRows = document.querySelectorAll('.bmi-table tbody tr');

  bmiForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const height = parseFloat(bmiHeightInput.value);
    const weight = parseFloat(bmiWeightInput.value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) return;

    // Convert height to meters
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const roundedBmi = bmi.toFixed(1);

    // Update value UI
    bmiVal.textContent = roundedBmi;
    bmiResultCard.classList.add('active');

    // Highlight proper table ranges
    bmiRows.forEach(row => row.classList.remove('active'));

    let status = '';
    let guideline = '';
    let targetClass = '';

    if (bmi < 18.5) {
      status = 'Underweight';
      guideline = 'Consider consulting a nutritionist to build muscular strength safely.';
      targetClass = 'range-underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      status = 'Normal Weight';
      guideline = 'Fantastic! Maintain your current energy routines and macros.';
      targetClass = 'range-normal';
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      status = 'Overweight';
      guideline = 'Adding high-intensity conditioning sessions is highly recommended.';
      targetClass = 'range-overweight';
    } else {
      status = 'Obese';
      guideline = 'Consult with our fitness consultants to tailor a specialized path.';
      targetClass = 'range-obese';
    }

    bmiStatus.textContent = status;
    bmiGuideline.textContent = guideline;

    // Highlight row in UI table
    const activeRow = document.querySelector(`.bmi-table tbody tr.${targetClass}`);
    if (activeRow) {
      activeRow.classList.add('active');
    }
  });


  /* ==========================================================================
     6. TESTIMONIALS SLIDER CAROUSEL
     ========================================================================== */
  const cards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('#sliderDots .dot');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  let currentSlide = 0;

  const showSlide = (index) => {
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (index + cards.length) % cards.length;
    cards[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  };

  prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
  });

  nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
  });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
    });
  });

  // Auto Slider every 8 seconds
  let autoSlideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 8000);

  // Reset auto slide timer on click
  const resetSliderTimer = () => {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 8000);
  };

  prevBtn.addEventListener('click', resetSliderTimer);
  nextBtn.addEventListener('click', resetSliderTimer);
  dots.forEach(dot => dot.addEventListener('click', resetSliderTimer));


  /* ==========================================================================
     7. CONTACT FORM SUBMISSION
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Trigger fake UI success
    formSuccess.style.display = 'flex';
    
    // Clear inputs
    contactForm.reset();

    // Reset indicator after 5 seconds
    setTimeout(() => {
      formSuccess.style.display = 'none';
    }, 5000);
  });

  // Newsletter Submission
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
  });
});
