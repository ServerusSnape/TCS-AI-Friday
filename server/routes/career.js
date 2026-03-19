const express = require('express');
const router = express.Router();
const { askClaude } = require('../claude');

router.post('/recommend', async (req, res) => {
  try {
    const { skills, interests, salaryExpectation, workStyle, experience } = req.body;

    const systemPrompt = `You are a world-class tech career advisor with deep knowledge of the job market, salary data, and industry trends.

IMPORTANT: Return ONLY valid JSON, no markdown, no code fences.

Return this exact JSON structure:
{
  "paths": [
    {
      "title": "<career path title, e.g. 'Machine Learning Engineer'>",
      "icon": "<single emoji>",
      "matchPercent": <number 60-98>,
      "tagline": "<one catchy sentence describing this career>",
      "whyFit": ["<reason 1 why this suits them>", "<reason 2>", "<reason 3>"],
      "skillsGap": [
        { "skill": "<skill name>", "level": "<learn|improve|advanced>", "priority": "<high|medium|low>" }
      ],
      "salaryRange": {
        "entry": "<e.g. $75K - $95K>",
        "mid": "<e.g. $110K - $140K>",
        "senior": "<e.g. $160K - $220K>",
        "average": "<e.g. $130K>"
      },
      "marketDemand": "<Very High|High|Moderate|Growing>",
      "demandTrend": "<up|stable|down>",
      "topCompanies": ["<company 1>", "<company 2>", "<company 3>", "<company 4>"],
      "firstSteps": [
        { "step": 1, "action": "<what to do first>", "timeframe": "<e.g. Week 1-2>" },
        { "step": 2, "action": "<what to do second>", "timeframe": "<e.g. Week 3-4>" },
        { "step": 3, "action": "<what to do third>", "timeframe": "<e.g. Month 2-3>" }
      ],
      "certifications": ["<relevant cert 1>", "<relevant cert 2>"],
      "dayInLife": "<1-2 sentence description of a typical day>"
    }
  ],
  "profileSummary": "<2 sentence summary of the candidate's profile and potential>"
}

Rules:
- Return exactly 3 career paths
- matchPercent should be realistic based on current skills overlap (first path highest)
- skillsGap: list 3-5 skills they need, with priority levels
- Salary data should be realistic 2024/2025 US market ranges
- firstSteps should be actionable and specific
- topCompanies: 4 real companies known for hiring this role
- Consider their work style preference: ${workStyle}
- Consider their salary expectation: ${salaryExpectation}
- Sort paths by matchPercent descending`;

    const skillsList = Array.isArray(skills) ? skills.join(', ') : skills;
    const interestsList = Array.isArray(interests) ? interests.join(', ') : interests;

    const message = `Profile:
- Current Skills: ${skillsList || 'Not specified'}
- Interests: ${interestsList || 'Not specified'}
- Experience Level: ${experience || 'Not specified'}
- Salary Expectation: ${salaryExpectation || 'Not specified'}
- Work Style Preference: ${workStyle || 'No preference'}

Recommend the 3 best career paths for this developer.`;

    const response = await askClaude(systemPrompt, message);

    let parsed;
    try {
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      const match = response.match(/\{[\s\S]*"paths"[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
      else throw new Error('Failed to parse career recommendations');
    }

    res.json({ success: true, data: parsed });
  } catch (error) {
    console.error('Career recommendation error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
