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
    title: 'Embeddings',
    description: 'Each chunk is converted into vector embeddings. This allows the system to understand semantic meaning, not just keyword matching.',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.1)',
  },
  {
    Icon: LibraryIcon,
    title: 'Vector Database',
    description: 'All embeddings are stored in a vector database. When a question is asked, the system finds the most relevant chunks using similarity search.',
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.1)',
  },
  {
    Icon: QuoteIcon,
    title: 'Retrieval-Augmented Generation (RAG)',
    description: 'Instead of generating answers blindly, the model first retrieves relevant context from the paper. Then it generates a response based only on that retrieved content.',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
  },
  {
    Icon: BrainIcon,
    title: 'Context-Based Responses',
    description: 'Answers are generated from the actual research paper content. This reduces hallucination and keeps responses grounded in the document.',
    color: '#06b6d4',
    bg: 'rgba(6,182,212,0.1)',
  },
  {
    Icon: FastIcon,
    title: 'Simple Question Interface',
    description: 'You can ask questions in natural language and get answers directly from the uploaded paper.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Features() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="features"
      ref={ref}
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="section-divider" />

      {/* Enhanced Background Gradient */}
      <div
        className="absolute top-1/2 left-1/2 w-full max-w-[1000px] h-[400px] sm:h-[600px] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50"
        style={{
          background: 'radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 sm:mb-20 md:mb-24 px-4 sm:px-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">
            Features
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-0"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col h-full rounded-2xl bg-white/[0.02] border border-white/[0.05] p-6 sm:p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:border-indigo-500/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] cursor-pointer overflow-hidden"
            >
              {/* Subtle hover glow effect behind icon */}
              <div
                className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none blur-2xl"
                style={{ background: feature.color }}
              />

              {/* Icon Box */}
              <div
                className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 relative z-10"
                style={{
                  background: feature.bg,
                  color: feature.color,
                  border: `1px solid ${feature.color}30`
                }}
              >
                <feature.Icon />
              </div>

              {/* Content text strictly untouched, only styling wrapped around it */}
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-white transition-colors relative z-10">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-indigo-50/70 group-hover:text-indigo-50/90 transition-colors relative z-10 flex-grow">
                {feature.description}
              </p>

              {/* Bottom Element */}
              <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between relative z-10">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-white/30 group-hover:text-white/50 transition-colors">
                  Available Module
                </span>
                <div
                  className="w-2 h-2 rounded-full opacity-30 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: feature.color, boxShadow: `0 0 10px ${feature.color}` }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Section Dividers */}
      <div className="section-divider mt-0 absolute bottom-0 left-0 right-0" />
    </section>
  );
}