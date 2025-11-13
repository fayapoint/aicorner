const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Missing required MONGODB_URI environment variable.');
  console.error('Set MONGODB_URI before running this script (see .env.example for details).');
  process.exit(1);
}

// Sample videos data
const sampleVideos = [
  {
    title: 'Introduction to Neural Networks',
    slug: 'introduction-to-neural-networks',
    description: 'Learn the basics of neural networks and how they work in AI systems.',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM2NmYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5OZXVyYWwgTmV0d29ya3M8L3RleHQ+PC9zdmc+',
    publicId: 'sample-video-1',
    duration: 300,
    category: 'Neural Networks',
    tags: ['Neural Networks', 'AI', 'Beginner'],
    status: 'published',
    views: 1500,
    likes: 120,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date()
  },
  {
    title: 'Machine Learning Fundamentals',
    slug: 'machine-learning-fundamentals',
    description: 'Understand the core concepts of machine learning and its applications.',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGI1Y2Y2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5NYWNoaW5lIExlYXJuaW5nPC90ZXh0Pjwvc3ZnPg==',
    publicId: 'sample-video-2',
    duration: 450,
    category: 'Machine Learning',
    tags: ['Machine Learning', 'AI', 'Fundamentals'],
    status: 'published',
    views: 2300,
    likes: 180,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date()
  },
  {
    title: 'Deep Learning with Python',
    slug: 'deep-learning-with-python',
    description: 'Practical guide to implementing deep learning models using Python.',
    videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_3mb.mp4',
    thumbnailUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjM2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTBiOTgxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5EZWVwIExlYXJuaW5nPC90ZXh0Pjwvc3ZnPg==',
    publicId: 'sample-video-3',
    duration: 600,
    category: 'Deep Learning',
    tags: ['Deep Learning', 'Python', 'Advanced'],
    status: 'published',
    views: 1800,
    likes: 150,
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date()
  }
];

// Sample news data
const sampleNews = [
  {
    title: 'Getting Started with AI in 2024',
    slug: 'getting-started-with-ai-2024',
    excerpt: 'A comprehensive guide to understanding artificial intelligence and its applications.',
    content: `
      <h2>Introduction to Artificial Intelligence</h2>
      <p>Artificial Intelligence (AI) has become one of the most transformative technologies of our time. From virtual assistants to autonomous vehicles, AI is reshaping how we live, work, and interact with technology.</p>

      <h3>What is AI?</h3>
      <p>At its core, AI refers to computer systems that can perform tasks that typically require human intelligence. This includes learning, reasoning, problem-solving, perception, and language understanding.</p>

      <h3>Types of AI</h3>
      <ul>
        <li><strong>Narrow AI:</strong> Designed for specific tasks (like image recognition or language translation)</li>
        <li><strong>General AI:</strong> Hypothetical AI that could perform any intellectual task a human can do</li>
        <li><strong>Superintelligent AI:</strong> AI that surpasses human intelligence in all areas</li>
      </ul>

      <h3>Getting Started</h3>
      <p>If you're new to AI, here are some steps to begin your journey:</p>
      <ol>
        <li>Learn the basics of programming (Python is highly recommended)</li>
        <li>Understand fundamental concepts like machine learning and neural networks</li>
        <li>Practice with online courses and tutorials</li>
        <li>Work on small projects to apply your knowledge</li>
        <li>Join AI communities and forums</li>
      </ol>

      <h3>Conclusion</h3>
      <p>AI is not just a buzzword—it's a powerful tool that's already changing our world. By understanding its basics and staying curious, you can be part of this exciting technological revolution.</p>
    `,
    category: 'AI Basics',
    tags: ['AI', 'Machine Learning', 'Beginner'],
    status: 'published',
    featuredImage: {
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjM2NmYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BSSBJbGx1c3RyYXRpb248L3RleHQ+PC9zdmc+',
      alt: 'AI illustration',
      publicId: 'sample-image'
    },
    readTime: 5,
    views: 1250,
    author: {
      name: 'AInSeconds Team',
      avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2ZjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAyQzEzLjEgMiAxNCAyLjkgMTQgNEMxNCA1LjEgMTMuMSA2IDEyIDZDMTAuOSA2IDEwIDUuMSAxMCA0QzEwIDIuOSAxMC45IDIgMTIgMlpNMjEgOVYyMkgxOVYxNkgxM1YyMkgxMVY5QzExIDguNDUgMTEuNDUgOCAxMiA4SDIwQzIwLjU1IDggMjEgOC40NSAyMSA5WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cjwvc3ZnPgo='
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
    seo: {}
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await mongoose.connection.db.collection('videos').deleteMany({});
    await mongoose.connection.db.collection('news').deleteMany({});

    // Insert sample data
    console.log('Inserting sample videos...');
    await mongoose.connection.db.collection('videos').insertMany(sampleVideos);
    
    console.log('Inserting sample news...');
    await mongoose.connection.db.collection('news').insertMany(sampleNews);

    console.log('Database seeded successfully!');
    console.log(`Inserted ${sampleVideos.length} videos and ${sampleNews.length} news articles`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the seeding script
seedDatabase();
