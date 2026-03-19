const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../db');

// ===== Signup =====
router.post('/signup', (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required.' });
    }

    // Check if user exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(409).json({ success: false, error: 'An account with this email already exists.' });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert user
    const result = db.prepare(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)'
    ).run(name, email, hashedPassword, role || '');

    // Set session
    req.session.userId = result.lastInsertRowid;
    req.session.userName = name;
    req.session.userEmail = email;

    res.json({ success: true, user: { id: result.lastInsertRowid, name, email, role: role || '' } });
  } catch (error) {
    console.error('Signup error:', error.message);
    res.status(500).json({ success: false, error: 'Server error during signup.' });
  }
});

// ===== Login =====
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    // Set session
    req.session.userId = user.id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;

    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, error: 'Server error during login.' });
  }
});

// ===== Logout =====
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

// ===== Get current user =====
router.get('/me', (req, res) => {
  if (!req.session.userId) {
    return res.json({ success: false, user: null });
  }
  const user = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(req.session.userId);
  if (!user) {
    return res.json({ success: false, user: null });
  }
  res.json({ success: true, user });
});

// ===== Save progress =====
router.post('/progress', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ success: false, error: 'Not logged in.' });
  }
  try {
    const { type, score, grade, metadata } = req.body;
    db.prepare(
      'INSERT INTO progress (user_id, type, score, grade, metadata) VALUES (?, ?, ?, ?, ?)'
    ).run(req.session.userId, type, score || null, grade || null, metadata ? JSON.stringify(metadata) : null);

    res.json({ success: true });
  } catch (error) {
    console.error('Save progress error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to save progress.' });
  }
});

// ===== Get progress =====
router.get('/progress', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ success: false, error: 'Not logged in.' });
  }
  try {
    const rows = db.prepare(
      'SELECT * FROM progress WHERE user_id = ? ORDER BY created_at DESC'
    ).all(req.session.userId);

    // Build summary
    const skillRows = rows.filter(r => r.type === 'skill');
    const resumeRows = rows.filter(r => r.type === 'resume');
    const interviewRows = rows.filter(r => r.type === 'interview');
    const roadmapRows = rows.filter(r => r.type === 'roadmap');

    const summary = {
      skillScore: skillRows[0]?.score || 0,
      skillGrade: skillRows[0]?.grade || '-',
      skillDate: skillRows[0]?.created_at || null,
      skillHistory: skillRows.slice(0, 10).map(r => ({ score: r.score, date: r.created_at })).reverse(),

      resumeScore: resumeRows[0]?.score || 0,
      resumeDate: resumeRows[0]?.created_at || null,
      resumeHistory: resumeRows.slice(0, 10).map(r => ({ score: r.score, date: r.created_at })).reverse(),

      interviewCount: interviewRows.length,
      lastInterviewScore: interviewRows[0]?.score || 0,
      interviewDate: interviewRows[0]?.created_at || null,
      interviewHistory: interviewRows.slice(0, 10).map(r => ({ score: r.score, date: r.created_at })).reverse(),

      roadmapPercent: roadmapRows[0]?.score || 0,
      roadmapCount: roadmapRows.length,
    };

    res.json({ success: true, progress: summary });
  } catch (error) {
    console.error('Get progress error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to load progress.' });
  }
});

module.exports = router;
