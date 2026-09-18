// ============================================================
// data.js — Portfolio Data Layer (API version)
// Fetches data from /api/portfolio on portfolio load
// Used only by index.html — admin uses admin.js directly
// ============================================================

const DEFAULT_DATA = {
  hero: {
    name: 'Mahesh R',
    roles: ['"Full Stack Web Developer"', '"MERN Stack Developer"', '"Freelance Web Developer"'],
    description: 'I build fast, responsive, and scalable websites using React, Node.js, Express, and MongoDB — from e-commerce platforms to admin dashboards.',
    ctaPrimary:   { label: '$ view-projects',   href: '#projects' },
    ctaSecondary: { label: '$ hire-me',         href: '#contact'  },
    ctaGhost:     { label: '↓ download-resume', href: '#'         },
    stackLayers: [
      { tech: 'React + Tailwind CSS',          label: 'FRONTEND'    },
      { tech: 'Node.js + Express',             label: 'BACKEND'     },
      { tech: 'MongoDB + JWT Auth',            label: 'DATA & AUTH' },
      { tech: 'Vercel · Render · Netlify · Github', label: 'DEPLOY' }
    ]
  },
  about: {
    paragraphs: [
      "I'm a <b>Full Stack Web Developer</b> based in Salem, Tamil Nadu, specializing in modern web applications built on the <b>MERN stack</b> (MongoDB, Express, React, Node.js).",
      "I design and build e-commerce websites, admin dashboards, business websites, and custom web applications — focused on clean code, solid architecture, and interfaces that actually work well for the people using them.",
      "My goal is simple: help businesses and founders turn ideas into fast, reliable, production-ready web products, and keep learning and shipping along the way."
    ],
    stats: [
      { label: 'education', value: 'B.E. Computer Science' },
      { label: 'location',  value: 'Salem, IN'             },
      { label: 'stack',     value: 'MERN'                  },
      { label: 'focus',     value: 'Full Stack Dev'         },
      { label: 'status',    value: 'Available for freelance'}
    ]
  },
  skills: [
    { category: 'Frontend', chips: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap'] },
    { category: 'Backend',  chips: ['Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth']       },
    { category: 'Tools',    chips: ['Git', 'GitHub', 'Postman', 'VS Code', 'Vercel', 'Render', 'Netlify'] }
  ],
  projects: [
    {
      id: 'p1',
      title: 'gym-website',
      category: 'gym-website',
      description: 'A responsive gym website featuring membership plans, trainer profiles, fitness programs, and contact information with a modern user interface.',
      image: 'img/gym-img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      features: ['Responsive Design', 'Membership Plans', 'Trainer Profiles'],
      liveLink: 'https://maheshr1807.github.io/gym-site/',
      sourceLink: '#'
    },
    {
      id: 'p2',
      title: 'Hotel Booking Website',
      category: 'hotel-booking',
      description: 'A modern and responsive hotel website that showcases luxury rooms, amenities, and online booking with an elegant and user-friendly design.',
      image: 'img/hotel-img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      features: ['Room Listings', 'Online Booking', 'Contact & Location'],
      liveLink: 'https://maheshr1807.github.io/hotel-booking/',
      sourceLink: '#'
    },
    {
      id: 'p3',
      title: 'Catering Service Website',
      category: 'catering-service',
      description: 'A modern and responsive catering website showcasing delicious menus, event catering services, and easy booking for weddings, parties, and corporate events.',
      image: 'img/catering-img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      features: ['Delicious Menus', 'Event Catering Services', 'Easy Booking'],
      liveLink: 'https://maheshr1807.github.io/Karthika-catering-service/',
      sourceLink: '#'
    },
    {
      id: 'p4',
      title: 'Hospital & Clinic Website',
      category: 'hospital-website',
      description: 'A modern and responsive hospital website that provides healthcare services, doctor profiles, appointment booking, and emergency contact information.',
      image: 'img/hospital-img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      features: ['Healthcare Services', 'Doctor Profiles', 'Appointment Booking'],
      liveLink: 'https://maheshr1807.github.io/travels/',
      sourceLink: '#'
    },
    {
      id: 'p5',
      title: 'Travel & Tourism Website',
      category: 'travels-website',
      description: 'A modern and responsive travel website that showcases destinations, tours, and provides an easy booking experience for tourists.',
      image: 'img/travels img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      features: ['Destinations Gallery', 'Tours', 'Easy Booking'],
      liveLink: 'https://maheshr1807.github.io/travels/',
      sourceLink: '#'
    }
  ],
  services: [
    { title: 'Business Website',         desc: 'Fast, professional sites that represent your brand well.'           },
    { title: 'E-commerce Website',       desc: 'Full online stores with cart, checkout, and payments.'              },
    { title: 'Portfolio Website',        desc: 'Personal or agency portfolios that convert visitors to clients.'     },
    { title: 'Admin Dashboard',          desc: 'Internal tools to manage data, users, and operations.'              },
    { title: 'Landing Page',             desc: 'Focused, high-converting pages for campaigns and launches.'         },
    { title: 'API Development',          desc: 'Clean REST APIs built for your web or mobile app.'                  },
    { title: 'Bug Fixing & Maintenance', desc: 'Diagnosing and fixing issues in existing MERN applications.'        }
  ],
  experience: {
    title: 'Personal & Portfolio Projects',
    body: 'Built multiple full-stack web applications using the MERN stack — including an e-commerce platform with authentication, payments, and an admin panel — and deployed them on cloud platforms like Vercel and Render.'
  },
  testimonials: [
    { quote: '"Mahesh built a clean and responsive website with excellent performance."', author: '— raja m' },
    { quote: '"Communicated clearly through the whole project and delivered on time."',  author: '— rajesh' }
  ],
  contact: {
    name:          'Mahesh R',
    email:         'rm683443@gmail.com',
    phone:         '+91 9342763246',
    linkedin:      'https://www.linkedin.com/in/mahesh-r-18062006r/',
    linkedinLabel: 'linkedin.com/in/mahesh-r-18062006r/',
    github:        'https://github.com/maheshr1807',
    githubLabel:   'github.com/maheshr1807',
    whatsapp:      'https://wa.me/919342763246'
  }
};

// Expose for admin.js
window.DEFAULT_DATA = DEFAULT_DATA;

// ============================================================
// RENDERERS (portfolio page only)
// ============================================================

function renderHero(data) {
  const d = data.hero;
  const nameEl = document.querySelector('.hero-name');
  if (!nameEl) return;

  nameEl.textContent = d.name;
  const brandEl = document.querySelector('.brand');
  if (brandEl) brandEl.innerHTML = `<span class="brk">&lt;</span>${d.name}<span class="brk">/&gt;</span>`;

  const codeNameEl = document.querySelector('.hero-code .code-line:nth-child(2)');
  if (codeNameEl) codeNameEl.innerHTML = `&nbsp;&nbsp;name: <span class="code-str">"${d.name}"</span>,`;

  const descEl = document.querySelector('.hero-desc');
  if (descEl) descEl.textContent = d.description;

  const ctas = document.querySelectorAll('.hero-ctas a');
  if (ctas[0]) { ctas[0].textContent = d.ctaPrimary.label;   ctas[0].href = d.ctaPrimary.href;   }
  if (ctas[1]) { ctas[1].textContent = d.ctaSecondary.label; ctas[1].href = d.ctaSecondary.href; }
  if (ctas[2]) { ctas[2].textContent = d.ctaGhost.label;     ctas[2].href = d.ctaGhost.href;     }

  const layers = document.querySelectorAll('.stack .layer');
  d.stackLayers.forEach((l, i) => {
    if (layers[i]) layers[i].innerHTML = `<b>${l.tech}</b><span>${l.label}</span>`;
  });

  window._portfolioRoles = d.roles;
}

function renderAbout(data) {
  const d = data.about;
  const textEl = document.querySelector('.about-text');
  if (!textEl) return;
  textEl.innerHTML = d.paragraphs.map(p => `<p>${p}</p>`).join('');
  const statBox = document.querySelector('.stat-box');
  if (statBox) statBox.innerHTML = d.stats.map(s =>
    `<div class="stat-row"><span>${s.label}</span><span>${s.value}</span></div>`
  ).join('');
}

function renderSkills(data) {
  const container = document.querySelector('.skill-cols');
  if (!container) return;
  container.innerHTML = data.skills.map(group => `
    <div class="skill-card">
      <h4>${group.category}</h4>
      <div class="chip-row">${group.chips.map(c => `<span class="chip">${c}</span>`).join('')}</div>
    </div>
  `).join('');
}

function renderProjects(data) {
  const grid = document.getElementById('projGrid');
  if (!grid) return;
  const filterRow = document.querySelector('.filter-row');
  if (filterRow) {
    const cats = [...new Set(data.projects.map(p => p.category))];
    filterRow.innerHTML = `<button class="filter-btn active" data-filter="all">all</button>` +
      cats.map(c => `<button class="filter-btn" data-filter="${c}">${c}</button>`).join('');
    filterRow.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filterRow.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const f = btn.dataset.filter;
        document.querySelectorAll('#projGrid .proj-card').forEach(card => {
          card.style.display = (f === 'all' || card.dataset.cat === f) ? '' : 'none';
        });
      });
    });
  }
  grid.innerHTML = data.projects.map(p => `
    <div class="win proj-card" data-cat="${p.category}" data-id="${p.id}">
      <div class="win-bar">
        <span class="dot" style="background:var(--red-dot)"></span>
        <span class="dot" style="background:var(--yellow-dot)"></span>
        <span class="dot" style="background:var(--green-dot)"></span>
        <span class="win-title">${p.category}.app</span>
      </div>
      <div class="proj-thumb">
        <img src="${p.image}" alt="${p.title} Screenshot" onerror="this.style.display='none'">
      </div>
      <div class="proj-body">
        <div class="proj-title">${p.title}</div>
        <p class="proj-desc">${p.description}</p>
        <div class="chip-row" style="margin-bottom:14px;">
          ${p.techs.map(t => `<span class="chip">${t}</span>`).join('')}
        </div>
        <ul class="proj-feats">${p.features.map(f => `<li>${f}</li>`).join('')}</ul>
        <div class="proj-ctas">
          <a href="${p.liveLink}" class="btn btn-primary" target="_blank">Live Demo</a>
          <a href="${p.sourceLink}" class="btn btn-ghost" target="_blank">Source Code</a>
        </div>
      </div>
    </div>
  `).join('');
}

function renderServices(data) {
  const grid = document.querySelector('.services-grid');
  if (!grid) return;
  grid.innerHTML = data.services.map(s => `
    <div class="service-item">
      <span class="check">✔</span>
      <div><h5>${s.title}</h5><p>${s.desc}</p></div>
    </div>
  `).join('');
}

function renderExperience(data) {
  const item = document.querySelector('.exp-item');
  if (!item) return;
  item.innerHTML = `<h4>${data.experience.title}</h4><p>${data.experience.body}</p>`;
}

function renderTestimonials(data) {
  const grid = document.querySelector('.test-grid');
  if (!grid) return;
  grid.innerHTML = data.testimonials.map(t => `
    <div class="test-card">
      <div class="test-comment">/* review */</div>
      <p class="test-quote">${t.quote}</p>
      <div class="test-name">${t.author}</div>
    </div>
  `).join('');
}

function renderContact(data) {
  const d = data.contact;
  const links = document.querySelector('.contact-links');
  if (!links) return;
  const h1 = links.querySelector('h1');
  if (h1) h1.textContent = d.name;
  const anchors = links.querySelectorAll('a');
  if (anchors[0]) { anchors[0].href = `mailto:${d.email}`; anchors[0].innerHTML = `<span class="k">email</span>${d.email}`; }
  if (anchors[1]) { anchors[1].href = `tel:${d.phone}`;    anchors[1].innerHTML = `<span class="k">phone</span>${d.phone}`; }
  if (anchors[2]) { anchors[2].href = d.linkedin;           anchors[2].innerHTML = `<span class="k">linkedin</span>${d.linkedinLabel}`; }
  if (anchors[3]) { anchors[3].href = d.github;             anchors[3].innerHTML = `<span class="k">github</span>${d.githubLabel}`; }
  if (anchors[4]) { anchors[4].href = d.whatsapp;           anchors[4].innerHTML = `<span class="k">whatsapp</span>chat on WhatsApp`; }
}

function renderAll(data) {
  if (!document.querySelector('.hero-name')) return; // Not on portfolio page
  renderHero(data);
  renderAbout(data);
  renderSkills(data);
  renderProjects(data);
  renderServices(data);
  renderExperience(data);
  renderTestimonials(data);
  renderContact(data);
}

// ============================================================
// BOOT — fetch from backend API, fall back to defaults
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
  // Only render on the portfolio page
  if (!document.querySelector('.hero-name')) return;

  let data = DEFAULT_DATA;
  try {
    const res = await fetch('/api/portfolio');
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) data = json.data;
    }
  } catch (err) {
    console.warn('Could not reach backend — using default data:', err.message);
  }

  renderAll(data);
  window._portfolioRoles = data.hero.roles;
});
