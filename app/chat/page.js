'use client';

import { useState, useEffect, useRef } from 'react';
import { askQuestion } from '@/actions/chat';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';

const QuickActions = ({ onSelect }) => {
  const actions = [
    { label: 'Summarize Abstract' },
    { label: 'Methodology Scan' },
    { label: 'Extract Findings' },
    { label: 'Critique Study' },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-8 justify-center px-4">
      {actions.map((action, i) => (
        <motion.button
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSelect(action.label)}
          className="group px-4 py-2.5 rounded-full bg-white/[0.02] border border-white/10 hover:border-indigo-500/40 hover:bg-indigo-500/5 text-sm font-medium text-white/70 hover:text-white transition-all duration-200 flex items-center gap-2"
        >
          <span>{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
  const isError = message.isError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex w-full gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mt-1">
        <div className={`
          w-8 h-8 rounded-xl flex items-center justify-center font-medium text-sm
          ${isUser
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
            : isError
              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
              : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
          }
        `}>
          {isUser ? 'U' : 'S'}
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-1.5 max-w-[85%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`
          relative px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed
          ${isUser
            ? 'bg-indigo-600 text-white rounded-tr-none'
            : isError
              ? 'bg-red-500/10 text-red-200 border border-red-500/20 rounded-tl-none'
              : 'bg-white/[0.04] text-white border border-white/10 rounded-tl-none'
          }
        `}>
          <p className="whitespace-pre-wrap break-words">{message.content}</p>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-end gap-3">
            {message.sources > 0 && (
              <span className="text-[11px] font-medium text-indigo-300/80 bg-indigo-500/10 px-2 py-1 rounded-md">
                {message.sources} {message.sources === 1 ? 'source' : 'sources'}
              </span>
            )}
            <span className={`text-[10px] font-medium ${isUser ? 'text-indigo-200' : 'text-white/40'}`}>
              {message.timestamp}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex gap-4"
  >
    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-medium text-sm">
      S
    </div>
    <div className="bg-white/[0.04] border border-white/10 rounded-2xl rounded-tl-none px-5 py-4">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
            className="w-2 h-2 rounded-full bg-indigo-400"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            className="w-2 h-2 rounded-full bg-indigo-400"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
            className="w-2 h-2 rounded-full bg-indigo-400"
          />
        </div>
        <span className="text-sm text-white/50">Scholar is thinking...</span>
      </div>
    </div>
  </motion.div>
);

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    try {
      const result = await askQuestion(finalInput);
      const assistantMessage = {
        role: 'assistant',
        content: result.answer,
        sources: result.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Unable to process your request. Please try again or rephrase your question.',
          isError: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextareaChange = (e) => {
    setInput(e.target.value);
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0A0A0F] min-h-0">
      {/* Custom Premium Scrollbar Styles */}
      <style jsx global>{`
        .chat-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .chat-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          transition: all 0.2s;
        }
        .chat-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
        }
      `}</style>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto chat-scrollbar min-h-0">
        <div className="max-w-4xl mx-auto px-4 py-6 md:py-8 space-y-6">
          <AnimatePresence mode="wait">
            {messages.length === 0 && !isLoading ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[60vh] text-center"
              >

                <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
                  Scholar Research System
                </h1>
                <p className="text-white/50 max-w-md mx-auto text-base leading-relaxed">
                  Query your research repository, analyze methodologies, and synthesize findings across multiple papers.
                </p>

                <QuickActions onSelect={(val) => handleSubmit(null, val)} />
              </motion.div>
            ) : (
              <motion.div
                key="messages"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {messages.map((message, index) => (
                  <MessageBubble key={index} message={message} />
                ))}

                {isLoading && <TypingIndicator />}
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 bg-[#0A0A0F]">
        <div className="max-w-4xl mx-auto p-4">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-2xl p-1.5 focus-within:border-indigo-500/40 focus-within:bg-white/[0.05] transition-all shadow-xl shadow-black/20">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask about papers, compare studies, or request analysis..."
                className="flex-1 bg-transparent border-none px-4 py-2.5 text-white placeholder:text-white/30 text-base focus:outline-none resize-none overflow-hidden min-h-[44px] max-h-[120px] leading-relaxed"
                rows={1}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`
                  h-11 px-6 rounded-xl text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center
                  ${input.trim() && !isLoading
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/25 active:scale-95'
                    : 'bg-white/5 text-white/10 cursor-not-allowed'
                  }
                `}
              >
                Send
              </button>
            </div>
          </form>

          {/* Status Bar */}
          <div className="mt-3 flex items-center justify-between px-1">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-white truncate uppercase tracking-wider font-medium">Vector DB Online</span>
              </div>
            </div>
            <span className="text-xs text-white font-mono">
              PaperInsight Project
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen bg-[#050507] overflow-hidden">
      <Navbar />
      
      <div className="flex-1 flex flex-col pt-16 relative min-h-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="flex-1 flex flex-col min-h-0 relative z-10 h-full">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}