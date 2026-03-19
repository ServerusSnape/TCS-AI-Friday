const express = require('express');
const router = express.Router();
const { askClaude } = require('../claude');

// General AI chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    const systemPrompt = `You are DevGrow AI, an expert career coach for software developers. 
    You help with skill assessments, learning roadmaps, resume reviews, mock interviews, and career planning.
    Be concise, actionable, and encouraging. Format responses with markdown when helpful.
    Context: ${context || 'General career advice'}`;

    const response = await askClaude(systemPrompt, message);
    res.json({ success: true, response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Generate structured learning roadmap
router.post('/roadmap', async (req, res) => {
  try {
    const { targetRole, currentSkills, level, hoursPerWeek } = req.body;
    const systemPrompt = `You are an expert developer career coach and curriculum designer. Create a detailed, structured learning roadmap.

IMPORTANT: Return ONLY valid JSON, no markdown, no code fences.

Return this exact JSON structure:
{
  "title": "Roadmap to <Target Role>",
  "estimatedWeeks": <total weeks number>,
  "jobReadyTime": "<e.g. 6-8 months>",
  "phases": [
    {
      "id": 1,
      "name": "Phase Name",
      "weeks": "<e.g. Weeks 1-3>",
      "duration": "<e.g. 3 weeks>",
      "icon": "<single emoji>",
      "color": "<blue|purple|cyan|green|orange|pink>",
      "description": "Brief phase summary",
      "topics": [
        { "name": "Topic Name", "importance": "<essential|important|nice-to-have>" }
      ],
      "resources": [
        { "name": "Resource Name", "type": "<free|paid>", "platform": "<YouTube|Udemy|Docs|Book|Coursera|etc>", "url": "<real URL or #>" }
      ],
      "projects": [
        { "name": "Project Name", "description": "Brief description" }
      ],
      "milestones": ["Milestone 1", "Milestone 2"]
    }
  ],
  "tips": ["Pro tip 1", "Pro tip 2", "Pro tip 3"]
}

Rules:
- Create 4-6 phases that build on each other logically
- Each phase should have 3-5 topics, 2-4 resources (mix of free and paid), 1-2 projects, and 2-3 milestones
- Adjust timeline based on ${hoursPerWeek} hours/week availability
- Account for the user's existing skills to skip basics they already know
- Be specific with resource names — use real courses and platforms
- Projects should be portfolio-worthy and progressively complex`;

    const message = `Create a learning roadmap:
- Target Role: ${targetRole}
- Current Level: ${level}
- Existing Skills: ${currentSkills || 'None specified'}
- Available Time: ${hoursPerWeek} hours/week`;

    const response = await askClaude(systemPrompt, message);

    let parsed;
    try {
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      const jsonMatch = response.match(/\{[\s\S]*"phases"[\s\S]*\}/);
      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse roadmap');
      }
    }

    res.json({ success: true, roadmap: parsed });
  } catch (error) {
    console.error('Roadmap error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
