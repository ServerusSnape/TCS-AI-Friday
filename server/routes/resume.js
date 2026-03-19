const express = require('express');
const router = express.Router();
const { askClaude } = require('../claude');

router.post('/analyze', async (req, res) => {
  try {
    const { resumeText, jobDescription, targetRole } = req.body;

    const systemPrompt = `You are an elite ATS resume expert and tech hiring consultant. Analyze the resume against the job description and return ONLY valid JSON (no markdown, no code fences, no extra text).

Return this exact JSON structure:
{
  "atsScore": <number 0-100>,
  "atsVerdict": "<Excellent|Good|Needs Work|Poor>",
  "atsSummary": "<1-2 sentence ATS verdict>",
  "sectionScores": [
    { "section": "<e.g. Summary, Experience, Skills, Education, Projects>", "score": <0-100>, "status": "<strong|moderate|weak>", "feedback": "<1-2 sentence feedback>" }
  ],
  "missingKeywords": [
    { "keyword": "<keyword from JD not in resume>", "importance": "<critical|important|nice-to-have>" }
  ],
  "weakSections": [
    { "section": "<section name>", "issue": "<what's wrong>", "suggestion": "<how to fix>" }
  ],
  "rewrittenBullets": [
    { "original": "<original bullet point text>", "improved": "<rewritten with impact metrics and action verbs>", "reason": "<why this is better>" }
  ],
  "recommendations": [
    { "title": "<action item>", "description": "<detailed suggestion>", "priority": "<high|medium|low>", "category": "<formatting|content|keywords|structure>" }
  ],
  "overallSummary": "<2-3 sentence overall assessment with encouragement>"
}

Rules:
- atsScore must reflect actual keyword match percentage against the JD
- Provide 5-10 missing keywords sorted by importance
- Identify 2-4 weak sections with concrete fix suggestions
- Rewrite 3-5 bullet points showing before/after with quantified impact
- Give 4-6 prioritized recommendations
- sectionScores should cover: Summary, Experience, Skills, Education (and Projects if present)
- Be specific, actionable, and encouraging`;

    const jdContext = jobDescription
      ? `\n\nTARGET JOB DESCRIPTION:\n${jobDescription}`
      : `\n\nTARGET ROLE: ${targetRole || 'Software Developer'}`;

    const message = `Analyze this resume:

RESUME:
${resumeText}
${jdContext}`;

    const response = await askClaude(systemPrompt, message);

    let parsed;
    try {
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      const jsonMatch = response.match(/\{[\s\S]*"atsScore"[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse resume analysis');
      }
    }

    res.json({ success: true, analysis: parsed });
  } catch (error) {
    console.error('Resume analysis error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
