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
    title: 'Chunking Phase',
    description: 'The research paper is divided into smaller text chunks. This makes it easier to process and search specific parts of the document.',
  },
  {
    number: '02',
    title: 'Indexing Phase',
    description: 'Each chunk is converted into embeddings. These embeddings are stored in a vector database for similarity search.',
  },
  {
    number: '03',
    title: 'Query Phase',
    description: 'When I ask a question, the system converts the question into an embedding. It then searches the vector database to find the most relevant chunks.',
  },
  {
    number: '04',
    title: 'Response Phase',
    description: 'The retrieved chunks are passed to the language model. The model generates an answer based only on the selected content from the paper.',
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#050507] min-h-screen selection:bg-indigo-500/30">
      <Navbar />
      <Hero />
      <Features />

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 sm:py-32 relative overflow-hidden bg-[#07070a]">
        {/* Dynamic Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20 md:mb-28">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-indigo-500/10 text-indigo-400 rounded-lg mb-6"
            >
              Methodology
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-8 text-white"
            >
              How it <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent italic">Works</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-indigo-100/50 max-w-2xl mx-auto leading-relaxed"
            >
              A high-precision RAG pipeline optimized for 
              single-document research and discovery.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative cursor-pointer"
              >
                {/* Connector Line (Desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[2.5rem] left-[calc(100%-1rem)] w-full h-[1px] bg-gradient-to-r from-indigo-500/20 to-transparent z-0" />
                )}

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-8 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-all duration-300">
                    <span className="text-xl font-bold font-mono text-indigo-400">
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-indigo-100/40 group-hover:text-indigo-100/60 transition-colors">
                    {step.description}
                  </p>
                </div>
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
              Ready to <br className="hidden xs:block sm:hidden" />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Research Papers?
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-indigo-200/70 mb-6 sm:mb-8 md:mb-10 max-w-[90%] sm:max-w-xl mx-auto px-4">
              Try this simple project demo to see how RAG can help you read papers faster.
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
                Research Paper 
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

              <span className="font-bold tracking-tight text-white italic text-sm sm:text-base">
                PaperInsight
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

            <div className="text-xs sm:text-sm text-center sm:text-right text-indigo-200/40">
              ©{new Date().getFullYear()} PaperInsight. <br className="block xs:hidden" />
              Built for simple research paper QA.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}