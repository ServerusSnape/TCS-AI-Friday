const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();

// ============================================================
// Theme Colors
// ============================================================
const DARK_BG    = '0F0F1A';
const PRIMARY    = '6C63FF';
const ACCENT     = '00D4FF';
const WHITE      = 'FFFFFF';
const LIGHT_GRAY = 'B0B0C0';
const CARD_BG    = '1A1A2E';
const RED        = 'EF4444';
const GREEN      = '22C55E';
const YELLOW     = 'F59E0B';

pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches
pptx.author = 'DevGrow Team';
pptx.subject = 'AI-Powered Career Growth Platform';

// ============================================================
// Helper: Add background + optional decorative elements
// ============================================================
function addBg(slide) {
  slide.background = { color: DARK_BG };
  // Top-right decorative circle
  slide.addShape(pptx.shapes.OVAL, {
    x: 11.5, y: -0.8, w: 2.5, h: 2.5,
    fill: { color: PRIMARY, transparency: 85 },
    line: { color: PRIMARY, width: 0, transparency: 100 }
  });
  // Bottom-left decorative circle
  slide.addShape(pptx.shapes.OVAL, {
    x: -0.8, y: 5.8, w: 2, h: 2,
    fill: { color: ACCENT, transparency: 88 },
    line: { color: ACCENT, width: 0, transparency: 100 }
  });
}

function addFooter(slide, pageNum, totalPages) {
  slide.addText(`DevGrow  |  AI-Powered Career Growth Platform`, {
    x: 0.5, y: 7.0, w: 8, h: 0.35,
    fontSize: 9, color: LIGHT_GRAY, fontFace: 'Segoe UI'
  });
  slide.addText(`${pageNum} / ${totalPages}`, {
    x: 11.5, y: 7.0, w: 1.5, h: 0.35,
    fontSize: 9, color: LIGHT_GRAY, fontFace: 'Segoe UI', align: 'right'
  });
}

const TOTAL_SLIDES = 12;

// ============================================================
// SLIDE 1: Title Slide
// ============================================================
let slide1 = pptx.addSlide();
addBg(slide1);

// Gradient bar at top
slide1.addShape(pptx.shapes.RECTANGLE, {
  x: 0, y: 0, w: 13.33, h: 0.06,
  fill: { color: PRIMARY }
});

slide1.addText('🚀', {
  x: 4.5, y: 1.5, w: 4.33, h: 1.2,
  fontSize: 60, align: 'center', fontFace: 'Segoe UI'
});

slide1.addText('DevGrow', {
  x: 1.5, y: 2.6, w: 10.33, h: 1.0,
  fontSize: 48, fontFace: 'Segoe UI', bold: true, color: WHITE, align: 'center'
});

slide1.addText('AI-Powered Career Growth Platform', {
  x: 2, y: 3.5, w: 9.33, h: 0.6,
  fontSize: 22, fontFace: 'Segoe UI', color: ACCENT, align: 'center'
});

slide1.addShape(pptx.shapes.RECTANGLE, {
  x: 5.5, y: 4.3, w: 2.33, h: 0.04, fill: { color: PRIMARY }
});

slide1.addText('Empowering developers, QA engineers, data analysts, designers &\ntech professionals to accelerate their careers with AI', {
  x: 2, y: 4.6, w: 9.33, h: 0.9,
  fontSize: 13, fontFace: 'Segoe UI', color: LIGHT_GRAY, align: 'center', lineSpacingMultiple: 1.3
});

slide1.addText('Team TCS AI Friday', {
  x: 2, y: 5.8, w: 9.33, h: 0.5,
  fontSize: 16, fontFace: 'Segoe UI', color: PRIMARY, align: 'center', bold: true
});

slide1.addText('March 2026', {
  x: 2, y: 6.3, w: 9.33, h: 0.4,
  fontSize: 12, fontFace: 'Segoe UI', color: LIGHT_GRAY, align: 'center'
});

// ============================================================
// SLIDE 2: Problem Statement
// ============================================================
let slide2 = pptx.addSlide();
addBg(slide2);
addFooter(slide2, 2, TOTAL_SLIDES);

slide2.addText('⚠️  Problem Statement', {
  x: 0.8, y: 0.4, w: 11.73, h: 0.8,
  fontSize: 30, fontFace: 'Segoe UI', bold: true, color: WHITE
});

slide2.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8, y: 1.15, w: 2, h: 0.04, fill: { color: PRIMARY }
});

const problems = [
  { icon: '😰', title: 'Career Uncertainty', desc: 'Tech professionals struggle to identify the right career path among hundreds of roles, technologies, and specializations.' },
  { icon: '📉', title: 'Skill Gap Blindness', desc: 'Most professionals don\'t know their exact strengths and weaknesses — they guess instead of getting data-driven assessments.' },
  { icon: '📄', title: 'Resume Rejections', desc: '75% of resumes are rejected by ATS systems before a human ever sees them. Candidates don\'t know why.' },
  { icon: '😟', title: 'Interview Anxiety', desc: 'Lack of realistic practice leads to poor performance. Candidates don\'t get feedback until it\'s too late.' },
  { icon: '🗺️', title: 'No Clear Roadmap', desc: 'Self-learners waste months on wrong tutorials. No structured, personalized learning path exists for their specific goals.' },
  { icon: '🔄', title: 'One-Size-Fits-All', desc: 'Existing platforms treat all roles the same — a QA engineer gets the same advice as a frontend developer.' }
];

problems.forEach((p, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = 0.8 + col * 6.0;
  const y = 1.5 + row * 1.85;

  slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x, y: y, w: 5.6, h: 1.6, rectRadius: 0.15,
    fill: { color: CARD_BG },
    line: { color: '2A2A3E', width: 1 }
  });
  slide2.addText(p.icon, {
    x: x + 0.2, y: y + 0.15, w: 0.6, h: 0.5, fontSize: 22
  });
  slide2.addText(p.title, {
    x: x + 0.85, y: y + 0.15, w: 4.4, h: 0.4,
    fontSize: 14, fontFace: 'Segoe UI', bold: true, color: WHITE
  });
  slide2.addText(p.desc, {
    x: x + 0.85, y: y + 0.55, w: 4.5, h: 0.9,
    fontSize: 10.5, fontFace: 'Segoe UI', color: LIGHT_GRAY, lineSpacingMultiple: 1.2
  });
});

// ============================================================
// SLIDE 3: Problems with Existing Applications
// ============================================================
let slide3 = pptx.addSlide();
addBg(slide3);
addFooter(slide3, 3, TOTAL_SLIDES);

slide3.addText('🔍  Problems with Current Applications', {
  x: 0.8, y: 0.4, w: 11.73, h: 0.8,
  fontSize: 28, fontFace: 'Segoe UI', bold: true, color: WHITE
});

slide3.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8, y: 1.15, w: 2.5, h: 0.04, fill: { color: PRIMARY }
});

const competitors = [
  { name: 'LinkedIn Skill Assessments', issues: ['Generic badge-only results', 'No detailed feedback or roadmap', 'Limited to predefined question banks', 'No resume or interview prep'] },
  { name: 'LeetCode / HackerRank', issues: ['Coding-only — ignores QA, PM, Design roles', 'No career guidance or skill mapping', 'Competitive, not growth-oriented', 'No resume or soft-skill support'] },
  { name: 'Coursera / Udemy', issues: ['Courses are passive, not adaptive', 'No skill assessment before learning', 'No personalized career path', 'No interview simulation'] },
  { name: 'Resume Builders (Zety, etc.)', issues: ['Template-focused, no ATS analysis', 'No AI-powered rewriting', 'Don\'t compare against job descriptions', 'No skill gap identification'] },
];

competitors.forEach((c, i) => {
  const x = 0.5 + i * 3.1;
  slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x, y: 1.5, w: 2.9, h: 5.2, rectRadius: 0.15,
    fill: { color: CARD_BG },
    line: { color: '2A2A3E', width: 1 }
  });
  slide3.addText(c.name, {
    x: x + 0.15, y: 1.65, w: 2.6, h: 0.6,
    fontSize: 13, fontFace: 'Segoe UI', bold: true, color: ACCENT, valign: 'middle'
  });
  slide3.addShape(pptx.shapes.RECTANGLE, {
    x: x + 0.15, y: 2.3, w: 2.6, h: 0.02, fill: { color: '3A3A4E' }
  });

  c.issues.forEach((issue, j) => {
    slide3.addText(`❌  ${issue}`, {
      x: x + 0.15, y: 2.5 + j * 0.85, w: 2.65, h: 0.75,
      fontSize: 10.5, fontFace: 'Segoe UI', color: LIGHT_GRAY, lineSpacingMultiple: 1.15
    });
  });
});

slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 1, y: 6.85, w: 11.33, h: 0.0, rectRadius: 0,
  fill: { color: DARK_BG }
});

// ============================================================
// SLIDE 4: Our Solution
// ============================================================
let slide4 = pptx.addSlide();
addBg(slide4);
addFooter(slide4, 4, TOTAL_SLIDES);

slide4.addText('💡  Our Solution — DevGrow', {
  x: 0.8, y: 0.4, w: 11.73, h: 0.8,
  fontSize: 30, fontFace: 'Segoe UI', bold: true, color: WHITE
});
slide4.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8, y: 1.15, w: 2, h: 0.04, fill: { color: PRIMARY }
});

slide4.addText('One unified AI-powered platform that covers the entire career growth journey — from skill assessment to job readiness.', {
  x: 0.8, y: 1.4, w: 11.73, h: 0.6,
  fontSize: 14, fontFace: 'Segoe UI', color: LIGHT_GRAY, italic: true
});

const features = [
  { icon: '📊', title: 'AI Skill Assessment', desc: 'Role-specific MCQ quizzes with animated scorecards, category breakdowns, and personalized recommendations' },
  { icon: '🗺️', title: 'Learning Roadmap', desc: 'Interactive phase-by-phase timeline with curated resources, projects, and milestone checklists' },
  { icon: '📄', title: 'Resume Analyzer', desc: 'ATS scoring, JD comparison, missing keyword detection, and AI-rewritten bullet points' },
  { icon: '🎤', title: 'Mock Interview', desc: '5-question structured interviews with per-answer feedback, scoring, and radar chart analysis' },
  { icon: '🧭', title: 'Career Path Finder', desc: '3 AI-recommended career paths with match %, salary data, skills gap, and action plans' },
  { icon: '📈', title: 'Progress Dashboard', desc: 'Chart.js-powered dashboard tracking skill scores, resume improvements, and interview history' },
];

features.forEach((f, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 0.8 + col * 4.0;
  const y = 2.2 + row * 2.4;

  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x, y: y, w: 3.7, h: 2.1, rectRadius: 0.15,
    fill: { color: CARD_BG },
    line: { color: '2A2A3E', width: 1 }
  });
  slide4.addText(f.icon, {
    x: x + 0.2, y: y + 0.2, w: 0.7, h: 0.6, fontSize: 28
  });
  slide4.addText(f.title, {
    x: x + 0.2, y: y + 0.75, w: 3.3, h: 0.4,
    fontSize: 14, fontFace: 'Segoe UI', bold: true, color: WHITE
  });
  slide4.addText(f.desc, {
    x: x + 0.2, y: y + 1.15, w: 3.3, h: 0.8,
    fontSize: 10, fontFace: 'Segoe UI', color: LIGHT_GRAY, lineSpacingMultiple: 1.25
  });
});

// ============================================================
// SLIDE 5: Architecture
// ============================================================
let slide5 = pptx.addSlide();
addBg(slide5);
addFooter(slide5, 5, TOTAL_SLIDES);

slide5.addText('🏗️  System Architecture', {
  x: 0.8, y: 0.4, w: 11.73, h: 0.8,
  fontSize: 30, fontFace: 'Segoe UI', bold: true, color: WHITE
});
slide5.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8, y: 1.15, w: 2, h: 0.04, fill: { color: PRIMARY }
});

// Client Layer
slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.6, y: 1.6, w: 3.8, h: 5.0, rectRadius: 0.15,
  fill: { color: CARD_BG }, line: { color: PRIMARY, width: 1.5 }
});
slide5.addText('🖥️  Frontend (Client)', {
  x: 0.8, y: 1.75, w: 3.4, h: 0.5,
  fontSize: 15, fontFace: 'Segoe UI', bold: true, color: ACCENT
});

const clientItems = ['index.html — Home + Dashboard', 'skill-assessment.html — Quiz UI', 'learning-roadmap.html — Timeline', 'resume-analyzer.html — ATS Analysis', 'mock-interview.html — Interview Sim', 'career-path.html — Path Finder', 'navbar.js — Shared Components', 'styles.css — Dark Theme (3500+ lines)', 'Chart.js 4.4 — Dashboard Charts'];
clientItems.forEach((item, i) => {
  slide5.addText(`▸ ${item}`, {
    x: 1.0, y: 2.35 + i * 0.42, w: 3.2, h: 0.38,
    fontSize: 9.5, fontFace: 'Segoe UI', color: LIGHT_GRAY
  });
});

// Arrow: Client → Server
slide5.addShape(pptx.shapes.RECTANGLE, {
  x: 4.5, y: 3.8, w: 1.2, h: 0.04, fill: { color: PRIMARY }
});
slide5.addText('REST API ►', {
  x: 4.35, y: 3.4, w: 1.5, h: 0.4,
  fontSize: 9, fontFace: 'Segoe UI', color: PRIMARY, align: 'center'
});

// Server Layer
slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 5.8, y: 1.6, w: 3.0, h: 5.0, rectRadius: 0.15,
  fill: { color: CARD_BG }, line: { color: GREEN, width: 1.5 }
});
slide5.addText('⚙️  Backend (Server)', {
  x: 6.0, y: 1.75, w: 2.6, h: 0.5,
  fontSize: 15, fontFace: 'Segoe UI', bold: true, color: GREEN
});

const serverItems = ['Node.js + Express 4.18', '', 'Routes:', '  /api/assessment', '  /api/ai (roadmap)', '  /api/resume', '  /api/interview', '  /api/career', '', 'claude.js — API Wrapper', 'JSON Parse + Fallback'];
serverItems.forEach((item, i) => {
  slide5.addText(item ? `▸ ${item}` : '', {
    x: 6.0, y: 2.3 + i * 0.38, w: 2.6, h: 0.35,
    fontSize: 9.5, fontFace: 'Segoe UI', color: item.startsWith('  ') ? ACCENT : LIGHT_GRAY
  });
});

// Arrow: Server → AI
slide5.addShape(pptx.shapes.RECTANGLE, {
  x: 8.9, y: 3.8, w: 1.2, h: 0.04, fill: { color: YELLOW }
});
slide5.addText('API Call ►', {
  x: 8.75, y: 3.4, w: 1.5, h: 0.4,
  fontSize: 9, fontFace: 'Segoe UI', color: YELLOW, align: 'center'
});

// AI Layer
slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 10.2, y: 1.6, w: 2.7, h: 5.0, rectRadius: 0.15,
  fill: { color: CARD_BG }, line: { color: YELLOW, width: 1.5 }
});
slide5.addText('🤖  AI Engine', {
  x: 10.4, y: 1.75, w: 2.3, h: 0.5,
  fontSize: 15, fontFace: 'Segoe UI', bold: true, color: YELLOW
});

const aiItems = ['Anthropic Claude API', 'Model: claude-sonnet-4-20250514', '', 'Capabilities:', '  Quiz Generation', '  Skill Evaluation', '  Resume Analysis', '  Interview Q&A', '  Career Matching', '', 'Structured JSON Output'];
aiItems.forEach((item, i) => {
  slide5.addText(item ? `▸ ${item}` : '', {
    x: 10.4, y: 2.3 + i * 0.38, w: 2.3, h: 0.35,
    fontSize: 9.5, fontFace: 'Segoe UI', color: item.startsWith('  ') ? YELLOW : LIGHT_GRAY
  });
});

// Storage note at bottom
slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 3, y: 6.85, w: 7.33, h: 0.0, rectRadius: 0.1,
  fill: { color: CARD_BG }
});

// ============================================================
// SLIDE 6: Home Page & Dashboard
// ============================================================
let slide6 = pptx.addSlide();
addBg(slide6);
addFooter(slide6, 6, TOTAL_SLIDES);

slide6.addText('🏠  Home Page & Progress Dashboard', {
  x: 0.8, y: 0.4, w: 11.73, h: 0.8,
  fontSize: 28, fontFace: 'Segoe UI', bold: true, color: WHITE
});
slide6.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8, y: 1.15, w: 2.5, h: 0.04, fill: { color: PRIMARY }
});

// Page mockup placeholder
slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8, y: 1.5, w: 7.5, h: 4.5, rectRadius: 0.15,
  fill: { color: CARD_BG }, line: { color: '3A3A4E', width: 1 }
});
slide6.addText('🚀 DevGrow Home Page', {
  x: 1.2, y: 1.8, w: 6.7, h: 0.5,
  fontSize: 18, fontFace: 'Segoe UI', bold: true, color: WHITE
});
slide6.addText('Hero section with animated gradient orbs,\nfeature cards grid, and call-to-action buttons', {
  x: 1.2, y: 2.4, w: 6.7, h: 0.8,
  fontSize: 11, fontFace: 'Segoe UI', color: LIGHT_GRAY, lineSpacingMultiple: 1.3
});

// Mini dashboard mockup
slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 1.2, y: 3.4, w: 3.2, h: 1.0, rectRadius: 0.1,
  fill: { color: '252540' }, line: { color: '3A3A4E', width: 0.5 }
});
slide6.addText('📊 Skill: 85%    📄 Resume: 72%    🎤 Interviews: 3', {
  x: 1.3, y: 3.55, w: 3.0, h: 0.3,
  fontSize: 9, fontFace: 'Segoe UI', color: ACCENT
});
slide6.addText('Progress Stats Cards', {
  x: 1.3, y: 3.9, w: 3.0, h: 0.3,
  fontSize: 8, fontFace: 'Segoe UI', color: LIGHT_GRAY
});

slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 4.6, y: 3.4, w: 3.2, h: 1.0, rectRadius: 0.1,
  fill: { color: '252540' }, line: { color: '3A3A4E', width: 0.5 }
});
slide6.addText('📈 Trend Line Chart + Bar Chart', {
  x: 4.7, y: 3.55, w: 3.0, h: 0.3,
  fontSize: 9, fontFace: 'Segoe UI', color: GREEN
});
slide6.addText('Chart.js Visualizations', {
  x: 4.7, y: 3.9, w: 3.0, h: 0.3,
  fontSize: 8, fontFace: 'Segoe UI', color: LIGHT_GRAY
});

// Feature explanations
const homeFeatures = [
  { title: 'Hero Section', desc: 'Animated SVG gradient orbs with grid pattern background and a compelling CTA' },
  { title: 'Progress Dashboard', desc: '4 stat cards showing latest scores + 2 Chart.js charts (trend line & overview bar)' },
  { title: 'Feature Cards', desc: '6 interactive cards with hover effects linking to each tool' },
  { title: 'Testimonials', desc: 'User success stories with role badges and star ratings' },
  { title: 'Scroll Animations', desc: 'IntersectionObserver-based reveal animations on every section' },
];

slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 8.8, y: 1.5, w: 4.0, h: 5.2, rectRadius: 0.15,
  fill: { color: CARD_BG }, line: { color: '2A2A3E', width: 1 }
});
slide6.addText('Key Features', {
  x: 9.0, y: 1.65, w: 3.6, h: 0.45,
  fontSize: 14, fontFace: 'Segoe UI', bold: true, color: ACCENT
});

homeFeatures.forEach((f, i) => {
  slide6.addText(`▸ ${f.title}`, {
    x: 9.0, y: 2.15 + i * 0.9, w: 3.6, h: 0.3,
    fontSize: 11, fontFace: 'Segoe UI', bold: true, color: WHITE
  });
  slide6.addText(f.desc, {
    x: 9.0, y: 2.45 + i * 0.9, w: 3.6, h: 0.5,
    fontSize: 9, fontFace: 'Segoe UI', color: LIGHT_GRAY, lineSpacingMultiple: 1.2
  });
});

// ============================================================
// SLIDE 7: Skill Assessment Page
// ============================================================
let slide7 = pptx.addSlide();
addBg(slide7);
addFooter(slide7, 7, TOTAL_SLIDES);

slide7.addText('📊  Skill Assessment', {
  x: 0.8, y: 0.4, w: 11.73, h: 0.8,
  fontSize: 28, fontFace: 'Segoe UI', bold: true, color: WHITE
});
slide7.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8, y: 1.15, w: 2, h: 0.04, fill: { color: PRIMARY }
});

// 3-step flow
const steps = [
  { num: '1', title: 'Choose Role & Level', desc: '21 roles across 6 categories\n(Dev, QA, Data, Design,\nSecurity, Management)\n+ 3 difficulty levels', color: PRIMARY },
  { num: '2', title: 'Take 10-Question Quiz', desc: 'AI generates role-specific\nMCQs with 4 options each.\nProgress bar tracks\ncompletion.', color: ACCENT },
  { num: '3', title: 'Get SVG Scorecard', desc: 'Animated score circle,\nletter grade, category bars,\nstrengths, weaknesses,\n& recommendations', color: GREEN },
];

steps.forEach((s, i) => {
  const x = 0.8 + i * 4.1;
  slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x, y: 1.5, w: 3.8, h: 2.8, rectRadius: 0.15,
    fill: { color: CARD_BG }, line: { color: s.color, width: 1.5 }
  });
  slide7.addShape(pptx.shapes.OVAL, {
    x: x + 1.5, y: 1.7, w: 0.7, h: 0.7,
    fill: { color: s.color },
    line: { color: s.color, width: 0 }
  });
  slide7.addText(s.num, {
    x: x + 1.5, y: 1.7, w: 0.7, h: 0.7,
    fontSize: 20, fontFace: 'Segoe UI', bold: true, color: WHITE, align: 'center', valign: 'middle'
  });
  slide7.addText(s.title, {
    x: x + 0.2, y: 2.5, w: 3.4, h: 0.4,
    fontSize: 14, fontFace: 'Segoe UI', bold: true, color: WHITE, align: 'center'
  });
  slide7.addText(s.desc, {
    x: x + 0.2, y: 2.95, w: 3.4, h: 1.2,
    fontSize: 10.5, fontFace: 'Segoe UI', color: LIGHT_GRAY, align: 'center', lineSpacingMultiple: 1.25
  });
});

// Arrows between steps
slide7.addText('►', { x: 4.35, y: 2.4, w: 0.8, h: 0.5, fontSize: 24, color: PRIMARY, align: 'center' });
slide7.addText('►', { x: 8.45, y: 2.4, w: 0.8, h: 0.5, fontSize: 24, color: ACCENT, align: 'center' });

// Supported roles list
slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8, y: 4.6, w: 11.73, h: 2.2, rectRadius: 0.15,
  fill: { color: CARD_BG }, line: { color: '2A2A3E', width: 1 }
});
slide7.addText('Supported Roles (21 Total)', {
  x: 1.0, y: 4.75, w: 11.33, h: 0.4,
  fontSize: 13, fontFace: 'Segoe UI', bold: true, color: ACCENT
});

const roleGroups = [
  { group: 'Development', roles: 'Frontend, Backend, Full Stack, Mobile, DevOps, AI/ML' },
  { group: 'QA & Testing', roles: 'QA Engineer, Automation Tester, SDET, Performance Tester' },
  { group: 'Data & Analytics', roles: 'Data Analyst, Data Engineer, BI Analyst' },
  { group: 'Design & Product', roles: 'UI/UX Designer, Product Manager' },
  { group: 'Security & Cloud', roles: 'Cybersecurity Analyst, Cloud Engineer, Network Engineer' },
  { group: 'Management', roles: 'Engineering Manager, Scrum Master, Technical Writer' },
];

roleGroups.forEach((rg, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  slide7.addText(`${rg.group}:  ${rg.roles}`, {
    x: 1.0 + col * 3.9, y: 5.2 + row * 0.65, w: 3.7, h: 0.55,
    fontSize: 9, fontFace: 'Segoe UI', color: LIGHT_GRAY, lineSpacingMultiple: 1.15
  });
});

// ============================================================
// SLIDE 8: Learning Roadmap & Resume Analyzer
// ============================================================
let slide8 = pptx.addSlide();
addBg(slide8);
addFooter(slide8, 8, TOTAL_SLIDES);

slide8.addText('🗺️  Learning Roadmap  &  📄 Resume Analyzer', {
  x: 0.8, y: 0.4, w: 11.73, h: 0.8,
  fontSize: 26, fontFace: 'Segoe UI', bold: true, color: WHITE
});
slide8.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8, y: 1.15, w: 3, h: 0.04, fill: { color: PRIMARY }
});

// Learning Roadmap side
slide8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.6, y: 1.5, w: 5.9, h: 5.4, rectRadius: 0.15,
  fill: { color: CARD_BG }, line: { color: PRIMARY, width: 1.5 }
});
slide8.addText('🗺️ Learning Roadmap', {
  x: 0.8, y: 1.65, w: 5.5, h: 0.5,
  fontSize: 16, fontFace: 'Segoe UI', bold: true, color: PRIMARY
});

const roadmapFeatures = [
  '✅ Select target role from 21+ options',
  '✅ AI generates a multi-phase learning timeline',
  '✅ Each phase has topics, resources & projects',
  '✅ Color-coded dots (🟣 upcoming, 🔵 current, 🟢 done)',
  '✅ Expandable/collapsible phase cards',
  '✅ Resource pills link to courses & docs',
  '✅ Project cards with tech stack tags',
  '✅ Milestone checklists to track progress',
];
roadmapFeatures.forEach((f, i) => {
  slide8.addText(f, {
    x: 1.0, y: 2.25 + i * 0.52, w: 5.2, h: 0.45,
    fontSize: 10.5, fontFace: 'Segoe UI', color: LIGHT_GRAY
  });
});

// Resume Analyzer side
slide8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 6.8, y: 1.5, w: 5.9, h: 5.4, rectRadius: 0.15,
  fill: { color: CARD_BG }, line: { color: ACCENT, width: 1.5 }
});
slide8.addText('📄 Resume Analyzer', {
  x: 7.0, y: 1.65, w: 5.5, h: 0.5,
  fontSize: 16, fontFace: 'Segoe UI', bold: true, color: ACCENT
});

const resumeFeatures = [
  '✅ Paste resume + optional job description',
  '✅ AI returns ATS compatibility score (0-100)',
  '✅ Animated half-circle ATS gauge',
  '✅ Section-by-section scoring with status bars',
  '✅ Missing keywords detection panel',
  '✅ Weak sections identified with fixes',
  '✅ AI-rewritten bullet points (before → after)',
  '✅ Actionable recommendations list',
];
resumeFeatures.forEach((f, i) => {
  slide8.addText(f, {
    x: 7.2, y: 2.25 + i * 0.52, w: 5.2, h: 0.45,
    fontSize: 10.5, fontFace: 'Segoe UI', color: LIGHT_GRAY
  });
});

// ============================================================
// SLIDE 9: Mock Interview & Career Path
// ============================================================
let slide9 = pptx.addSlide();
addBg(slide9);
addFooter(slide9, 9, TOTAL_SLIDES);

slide9.addText('🎤  Mock Interview  &  🧭 Career Path Recommender', {
  x: 0.8, y: 0.4, w: 11.73, h: 0.8,
  fontSize: 24, fontFace: 'Segoe UI', bold: true, color: WHITE
});
slide9.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8, y: 1.15, w: 3, h: 0.04, fill: { color: PRIMARY }
});

// Mock Interview side
slide9.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.6, y: 1.5, w: 5.9, h: 5.4, rectRadius: 0.15,
  fill: { color: CARD_BG }, line: { color: GREEN, width: 1.5 }
});
slide9.addText('🎤 Mock Interview Simulator', {
  x: 0.8, y: 1.65, w: 5.5, h: 0.5,
  fontSize: 16, fontFace: 'Segoe UI', bold: true, color: GREEN
});

const interviewFeatures = [
  '✅ Choose role, topic focus & difficulty',
  '✅ QA/Testing topics: Manual, Automation, API, Perf',
  '✅ AI generates 5 structured questions',
  '✅ Type answers in expandable text areas',
  '✅ Per-answer AI feedback with score (1-10)',
  '✅ Strengths, gaps & ideal answer shown',
  '✅ Final report with overall score & verdict',
  '✅ Canvas-based radar chart visualization',
];
interviewFeatures.forEach((f, i) => {
  slide9.addText(f, {
    x: 1.0, y: 2.25 + i * 0.52, w: 5.2, h: 0.45,
    fontSize: 10.5, fontFace: 'Segoe UI', color: LIGHT_GRAY
  });
});

// Career Path side
slide9.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 6.8, y: 1.5, w: 5.9, h: 5.4, rectRadius: 0.15,
  fill: { color: CARD_BG }, line: { color: YELLOW, width: 1.5 }
});
slide9.addText('🧭 Career Path Recommender', {
  x: 7.0, y: 1.65, w: 5.5, h: 0.5,
  fontSize: 16, fontFace: 'Segoe UI', bold: true, color: YELLOW
});

const careerFeatures = [
  '✅ Multi-select checkbox form (skills + interests)',
  '✅ Includes QA, testing, PM, writing skills',
  '✅ 3 AI-recommended career paths',
  '✅ SVG match percentage ring per path',
  '✅ Skills gap chips (learn / improve / advanced)',
  '✅ Salary range tiers (Entry → Senior)',
  '✅ Market demand indicator & trend',
  '✅ First steps action plan with timeline',
];
careerFeatures.forEach((f, i) => {
  slide9.addText(f, {
    x: 7.2, y: 2.25 + i * 0.52, w: 5.2, h: 0.45,
    fontSize: 10.5, fontFace: 'Segoe UI', color: LIGHT_GRAY
  });
});

// ============================================================
// SLIDE 10: Tech Stack
// ============================================================
let slide10 = pptx.addSlide();
addBg(slide10);
addFooter(slide10, 10, TOTAL_SLIDES);

slide10.addText('🎨  Tech Stack', {
  x: 0.8, y: 0.4, w: 11.73, h: 0.8,
  fontSize: 30, fontFace: 'Segoe UI', bold: true, color: WHITE
});
slide10.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8, y: 1.15, w: 2, h: 0.04, fill: { color: PRIMARY }
});

const techStack = [
  { category: 'Backend', icon: '⚙️', items: ['Node.js (v18+)', 'Express 4.18', 'dotenv', 'cors'], color: GREEN },
  { category: 'AI Engine', icon: '🤖', items: ['Anthropic Claude API', '@anthropic-ai/sdk 0.24', 'claude-sonnet-4-20250514', 'Structured JSON output'], color: YELLOW },
  { category: 'Frontend', icon: '🖥️', items: ['Vanilla HTML5', 'CSS3 (3500+ lines)', 'JavaScript (ES6+)', 'Chart.js 4.4 (CDN)'], color: PRIMARY },
  { category: 'Design', icon: '🎨', items: ['Dark theme (#0F0F1A)', 'Primary: #6C63FF', 'Accent: #00D4FF', 'Responsive (3 breakpoints)'], color: ACCENT },
];

techStack.forEach((t, i) => {
  const x = 0.6 + i * 3.15;
  slide10.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x, y: 1.5, w: 2.95, h: 4.0, rectRadius: 0.15,
    fill: { color: CARD_BG }, line: { color: t.color, width: 1.5 }
  });
  slide10.addText(`${t.icon}  ${t.category}`, {
    x: x + 0.2, y: 1.7, w: 2.55, h: 0.5,
    fontSize: 16, fontFace: 'Segoe UI', bold: true, color: t.color
  });
  slide10.addShape(pptx.shapes.RECTANGLE, {
    x: x + 0.2, y: 2.25, w: 2.55, h: 0.02, fill: { color: '3A3A4E' }
  });
  t.items.forEach((item, j) => {
    slide10.addText(`▸ ${item}`, {
      x: x + 0.3, y: 2.45 + j * 0.55, w: 2.4, h: 0.45,
      fontSize: 11, fontFace: 'Segoe UI', color: LIGHT_GRAY
    });
  });
});

// Key metrics
slide10.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.6, y: 5.8, w: 12.13, h: 1.0, rectRadius: 0.15,
  fill: { color: CARD_BG }, line: { color: '2A2A3E', width: 1 }
});

const metrics = [
  { label: 'Total Files', value: '19', color: PRIMARY },
  { label: 'Lines of Code', value: '7,800+', color: GREEN },
  { label: 'API Endpoints', value: '9', color: ACCENT },
  { label: 'Supported Roles', value: '21', color: YELLOW },
  { label: 'CSS Lines', value: '3,500+', color: PRIMARY },
];
metrics.forEach((m, i) => {
  const x = 0.9 + i * 2.4;
  slide10.addText(m.value, {
    x: x, y: 5.9, w: 2.0, h: 0.45,
    fontSize: 22, fontFace: 'Segoe UI', bold: true, color: m.color, align: 'center'
  });
  slide10.addText(m.label, {
    x: x, y: 6.35, w: 2.0, h: 0.3,
    fontSize: 10, fontFace: 'Segoe UI', color: LIGHT_GRAY, align: 'center'
  });
});

// ============================================================
// SLIDE 11: Key Differentiators
// ============================================================
let slide11 = pptx.addSlide();
addBg(slide11);
addFooter(slide11, 11, TOTAL_SLIDES);

slide11.addText('⭐  Why DevGrow Stands Out', {
  x: 0.8, y: 0.4, w: 11.73, h: 0.8,
  fontSize: 30, fontFace: 'Segoe UI', bold: true, color: WHITE
});
slide11.addShape(pptx.shapes.RECTANGLE, {
  x: 0.8, y: 1.15, w: 2, h: 0.04, fill: { color: PRIMARY }
});

const diffs = [
  { icon: '🎯', title: 'Role-Specific, Not Generic', desc: 'Tailored assessments for 21 roles — from QA Engineer to Product Manager. Every quiz, interview, and roadmap is customized.' },
  { icon: '🤖', title: 'Powered by Claude AI', desc: 'Uses Anthropic\'s Claude for intelligent, context-aware responses — not template-based outputs.' },
  { icon: '🔄', title: 'Full Career Lifecycle', desc: 'One platform for skills → learning → resume → interview → career path. No need for 5 different tools.' },
  { icon: '📊', title: 'Data-Driven Progress', desc: 'Chart.js dashboard tracks your growth over time. See trends, not just snapshots.' },
  { icon: '🎨', title: 'Beautiful Dark UI', desc: '3,500+ lines of polished CSS with scroll animations, SVG graphics, and mobile responsiveness.' },
  { icon: '🆓', title: 'Open Source & Free', desc: 'Fully open-source. Bring your own API key and run locally. No subscriptions, no limits.' },
];

diffs.forEach((d, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = 0.8 + col * 6.2;
  const y = 1.5 + row * 1.85;

  slide11.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: x, y: y, w: 5.8, h: 1.6, rectRadius: 0.15,
    fill: { color: CARD_BG }, line: { color: '2A2A3E', width: 1 }
  });
  slide11.addText(d.icon, {
    x: x + 0.2, y: y + 0.2, w: 0.6, h: 0.5, fontSize: 24
  });
  slide11.addText(d.title, {
    x: x + 0.9, y: y + 0.15, w: 4.6, h: 0.4,
    fontSize: 14, fontFace: 'Segoe UI', bold: true, color: WHITE
  });
  slide11.addText(d.desc, {
    x: x + 0.9, y: y + 0.55, w: 4.7, h: 0.9,
    fontSize: 10.5, fontFace: 'Segoe UI', color: LIGHT_GRAY, lineSpacingMultiple: 1.2
  });
});

// ============================================================
// SLIDE 12: Thank You
// ============================================================
let slide12 = pptx.addSlide();
addBg(slide12);

// Top gradient bar
slide12.addShape(pptx.shapes.RECTANGLE, {
  x: 0, y: 0, w: 13.33, h: 0.06, fill: { color: PRIMARY }
});

slide12.addText('🙏', {
  x: 4.5, y: 1.5, w: 4.33, h: 1.2,
  fontSize: 60, align: 'center'
});

slide12.addText('Thank You!', {
  x: 2, y: 2.6, w: 9.33, h: 0.9,
  fontSize: 44, fontFace: 'Segoe UI', bold: true, color: WHITE, align: 'center'
});

slide12.addShape(pptx.shapes.RECTANGLE, {
  x: 5.5, y: 3.5, w: 2.33, h: 0.04, fill: { color: PRIMARY }
});

slide12.addText('DevGrow — AI-Powered Career Growth Platform', {
  x: 2, y: 3.8, w: 9.33, h: 0.5,
  fontSize: 16, fontFace: 'Segoe UI', color: ACCENT, align: 'center'
});

slide12.addText('Empowering professionals to grow smarter, faster, and with confidence.', {
  x: 2, y: 4.4, w: 9.33, h: 0.5,
  fontSize: 13, fontFace: 'Segoe UI', color: LIGHT_GRAY, align: 'center', italic: true
});

// Links / Contact
slide12.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 3.5, y: 5.2, w: 6.33, h: 1.4, rectRadius: 0.15,
  fill: { color: CARD_BG }, line: { color: '2A2A3E', width: 1 }
});
slide12.addText('🔗  GitHub: github.com/ServerusSnape/TCS-AI-Friday', {
  x: 3.8, y: 5.35, w: 5.73, h: 0.35,
  fontSize: 12, fontFace: 'Segoe UI', color: LIGHT_GRAY
});
slide12.addText('🌐  Live: http://localhost:3000', {
  x: 3.8, y: 5.7, w: 5.73, h: 0.35,
  fontSize: 12, fontFace: 'Segoe UI', color: LIGHT_GRAY
});
slide12.addText('👥  Team: TCS AI Friday', {
  x: 3.8, y: 6.05, w: 5.73, h: 0.35,
  fontSize: 12, fontFace: 'Segoe UI', color: LIGHT_GRAY
});

// ============================================================
// Generate the file
// ============================================================
const outputPath = 'DevGrow_Presentation.pptx';
pptx.writeFile({ fileName: outputPath })
  .then(() => {
    console.log(`\n✅ Presentation created successfully!`);
    console.log(`📁 File: ${outputPath}`);
    console.log(`📊 Total slides: ${TOTAL_SLIDES}`);
  })
  .catch(err => {
    console.error('Error creating presentation:', err);
  });
