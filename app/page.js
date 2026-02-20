'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const steps = [
  {
    number: '01',
    title: 'Paper Ingestion',
    description: 'Upload complex PDFs. Our engine extracts text, tables, and metadata while preserving context.',
  },
  {
    number: '02',
    title: 'Semantic Indexing',
    description: 'Scholarly content is transformed into semantic embeddings, mapping the conceptual landscape of the data.',
  },
  {
    number: '03',
    title: 'Evidence Retrieval',
    description: 'User queries trigger a deep search across the vector space to find the strongest supporting evidence.',
  },
  {
    number: '04',
    title: 'Cited Synthesis',
    description: 'AI generates a response grounded in the retrieved text, including source-specific citations for verification.',
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#050507] min-h-screen selection:bg-indigo-500/30">
      <Navbar />
      <Hero />
      <Features />

      {/* How it Works Section */}
      <section id="how-it-works" className="py-16 md:py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 lg:mb-20">
            <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium bg-indigo-500/10 text-indigo-400 rounded-full mb-4 md:mb-5">
              Research Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 md:mb-5 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent px-4">
              The Science of Retrieval
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-[90%] sm:max-w-[520px] mx-auto px-4">
              We've optimized every layer of the RAG pipeline to handle the unique structure and terminology of research papers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-8 px-4 sm:px-0">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 hover:border-indigo-500/20 group"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 md:mb-6 font-mono text-indigo-600/30 group-hover:text-indigo-500/50 transition-colors">
                  {step.number}
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-white group-hover:text-indigo-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 lg:py-28 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-6 sm:p-8 md:p-12 lg:p-20 rounded-2xl sm:rounded-3xl md:rounded-[32px] overflow-hidden relative mx-4 sm:mx-0"
            style={{ 
              background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.1))',
              border: '1px solid rgba(99,102,241,0.2)' 
            }}
          >
            <div className="absolute top-0 left-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-indigo-500/20 blur-[50px] sm:blur-[75px] md:blur-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <div className="absolute bottom-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-purple-500/20 blur-[50px] sm:blur-[75px] md:blur-[100px] translate-x-1/2 translate-y-1/2 rounded-full" />

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 text-white px-2">
              End the manual <br className="hidden xs:block sm:hidden" />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                literature search.
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-indigo-200/70 mb-6 sm:mb-8 md:mb-10 max-w-[90%] sm:max-w-xl mx-auto px-4">
              ScholarRAG is the ultimate companion for researchers, students, and academics. Start exploring your local papers now.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="inline-block w-full sm:w-auto px-4 sm:px-0"
            >
              <Link
                href="/chat"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-lg shadow-indigo-500/25"
              >
                Launch Scholar Assistant 
                <ArrowIcon />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 sm:py-12 md:py-16 border-t border-white/[0.05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-sm sm:text-base">
                S
              </div>
              <span className="font-bold tracking-tight text-white italic text-sm sm:text-base">
                SCHOLAR RAG
              </span>
            </div>
            
            <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
              <Link href="/" className="hover:text-indigo-400 transition-colors">
                Home
              </Link>
              <Link href="/#features" className="hover:text-indigo-400 transition-colors">
                Features
              </Link>
              <Link href="/#how-it-works" className="hover:text-indigo-400 transition-colors">
                Methodology
              </Link>
              <Link 
                href="https://github.com" 
                target="_blank" 
                className="hover:text-indigo-400 transition-colors"
              >
                GitHub
              </Link>
            </nav>

            <div className="text-xs sm:text-sm text-center sm:text-right text-gray-500">
              © 2024 ScholarRAG. <br className="block xs:hidden" />
              Research-first AI retrieval.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}