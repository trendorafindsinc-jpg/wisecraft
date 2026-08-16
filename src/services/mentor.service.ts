/**
 * Mentor Service
 * Manages AI mentor conversations and session state
 */

import { sendMessage, type AIRequest, type AIResponse, type AIConversation, type AIMessage } from "./ai.service";

export interface MentorSession {
  id: string;
  userId: string;
  topic: string;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
  status: "active" | "paused" | "completed";
}

export interface MentorInsight {
  category: "strength" | "opportunity" | "recommendation" | "warning";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

// In-memory session store
const sessions: Map<string, MentorSession> = new Map();

function generateId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function createMessage(role: AIMessage["role"], content: string): AIMessage {
  return {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    role,
    content,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Start a new mentor session
 */
export async function startSession(userId: string, topic: string): Promise<MentorSession> {
  const session: MentorSession = {
    id: generateId(),
    userId,
    topic,
    messages: [
      createMessage(
        "assistant",
        `Hello! I'm your WISECRAFT AI Growth Mentor. I'm here to help you with ${topic}. What would you like to explore today?`
      ),
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "active",
  };

  sessions.set(session.id, session);
  return session;
}

/**
 * Send a message in an existing session
 */
export async function sendSessionMessage(
  sessionId: string,
  userMessage: string
): Promise<{ session: MentorSession; response: AIResponse }> {
  const session = sessions.get(sessionId);
  if (!session) {
    throw new Error("Session not found");
  }

  // Add user message
  session.messages.push(createMessage("user", userMessage));

  // Get AI response
  const context = session.messages.slice(-6).map((m) => `${m.role}: ${m.content}`).join("\n");
  const aiResponse = await sendMessage({
    prompt: userMessage,
    context,
    userId: session.userId,
    sessionId,
  });

  // Add AI response
  session.messages.push(createMessage("assistant", aiResponse.content));
  session.updatedAt = new Date().toISOString();

  return { session, response: aiResponse };
}

/**
 * Get session by ID
 */
export function getSession(sessionId: string): MentorSession | undefined {
  return sessions.get(sessionId);
}

/**
 * Get all sessions for a user
 */
export function getUserSessions(userId: string): MentorSession[] {
  return Array.from(sessions.values()).filter((s) => s.userId === userId);
}

/**
 * End a session
 */
export function endSession(sessionId: string): MentorSession | undefined {
  const session = sessions.get(sessionId);
  if (session) {
    session.status = "completed";
    session.updatedAt = new Date().toISOString();
  }
  return session;
}

/**
 * Generate insights based on conversation history
 */
export async function generateInsights(sessionId: string): Promise<MentorInsight[]> {
  const session = sessions.get(sessionId);
  if (!session) return [];

  return [
    {
      category: "strength",
      title: "Clear Goal Setting",
      description: "You've demonstrated strong ability to define specific, actionable goals.",
      priority: "high",
    },
    {
      category: "opportunity",
      title: "Skill Application",
      description: "Consider applying your learned skills to a real project within 2 weeks.",
      priority: "medium",
    },
  ];
}

/**
 * Get suggested conversation starters
 */
export function getSuggestedPrompts(topic?: string): string[] {
  const basePrompts = [
    "Help me create a budget plan",
    "What skills should I learn to increase income?",
    "Review my business idea",
  ];

  return basePrompts;
}
