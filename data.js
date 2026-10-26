// ============================================================
// data.js — Portfolio Data Layer (API version)
// Fetches data from /api/portfolio on portfolio load
// Used only by index.html — admin uses admin.js directly
// ============================================================

const DEFAULT_DATA = {
  hero: {
    greeting: "Hello, I'm",
    name: 'Mahesh',
    photo: 'public/images/profile/mahesh-1.jpeg',
    slideshow: [
      'public/images/profile/mahesh-1.jpeg',
      'public/images/profile/mahesh-2.jpeg',
      'public/images/profile/mahesh-3.jpeg',
      'public/images/profile/mahesh-4.jpeg'
    ],
    roles: [
      'Full Stack Developer',
      'MERN Stack Developer',
      'Frontend & React Specialist',
      'Freelance Web Developer'
    ],
    description: 'I build responsive web applications and practical digital solutions that help businesses grow online.',
    ctaPrimary:   { label: 'Hire Me',       href: '#contact' },
    ctaSecondary: { label: 'View Resume',   href: './assets/Mahesh_R_Resume.pdf' }
  },
  about: {
    paragraphs: [
      "I'm a <strong>Full Stack Web Developer</strong> based in Salem, Tamil Nadu, passionate about building modern web applications using the <strong>MERN stack</strong> (MongoDB, Express, React, Node.js).",
      "As an aspiring developer and fresher, I design and build business websites, e-commerce platforms, admin dashboards, and custom web applications focused on clean code, solid architecture, and interfaces that work beautifully.",
      "My goal is simple: help businesses and founders turn ideas into fast, reliable, production-ready web products, and keep learning and shipping along the way."
    ],
    stats: [
      { label: 'Education', value: 'B.E. Computer Science' },
      { label: 'Location',  value: 'Salem, Tamil Nadu'     },
      { label: 'Stack',     value: 'MERN Stack'            },
      { label: 'Focus',     value: 'Full Stack Dev'        },
      { label: 'Status',    value: 'Available for freelance'}
    ]
  },
  skills: [
    { category: 'Frontend', chips: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Tailwind CSS', 'Bootstrap'] },
    { category: 'Backend',  chips: ['Node.js', 'Express.js', 'Python', 'FastAPI', 'REST APIs', 'JWT Auth'] },
    { category: 'Database', chips: ['MongoDB', 'MySQL', 'Mongoose'] },
    { category: 'Tools',    chips: ['Git', 'GitHub', 'VS Code', 'Postman', 'Vercel', 'Render', 'Netlify'] }
  ],
  projects: [
    {
      id: 'p1',
      title: 'Gym Website',
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
    },
    {
      id: 'p6',
      title: 'Tuition Center Website',
      category: 'tuition-booking',
      description: 'A clean website for a tutoring center displaying course offerings, batch schedules, teacher profiles, and enrollment information.',
      image: 'img/tuition-img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      features: ['WhatsApp Enroll', 'Course Showcase'],
      liveLink: 'https://maheshr1807.github.io/tuition-website/',
      sourceLink: '#'
    }
  ],
  freelancingProjects: [
    {
      id: 'fp1',
      title: 'Gym & Fitness Website',
      client: 'Fitness Business',
      category: 'Website Development',
      description: 'Built a fully responsive gym website featuring membership plans, trainer profiles, class schedules, and a contact section with a clean, energetic design.',
      image: 'img/gym-img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      liveLink: 'https://maheshr1807.github.io/gym-site/'
    },
    {
      id: 'fp2',
      title: 'Karthika Catering Service',
      client: 'Karthika Catering',
      category: 'Business Website',
      description: 'Developed a professional catering website showcasing menus, event catering services, and easy booking for weddings, parties, and corporate events.',
      image: 'img/catering-img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      liveLink: 'https://maheshr1807.github.io/Karthika-catering-service/'
    },
    {
      id: 'fp3',
      title: 'Hotel Booking Website',
      client: 'Hospitality Business',
      category: 'Website Development',
      description: 'A premium hotel website showcasing luxury rooms, amenities, gallery, and online booking designed to attract and convert visitors into guests.',
      image: 'img/hotel-img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      liveLink: 'https://maheshr1807.github.io/hotel-booking/'
    },
    {
      id: 'fp4',
      title: 'Tuition Center Website',
      client: 'Education Provider',
      category: 'Education Website',
      description: 'A clean website for a tutoring center displaying course offerings, batch schedules, teacher profiles, and enrollment information.',
      image: 'img/tuition-img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      liveLink: 'https://maheshr1807.github.io/tuition-website/'
    },
    {
      id: 'fp5',
      title: 'Travel & Tourism Website',
      client: 'Travel Agency',
      category: 'Travel & Tourism',
      description: 'A vibrant travel website showcasing destinations, tour packages, and easy booking built to attract travelers and drive inquiries.',
      image: 'img/travels img.png',
      techs: ['HTML', 'CSS', 'JavaScript'],
      liveLink: 'https://maheshr1807.github.io/travels/'
    }
  ],
  services: [
    { title: 'Business Website', desc: 'Fast, professional sites that represent your brand well and attract customers.' },
    { title: 'E-commerce Store',  desc: 'Full online stores with cart, checkout, and secure payment integration.' },
    { title: 'Landing Pages',    desc: 'Focused, high-converting pages for product launches and campaigns.' },
    { title: 'Admin Dashboard',  desc: 'Internal tools to manage data, users, and business operations efficiently.' }
  ],
  contact: {
    name:          'Mahesh R',
    email:         'rm683443@gmail.com',
    phone:         '+91 9342763246',
    linkedin:      'https://www.linkedin.com/in/mahesh-r-18062006r/',
    linkedinLabel: 'linkedin.com/in/mahesh-r-18062006r',
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
  if (!d) return;

  const greetingEl = document.querySelector('.hero-greeting');
  if (greetingEl && d.greeting) greetingEl.textContent = d.greeting;

  const nameEl = document.querySelector('.hero-name');
  if (nameEl && d.name) {
    nameEl.textContent = d.name.replace(/\s+R$/i, '');
  }

  const brandEl = document.querySelector('.brand');
  if (brandEl && d.name) brandEl.innerHTML = `<span class="brand-accent">&lt;</span>${d.name}<span class="brand-accent">/&gt;</span>`;

  const descEl = document.querySelector('.hero-desc');
  if (descEl && d.description) descEl.textContent = d.description;

  const hireBtn = document.getElementById('heroHireBtn');
  if (hireBtn && d.ctaPrimary) {
    if (d.ctaPrimary.label && !d.ctaPrimary.label.startsWith('$')) {
      hireBtn.textContent = d.ctaPrimary.label;
    } else {
      hireBtn.textContent = 'Hire Me';
    }
    if (d.ctaPrimary.href) hireBtn.href = d.ctaPrimary.href;
  }

  const resumeBtn = document.getElementById('heroResumeBtn');
  if (resumeBtn && d.ctaSecondary) {
    if (d.ctaSecondary.label && !d.ctaSecondary.label.startsWith('$')) {
      resumeBtn.textContent = d.ctaSecondary.label;
    } else {
      resumeBtn.textContent = 'View Resume';
    }
    if (d.ctaSecondary.href) resumeBtn.href = d.ctaSecondary.href;
  }

  const photoEl = document.getElementById('profilePhoto');
  if (photoEl && d.photo) {
    photoEl.src = d.photo;
  }

  if (d.slideshow && Array.isArray(d.slideshow)) {
    const slideImgs = document.querySelectorAll('#heroSlideshow .profile-slide-img');
    d.slideshow.forEach((url, i) => {
      if (slideImgs[i] && url) slideImgs[i].src = url;
    });
  }

  if (d.roles && Array.isArray(d.roles)) {
    window._portfolioRoles = d.roles.map(r => r.replace(/^"|"$/g, ''));
  }
}

function renderAbout(data) {
  const d = data.about;
  if (!d) return;

  const textEl = document.querySelector('.about-text');
  if (textEl && d.paragraphs) {
    const ctas = textEl.querySelector('.about-ctas');
    textEl.innerHTML = d.paragraphs.map(p => `<p>${p}</p>`).join('');
    if (ctas) textEl.appendChild(ctas);
  }
}

function renderProjects(data) {
  const grid = document.getElementById('projGrid');
  if (!grid || !data.projects || data.projects.length === 0) return;

  grid.innerHTML = data.projects.map(p => `
    <div class="proj-card" data-cat="${p.category}" data-id="${p.id || ''}">
      <div class="proj-thumb">
        <img src="${p.image}" alt="${p.title} Screenshot" onerror="this.parentElement.style.background='#162734'">
        <div class="proj-overlay">
          <a href="${p.liveLink}" target="_blank" rel="noopener" class="overlay-btn"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>
        </div>
      </div>
      <div class="proj-body">
        <div class="proj-category-tag">${(p.category || 'Website').replace(/-/g, ' ')}</div>
        <h3 class="proj-title">${p.title}</h3>
        <p class="proj-desc">${p.description}</p>
        <div class="chip-row proj-techs">
          ${(p.techs || []).map(t => `<span class="chip chip-sm">${t}</span>`).join('')}
        </div>
        <div class="proj-ctas">
          <a href="${p.liveLink}" class="btn btn-coral btn-sm" target="_blank" rel="noopener"><i class="fa-solid fa-eye"></i> Live Demo</a>
          ${p.sourceLink && p.sourceLink !== '#' ? `<a href="${p.sourceLink}" class="btn btn-outline btn-sm" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Source</a>` : `<a href="#" class="btn btn-outline btn-sm"><i class="fa-brands fa-github"></i> Source</a>`}
        </div>
      </div>
    </div>
  `).join('');
}

function renderFreelancing(data) {
  const grid = document.getElementById('freelancingGrid');
  if (!grid || !data.freelancingProjects || data.freelancingProjects.length === 0) return;

  const cardsHtml = data.freelancingProjects.map(p => `
    <div class="freelancing-card">
      <div class="freelancing-thumb">
        <img src="${p.image}" alt="${p.title}" onerror="this.parentElement.style.background='#162734'">
        <div class="freelancing-category-badge">${p.category || 'Website Development'}</div>
      </div>
      <div class="freelancing-card-body">
        <h3 class="freelancing-title">${p.title}</h3>
        <p class="freelancing-client"><i class="fa-solid fa-building"></i> ${p.client || 'Client Project'}</p>
        <p class="freelancing-desc">${p.description}</p>
        <div class="chip-row" style="margin:12px 0">
          ${(p.techs || []).map(t => `<span class="chip chip-sm">${t}</span>`).join('')}
        </div>
        <div class="freelancing-card-ctas">
          ${p.liveLink && p.liveLink !== '#' ? `
            <a href="${p.liveLink}" target="_blank" rel="noopener" class="btn btn-coral btn-sm">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> View Live
            </a>` : `
            <a href="#" class="btn btn-outline btn-sm"><i class="fa-solid fa-link"></i> Link Pending</a>
          `}
        </div>
      </div>
    </div>
  `).join('');

  const placeholderHtml = `
    <div class="freelancing-card freelancing-card-placeholder">
      <div class="freelancing-placeholder-inner">
        <div class="placeholder-icon"><i class="fa-solid fa-plus"></i></div>
        <h3>Your Project Here</h3>
        <p>Have a project in mind? Let's build something great together.</p>
        <a href="#contact" class="btn btn-coral btn-sm">Discuss Your Project</a>
      </div>
    </div>
  `;

  grid.innerHTML = cardsHtml + placeholderHtml;
}

function renderContact(data) {
  const d = data.contact;
  if (!d) return;

  const emailLink = document.getElementById('emailLink');
  if (emailLink && d.email) {
    emailLink.href = `mailto:${d.email}`;
    const val = emailLink.querySelector('.contact-link-value');
    if (val) val.textContent = d.email;
  }

  const phoneLink = document.getElementById('phoneLink');
  if (phoneLink && d.phone) {
    phoneLink.href = `tel:${d.phone}`;
    const val = phoneLink.querySelector('.contact-link-value');
    if (val) val.textContent = d.phone;
  }

  const linkedinLink = document.getElementById('linkedinLink');
  if (linkedinLink && d.linkedin) {
    linkedinLink.href = d.linkedin;
    const val = linkedinLink.querySelector('.contact-link-value');
    if (val) val.textContent = d.linkedinLabel || d.linkedin.replace(/^https?:\/\//, '');
  }

  const githubLink = document.getElementById('githubLink');
  if (githubLink && d.github) {
    githubLink.href = d.github;
    const val = githubLink.querySelector('.contact-link-value');
    if (val) val.textContent = d.githubLabel || d.github.replace(/^https?:\/\//, '');
  }

  const whatsappLink = document.getElementById('whatsappLink');
  if (whatsappLink && d.whatsapp) {
    whatsappLink.href = d.whatsapp;
  }
}

function renderAll(data) {
  if (!document.querySelector('.hero-name')) return;
  renderHero(data);
  renderAbout(data);
  renderProjects(data);
  renderFreelancing(data);
  renderContact(data);
}

// ============================================================
// BOOT — fetch from backend API, fall back to defaults
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
  if (!document.querySelector('.hero-name')) return;

  let data = DEFAULT_DATA;
  try {
    const res = await fetch('/api/portfolio');
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        data = json.data;
        if (!data.freelancingProjects || data.freelancingProjects.length === 0) {
          data.freelancingProjects = DEFAULT_DATA.freelancingProjects || [];
        }
      }
    }
  } catch (err) {
    // Backend optional when loaded statically
  }

  renderAll(data);
  if (data.hero && data.hero.roles) {
    window._portfolioRoles = data.hero.roles;
  }
});
