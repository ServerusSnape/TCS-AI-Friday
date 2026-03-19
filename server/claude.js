const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function askClaude(systemPrompt, userMessage) {
  try {
    const response = await client.chat.completions.create({
      model: process.env.AI_MODEL || 'gpt-4o',
      max_tokens: 2048,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('AI API Error:', error.message);
    throw new Error('Failed to get AI response');
  }
}

module.exports = { askClaude };
