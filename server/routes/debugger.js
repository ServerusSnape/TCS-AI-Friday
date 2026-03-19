const express = require('express');
const router = express.Router();
const { askClaude } = require('../claude');

router.post('/analyze', async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ success: false, error: 'No code provided.' });
    }

    const systemPrompt = `You are an elite code debugger and static analyzer. You analyze code line-by-line and find ALL issues — bugs, logical errors, syntax errors, security vulnerabilities, performance problems, bad practices, and potential runtime exceptions.

IMPORTANT: Return ONLY valid JSON, no markdown, no code fences.

Return this exact JSON structure:
{
  "language": "<detected or provided language>",
  "overallSeverity": "<critical|warning|info|clean>",
  "summary": "<1-2 sentence overall assessment>",
  "score": <0-100 code quality score>,
  "issues": [
    {
      "line": <line number (1-indexed)>,
      "endLine": <end line if multi-line issue, otherwise same as line>,
      "column": <column number if applicable, else 0>,
      "severity": "<error|warning|info|style>",
      "category": "<syntax|logic|security|performance|bestPractice|runtime|memory|typeSafety>",
      "title": "<short 3-6 word issue title>",
      "message": "<clear explanation of WHAT is wrong and WHY>",
      "suggestion": "<specific fix with actual code if possible>",
      "fixedCode": "<the corrected version of the problematic line(s)>"
    }
  ],
  "improvements": [
    {
      "type": "<readability|performance|security|modernization|structure>",
      "suggestion": "<specific improvement recommendation>"
    }
  ],
  "fixedCode": "<the entire code rewritten with ALL issues fixed>"
}

Rules:
- Analyze EVERY line carefully — don't miss anything
- Line numbers must match the actual code lines (1-indexed)
- severity levels: error (breaks/crashes), warning (likely bug), info (improvement), style (formatting/convention)
- For each issue, provide a specific fixedCode showing the corrected line
- At the end, provide the entire fixedCode with ALL fixes applied
- If the code is clean, return empty issues array with overallSeverity "clean"
- Be thorough but avoid false positives
- Include at least 1-3 improvements even for good code
- The score should reflect: 100 = perfect, 0 = completely broken
- Detect the language if not provided`;

    const message = `Language: ${language || 'auto-detect'}

Code to analyze:
\`\`\`
${code}
\`\`\`

Perform a thorough line-by-line debug analysis of this code.`;

    const response = await askClaude(systemPrompt, message);

    let parsed;
    try {
      const cleaned = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      const match = response.match(/\{[\s\S]*"issues"[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
      else throw new Error('Failed to parse debug analysis');
    }

    res.json({ success: true, data: parsed });
  } catch (error) {
    console.error('Debugger error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
