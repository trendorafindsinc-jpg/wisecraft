/**
 * AI Service
 * Architecture for AI-powered interactions
 * Currently returns mock responses — ready for OpenAI integration
 */

export interface AIRequest {
  prompt: string;
  context?: string;
  userId?: string;
  sessionId?: string;
}

export interface AIResponse {
  content: string;
  suggestions?: string[];
  confidence?: number;
  metadata?: {
    model?: string;
    tokensUsed?: number;
    processingTime?: number;
  };
}

export interface AIConversation {
  id: string;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface AIMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

// Mock AI responses for development
const MOCK_RESPONSES: Record<string, string[]> = {
  default: [
    "That's a great question! Let me think through this with you. Based on your profile, I'd recommend starting with a structured approach.",
    "I understand your situation. Here's what I'd suggest based on best practices and your current progress.",
    "Excellent point! Let me provide some actionable steps you can take right away.",
  ],
  business: [
    "Starting a side business is one of the best ways to grow your income. Let's validate your idea first — who is your target customer?",
    "For a business model to work, you need three things: a problem worth solving, people willing to pay, and a way to reach them. Let's break yours down.",
    "Before investing heavily, test your idea with a minimum viable product. What's the simplest version you could launch this week?",
  ],
  finance: [
    "Building financial security starts with an emergency fund. Aim for 3-6 months of expenses before investing.",
    "Diversification is key. Consider index funds for steady growth, and only invest money you won't need for 5+ years.",
    "Let's look at your cash flow. The goal is to increase income, reduce unnecessary expenses, and automate your savings.",
  ],
  skills: [
    "High-income skills right now include: software development, digital marketing, data analysis, and AI prompt engineering.",
    "The best skill to learn depends on your interests and market demand. What's something you enjoy that others struggle with?",
    "Consider combining skills. For example, writing + SEO = content marketing. Design + coding = UI/UX development.",
  ],
};

function getMockResponse(prompt: string): string {
  const lower = prompt.toLowerCase();
  let category = "default";
  if (lower.includes("business") || lower.includes("startup") || lower.includes("side")) {
    category = "business";
  } else if (lower.includes("invest") || lower.includes("save") || lower.includes("budget") || lower.includes("money")) {
    category = "finance";
  } else if (lower.includes("skill") || lower.includes("learn") || lower.includes("course")) {
    category = "skills";
  }
  const responses = MOCK_RESPONSES[category];
  return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Send a message to the AI and get a response
 * TODO: Replace with actual OpenAI API call
 */
export async function sendMessage(request: AIRequest): Promise<AIResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200));

  const content = getMockResponse(request.prompt);

  return {
    content,
    suggestions: [
      "Tell me more about that",
      "What are the next steps?",
      "Can you give me an example?",
    ],
    confidence: 0.92,
    metadata: {
      model: "wisecraft-mock-v1",
      tokensUsed: 150 + Math.floor(Math.random() * 200),
      processingTime: 1.2,
    },
  };
}

/**
 * Generate a lesson plan based on user goals
 */
export async function generateLessonPlan(
  goal: string,
  currentLevel: string
): Promise<AIResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    content: `Here's a personalized learning plan for your goal: "${goal}".

**Week 1-2:** Foundation building — understand the core concepts.
**Week 3-4:** Practical application — work on real projects.
**Week 5-6:** Advanced strategies — learn from case studies.

Starting from your ${currentLevel} level, I recommend beginning with the fundamentals and building up consistently.`,
    suggestions: ["Start Week 1 now", "Adjust timeline", "Focus on a specific area"],
    confidence: 0.88,
  };
}

/**
 * Analyze user progress and provide recommendations
 */
export async function analyzeProgress(userData: {
  hoursLearned: number;
  coursesCompleted: number;
  goals: string[];
}): Promise<AIResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    content: `Based on your progress (${userData.hoursLearned} hours, ${userData.coursesCompleted} courses completed), you're making solid progress!

**Strengths:** Consistency in learning.
**Opportunities:** Consider applying what you've learned to a real project.
**Next step:** Pick one skill and build something with it this week.`,
    suggestions: ["View recommended projects", "Set a new goal", "Connect with mentor"],
    confidence: 0.85,
  };
}
