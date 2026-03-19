require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const aiRoutes = require('./routes/ai');
const assessmentRoutes = require('./routes/assessment');
const resumeRoutes = require('./routes/resume');
const interviewRoutes = require('./routes/interview');
const careerRoutes = require('./routes/career');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/client', express.static(path.join(__dirname, '..', 'client')));
app.use('/components', express.static(path.join(__dirname, '..', 'components')));

// API Routes
app.use('/api/ai', aiRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/interview', interviewRoutes);
app.use('/api/career', careerRoutes);

// Serve pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.get('/skill-assessment', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'skill-assessment.html'));
});

app.get('/learning-roadmap', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'learning-roadmap.html'));
});

app.get('/resume-analyzer', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'resume-analyzer.html'));
});

app.get('/mock-interview', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'mock-interview.html'));
});

app.get('/career-path', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'career-path.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 DevGrow server running at http://localhost:${PORT}`);
});
