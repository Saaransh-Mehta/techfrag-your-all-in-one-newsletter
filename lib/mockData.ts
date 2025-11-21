import { NewsArticle } from './types';

export const mockNews: NewsArticle[] = [
  {
    id: '1',
    title: 'The Future of AI: Breaking New Ground in 2025',
    excerpt: 'Artificial Intelligence continues to reshape industries with groundbreaking innovations that promise to transform how we live and work.',
    content: `
      <p>Artificial Intelligence has reached unprecedented heights in 2025, with breakthroughs that were once considered science fiction now becoming reality.</p>
      
      <h2>Major Developments</h2>
      <p>Recent advancements in neural networks have enabled machines to understand context and nuance better than ever before. Companies worldwide are integrating AI into their core operations, from healthcare diagnostics to financial forecasting.</p>
      
      <h2>Impact on Industries</h2>
      <p>The healthcare sector has seen remarkable improvements in early disease detection. Financial institutions are using AI to predict market trends with increasing accuracy. Manufacturing plants have become more efficient with AI-powered automation.</p>
      
      <h2>Ethical Considerations</h2>
      <p>As AI becomes more powerful, questions about ethics, privacy, and job displacement have come to the forefront. Policymakers and tech leaders are working together to establish guidelines that ensure AI benefits humanity as a whole.</p>
      
      <h2>Looking Ahead</h2>
      <p>The next frontier includes quantum computing integration with AI, promising exponential increases in processing power. Experts predict that by 2030, AI will be as ubiquitous as smartphones are today.</p>
    `,
    author: 'Sarah Johnson',
    publishedAt: new Date('2025-11-18'),
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    readTime: 5,
  },
  {
    id: '2',
    title: 'Cryptocurrency Market Sees Major Shift',
    excerpt: 'Bitcoin and Ethereum lead a new wave of adoption as institutional investors double down on digital assets.',
    content: `
      <p>The cryptocurrency market has experienced a significant transformation in recent months, with institutional adoption reaching all-time highs.</p>
      
      <h2>Institutional Investment</h2>
      <p>Major financial institutions have increased their crypto holdings, signaling a shift in how traditional finance views digital assets. Goldman Sachs and JPMorgan have both expanded their crypto trading desks.</p>
      
      <h2>Regulatory Clarity</h2>
      <p>New regulations in the US and EU have provided much-needed clarity for crypto businesses. This has encouraged more companies to enter the space and develop innovative blockchain solutions.</p>
      
      <h2>DeFi Evolution</h2>
      <p>Decentralized Finance (DeFi) platforms have matured, offering sophisticated financial products that rival traditional banking services. Total value locked in DeFi protocols has exceeded $200 billion.</p>
    `,
    author: 'Michael Chen',
    publishedAt: new Date('2025-11-17'),
    category: 'Finance',
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=450&fit=crop',
    readTime: 4,
  },
  {
    id: '3',
    title: 'Quantum Computing Breakthrough Announced',
    excerpt: 'Scientists achieve quantum supremacy in practical applications, opening doors to solving previously impossible problems.',
    content: `
      <p>A team of researchers has announced a major breakthrough in quantum computing that could revolutionize fields from cryptography to drug discovery.</p>
      
      <h2>The Achievement</h2>
      <p>The new quantum computer can maintain stable qubits for unprecedented lengths of time, solving complex calculations in minutes that would take classical computers millions of years.</p>
      
      <h2>Real-World Applications</h2>
      <p>Pharmaceutical companies are already using this technology to simulate molecular interactions, potentially accelerating drug development by years. Climate scientists are modeling complex weather patterns with incredible accuracy.</p>
      
      <h2>Challenges Ahead</h2>
      <p>Despite this progress, quantum computers remain expensive and require extremely cold temperatures to operate. Researchers are working on making the technology more accessible and practical for everyday use.</p>
    `,
    author: 'Dr. Emily Rodriguez',
    publishedAt: new Date('2025-11-16'),
    category: 'Science',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop',
    readTime: 6,
  },
  {
    id: '4',
    title: 'The Rise of Sustainable Tech',
    excerpt: 'Green technology initiatives gain momentum as companies commit to carbon neutrality and sustainable practices.',
    content: `
      <p>The tech industry is undergoing a green revolution, with major players committing to ambitious sustainability goals.</p>
      
      <h2>Corporate Commitments</h2>
      <p>Tech giants like Apple, Google, and Microsoft have pledged to become carbon negative by 2030. They're investing billions in renewable energy and sustainable infrastructure.</p>
      
      <h2>Innovation in Energy</h2>
      <p>New battery technologies promise longer-lasting, more efficient energy storage. Solar panel efficiency has improved dramatically, making renewable energy more competitive with fossil fuels.</p>
      
      <h2>Consumer Impact</h2>
      <p>Consumers are increasingly choosing eco-friendly tech products. This demand is driving innovation and making sustainable options more affordable and accessible.</p>
    `,
    author: 'James Wilson',
    publishedAt: new Date('2025-11-15'),
    category: 'Environment',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=450&fit=crop',
    readTime: 4,
  },
  {
    id: '5',
    title: 'Cybersecurity in the Age of AI',
    excerpt: 'As AI-powered attacks become more sophisticated, security experts develop innovative defense strategies.',
    content: `
      <p>The cybersecurity landscape is evolving rapidly as both attackers and defenders leverage artificial intelligence.</p>
      
      <h2>Evolving Threats</h2>
      <p>Cybercriminals are using AI to create more convincing phishing attacks and to identify vulnerabilities faster than ever before. The average cost of a data breach has reached $4.5 million.</p>
      
      <h2>AI-Powered Defense</h2>
      <p>Security companies are fighting back with AI systems that can detect and respond to threats in real-time. Machine learning algorithms analyze billions of data points to identify patterns that humans might miss.</p>
      
      <h2>Best Practices</h2>
      <p>Experts recommend a layered security approach, combining AI tools with traditional security measures. Regular security audits and employee training remain crucial components of any security strategy.</p>
    `,
    author: 'Alex Thompson',
    publishedAt: new Date('2025-11-14'),
    category: 'Security',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop',
    readTime: 5,
  },
  {
    id: '6',
    title: 'Space Tech: New Era of Exploration',
    excerpt: 'Private companies and government agencies collaborate on ambitious missions to Mars and beyond.',
    content: `
      <p>Space exploration is entering a new golden age, with unprecedented collaboration between private companies and government agencies.</p>
      
      <h2>Mars Missions</h2>
      <p>NASA and SpaceX are working together on plans for the first crewed mission to Mars. The timeline targets the early 2030s, with preparation already underway.</p>
      
      <h2>Commercial Space Travel</h2>
      <p>Space tourism is becoming more accessible, with multiple companies offering trips to the edge of space. Prices are gradually decreasing as the technology matures.</p>
      
      <h2>Satellite Technology</h2>
      <p>New satellite constellations are providing global internet coverage and enabling advanced earth observation capabilities. These technologies have applications in agriculture, disaster response, and climate monitoring.</p>
    `,
    author: 'Dr. Lisa Martinez',
    publishedAt: new Date('2025-11-13'),
    category: 'Space',
    imageUrl: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=450&fit=crop',
    readTime: 7,
  },
  {
    id: '7',
    title: '5G and Beyond: The Future of Connectivity',
    excerpt: 'Next-generation networks promise to revolutionize how we connect and communicate.',
    content: `
      <p>The rollout of 5G networks is accelerating globally, while researchers are already working on 6G technology.</p>
      
      <h2>5G Deployment</h2>
      <p>Major cities worldwide now have 5G coverage, offering speeds up to 100 times faster than 4G. This enables new applications in IoT, autonomous vehicles, and augmented reality.</p>
      
      <h2>Industry Transformation</h2>
      <p>Healthcare providers are using 5G for remote surgeries. Manufacturers are implementing smart factories with real-time monitoring. Entertainment companies are developing immersive AR/VR experiences.</p>
      
      <h2>Looking to 6G</h2>
      <p>Research into 6G has begun, promising even faster speeds and lower latency. Expected to launch around 2030, 6G could enable technologies we haven't even imagined yet.</p>
    `,
    author: 'Robert Kim',
    publishedAt: new Date('2025-11-12'),
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&h=450&fit=crop',
    readTime: 5,
  },
  {
    id: '8',
    title: 'EdTech Revolution Transforms Learning',
    excerpt: 'Educational technology creates personalized learning experiences and makes quality education accessible worldwide.',
    content: `
      <p>The education sector is experiencing a technological revolution that's transforming how we learn and teach.</p>
      
      <h2>Personalized Learning</h2>
      <p>AI-powered platforms adapt to individual learning styles and pace, helping students master subjects more effectively. Virtual tutors provide 24/7 support and personalized feedback.</p>
      
      <h2>Global Access</h2>
      <p>Online learning platforms have democratized education, making courses from top universities available to anyone with an internet connection. Millions of students worldwide are accessing quality education that was previously out of reach.</p>
      
      <h2>Immersive Experiences</h2>
      <p>VR and AR technologies are creating immersive learning environments. Students can explore ancient civilizations, conduct virtual science experiments, and practice real-world skills in safe, simulated environments.</p>
    `,
    author: 'Amanda Foster',
    publishedAt: new Date('2025-11-11'),
    category: 'Education',
    imageUrl: 'https://images.unsplash.com/photo-1501290801209-c1b81e1747e5?w=800&h=450&fit=crop',
    readTime: 4,
  },
];

export const getNewsById = (id: string): NewsArticle | undefined => {
  return mockNews.find(news => news.id === id);
};

export const getLatestNews = (limit: number = 5, excludeId?: string): NewsArticle[] => {
  return mockNews
    .filter(news => news.id !== excludeId)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, limit);
};

export const getFeaturedNews = (): NewsArticle => {
  return mockNews[0];
};
