'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-primary-50 via-white to-primary-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Node.js Documentation
            <span className="block text-primary-600 mt-2">AI Assistant</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get instant answers to your Node.js questions powered by advanced
            RAG (Retrieval Augmented Generation) technology. Ask anything about
            Node.js and get accurate, context-aware responses.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/chat"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Chatting
            </Link>
            <a
              href="#features"
              className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-600">
              Get answers in seconds with our optimized vector search
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Accurate Results
            </h3>
            <p className="text-gray-600">
              Powered by Google Gemini AI for precise, contextual answers
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Complete Documentation
            </h3>
            <p className="text-gray-600">
              Access the entire Node.js documentation instantly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}