# CareerPilot AI – Memory-Powered Career & Interview Coach

CareerPilot AI is an end-to-end interview and career coaching platform that uses [Hindsight](https://github.com/vectorize-io/hindsight) to build persistent memory across every practice session. Instead of treating each mock interview as a clean slate, CareerPilot AI remembers your weak patterns, tracks your progress over time, and adjusts every session to close the gap between where you are and the role you're targeting.

## Why CareerPilot AI?

Most AI interview coaches forget everything the moment you close the tab. You practice the same question on Monday, stumble on it again Friday, and the tool has no idea you've answered it before. That's not coaching — that's a quiz.

CareerPilot AI gives you a coach with continuity:

- What did you struggle with last session?
- Are you consistently weak on a specific pattern, like quantifying impact in behavioral answers?
- How ready are you, really — based on weeks of signal, not one lucky run?
- What's the fastest path from your current skill set to your target role?

## Tech Stack

| Layer            | Technology                                                                 |
| ----------------- | --------------------------------------------------------------------------- |
| Frontend          | HTML, CSS, JavaScript                                                      |
| Memory Engine      | [Hindsight](https://github.com/vectorize-io/hindsight) (session-aware vector memory) |
| Model Routing     | CascadeFlow (task-based routing across model sizes)                       |
| LLM Backend        | Routed across multiple models depending on task complexity                 |
| Deployment         | Netlify                                                                    |

## Features

### 1. Adaptive Mock Interviews (Text & Voice)

Generates role-specific questions across three categories — technical/system design, behavioral (STAR format), and general coding — calibrated to a difficulty level you choose. Each answer is evaluated on structure, technical correctness, and specificity, with a score and model reference answer.

### 2. Persistent Interview Memory

After every session, structured observations (weak patterns, strong signals, scores) are written to Hindsight, namespaced per user and tagged by target role. Before your next session starts, the coach retrieves relevant memories via semantic search — so practicing "system design at scale" last week surfaces naturally when today's session touches "distributed caching," even without exact keyword matches.

### 3. Interview Readiness Score

A single percentage on the dashboard representing how ready you are for your target role. Instead of computing this from your most recent session alone (which is noisy), it's a weighted rolling average of your last five sessions, with more recent sessions weighted higher — so the number reflects weeks of signal, not a single run.

### 4. ATS Resume Analysis

Analyzes your resume against ATS parsing patterns to flag formatting and content issues before you submit it.

### 5. Skill Gap Analyzer

Benchmarks your current skill set against real job descriptions for your target role and highlights what's missing.

### 6. Cover Letter Drafting

Generates tailored cover letters based on your profile and the target role.

### 7. Salary Range Prediction

Estimates salary ranges for your target role, routed to a lightweight model for fast (~400ms) responses.

### 8. Career Coach Chat

An open-ended chat for career guidance, informed by the same memory layer as the interview simulator.

### 9. CascadeFlow Model Routing

Not every task needs the same reasoning depth. CascadeFlow routes lightweight tasks (salary lookups, quick skill gap checks) to smaller, faster models, and reserves full context-window models for tasks that need to hold a rubric, a question, a user's response, and memory context simultaneously — like grading a behavioral interview answer. This keeps aggregate token cost down without touching application logic.

## How Memory Works

**Writing memory after a session:**

```javascript
async function persistSessionMemory(userId, sessionData) {
  const memoryPayload = {
    userId,
    sessionId: sessionData.id,
    role: sessionData.targetRole,
    scores: sessionData.questionScores,
    weakPatterns: sessionData.weakPatterns,   // e.g. ["lacks metric outcomes", "STAR incomplete"]
    strongSignals: sessionData.strongSignals, // e.g. ["good system decomposition"]
    timestamp: new Date().toISOString()
  };

  await hindsight.retain(memoryPayload, {
    namespace: `user:${userId}`,
    tags: ['interview', sessionData.targetRole]
  });
}
```

**Recalling memory before the next session:**

```javascript
async function loadCandidateContext(userId, targetRole) {
  const memories = await hindsight.recall({
    namespace: `user:${userId}`,
    query: `interview performance ${targetRole}`,
    topK: 5,
    tags: ['interview', targetRole]
  });

  return memories.map(m => m.content);
}
```

Namespacing by user keeps retrieval from bleeding across accounts, and tagging by role means switching from "Backend Developer" prep to "AI Engineer" prep won't contaminate recall with unrelated sessions.

## Getting Started

### Prerequisites

- A modern web browser
- Node.js (if running any local build/dev tooling)
- API keys for your chosen LLM backend(s)
- A Hindsight instance (hosted or self-run) for persistent memory

### Installation

```
git clone https://github.com/Nagendra-yuvaraj/carrerpilot-ai.git
cd carrerpilot-ai
```

### Run the App

Open `index.html` in your browser, or serve the project directory with your preferred static server.

## Live Demo

CareerPilot AI is live at [regal-scone-c39c6b.netlify.app](https://regal-scone-c39c6b.netlify.app).

## Lessons Learned

- **Namespace memory from day one.** Retrofitting namespacing midway through development meant replaying all existing session writes.
- **What you write matters as much as whether you write.** Structured, terse payloads (weak patterns as arrays, strong signals as tags) retrieve and compose far better than raw evaluation text.
- **Semantic queries need to be prompt-like, not keyword-like.** A vague query like `"performance"` returns noise; a specific one like `"behavioral interview STAR structure AI Engineer"` returns the signal you actually need.
- **Don't let memory bloat the context window.** `topK: 5` with a recency bias gives the model enough history to be useful without hurting latency or quality.
- **Route aggressively.** Sending every task to a flagship model adds up fast — CascadeFlow made routing configurable without touching application logic.

## License

MIT
