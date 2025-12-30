export async function classifyThread(title: string, content: string) {
  const prompt = `
You are classifying forum threads by interaction mode.

Choose exactly ONE of the following:
- DEV_STACK (technical problem solving, code, debugging)
- DEBATE (arguments, opinions, opposing views)
- SHOWCASE (art, images, portfolios)


Thread title:
${title}

Thread content:
${content}

Respond ONLY with valid JSON in this exact format:
{
  "interaction_mode": "DEV_STACK | DEBATE | SHOWCASE ",
  "confidence": number,
  "reason": string
}
`;

  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3.2",
      prompt,
      stream: false,
    }),
  });

  const data = await response.json();

  
  const text = data.response.trim();

  const jsonMatch = text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    return {
      interaction_mode: "DEV_STACK",
      confidence: 0.5,
      reason: "Fallback: could not parse LLM output",
    };
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch {
    return {
      interaction_mode: "DEV_STACK",
      confidence: 0.5,
      reason: "Fallback: invalid JSON from model",
    };
  }
}
