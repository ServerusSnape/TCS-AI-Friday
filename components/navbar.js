// Navbar Component
function createNavbar(activePage = '') {
  const navLinks = [
    { href: '/', label: 'Home', id: 'home' },
    { href: '/skill-assessment', label: 'Skill Assessment', id: 'skill-assessment' },
    { href: '/learning-roadmap', label: 'Learning Roadmap', id: 'learning-roadmap' },
    { href: '/resume-analyzer', label: 'Resume Analyzer', id: 'resume-analyzer' },
    { href: '/mock-interview', label: 'Mock Interview', id: 'mock-interview' },
    { href: '/career-path', label: 'Career Path', id: 'career-path' },
    { href: '/code-debugger', label: 'Code Debugger', id: 'code-debugger' },
  ];

  const linksHTML = navLinks
    .map(
      (link) =>
        `<li><a href="${link.href}" class="${activePage === link.id ? 'active' : ''}">${link.label}</a></li>`
    )
    .join('');

  return `
  <nav class="navbar" id="navbar">
    <div class="nav-container">
      <a href="/" class="nav-logo">
        <div class="logo-icon">🚀</div>
        <span class="logo-text">DevGrow</span>
      </a>
      <ul class="nav-links" id="navLinks">
        ${linksHTML}
      </ul>
      <div class="nav-auth" id="navAuth">
        <a href="/login" class="btn btn-secondary btn-sm" id="navLoginBtn">Sign In</a>
      </div>
      <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>`;
}

// Footer Component
function createFooter() {
  return `
  <footer class="footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="nav-logo">
          <div class="logo-icon">🚀</div>
          <span class="logo-text">DevGrow</span>
        </a>
        <p>AI-powered career growth platform for developers. Level up your skills, ace interviews, and navigate your tech career with confidence.</p>
      </div>
      <div class="footer-col">
        <h4>Platform</h4>
        <a href="/skill-assessment">Skill Assessment</a>
        <a href="/learning-roadmap">Learning Roadmap</a>
        <a href="/resume-analyzer">Resume Analyzer</a>
        <a href="/mock-interview">Mock Interview</a>
        <a href="/career-path">Career Path</a>
        <a href="/code-debugger">Code Debugger</a>
      </div>
      <div class="footer-col">
        <h4>Resources</h4>
        <a href="#">Blog</a>
        <a href="#">Documentation</a>
        <a href="#">Community</a>
        <a href="#">Support</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="#">About</a>
        <a href="#">Careers</a>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 DevGrow. All rights reserved.</span>
      <span>Built with � and AI</span>
    </div>
  </footer>`;
}

// Initialize navbar scroll & mobile menu & page transition & scroll reveal
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  // Scroll styling
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('open');
      });
    });
  }

  // Page transition
  document.body.classList.add('page-transition');

  // Scroll reveal
  initScrollReveal();

  // Auth state — update navbar with user info
  initAuthState();
}

// Check login state and update navbar
async function initAuthState() {
  try {
    const res = await fetch('/api/auth/me');
    const data = await res.json();
    const navAuth = document.getElementById('navAuth');
    if (!navAuth) return;

    if (data.success && data.user) {
      // User is logged in
      window.__devgrowUser = data.user;
      const initials = data.user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
      navAuth.innerHTML = `
        <div class="nav-user-menu" id="navUserMenu">
          <button class="nav-user-btn" onclick="document.getElementById('navUserMenu').classList.toggle('open')">
            <span class="nav-user-avatar">${initials}</span>
            <span class="nav-user-name">${data.user.name.split(' ')[0]}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 8L2 4h8z"/></svg>
          </button>
          <div class="nav-user-dropdown">
            <div class="nav-user-info">
              <span class="nav-user-fullname">${data.user.name}</span>
              <span class="nav-user-email">${data.user.email}</span>
            </div>
            <div class="nav-user-divider"></div>
            <button class="nav-user-logout" onclick="handleLogout()">🚪 Sign Out</button>
          </div>
        </div>`;

      // Close dropdown on click outside
      document.addEventListener('click', (e) => {
        const menu = document.getElementById('navUserMenu');
        if (menu && !menu.contains(e.target)) {
          menu.classList.remove('open');
        }
      });
    } else {
      window.__devgrowUser = null;
    }
  } catch (e) {
    console.error('Auth check failed:', e);
  }
}

// Logout handler
async function handleLogout() {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.__devgrowUser = null;
    window.location.href = '/login';
  } catch (e) {
    window.location.href = '/login';
  }
}

// Scroll Reveal — reveal elements with class "reveal" on scroll
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// Simple markdown-like renderer
function renderMarkdown(text) {
  return text
    .replace(/### (.*)/g, '<h3>$1</h3>')
    .replace(/## (.*)/g, '<h2>$1</h2>')
    .replace(/# (.*)/g, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^- (.*)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>');
}

// API helper
async function apiPost(endpoint, data) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    return { success: false, error: 'Network error. Please try again.' };
  }
}

// Show loading state
function showLoading(container) {
  container.innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      <span>AI is thinking...</span>
    </div>`;
}

// ===== Progress Tracker (Server + localStorage fallback) =====
const DevGrowProgress = {
  _key: 'devgrow_progress',

  _get() {
    try {
      return JSON.parse(localStorage.getItem(this._key)) || {};
    } catch { return {}; }
  },

  _set(data) {
    localStorage.setItem(this._key, JSON.stringify(data));
  },

  // Save to server if logged in
  async _saveToServer(type, score, grade, metadata) {
    try {
      if (window.__devgrowUser) {
        await fetch('/api/auth/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type, score, grade, metadata })
        });
      }
    } catch (e) { console.error('Server save failed:', e); }
  },

  // Skill Assessment
  saveSkillScore(score, grade) {
    const data = this._get();
    data.skillScore = score;
    data.skillGrade = grade;
    data.skillDate = new Date().toISOString();
    if (!data.skillHistory) data.skillHistory = [];
    data.skillHistory.push({ score, date: data.skillDate });
    if (data.skillHistory.length > 10) data.skillHistory = data.skillHistory.slice(-10);
    this._set(data);
    this._saveToServer('skill', score, grade);
  },

  // Resume
  saveResumeScore(score) {
    const data = this._get();
    data.resumeScore = score;
    data.resumeDate = new Date().toISOString();
    if (!data.resumeHistory) data.resumeHistory = [];
    data.resumeHistory.push({ score, date: data.resumeDate });
    if (data.resumeHistory.length > 10) data.resumeHistory = data.resumeHistory.slice(-10);
    this._set(data);
    this._saveToServer('resume', score);
  },

  // Interview
  saveInterviewSession(overallScore) {
    const data = this._get();
    data.interviewCount = (data.interviewCount || 0) + 1;
    data.lastInterviewScore = overallScore;
    data.interviewDate = new Date().toISOString();
    if (!data.interviewHistory) data.interviewHistory = [];
    data.interviewHistory.push({ score: overallScore, date: data.interviewDate });
    if (data.interviewHistory.length > 10) data.interviewHistory = data.interviewHistory.slice(-10);
    this._set(data);
    this._saveToServer('interview', overallScore);
  },

  // Roadmap
  saveRoadmapProgress(percent) {
    const data = this._get();
    data.roadmapPercent = percent;
    data.roadmapDate = new Date().toISOString();
    this._set(data);
    this._saveToServer('roadmap', percent);
  },

  // Get all — from server if logged in, otherwise localStorage
  async getFromServer() {
    try {
      if (window.__devgrowUser) {
        const res = await fetch('/api/auth/progress');
        const data = await res.json();
        if (data.success) return data.progress;
      }
    } catch (e) { console.error('Server fetch failed:', e); }
    return null;
  },

  getAll() {
    return this._get();
  },

  clear() {
    localStorage.removeItem(this._key);
  }
};
