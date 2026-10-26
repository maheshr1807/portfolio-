// ============================================================
// MAHESH R — PORTFOLIO JAVASCRIPT
// Interactions, animations, typing effect, mobile navigation & contact form
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hide Loader
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hide'), 400);
    });
    // Fallback in case load already fired
    setTimeout(() => loader.classList.add('hide'), 1200);
  }

  // 2. Mobile Nav Toggle
  const navMobileToggle = document.getElementById('navMobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (navMobileToggle && navLinks) {
    navMobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navMobileToggle.classList.toggle('open', isOpen);
      navMobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navMobileToggle.classList.remove('open');
        navMobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Typing Effect for Hero Role
  const typedEl = document.getElementById('typedRole') || document.getElementById('typed');
  if (typedEl) {
    const roles = window._portfolioRoles || [
      'Full Stack Developer',
      'MERN Stack Developer',
      'Frontend & React Specialist',
      'Freelance Web Developer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const currentRole = roles[roleIndex];
      if (!isDeleting) {
        charIndex++;
        typedEl.textContent = currentRole.slice(0, charIndex);
        if (charIndex === currentRole.length) {
          isDeleting = true;
          setTimeout(typeLoop, 1600);
          return;
        }
      } else {
        charIndex--;
        typedEl.textContent = currentRole.slice(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeLoop, 350);
          return;
        }
      }
      setTimeout(typeLoop, isDeleting ? 40 : 80);
    }
    typeLoop();
  }

  // 4. Update Current Year in Footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 5. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('in'));
  }

  // 6. Project Filter Functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projCards = document.querySelectorAll('#projGrid .proj-card');
  if (filterBtns.length > 0 && projCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.dataset.filter;
        projCards.forEach(card => {
          const matches = (filterVal === 'all' || card.dataset.cat === filterVal);
          card.style.display = matches ? 'flex' : 'none';
        });
      });
    });
  }

  // 7. Active Nav Link on Scroll (Scrollspy)
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-link');
  if (sections.length > 0 && navItems.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 120;
        const sectionId = section.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === `#${sectionId}`);
          });
        }
      });
    });
  }

  // 8. Hero Portrait Cinematic Slideshow
  initHeroSlideshow();
});

// ============================================================
// HERO PORTRAIT CINEMATIC SLIDESHOW CONTROLLER
// Sequence: mahesh-1.jpeg -> mahesh-2.jpeg -> mahesh-3.jpeg -> mahesh-4.jpeg
// Crossfade: 800ms | Interval: 3.5s | Subtle Zoom: scale(1.05)
// ============================================================
function initHeroSlideshow() {
  const slideshow = document.getElementById('heroSlideshow');
  if (!slideshow) return;

  const slides = Array.from(slideshow.querySelectorAll('.slide-layer'));
  if (slides.length === 0) return;

  const fallback = document.getElementById('photoFallback');

  // Preload images to eliminate flickering on transition
  const photoPaths = [
    'public/images/profile/mahesh-1.jpeg',
    'public/images/profile/mahesh-2.jpeg',
    'public/images/profile/mahesh-3.jpeg',
    'public/images/profile/mahesh-4.jpeg'
  ];

  let loadedCount = 0;
  let failedCount = 0;

  photoPaths.forEach((src, idx) => {
    const preloader = new Image();
    preloader.onload = () => {
      loadedCount++;
      if (fallback) fallback.style.display = 'none';
    };
    preloader.onerror = () => {
      failedCount++;
      // If none of the 4 images can be loaded, show fallback
      if (failedCount === photoPaths.length && loadedCount === 0 && fallback) {
        fallback.style.display = 'flex';
      }
    };
    preloader.src = src;
  });

  // Attach per-slide image load & error handlers
  slides.forEach((slide) => {
    const img = slide.querySelector('img');
    if (img) {
      img.addEventListener('error', () => {
        img.style.display = 'none';
        if (fallback) fallback.style.display = 'flex';
      });
      img.addEventListener('load', () => {
        img.style.display = 'block';
        if (fallback) fallback.style.display = 'none';
      });
      if (img.complete) {
        if (img.naturalWidth === 0) {
          img.style.display = 'none';
          if (fallback) fallback.style.display = 'flex';
        } else {
          img.style.display = 'block';
          if (fallback) fallback.style.display = 'none';
        }
      }
    }
  });

  let currentIndex = 0;
  const totalSlides = slides.length;
  let slideshowInterval = null;

  function goToSlide(nextIndex) {
    if (nextIndex === currentIndex) return;

    const currentSlide = slides[currentIndex];
    const nextSlide = slides[nextIndex];

    // Outgoing slide: crossfade out over 800ms
    currentSlide.classList.remove('active');
    currentSlide.classList.add('previous');

    // Incoming slide: crossfade in with subtle zoom
    nextSlide.classList.remove('previous');
    nextSlide.classList.add('active');

    // Clean up previous class after 800ms crossfade finishes
    setTimeout(() => {
      currentSlide.classList.remove('previous');
    }, 850);

    currentIndex = nextIndex;
  }

  function advance() {
    const next = (currentIndex + 1) % totalSlides;
    goToSlide(next);
  }

  // Continuous cinematic slideshow: change every 3.5 seconds
  slideshowInterval = setInterval(advance, 750);

  // Keep slideshow running smoothly across visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (slideshowInterval) clearInterval(slideshowInterval);
    } else {
      if (slideshowInterval) clearInterval(slideshowInterval);
      slideshowInterval = setInterval(advance, 750);
    }
  });
}

// 8. Contact Form Handling
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (!form || !note) return;

  const name = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const subject = document.getElementById('contactSubject')?.value.trim();
  const message = document.getElementById('contactMessage')?.value.trim();

  if (!name || !email || !message) {
    note.className = 'form-note error';
    note.textContent = 'Please fill out all required fields.';
    note.style.display = 'block';
    return;
  }

  // Visual feedback
  const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  }

  // Simulate or send message
  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
    note.className = 'form-note success';
    note.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, ${name}! Your message has been received. I'll get back to you shortly.`;
    note.style.display = 'block';
    form.reset();

    // Auto-hide success message after 6 seconds
    setTimeout(() => {
      note.style.display = 'none';
    }, 6000);
  }, 700);
}
