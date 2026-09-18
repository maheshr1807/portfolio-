// Loader
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('loader').classList.add('hide'), 700);
  });

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    root.setAttribute('data-theme', isLight ? 'dark' : 'light');
    themeToggle.textContent = isLight ? '🌙' : '☀️';
  });

  // Mobile nav
  const navMobileToggle = document.getElementById('navMobileToggle');
  const navLinks = document.getElementById('navLinks');
  navMobileToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  // Typing effect
  const roles = window._portfolioRoles || ['"Full Stack Web Developer"', '"MERN Stack Developer"', '"Freelance Web Developer"'];
  const typedEl = document.getElementById('typed');
  let ri = 0, ci = 0, deleting = false;
  function typeLoop(){
    const current = roles[ri];
    if(!deleting){
      ci++;
      typedEl.textContent = current.slice(0, ci);
      if(ci === current.length){ deleting = true; setTimeout(typeLoop, 1300); return; }
    } else {
      ci--;
      typedEl.textContent = current.slice(0, ci);
      if(ci === 0){ deleting = false; ri = (ri+1) % roles.length; }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));

  // Project filter (only if data.js hasn't already rendered dynamically)
  if (typeof loadData === 'undefined') {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projCards = document.querySelectorAll('#projGrid .proj-card');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        projCards.forEach(card => {
          card.style.display = (f === 'all' || card.dataset.cat === f) ? '' : 'none';
        });
      });
    });
  }
