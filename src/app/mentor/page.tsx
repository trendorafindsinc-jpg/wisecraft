"use client";

/**
 * AI Mentor Screen — Sprint 2
 * Full chat interface using mentor.service.ts
 * Real AI responses, session management, and insights
 */

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ChatSkeleton } from "@/components/skeletons/ChatSkeleton";
import { EmptyState } from "@/components/empty-states/EmptyState";
import {
  startSession,
  sendSessionMessage,
  getSession,
  generateInsights,
  getSuggestedPrompts,
  type MentorSession,
  type MentorInsight,
} from "@/services/mentor.service";
import { Send, Sparkles, User, Bot, Lightbulb, TrendingUp, Target, AlertTriangle, Loader2 } from "lucide-react";

function MentorContent() {
  const { user } = useAuth();
  const [session, setSession] = useState<MentorSession | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStarting, setIsStarting] = useState(true);
  const [insights, setInsights] = useState<MentorInsight[]>([]);
  const [showInsights, setShowInsights] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initSession() {
      if (!user?.uid) return;
      const newSession = await startSession(user.uid, "general growth");
      setSession(newSession);
      setIsStarting(false);
    }
    initSession();
  }, [user?.uid]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [session?.messages]);

  const handleSend = async () => {
    if (!input.trim() || !session || isLoading) return;

    const userMessage = input;
    setInput("");
    setIsLoading(true);

    try {
      const { session: updatedSession } = await sendSessionMessage(session.id, userMessage);
      setSession(updatedSession);

      // Generate insights after 3+ messages
      if (updatedSession.messages.length >= 6) {
        const newInsights = await generateInsights(session.id);
        setInsights(newInsights);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedPrompts = getSuggestedPrompts("general");

  const insightIconMap: Record<string, React.ElementType> = {
    strength: Target,
    opportunity: TrendingUp,
    recommendation: Lightbulb,
    warning: AlertTriangle,
  };

  const insightColorMap: Record<string, string> = {
    strength: "text-emerald bg-emerald-50 dark:bg-emerald-900/20",
    opportunity: "text-royal bg-royal-50 dark:bg-royal-900/20",
    recommendation: "text-gold bg-gold-50 dark:bg-gold-900/20",
    warning: "text-red-500 bg-red-50 dark:bg-red-900/20",
  };

  if (isStarting) return <ChatSkeleton />;

  if (!session) {
    return (
      <EmptyState
        icon={Sparkles}
        title="Mentor unavailable"
        description="Unable to start your AI mentor session. Please try again."
        action={{ label: "Retry", onClick: () => window.location.reload() }}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-royal rounded-xl flex items-center justify-center">
            <Sparkles className="text-white" size={20} aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-navy-900 dark:text-white">AI Growth Mentor</h1>
            <p className="text-sm text-navy-500 dark:text-navy-400">Personalized guidance, 24/7</p>
          </div>
        </div>
        {insights.length > 0 && (
          <button
            onClick={() => setShowInsights(!showInsights)}
            className="text-sm font-medium text-royal-600 hover:text-royal-700 dark:text-royal-400 dark:hover:text-royal-300 transition-colors"
          >
            {showInsights ? "Hide" : "Show"} Insights
          </button>
        )}
      </div>

      {/* Insights Panel */}
      {showInsights && insights.length > 0 && (
        <div className="mb-4 space-y-2">
          {insights.map((insight, i) => {
            const Icon = insightIconMap[insight.category] || Lightbulb;
            return (
              <div key={i} className={`p-3 rounded-xl ${insightColorMap[insight.category]} flex items-start gap-3`}>
                <Icon size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold">{insight.title}</p>
                  <p className="text-xs opacity-80">{insight.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Chat Area */}
      <Card variant="default" padding="none" className="flex-1 flex flex-col overflow-hidden border border-navy-100 dark:border-navy-700 min-h-[400px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" role="log" aria-live="polite" aria-label="Chat messages">
          {session.messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  message.role === "assistant"
                    ? "bg-royal-50 dark:bg-royal-900/20"
                    : "bg-navy-100 dark:bg-navy-700"
                }`}
                aria-hidden="true"
              >
                {message.role === "assistant" ? (
                  <Bot size={16} className="text-royal" />
                ) : (
                  <User size={16} className="text-navy-600 dark:text-navy-300" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === "assistant"
                    ? "bg-navy-50 dark:bg-navy-800 text-navy-900 dark:text-white"
                    : "bg-navy text-white"
                }`}
              >
                <p>{message.content}</p>
                <span className="block text-[10px] opacity-50 mt-1.5">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-royal-50 dark:bg-royal-900/20 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-royal" aria-hidden="true" />
              </div>
              <div className="bg-navy-50 dark:bg-navy-800 rounded-2xl px-4 py-3 flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-navy-400" aria-hidden="true" />
                <span className="text-sm text-navy-400">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {session.messages.length <= 3 && (
          <div className="px-4 pb-2">
            <p className="text-xs text-navy-400 dark:text-navy-500 mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-navy-50 dark:bg-navy-800 text-navy-600 dark:text-navy-300 hover:bg-navy-100 dark:hover:bg-navy-700 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-navy-100 dark:border-navy-700">
          <div className="flex gap-2">
            <Input
              placeholder="Ask your AI mentor anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              aria-label="Message input"
            />
            <Button
              variant="primary"
              size="md"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-4"
              aria-label="Send message"
            >
              <Send size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function MentorPage() {
  const { isLoading: authLoading } = useAuthGuard({ requireAuth: true, redirectTo: "/welcome" });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-navy-900">
        <div className="w-8 h-8 border-2 border-emerald/30 border-t-emerald rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-navy-900 flex flex-col">
      <Suspense fallback={<ChatSkeleton />}>
        <MentorContent />
      </Suspense>
    </div>
  );
}
