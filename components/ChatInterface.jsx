'use client';

import { useState, useEffect, useRef } from 'react';
import { askQuestion } from '@/actions/chat';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await askQuestion(input);

      const assistantMessage = {
        role: 'assistant',
        content: result.answer,
        sources: result.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Something went wrong.',
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-3xl px-6 py-4 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.isError
                  ? 'bg-red-100 text-red-800'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <p className="whitespace-pre-wrap">
                {message.content}
              </p>

              {message.sources > 0 && (
                <p className="text-sm mt-2 text-green-600">
                  📚 Retrieved {message.sources} relevant chunks
                </p>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="text-gray-500">🤖 Thinking...</div>
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t bg-white p-4 flex gap-4"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg p-3"
          placeholder="Ask something..."
        />

        <button
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Send
        </button>
      </form>
    </div>
  );
}
