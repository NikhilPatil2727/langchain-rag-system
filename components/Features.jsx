'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const BrainIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]">
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const LibraryIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]">
    <path d="m16 6 4 14M12 6v14M8 8v12M4 4v16" />
  </svg>
);

const QuoteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4c-1.25 0-2 .75-2 2v7c0 1.25.75 2 2 2h4c0 2.5-1 4.5-4 5.5Z" />
    <path d="M13 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v7c0 1.25.75 2 2 2h4c0 2.5-1 4.5-4 5.5Z" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
  </svg>
);

const FastIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 md:w-[22px] md:h-[22px]">
    <path d="m12 14 4-4-4-4M16 10H3a9 9 0 0 0 9 9" />
  </svg>
);

const features = [
  {
    Icon: SearchIcon,
    title: 'Precision Retrieval',
    description: 'Find exact methodologies, datasets, and conclusions within thousands of pages of research literature instantly.',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.1)',
  },
  {
    Icon: BrainIcon,
    title: 'Knowledge Synthesis',
    description: 'Connect dots across multiple papers to reveal trends, contradictions, and consensus in your field of study.',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
  },
  {
    Icon: QuoteIcon,
    title: 'Automated Citations',
    description: 'Every statement generated is backlinked to the original source text, ensuring academic integrity and easy fact-checking.',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.1)',
  },
  {
    Icon: LibraryIcon,
    title: 'Infinite Library Support',
    description: 'From single PDFs to entire bibliographies, our system scales to index and search massive academic repositories.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
  },
  {
    Icon: ShieldIcon,
    title: 'Evidence-Based AI',
    description: 'Strict RAG implementation prevents hallucinations by forcing the model to only use provided research data.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
  },
  {
    Icon: FastIcon,
    title: 'Rapid Lit Review',
    description: 'Reduce literature review time by 80% with semantic search that understands technical jargon and complex concepts.',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.1)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Features() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="features" 
      ref={ref} 
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="section-divider" />
      
      {/* Background Gradient - Responsive sizing */}
      <div 
        className="absolute top-1/2 left-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[200px] sm:h-[300px] md:h-[400px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
        style={{ 
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)', 
          filter: 'blur(40px) sm:blur-50px md:blur-60px' 
        }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={inView ? { opacity: 1, y: 0 } : {}} 
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} 
          className="text-center mb-12 sm:mb-14 md:mb-16 px-4 sm:px-6"
        >
          <span className="inline-block px-3 py-1 text-xs sm:text-sm font-medium bg-indigo-500/10 text-indigo-400 rounded-full mb-4 sm:mb-5">
            Research Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4 md:mb-5 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Master your literature
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              in record time
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-[90%] sm:max-w-[480px] md:max-w-[520px] mx-auto">
            A purpose-built AI engine designed to handle the complexity
            and rigor of academic research papers.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants} 
          animate={inView ? 'visible' : 'hidden'} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 px-4 sm:px-0"
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants} 
              className="relative group p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-300 hover:border-indigo-500/20"
            >
              {/* Icon Box */}
              <div 
                className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg sm:rounded-xl mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-110" 
                style={{ background: feature.bg, color: feature.color }}
              >
                <feature.Icon />
              </div>
              
              {/* Content */}
              <h3 className="text-sm sm:text-base md:text-lg font-semibold mb-2 text-white group-hover:text-indigo-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
              
              {/* Accent Dot - Hidden on mobile, visible on larger screens */}
              <div 
                className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block" 
                style={{ background: feature.color }} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Section Dividers */}
      <div className="section-divider mt-0 absolute bottom-0 left-0 right-0" />
    </section>
  );
}