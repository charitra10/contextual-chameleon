export const threads = [
  {
    id: "1",
    title: "Help optimize this Python code",
    content: `
I am trying to optimize this Python loop.

\`\`\`python
for i in range(1000000):
    result += i
\`\`\`

Is there a faster way?
`,
    metadata: {
      interaction_mode: "DEV_STACK",
      confidence: 0.86,
      explanation: "Contains code blocks and debugging language"
    }
  },
  {
    id: "2",
    title: "Is remote work better than office work?",
    content: `
I think remote work improves productivity.
But some people say office culture is important.

What do you think?
`,
    metadata: {
      interaction_mode: "DEBATE",
      confidence: 0.91,
      explanation: "Contains opposing opinions and argument-style language"
    }
  },
  {
    id: "3",
    title: "My digital art portfolio",
    content: `
Here are some of my recent artworks.
Feedback is welcome!
`,
    metadata: {
      interaction_mode: "SHOWCASE",
      confidence: 0.94,
      explanation: "Visual showcase with creator content"
    }
  }
];
