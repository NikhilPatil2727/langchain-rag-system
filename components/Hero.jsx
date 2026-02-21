'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WavyBackground } from '@/components/ui/wavy-background';
import { TypeAnimation } from 'react-type-animation';

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M2 3h5a2 2 0 012 2v9a1.5 1.5 0 00-1.5-1.5H2V3z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 3H9a2 2 0 00-2 2v9a1.5 1.5 0 011.5-1.5H14V3z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ZapIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
    <path d="M9 2L3 9h5l-1 5 7-7H9l1-5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15" />
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};



export default function Hero() {
  return (
    <section className="relative min-h-screen pt-16 overflow-hidden">
      <WavyBackground
        className="max-w-7xl mx-auto"
        containerClassName="min-h-screen h-auto py-20"
        backgroundFill="var(--bg-primary)"
        colors={["#6366f1", "#8b5cf6", "#d946ef", "#3b82f6", "#06b6d4"]}
        waveOpacity={0.3}
        blur={12}
      >
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="mt-8 flex flex-col items-center justify-center text-center tracking-tight px-4"
              style={{ fontWeight: 800, maxWidth: '100%' }}
            >
              <div className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-3 leading-[1.1] flex flex-col items-center">
                <div className="text-white">
                  Chat With
                </div>
                <div className="h-[1.2em] flex items-center justify-center">
                  <TypeAnimation
                    sequence={[
                      'Research Papers',
                      2000,
                      'PDF Documents',
                      2000,
                      'Paper Insights',
                      2000,
                      'Knowledge Bases',
                      2000,
                    ]}
                    wrapper="span"
                    speed={40}
                    style={{ display: 'inline-block' }}
                    repeat={Infinity}
                    className="text-violet-400"
                  />
                </div>
              </div>

              <div className="text-lg xs:text-xl sm:text-3xl md:text-4xl lg:text-5xl font-700 leading-tight mt-4">
                <span className="text-white mr-3">Built with</span>
                <span className="text-sky-400">RAG & LangChain.</span>
              </div>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-base sm:text-lg md:text-xl leading-relaxed px-4 font-sans"
              style={{ color: 'white', maxWidth: '640px' }}
            >
              I built this project to help you chat with research papers.
              It uses LangChain and RAG to find answers directly from your PDF files
              without the extra complexity.
            </motion.p>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link href="/chat" className="btn-primary w-full justify-center" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>
                  Open Chat <ArrowIcon />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                <Link href="#features" className="btn-secondary w-full justify-center" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>
                  <BookIcon /> View Features
                </Link>
              </motion.div>
            </motion.div>

            {/* Academic preview card */}
            <motion.div variants={itemVariants} className="mt-16 w-full max-w-2xl px-4">
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
                  </div>
                  <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs mono" style={{ color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>research-rag — project_demo</span>
                </div>

                <div className="p-4 sm:p-6 text-left">
                  <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 mb-5">
                    <span className="text-[10px] mono px-2 py-0.5 rounded-md" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', flexShrink: 0 }}>Input</span>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      What is the main conclusion of the paper?
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                    <span className="text-[10px] mono px-2 py-0.5 rounded-md" style={{ background: 'rgba(6,182,212,0.12)', color: '#67e8f9', flexShrink: 0 }}>Result</span>
                    <div>
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Based on the uploaded PDF, the researchers concluded that using RAG significantly improves the accuracy of LLM responses by 45%...
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>Response generated from local document</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </WavyBackground>
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }} />
    </section>
  );
}