'use client';

import { useState, useEffect, useRef } from 'react';
import { askQuestion } from '@/actions/chat';
import { motion, AnimatePresence } from 'framer-motion';

const QuickActions = ({ onSelect }) => {
  const actions = [
    { label: 'Summarize Abstract' },
    { label: 'Methodology Scan' },
    { label: 'Extract Findings' },
    { label: 'Critique Study' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-6 justify-center px-4">
      {actions.map((action, i) => (
        <button
          key={i}
          onClick={() => onSelect(action.label)}
          className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-indigo-500/30 text-xs font-medium text-white/60 hover:text-white transition-all duration-200"
        >
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e, customInput) => {
    if (e) e.preventDefault();
    const finalInput = customInput || input;
    if (!finalInput.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: finalInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await askQuestion(finalInput);
      const assistantMessage = {
        role: 'assistant',
        content: result.answer,
        sources: result.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'The research engine encountered an error. This may be due to complex paper structure or connectivity issue.',
          isError: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#050507]">
      {/* Messages Window */}
      <div className="flex-1 overflow-y-auto px-4 py-6 md:py-10 space-y-6 md:space-y-10 scroll-smooth no-scrollbar">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence initial={false}>
            {messages.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center min-h-[40vh] text-center"
              >
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-[40px] rounded-full animate-pulse" />
                  
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Scholar Research System</h2>
                <p className="text-[15px] text-white/40 max-w-sm mx-auto leading-relaxed text-sm">
                  Start your inquiry into your local research repository.
                  I can synthesize cross-paper findings and extract methodologies.
                </p>
                <QuickActions onSelect={(val) => handleSubmit(null, val)} />
              </motion.div>
            )}

            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`flex w-full gap-4 sm:gap-6 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Initial */}
                <div className="flex-shrink-0 mt-1">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 font-bold text-xs ${message.role === 'user'
                    ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white'
                    : message.isError
                      ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                      : 'bg-white/[0.03] text-indigo-400 border border-white/10 group-hover:border-indigo-500/30'
                    }`}>
                    {message.role === 'user' ? 'U' : 'S'}
                  </div>
                </div>

                {/* Content Area */}
                <div className={`flex flex-col gap-2 max-w-[85%] sm:max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {/* Bubble */}
                  <div className={`relative px-5 py-4 rounded-2xl group transition-all duration-300 ${message.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-[0_4px_20px_rgba(79,70,229,0.15)]'
                    : message.isError
                      ? 'bg-red-500/10 text-red-100 border border-red-500/20 rounded-tl-none font-medium'
                      : 'bg-white/[0.03] text-white/90 border border-white/[0.08] rounded-tl-none hover:bg-white/[0.05] hover:border-white/10'
                    }`}>
                    <div className="text-[14.5px] leading-relaxed selection:bg-indigo-500/50">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>

                    {/* Meta Footer */}
                    <div className="mt-4 flex items-center justify-between gap-4">
                      {message.sources > 0 && (
                        <div className="flex items-center gap-2 py-1 px-2.5 rounded-lg bg-white/5 border border-white/5 transition-colors group-hover:border-indigo-500/20">
                          <span className="text-[10px] font-semibold text-indigo-300/80 uppercase tracking-wider">
                            {message.sources} Sources Identified
                          </span>
                        </div>
                      )}
                      <span className={`text-[10px] sm:text-[11px] font-medium opacity-30 ${message.role === 'user' ? 'text-white' : 'text-white/60'}`}>
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4 sm:gap-6"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-indigo-400 font-bold text-xs">
                  S
                </div>
                <div className="flex flex-col gap-3 py-2">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 p-1">
                      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    </div>
                    <span className="text-[11px] font-medium text-white/40 uppercase tracking-[0.15em] animate-pulse">
                      Synthesizing evidence...
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div ref={bottomRef} className="h-4" />
      </div>

      {/* Control Tray */}
      <div className="relative border-t border-white/[0.08] bg-[#050507]/80 backdrop-blur-2xl p-4 sm:p-6 lg:p-10">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="relative flex items-end gap-3"
          >
            <div className="relative flex-1 group shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-2xl sm:rounded-3xl px-6 py-4 sm:py-5 pr-16 text-[14.5px] sm:text-[15.5px] text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.05] transition-all min-h-[56px] sm:min-h-[64px] max-h-48 scrollbar-hide resize-none leading-relaxed"
                placeholder="Query papers, compare methodologies, or ask for summaries..."
                rows={1}
              />

              <div className="absolute right-2.5 bottom-2.5 sm:right-3 sm:bottom-3 flex items-center gap-3">
                <AnimatePresence>
                  {input.trim() && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="hidden sm:inline-block text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1.5 rounded-lg border border-indigo-500/10 tracking-tight"
                    >
                      ENTER TO SEARCH
                    </motion.span>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className={`px-4 py-2 rounded-xl sm:rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${input.trim() && !isLoading
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-[0_10px_20px_-5px_rgba(99,102,241,0.4)] hover:scale-[1.05] active:scale-[0.95]'
                    : 'bg-white/5 text-white/10 cursor-not-allowed opacity-50'
                    }`}
                >
                  Send
                </button>
              </div>
            </div>
          </form>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-4">
            <div className="flex items-center gap-4 text-[10px] mono text-white/20 uppercase tracking-widest font-semibold">
              <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-green-500" /> Vector Database Online</span>
              <span className="flex items-center gap-1.5"><div className="w-1 h-1 rounded-full bg-indigo-500" /> Citation Tracking Enabled</span>
            </div>
            <p className="text-[10px] text-white/30 font-medium">
              ScholarRAG v1.4.2 · Secure Multi-Paper Synthesis
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
