"use client";
import { useEffect, useState, useRef } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "assistant",
        content:
          "Hi! I'm your Sensationz Media & Arts counsellor. How can I help you today?",
      },
    ],
  );
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ userPrompt: input }), // Passing the prompt to your API
      });
      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* 1. Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[500px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#DC8916] p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest">
                  AI Counsellor
                </h3>
                <p className="text-[10px] opacity-80">Online | Sensationz</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:rotate-90 transition-transform"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-[1.5rem] text-sm font-medium ${
                    m.role === "user"
                      ? "bg-[#DC8916] text-white rounded-tr-none"
                      : "bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white p-4 rounded-[1.5rem] rounded-tl-none border border-slate-100 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-slate-400 rounded-full" />
                    <div className="w-1 h-1 bg-slate-400 rounded-full" />
                    <div className="w-1 h-1 bg-slate-400 rounded-full" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white border-t border-slate-100 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-slate-100 border-none rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-[#DC8916] outline-none transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-11 h-11 bg-[#DC8916] text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* 2. Floating Toggle Button with Label */}
      <div className="flex items-center gap-4 group">
        {/* The Floating Text Label (Only shows when closed) */}
        {!isOpen && (
          <div className="bg-white px-4 py-2 rounded-xl shadow-lg border border-slate-100 mb-2 mr-2 animate-bounce-slow flex items-center gap-2 whitespace-nowrap">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">
              Talk with our AI Assistant
            </span>
            {/* Little tail for the speech bubble */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-r border-t border-slate-100" />
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-[#DC8916] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50 relative"
        >
          {isOpen ? (
            <X size={28} />
          ) : (
            <MessageCircle
              size={28}
              className="group-hover:rotate-12 transition-transform"
            />
          )}
        </button>
      </div>
    </div>
  );
}
