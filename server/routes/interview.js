const express = require('express');
const router = express.Router();
const { askClaude } = require('../claude');

// Generate 5 interview questions upfront
router.post('/generate', async (req, res) => {
  try {
    const { role, difficulty, topic } = req.body;
    const systemPrompt = `You are a senior technical interviewer at a top tech company. Generate exactly 5 technical interview questions.

IMPORTANT: Return ONLY valid JSON, no markdown, no code fences.

Return this exact JSON structure:
{
  "questions": [
    {
      "id": 1,
      "category": "<e.g. Data Structures, System Design, JavaScript, React, etc.>",
      "question": "<the interview question text>",
      "difficulty": "<easy|medium|hard>",
      "expectedTopics": ["<key topic 1>", "<key topic 2>", "<key topic 3>"]
    }
  ]
}

Rules:
- Generate exactly 5 questions
- Role: ${role || 'Software Developer'}
- Difficulty: ${difficulty || 'Medium'}
- Topic focus: ${topic || 'General'}
- Questions should progress in difficulty slightly
- Each question should cover a different sub-topic/category
- expectedTopics are the key points a good answer should cover (3-5 per question)
- Questions should be open-ended, requiring explanation (not multiple choice)
- Make them realistic — the kind asked at Google, Amazon, Meta, etc.`;

    const message = `Generate 5 ${difficulty || 'medium'}-level technical interview questions for a ${role || 'Software Developer'} position, focusing on ${topic || 'general topics'}.`;
    const response = await askClaude(systemPrompt, message);

    let parsed;
    try {
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      const match = response.match(/\{[\s\S]*"questions"[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
      else throw new Error('Failed to parse interview questions');
    }

    res.json({ success: true, questions: parsed.questions });
  } catch (error) {
    console.error('Interview generation error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Evaluate a single answer
router.post('/evaluate', async (req, res) => {
  try {
    const { question, answer, role, difficulty, category } = req.body;
    const systemPrompt = `You are a senior technical interviewer evaluating a candidate's answer. 

IMPORTANT: Return ONLY valid JSON, no markdown, no code fences.

Return this exact JSON structure:
{
  "score": <number 1-10>,
  "strengths": ["<what was good 1>", "<what was good 2>"],
  "gaps": ["<what was missing 1>", "<what was missing 2>"],
  "idealAnswer": "<a comprehensive model answer in 3-6 sentences>",
  "tip": "<one actionable improvement tip>"
}

Rules:
- Score 1-10 based on accuracy, depth, and clarity
- Provide 2-3 specific strengths (even if answer is weak, find something)
- Provide 2-3 specific gaps or missing points
- The ideal answer should be concise but thorough — what a top candidate would say
- The tip should be specific and actionable
- Consider role: ${role}, difficulty: ${difficulty}, category: ${category}
- Be encouraging but honest`;

    const message = `Question: "${question}"

Candidate's answer: "${answer}"

Evaluate this answer for a ${difficulty} ${role} interview.`;

    const response = await askClaude(systemPrompt, message);

    let parsed;
    try {
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      const match = response.match(/\{[\s\S]*"score"[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
      else throw new Error('Failed to parse evaluation');
    }

    res.json({ success: true, evaluation: parsed });
  } catch (error) {
    console.error('Evaluation error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate final interview report
router.post('/report', async (req, res) => {
  try {
    const { role, difficulty, topic, questionsAndResults } = req.body;

    const systemPrompt = `You are a senior hiring manager writing an interview debrief. Analyze the candidate's full interview performance.

IMPORTANT: Return ONLY valid JSON, no markdown, no code fences.

Return this exact JSON structure:
{
  "overallScore": <number 0-100>,
  "verdict": "<Strong Hire|Hire|Lean Hire|Lean No Hire|No Hire>",
  "summary": "<2-3 sentence overall assessment>",
  "categoryScores": [
    { "category": "<category name>", "score": <number 0-10>, "maxScore": 10 }
  ],
  "topStrengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "criticalGaps": ["<gap 1>", "<gap 2>", "<gap 3>"],
  "improvementPlan": [
    { "area": "<skill area>", "action": "<what to do>", "resource": "<specific resource suggestion>", "timeframe": "<e.g. 1-2 weeks>" }
  ],
  "interviewTips": ["<tip 1>", "<tip 2>", "<tip 3>"]
}

Rules:
- overallScore = weighted average of individual scores mapped to 0-100
- categoryScores must include each unique question category
- Provide 3-4 strengths, 2-3 critical gaps
- improvementPlan should have 3-4 entries with real resource suggestions
- interviewTips should be specific behavioral/presentation advice
- verdict should map to: 80+= Strong Hire, 65+= Hire, 50+= Lean Hire, 35+= Lean No Hire, <35= No Hire`;

    const qaDetails = questionsAndResults.map((qr, i) =>
      `Q${i + 1} [${qr.category}]: "${qr.question}"\nAnswer: "${qr.answer}"\nScore: ${qr.score}/10`
    ).join('\n\n');

    const message = `Generate a final interview report for a ${difficulty} ${role} interview focused on ${topic}.

Performance breakdown:
${qaDetails}`;

    const response = await askClaude(systemPrompt, message);

    let parsed;
    try {
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      const match = response.match(/\{[\s\S]*"overallScore"[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
      else throw new Error('Failed to parse report');
    }

    res.json({ success: true, report: parsed });
  } catch (error) {
    console.error('Report error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
