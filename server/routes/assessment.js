const express = require('express');
const router = express.Router();
const { askClaude } = require('../claude');

// Generate 10 quiz questions based on role + level
router.post('/generate-quiz', async (req, res) => {
  try {
    const { role, level } = req.body;
    const systemPrompt = `You are a senior professional interviewer with expertise across all tech domains — development, QA, data, design, product, security, and management. Generate exactly 10 multiple-choice questions for a ${level} ${role}. 
    
IMPORTANT: Return ONLY valid JSON, no markdown, no code fences, no explanation text. The response must be parseable JSON.

Return this exact JSON structure:
{
  "questions": [
    {
      "id": 1,
      "category": "Category Name",
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 0
    }
  ]
}

Rules:
- Each question MUST have exactly 4 options
- "correct" is the 0-based index of the correct answer
- Cover diverse topics relevant to the "${role}" role specifically
- Difficulty should match the "${level}" level
- Categories MUST reflect real skill areas for "${role}". Examples by role type:
  * QA Engineer: "Test Planning", "Bug Lifecycle", "Test Case Design", "SDLC Models", "Defect Management", "Regression Testing"
  * Automation Test Engineer: "Selenium WebDriver", "Test Frameworks", "CI/CD Testing", "Page Object Model", "API Testing", "BDD/Cucumber"
  * SDET: "Test Architecture", "Code Quality", "Unit Testing", "Integration Testing", "Mocking & Stubbing", "Test Automation Design"
  * Performance Test Engineer: "JMeter/Gatling", "Load Testing", "Performance Metrics", "Bottleneck Analysis", "Stress Testing", "Scalability"
  * Data Analyst: "SQL Queries", "Data Visualization", "Statistics", "Excel/Pivot Tables", "ETL Basics", "Business Metrics"
  * Data Engineer: "Data Pipelines", "SQL & NoSQL", "Apache Spark", "Data Warehousing", "ETL Design", "Cloud Data Services"
  * UI/UX Designer: "Design Principles", "User Research", "Wireframing", "Accessibility", "Interaction Design", "Usability Testing"
  * Product Manager: "Product Strategy", "Agile/Scrum", "User Stories", "Prioritization Frameworks", "Metrics & KPIs", "Stakeholder Management"
  * Cybersecurity Analyst: "Network Security", "Threat Modeling", "OWASP Top 10", "Incident Response", "Cryptography", "Vulnerability Assessment"
  * Cloud Engineer: "AWS/Azure/GCP", "Infrastructure as Code", "Containers & Kubernetes", "Networking", "IAM & Security", "Cost Optimization"
  * Scrum Master: "Scrum Framework", "Sprint Planning", "Retrospectives", "Impediment Removal", "Agile Metrics", "Servant Leadership"
  * Technical Writer: "Documentation Standards", "API Documentation", "Information Architecture", "Style Guides", "Audience Analysis", "Tools & Platforms"
  * For developer roles, use coding/architecture categories as usual
- Questions should test practical, job-relevant knowledge — not trivia`;

    const message = `Generate 10 ${level}-level multiple choice questions for a ${role} position.`;
    const response = await askClaude(systemPrompt, message);

    // Try to parse the JSON from Claude's response
    let parsed;
    try {
      // Strip markdown code fences if present
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*"questions"[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse quiz questions from AI response');
      }
    }

    res.json({ success: true, questions: parsed.questions });
  } catch (error) {
    console.error('Quiz generation error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Evaluate quiz answers
router.post('/evaluate', async (req, res) => {
  try {
    const { role, level, questions, userAnswers, correctCount, totalQuestions } = req.body;

    const systemPrompt = `You are an expert skill assessor with deep knowledge of all tech roles — development, QA, testing, data, design, product, security, cloud, and management. Analyze the quiz performance for a "${role}" professional and return ONLY valid JSON (no markdown, no code fences).

Return this exact JSON structure:
{
  "overallScore": <number 0-100>,
  "grade": "<letter grade A+ through F>",
  "summary": "<2-3 sentence overall assessment>",
  "categoryScores": [
    { "category": "<skill area>", "score": <0-100>, "status": "<strong|moderate|weak>" }
  ],
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>"],
  "recommendations": [
    { "title": "<actionable step>", "description": "<brief how-to>", "priority": "<high|medium|low>" }
  ]
}

Rules:
- overallScore should reflect ${correctCount}/${totalQuestions} correct but also consider difficulty
- categoryScores should group questions by their category
- Provide exactly 3-5 strengths
- Provide 2-4 weaknesses  
- Provide 3-5 recommendations sorted by priority
- Be encouraging but honest`;

    // Build a detailed breakdown of answers
    const answerDetails = questions.map((q, i) => {
      const userIdx = userAnswers[i];
      const isCorrect = userIdx === q.correct;
      return `Q${i + 1} [${q.category}]: "${q.question}" — User answered: "${q.options[userIdx]}" ${isCorrect ? '✅ CORRECT' : `❌ WRONG (correct: "${q.options[q.correct]}")`}`;
    }).join('\n');

    const message = `Evaluate this ${level} ${role} assessment:

Score: ${correctCount}/${totalQuestions} correct

Detailed answers:
${answerDetails}

Provide a comprehensive skill evaluation.`;

    const response = await askClaude(systemPrompt, message);

    let parsed;
    try {
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      const jsonMatch = response.match(/\{[\s\S]*"overallScore"[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse evaluation');
      }
    }

    res.json({ success: true, evaluation: parsed });
  } catch (error) {
    console.error('Evaluation error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
