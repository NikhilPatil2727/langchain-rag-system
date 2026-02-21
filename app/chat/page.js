'use client';

import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';

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