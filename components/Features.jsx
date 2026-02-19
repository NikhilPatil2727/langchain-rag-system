'use client';

export default function Features() {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Search',
      description:
        'Leverages advanced embeddings and vector similarity search to find the most relevant documentation sections for your query.',
    },
    {
      icon: '💡',
      title: 'Context-Aware Answers',
      description:
        'Uses RAG (Retrieval Augmented Generation) to provide answers that are grounded in the actual documentation.',
    },
    {
      icon: '🔍',
      title: 'Semantic Understanding',
      description:
        'Goes beyond keyword matching to understand the intent and meaning behind your questions.',
    },
    {
      icon: '⚙️',
      title: 'Built with LangChain',
      description:
        'Utilizes LangChain framework for robust and scalable AI application architecture.',
    },
    {
      icon: '🗄️',
      title: 'Pinecone Vector DB',
      description:
        'Stores document embeddings in Pinecone for fast and efficient similarity search at scale.',
    },
    {
      icon: '🚀',
      title: 'Next.js Performance',
      description:
        'Built on Next.js 15 with server actions for optimal performance and user experience.',
    },
  ];

  return (
    <div id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need for an intelligent documentation assistant
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border border-primary-100 hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}