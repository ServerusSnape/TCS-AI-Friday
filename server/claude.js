const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function askClaude(systemPrompt, userMessage) {
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });
    return response.content[0].text;
  } catch (error) {
    console.error('Claude API Error:', error.message);
    throw new Error('Failed to get AI response');
  }
}

module.exports = { askClaude };
