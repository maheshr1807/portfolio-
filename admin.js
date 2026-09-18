// ============================================================
// admin.js — Portfolio Admin Panel (Backend API version)
// All data reads/writes go through /api/portfolio
// ============================================================

const API_URL = '/api/portfolio';

// ---- In-memory data store (loaded once on boot) ----
let _data = null;

async function loadFromServer() {
  try {
    const res = await fetch(API_URL);
    const json = await res.json();
    if (json.success && json.data) {
      _data = json.data;
    } else {
      _data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
  } catch (err) {
    console.error('Failed to load from server:', err);
    _data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    showBanner('⚠️ Cannot reach server. Is it running? (node server.js)', 'error');
  }
}

async function saveToServer(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Save failed');
  return json;
}

function getData() {
  return _data || JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function setData(data) {
  _data = data;
}

function uid() {
  return 'p' + Date.now() + Math.random().toString(36).slice(2, 7);
}

// ---- Save wrapper — updates in-memory then persists ----
async function persist(successMsg) {
  try {
    setSaveState(true);
    await saveToServer(_data);
    toast('✓ ' + successMsg);
  } catch (err) {
    console.error(err);
    toast('❌ Save failed: ' + err.message, 'error');
  } finally {
    setSaveState(false);
  }
}

function setSaveState(saving) {
  document.querySelectorAll('[data-save-btn]').forEach(btn => {
    btn.disabled = saving;
    btn.textContent = saving ? '⏳ Saving…' : btn.dataset.label;
  });
}

// ---- Toast ----
function toast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ---- Banner (persistent top message) ----
function showBanner(msg, type = 'info') {
  let banner = document.getElementById('adminBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'adminBanner';
    banner.style.cssText = `
      position:fixed; top:0; left:0; right:0; z-index:9999;
      padding:10px 20px; font-family:var(--font-mono); font-size:13px;
      display:flex; align-items:center; justify-content:space-between;
      background:${type === 'error' ? 'rgba(239,68,68,0.95)' : 'rgba(0,229,255,0.95)'};
      color:${type === 'error' ? '#fff' : '#000'};
    `;
    banner.innerHTML = `<span>${msg}</span><button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;font-size:18px;color:inherit;">×</button>`;
    document.body.prepend(banner);
  }
}

// ================================================================
// NAVIGATION
// ================================================================
let currentSection = 'hero';

function navigate(section) {
  currentSection = section;
  document.querySelectorAll('.nav-item').forEach(el =>
    el.classList.toggle('active', el.dataset.section === section)
  );
  document.querySelectorAll('.section-panel').forEach(el =>
    el.classList.toggle('active', el.id === 'panel-' + section)
  );
  const titles = {
    hero: '🏠 Hero Section', about: '👤 About Section',
    skills: '⚡ Skills Section', projects: '🗂️ Projects',
    services: '🛠️ Services', experience: '💼 Experience',
    testimonials: '💬 Testimonials', contact: '📬 Contact Info',
    settings: '⚙️ Settings'
  };
  const el = document.getElementById('mainTitle');
  if (el) el.textContent = titles[section] || section;
  const pathEl = document.getElementById('headerPath');
  if (pathEl) pathEl.textContent = `portfolio / ${section}`;
  renderCurrentSection();
}

// ================================================================
// HERO
// ================================================================
function renderHeroPanel() {
  const d = getData().hero || {};
  setValue('heroName', d.name);
  setValue('heroDesc', d.description);
  setValue('heroCta1Label', d.ctaPrimary?.label);
  setValue('heroCta1Href',  d.ctaPrimary?.href);
  setValue('heroCta2Label', d.ctaSecondary?.label);
  setValue('heroCta2Href',  d.ctaSecondary?.href);
  setValue('heroCta3Label', d.ctaGhost?.label);
  setValue('heroCta3Href',  d.ctaGhost?.href);
  renderTagEditor('heroRolesEditor', d.roles || []);
  renderStackLayers(d.stackLayers || []);
}

async function saveHero() {
  const data = getData();
  if (!data.hero) data.hero = {};
  data.hero.name        = getVal('heroName');
  data.hero.description = getVal('heroDesc');
  data.hero.ctaPrimary   = { label: getVal('heroCta1Label'), href: getVal('heroCta1Href') };
  data.hero.ctaSecondary = { label: getVal('heroCta2Label'), href: getVal('heroCta2Href') };
  data.hero.ctaGhost     = { label: getVal('heroCta3Label'), href: getVal('heroCta3Href') };
  data.hero.roles        = getTagsFromEditor('heroRolesEditor');
  data.hero.stackLayers  = collectStackLayers();
  setData(data);
  await persist('Hero section saved!');
}

function renderStackLayers(layers) {
  const c = document.getElementById('stackLayersList');
  if (!c) return;
  c.innerHTML = '';
  layers.forEach((l, i) => {
    const row = document.createElement('div');
    row.className = 'stat-row-item';
    row.innerHTML = `
      <input type="text" placeholder="Label (e.g. FRONTEND)" value="${esc(l.label)}" data-field="label">
      <input type="text" placeholder="Tech (e.g. React + Tailwind)" value="${esc(l.tech)}" data-field="tech" style="flex:2">
      <button class="btn btn-danger btn-sm btn-icon" onclick="removeStackLayer(${i})">✕</button>
    `;
    c.appendChild(row);
  });
}

function addStackLayer() { renderStackLayers([...collectStackLayers(), { label: '', tech: '' }]); }
function removeStackLayer(i) { const l = collectStackLayers(); l.splice(i, 1); renderStackLayers(l); }
function collectStackLayers() {
  return Array.from(document.querySelectorAll('#stackLayersList .stat-row-item')).map(row => ({
    label: row.querySelector('[data-field="label"]').value.trim(),
    tech:  row.querySelector('[data-field="tech"]').value.trim()
  }));
}

// ================================================================
// ABOUT
// ================================================================
function renderAboutPanel() {
  const d = getData().about || {};
  renderParaList(d.paragraphs || []);
  renderStatRows(d.stats || []);
}

function renderParaList(paras) {
  const list = document.getElementById('paraList');
  if (!list) return;
  list.innerHTML = '';
  paras.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'para-item';
    row.innerHTML = `<textarea data-pi="${i}">${esc(p)}</textarea><button class="btn btn-danger btn-sm btn-icon" onclick="removePara(${i})">✕</button>`;
    list.appendChild(row);
  });
}

function collectParas() {
  return Array.from(document.querySelectorAll('#paraList textarea')).map(t => t.value.trim()).filter(Boolean);
}
function addPara()       { renderParaList([...collectParas(), '']); }
function removePara(i)   { const p = collectParas(); p.splice(i, 1); renderParaList(p); }

function renderStatRows(stats) {
  const list = document.getElementById('statList');
  if (!list) return;
  list.innerHTML = '';
  stats.forEach((s, i) => {
    const row = document.createElement('div');
    row.className = 'stat-row-item';
    row.innerHTML = `
      <input type="text" placeholder="Key (e.g. location)" value="${esc(s.label)}" data-field="label">
      <input type="text" placeholder="Value (e.g. Salem, IN)" value="${esc(s.value)}" data-field="value">
      <button class="btn btn-danger btn-sm btn-icon" onclick="removeStatRow(${i})">✕</button>
    `;
    list.appendChild(row);
  });
}

function collectStatRows() {
  return Array.from(document.querySelectorAll('#statList .stat-row-item')).map(row => ({
    label: row.querySelector('[data-field="label"]').value.trim(),
    value: row.querySelector('[data-field="value"]').value.trim()
  })).filter(r => r.label || r.value);
}
function addStatRow()       { renderStatRows([...collectStatRows(), { label: '', value: '' }]); }
function removeStatRow(i)   { const s = collectStatRows(); s.splice(i, 1); renderStatRows(s); }

async function saveAbout() {
  const data = getData();
  if (!data.about) data.about = {};
  data.about.paragraphs = collectParas();
  data.about.stats      = collectStatRows();
  setData(data);
  await persist('About section saved!');
}

// ================================================================
// SKILLS
// ================================================================
function renderSkillsPanel() {
  const skills    = getData().skills || [];
  const container = document.getElementById('skillGroupsList');
  if (!container) return;
  container.innerHTML = '';
  skills.forEach((group, gi) => {
    const el = document.createElement('div');
    el.className  = 'skill-group';
    el.dataset.gi = gi;
    el.innerHTML = `
      <div class="skill-group-header">
        <input class="skill-group-name-input" type="text" value="${esc(group.category)}" placeholder="Category name">
        <button class="btn btn-danger btn-sm" onclick="removeSkillGroup(${gi})">Remove Group</button>
      </div>
      <div class="field-group">
        <label>Skills — type and press Enter to add</label>
        <div class="tag-editor" id="skillChips_${gi}" onclick="focusTagInput('skillChips_${gi}')"></div>
      </div>
    `;
    container.appendChild(el);
    renderTagEditor('skillChips_' + gi, group.chips || []);
  });
}

async function addSkillGroup() {
  const data = getData();
  if (!data.skills) data.skills = [];
  data.skills.push({ category: 'New Category', chips: [] });
  setData(data);
  renderSkillsPanel();
  updateBadges();
}

async function removeSkillGroup(gi) {
  if (!confirm('Remove this skill group?')) return;
  const data = getData();
  data.skills.splice(gi, 1);
  setData(data);
  await persist('Skill group removed');
  renderSkillsPanel();
  updateBadges();
}

async function saveSkills() {
  const data   = getData();
  const groups = document.querySelectorAll('#skillGroupsList .skill-group');
  data.skills  = Array.from(groups).map((g, gi) => ({
    category: g.querySelector('.skill-group-name-input').value.trim(),
    chips:    getTagsFromEditor('skillChips_' + gi)
  }));
  setData(data);
  await persist('Skills saved!');
  updateBadges();
}

// ================================================================
// PROJECTS
// ================================================================
function renderProjectsPanel() {
  const projects = getData().projects || [];
  updateBadge('projects', projects.length);
  const list = document.getElementById('projectList');
  if (!list) return;

  if (!projects.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">📂</div>No projects yet. Click "+ Add Project"!</div>`;
    return;
  }
  list.innerHTML = projects.map(p => `
    <div class="proj-item" data-id="${p.id}">
      <img class="proj-item-thumb" src="${esc(p.image || '')}" alt="" onerror="this.src='';this.style.background='var(--bg4)'">
      <div class="proj-item-info">
        <div class="proj-item-title">${esc(p.title)}</div>
        <div class="proj-item-cat">${esc(p.category)}</div>
        <div class="proj-item-desc">${esc(p.description)}</div>
      </div>
      <div class="proj-item-actions">
        <button class="btn btn-ghost btn-sm" onclick="editProject('${p.id}')">✏️ Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProject('${p.id}')">🗑️</button>
      </div>
    </div>
  `).join('');
}

let _editingProjectId = null;

function openProjectModal(id) {
  _editingProjectId = id || null;
  const p = id ? (getData().projects || []).find(x => x.id === id) : null;
  document.getElementById('projModalTitle').textContent = id ? 'Edit Project' : 'Add Project';
  setValue('projTitle',    p?.title);
  setValue('projCategory', p?.category);
  setValue('projDesc',     p?.description);
  setValue('projImage',    p?.image);
  setValue('projLive',     p?.liveLink);
  setValue('projSource',   p?.sourceLink);
  renderTagEditor('projTechsEditor',    p?.techs    || []);
  renderTagEditor('projFeaturesEditor', p?.features || []);
  document.getElementById('projModal').classList.add('open');
}

function editProject(id) { openProjectModal(id); }

async function deleteProject(id) {
  if (!confirm('Delete this project?')) return;
  const data     = getData();
  data.projects  = (data.projects || []).filter(p => p.id !== id);
  setData(data);
  await persist('Project deleted');
  renderProjectsPanel();
  updateBadges();
}

async function saveProjectModal() {
  const title    = getVal('projTitle');
  const category = getVal('projCategory');
  if (!title)    { toast('Title is required', 'error'); return; }
  if (!category) { toast('Category is required', 'error'); return; }

  const data = getData();
  if (!data.projects) data.projects = [];

  const proj = {
    id:          _editingProjectId || uid(),
    title, category,
    description: getVal('projDesc'),
    image:       getVal('projImage'),
    liveLink:    getVal('projLive'),
    sourceLink:  getVal('projSource'),
    techs:       getTagsFromEditor('projTechsEditor'),
    features:    getTagsFromEditor('projFeaturesEditor')
  };

  if (_editingProjectId) {
    const idx = data.projects.findIndex(p => p.id === _editingProjectId);
    if (idx !== -1) data.projects[idx] = proj; else data.projects.push(proj);
  } else {
    data.projects.push(proj);
  }

  setData(data);
  await persist(_editingProjectId ? 'Project updated!' : 'Project added!');
  closeModal('projModal');
  renderProjectsPanel();
  updateBadges();
}

// ================================================================
// SERVICES
// ================================================================
function renderServicesPanel() {
  const services = getData().services || [];
  updateBadge('services', services.length);
  const list = document.getElementById('serviceList');
  if (!list) return;

  if (!services.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">🛠️</div>No services yet.</div>`;
    return;
  }
  list.innerHTML = services.map((s, i) => `
    <div class="service-item-row" data-idx="${i}">
      <span class="drag-handle">⠿</span>
      <div class="service-item-row-body">
        <div class="service-item-row-title">${esc(s.title)}</div>
        <div class="service-item-row-desc">${esc(s.desc)}</div>
      </div>
      <div class="service-item-row-actions">
        <button class="btn btn-ghost btn-sm" onclick="editService(${i})">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="deleteService(${i})">🗑️</button>
      </div>
    </div>
  `).join('');
}

let _editingServiceIdx = null;

function openServiceModal(idx) {
  _editingServiceIdx = (idx !== undefined && idx !== null) ? idx : null;
  const s = (_editingServiceIdx !== null) ? (getData().services || [])[_editingServiceIdx] : null;
  document.getElementById('svcModalTitle').textContent = (_editingServiceIdx !== null) ? 'Edit Service' : 'Add Service';
  setValue('svcTitle', s?.title);
  setValue('svcDesc',  s?.desc);
  document.getElementById('svcModal').classList.add('open');
}

function editService(idx) { openServiceModal(idx); }

async function deleteService(idx) {
  if (!confirm('Delete this service?')) return;
  const data = getData();
  data.services.splice(idx, 1);
  setData(data);
  await persist('Service deleted');
  renderServicesPanel();
  updateBadges();
}

async function saveServiceModal() {
  const title = getVal('svcTitle');
  if (!title) { toast('Title is required', 'error'); return; }
  const data = getData();
  if (!data.services) data.services = [];
  const item = { title, desc: getVal('svcDesc') };
  if (_editingServiceIdx !== null) { data.services[_editingServiceIdx] = item; }
  else { data.services.push(item); }
  setData(data);
  await persist(_editingServiceIdx !== null ? 'Service updated!' : 'Service added!');
  closeModal('svcModal');
  renderServicesPanel();
  updateBadges();
}

// ================================================================
// EXPERIENCE
// ================================================================
function renderExperiencePanel() {
  const d = getData().experience || {};
  setValue('expTitle', d.title);
  setValue('expBody',  d.body);
}

async function saveExperience() {
  const data = getData();
  if (!data.experience) data.experience = {};
  data.experience.title = getVal('expTitle');
  data.experience.body  = getVal('expBody');
  setData(data);
  await persist('Experience saved!');
}

// ================================================================
// TESTIMONIALS
// ================================================================
function renderTestimonialsPanel() {
  const testimonials = getData().testimonials || [];
  updateBadge('testimonials', testimonials.length);
  const list = document.getElementById('testList');
  if (!list) return;

  if (!testimonials.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">💬</div>No testimonials yet.</div>`;
    return;
  }
  list.innerHTML = testimonials.map((t, i) => `
    <div class="test-item" data-idx="${i}">
      <div class="test-item-body">
        <div class="test-item-quote">${esc(t.quote)}</div>
        <div class="test-item-author">${esc(t.author)}</div>
      </div>
      <div class="test-item-actions">
        <button class="btn btn-ghost btn-sm" onclick="editTestimonial(${i})">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTestimonial(${i})">🗑️</button>
      </div>
    </div>
  `).join('');
}

let _editingTestIdx = null;

function openTestModal(idx) {
  _editingTestIdx = (idx !== undefined && idx !== null) ? idx : null;
  const t = (_editingTestIdx !== null) ? (getData().testimonials || [])[_editingTestIdx] : null;
  document.getElementById('testModalTitle').textContent = (_editingTestIdx !== null) ? 'Edit Testimonial' : 'Add Testimonial';
  setValue('testQuote',  t?.quote);
  setValue('testAuthor', t?.author);
  document.getElementById('testModal').classList.add('open');
}

function editTestimonial(idx) { openTestModal(idx); }

async function deleteTestimonial(idx) {
  if (!confirm('Delete this testimonial?')) return;
  const data = getData();
  data.testimonials.splice(idx, 1);
  setData(data);
  await persist('Testimonial deleted');
  renderTestimonialsPanel();
  updateBadges();
}

async function saveTestModal() {
  const quote = getVal('testQuote');
  if (!quote) { toast('Quote is required', 'error'); return; }
  const data = getData();
  if (!data.testimonials) data.testimonials = [];
  const item = { quote, author: getVal('testAuthor') };
  if (_editingTestIdx !== null) { data.testimonials[_editingTestIdx] = item; }
  else { data.testimonials.push(item); }
  setData(data);
  await persist(_editingTestIdx !== null ? 'Testimonial updated!' : 'Testimonial added!');
  closeModal('testModal');
  renderTestimonialsPanel();
  updateBadges();
}

// ================================================================
// CONTACT
// ================================================================
function renderContactPanel() {
  const d = getData().contact || {};
  setValue('ctName',         d.name);
  setValue('ctEmail',        d.email);
  setValue('ctPhone',        d.phone);
  setValue('ctLinkedin',     d.linkedin);
  setValue('ctLinkedinLabel',d.linkedinLabel);
  setValue('ctGithub',       d.github);
  setValue('ctGithubLabel',  d.githubLabel);
  setValue('ctWhatsapp',     d.whatsapp);
}

async function saveContact() {
  const data    = getData();
  data.contact  = {
    name:          getVal('ctName'),
    email:         getVal('ctEmail'),
    phone:         getVal('ctPhone'),
    linkedin:      getVal('ctLinkedin'),
    linkedinLabel: getVal('ctLinkedinLabel'),
    github:        getVal('ctGithub'),
    githubLabel:   getVal('ctGithubLabel'),
    whatsapp:      getVal('ctWhatsapp')
  };
  setData(data);
  await persist('Contact info saved!');
}

// ================================================================
// SETTINGS
// ================================================================
function renderSettingsPanel() { /* static panel — nothing to populate */ }

async function resetAllData() {
  if (!confirm('Reset ALL portfolio content to defaults? This cannot be undone.')) return;
  try {
    const res  = await fetch('/api/portfolio/reset', { method: 'POST' });
    const json = await res.json();
    if (json.success) {
      await loadFromServer();
      renderCurrentSection();
      updateBadges();
      toast('✓ Data reset to defaults', 'info');
    }
  } catch (err) {
    toast('Reset failed: ' + err.message, 'error');
  }
}

function exportData() {
  const data = getData();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = 'portfolio-data-backup.json';
  a.click();
  toast('✓ Data exported!');
}

async function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (ev) => {
    try {
      const data = JSON.parse(ev.target.result);
      setData(data);
      await persist('Data imported successfully!');
      renderCurrentSection();
      updateBadges();
    } catch {
      toast('Invalid JSON file', 'error');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// ================================================================
// TAG EDITOR
// ================================================================
function renderTagEditor(editorId, tags) {
  const container = document.getElementById(editorId);
  if (!container) return;
  container.innerHTML = '';
  tags.forEach((tag, i) => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.innerHTML = `${esc(tag)}<span class="tag-remove" onclick="removeTag('${editorId}', ${i})">×</span>`;
    container.appendChild(span);
  });
  const input = document.createElement('input');
  input.className   = 'tag-input';
  input.placeholder = 'Type & press Enter…';
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = input.value.trim().replace(/,$/, '');
      if (val) {
        const current = getTagsFromEditor(editorId);
        current.push(val);
        renderTagEditor(editorId, current);
        setTimeout(() => document.querySelector(`#${editorId} .tag-input`)?.focus(), 0);
      }
    }
    if (e.key === 'Backspace' && !input.value) {
      const current = getTagsFromEditor(editorId);
      if (current.length) {
        current.pop();
        renderTagEditor(editorId, current);
        setTimeout(() => document.querySelector(`#${editorId} .tag-input`)?.focus(), 0);
      }
    }
  });
  container.appendChild(input);
}

function removeTag(editorId, idx) {
  const tags = getTagsFromEditor(editorId);
  tags.splice(idx, 1);
  renderTagEditor(editorId, tags);
}

function getTagsFromEditor(editorId) {
  const container = document.getElementById(editorId);
  if (!container) return [];
  return Array.from(container.querySelectorAll('.tag'))
    .map(t => t.childNodes[0]?.textContent?.trim() || '')
    .filter(Boolean);
}

function focusTagInput(editorId) {
  document.querySelector(`#${editorId} .tag-input`)?.focus();
}

// ================================================================
// MODAL HELPERS
// ================================================================
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});

// ================================================================
// BADGES
// ================================================================
function updateBadge(section, count) {
  const badge = document.querySelector(`.nav-item[data-section="${section}"] .nav-badge`);
  if (badge) badge.textContent = count;
}

function updateBadges() {
  const data = getData();
  updateBadge('projects',     data.projects?.length    ?? 0);
  updateBadge('services',     data.services?.length    ?? 0);
  updateBadge('testimonials', data.testimonials?.length ?? 0);
  updateBadge('skills',       data.skills?.length       ?? 0);
}

// ================================================================
// RENDER DISPATCHER
// ================================================================
function renderCurrentSection() {
  const fns = {
    hero: renderHeroPanel, about: renderAboutPanel,
    skills: renderSkillsPanel, projects: renderProjectsPanel,
    services: renderServicesPanel, experience: renderExperiencePanel,
    testimonials: renderTestimonialsPanel, contact: renderContactPanel,
    settings: renderSettingsPanel
  };
  try { fns[currentSection]?.(); }
  catch (err) { console.error('Render error in', currentSection, err); }
}

// ================================================================
// UTILS
// ================================================================
function esc(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function getVal(id)       { const el = document.getElementById(id); return el ? el.value.trim() : ''; }
function setValue(id, val) { const el = document.getElementById(id); if (el) el.value = val ?? ''; }

// ================================================================
// LOADING OVERLAY
// ================================================================
function showLoading(on) {
  let overlay = document.getElementById('loadingOverlay');
  if (on && !overlay) {
    overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.style.cssText = `
      position:fixed; inset:0; background:var(--bg); z-index:9998;
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      font-family:var(--font-mono); color:var(--accent); gap:16px;
    `;
    overlay.innerHTML = `
      <div style="font-size:32px;">⬡</div>
      <div style="font-size:14px;">// Loading portfolio data…</div>
      <div style="width:200px;height:2px;background:var(--bg3);border-radius:2px;overflow:hidden;">
        <div style="height:100%;background:var(--accent);animation:loadBar 1.2s ease infinite;"></div>
      </div>
      <style>@keyframes loadBar{0%{width:0;margin-left:0}50%{width:80%;margin-left:10%}100%{width:0;margin-left:100%}}</style>
    `;
    document.body.prepend(overlay);
  } else if (!on && overlay) {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s';
    setTimeout(() => overlay.remove(), 300);
  }
}

// ================================================================
// BOOT
// ================================================================
document.addEventListener('DOMContentLoaded', async () => {
  showLoading(true);
  await loadFromServer();
  showLoading(false);

  // Wire sidebar nav
  document.querySelectorAll('.nav-item[data-section]').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.section));
  });

  // Start on Hero
  navigate('hero');
  updateBadges();
});
