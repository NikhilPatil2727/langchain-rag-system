'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

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

const statsData = [
  { value: '1.2M+', label: 'Citations scanned' },
  { value: '<2s', label: 'Synthesis speed' },
  { value: '98%', label: 'Accuracy score' },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden grid-bg"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background orbs */}
      <div className="orb" style={{ width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)', top: '-100px', left: '-150px' }} />
      <div className="orb" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', top: '200px', right: '-100px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div
          variants={containerVariants}
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={itemVariants}>
            <span className="badge">
              <ZapIcon />
              Academic Research AI
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-8 text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-800 leading-[1.2] xs:leading-[1.1] sm:leading-[1.08] tracking-tight"
            style={{ fontWeight: 800, maxWidth: '940px' }}
          >
            <span className="gradient-text">Understand every</span>
            <br className="hidden sm:block" />
            <span className="gradient-text-accent"> Research Paper.</span>
            <span className="gradient-text"> Deeply.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-base sm:text-lg md:text-xl leading-relaxed px-4"
            style={{ color: 'var(--text-secondary)', maxWidth: '640px' }}
          >
            ScholarRAG analyzes hundreds of pages of academic literature to synthesize
            answers with precise citations. Accelerate your literature review with AI that
            never misses a detail.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link href="/chat" className="btn-primary w-full justify-center" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>
                Analyze your papers <ArrowIcon />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
              <Link href="#features" className="btn-secondary w-full justify-center" style={{ padding: '14px 32px', fontSize: '0.95rem' }}>
                <BookIcon /> Methodology
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16 grid grid-cols-1 sm:flex sm:flex-row items-center gap-8 sm:gap-16">
            {statsData.map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span className="stat-number text-3xl sm:text-4xl">{stat.value}</span>
                <span className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Academic preview card */}
          <motion.div variants={itemVariants} className="mt-16 w-full max-w-2xl px-4">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="glass-card rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
                </div>
                <span className="ml-2 sm:ml-4 text-[10px] sm:text-xs mono" style={{ color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>scholarrag — synthesis_engine</span>
              </div>

              <div className="p-4 sm:p-6 text-left">
                <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3 mb-5">
                  <span className="text-[10px] mono px-2 py-0.5 rounded-md" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', flexShrink: 0 }}>Query</span>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Compare the findings on deep learning architectures for protein folding.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                  <span className="text-[10px] mono px-2 py-0.5 rounded-md" style={{ background: 'rgba(6,182,212,0.12)', color: '#67e8f9', flexShrink: 0 }}>Analysis</span>
                  <div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      Across <span className="text-indigo-300">Jumper et al. (2021)</span> and <span className="text-indigo-300">Evans et al. (2022)</span>, the shift towards attention-based Evoformer blocks shows a 30% improvement in GDT scores...
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[10px] sm:text-xs" style={{ color: 'var(--text-muted)' }}>Synthesized from 14 source documents · 840ms</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--bg-primary), transparent)' }} />
    </section>
  );
}