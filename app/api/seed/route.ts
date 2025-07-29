import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import Video from '@/models/Video';

const sampleNews = [
  {
    title: "Revolutionary AI Model Achieves Human-Level Performance in Complex Reasoning",
    slug: "revolutionary-ai-model-achieves-human-level-performance-in-complex-reasoning",
    excerpt: "A breakthrough in artificial intelligence has been achieved with the development of a new model that demonstrates human-level performance in complex reasoning tasks, marking a significant milestone in AI development.",
    content: `<p>In a groundbreaking development that could reshape the landscape of artificial intelligence, researchers have unveiled a new AI model that demonstrates unprecedented capabilities in complex reasoning tasks. This achievement represents a significant leap forward in the quest to develop artificial general intelligence (AGI).</p>

<h2>Key Breakthrough Features</h2>
<p>The new model, developed through advanced neural architecture and innovative training methodologies, showcases several remarkable capabilities:</p>
<ul>
<li><strong>Multi-step reasoning:</strong> The ability to break down complex problems into manageable steps</li>
<li><strong>Contextual understanding:</strong> Deep comprehension of nuanced scenarios and implications</li>
<li><strong>Creative problem-solving:</strong> Novel approaches to challenges that haven't been explicitly trained</li>
</ul>

<h2>Implications for the Future</h2>
<p>This breakthrough has far-reaching implications across multiple industries, from healthcare and education to scientific research and creative industries. The model's ability to reason at a human level opens up possibilities for more sophisticated AI assistants and automated systems.</p>

<p>As we continue to push the boundaries of what's possible with AI, this development serves as a reminder of the rapid pace of innovation in the field and the importance of responsible AI development.</p>`,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      publicId: "ai-breakthrough-reasoning",
      alt: "AI neural network visualization"
    },
    author: {
      name: "AInSeconds Team",
      avatar: "/images/ainseconds-avatar.svg"
    },
    category: "AI Technology",
    tags: ["Machine Learning", "AGI", "Research", "Breakthrough"],
    status: "published" as const,
    publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    readTime: 5,
    views: 1250
  },
  {
    title: "The Future of AI in Healthcare: Transforming Patient Care",
    slug: "the-future-of-ai-in-healthcare-transforming-patient-care",
    excerpt: "Explore how artificial intelligence is revolutionizing healthcare delivery, from diagnostic accuracy to personalized treatment plans, and what this means for patients and healthcare providers.",
    content: `<p>The healthcare industry is experiencing a transformative shift as artificial intelligence technologies become increasingly integrated into patient care systems. From early disease detection to personalized treatment recommendations, AI is reshaping how healthcare is delivered worldwide.</p>

<h2>Current Applications</h2>
<p>AI is already making significant impacts in several areas of healthcare:</p>
<ul>
<li><strong>Medical Imaging:</strong> AI algorithms can detect anomalies in X-rays, MRIs, and CT scans with remarkable accuracy</li>
<li><strong>Drug Discovery:</strong> Machine learning accelerates the identification of potential therapeutic compounds</li>
<li><strong>Predictive Analytics:</strong> AI helps predict patient outcomes and identify high-risk individuals</li>
</ul>

<h2>Benefits and Challenges</h2>
<p>While the benefits of AI in healthcare are substantial, including improved accuracy, reduced costs, and better patient outcomes, there are also challenges to consider, such as data privacy, regulatory compliance, and the need for healthcare professional training.</p>

<p>As we move forward, the collaboration between AI technology and human expertise will be crucial in realizing the full potential of AI-powered healthcare.</p>`,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      publicId: "ai-healthcare-future",
      alt: "AI in healthcare technology"
    },
    category: "Industry News",
    tags: ["Healthcare", "Medical AI", "Innovation", "Patient Care"],
    status: "published" as const,
    publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    readTime: 7,
    views: 890
  },
  {
    title: "Building Your First AI Chatbot: A Complete Guide",
    slug: "building-your-first-ai-chatbot-a-complete-guide",
    excerpt: "Learn how to create an intelligent chatbot from scratch using modern AI technologies. This comprehensive tutorial covers everything from setup to deployment.",
    content: `<p>Creating an AI-powered chatbot has never been more accessible. With the right tools and knowledge, you can build sophisticated conversational AI that can handle complex user interactions and provide valuable assistance.</p>

<h2>Getting Started</h2>
<p>Before diving into development, it's important to understand the key components of a modern AI chatbot:</p>
<ul>
<li><strong>Natural Language Processing (NLP):</strong> Understanding user intent and context</li>
<li><strong>Dialog Management:</strong> Maintaining conversation flow and state</li>
<li><strong>Response Generation:</strong> Creating appropriate and helpful responses</li>
</ul>

<h2>Step-by-Step Implementation</h2>
<p>Our tutorial will guide you through each phase of development, from initial setup to advanced features like context awareness and multi-turn conversations.</p>

<h2>Best Practices</h2>
<p>We'll also cover important considerations such as user experience design, error handling, and performance optimization to ensure your chatbot provides value to users.</p>

<p>By the end of this guide, you'll have a fully functional AI chatbot ready for deployment and further customization.</p>`,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=400&fit=crop",
      publicId: "chatbot-tutorial-guide",
      alt: "Chatbot development interface"
    },
    category: "Tutorials",
    tags: ["Chatbot", "Tutorial", "Development", "NLP"],
    status: "published" as const,
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    readTime: 12,
    views: 2100
  },
  {
    title: "AInSeconds Platform Update: New Features and Improvements",
    slug: "ainseconds-platform-update-new-features-and-improvements",
    excerpt: "Discover the latest enhancements to the AInSeconds platform, including new AI models, improved performance, and enhanced user experience features.",
    content: `<p>We're excited to announce a major update to the AInSeconds platform, bringing you new capabilities, improved performance, and an enhanced user experience. This update represents months of development and incorporates valuable feedback from our community.</p>

<h2>New AI Models</h2>
<p>We've added several cutting-edge AI models to our platform:</p>
<ul>
<li><strong>Advanced Language Model:</strong> Improved reasoning and context understanding</li>
<li><strong>Vision AI:</strong> Enhanced image analysis and generation capabilities</li>
<li><strong>Code Assistant:</strong> Specialized model for programming tasks</li>
</ul>

<h2>Performance Improvements</h2>
<p>Our infrastructure upgrades have resulted in:</p>
<ul>
<li>50% faster response times</li>
<li>99.9% uptime reliability</li>
<li>Enhanced scalability for high-demand periods</li>
</ul>

<h2>User Experience Enhancements</h2>
<p>The updated interface includes intuitive navigation, improved accessibility features, and streamlined workflows that make it easier than ever to leverage AI capabilities.</p>

<p>We're committed to continuous improvement and look forward to your feedback on these new features.</p>`,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      publicId: "platform-update-features",
      alt: "Platform update dashboard"
    },
    category: "Product Updates",
    tags: ["Platform", "Updates", "Features", "Performance"],
    status: "published" as const,
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    readTime: 4,
    views: 756
  },
  {
    title: "Understanding Machine Learning: From Basics to Advanced Concepts",
    slug: "understanding-machine-learning-from-basics-to-advanced-concepts",
    excerpt: "A comprehensive exploration of machine learning fundamentals, covering key algorithms, applications, and the latest research developments in the field.",
    content: `<p>Machine learning has become one of the most transformative technologies of our time, powering everything from recommendation systems to autonomous vehicles. Understanding its principles and applications is crucial for anyone interested in the future of technology.</p>

<h2>Fundamentals of Machine Learning</h2>
<p>At its core, machine learning is about creating systems that can learn and improve from experience without being explicitly programmed. The field encompasses several key approaches:</p>
<ul>
<li><strong>Supervised Learning:</strong> Learning from labeled examples</li>
<li><strong>Unsupervised Learning:</strong> Finding patterns in unlabeled data</li>
<li><strong>Reinforcement Learning:</strong> Learning through interaction and feedback</li>
</ul>

<h2>Popular Algorithms and Techniques</h2>
<p>We'll explore the most important algorithms in machine learning, including neural networks, decision trees, support vector machines, and ensemble methods, explaining when and how to use each approach effectively.</p>

<h2>Real-World Applications</h2>
<p>From natural language processing to computer vision, machine learning applications are everywhere. We'll examine case studies and practical implementations across various industries.</p>

<p>Whether you're a beginner or looking to deepen your understanding, this guide provides valuable insights into the world of machine learning.</p>`,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
      publicId: "machine-learning-concepts",
      alt: "Machine learning algorithm visualization"
    },
    category: "Machine Learning",
    tags: ["ML", "Algorithms", "Education", "Fundamentals"],
    status: "published" as const,
    publishedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    readTime: 15,
    views: 1680
  },
  {
    title: "Ethical AI Development: Principles and Best Practices",
    slug: "ethical-ai-development-principles-and-best-practices",
    excerpt: "Explore the critical importance of ethical considerations in AI development, including bias mitigation, transparency, and responsible deployment strategies.",
    content: `<p>As artificial intelligence becomes increasingly powerful and pervasive, the importance of ethical AI development cannot be overstated. Ensuring that AI systems are fair, transparent, and beneficial to society requires careful consideration of ethical principles throughout the development process.</p>

<h2>Core Ethical Principles</h2>
<p>Ethical AI development is built on several fundamental principles:</p>
<ul>
<li><strong>Fairness:</strong> Ensuring AI systems don't discriminate against individuals or groups</li>
<li><strong>Transparency:</strong> Making AI decision-making processes understandable</li>
<li><strong>Accountability:</strong> Establishing clear responsibility for AI system outcomes</li>
<li><strong>Privacy:</strong> Protecting individual data and maintaining confidentiality</li>
</ul>

<h2>Addressing Bias in AI</h2>
<p>One of the most significant challenges in AI development is identifying and mitigating bias. We'll explore strategies for detecting bias in training data, algorithms, and outcomes, as well as techniques for creating more equitable AI systems.</p>

<h2>Implementation Strategies</h2>
<p>Practical approaches to implementing ethical AI include diverse development teams, comprehensive testing protocols, and ongoing monitoring of deployed systems.</p>

<p>By prioritizing ethical considerations, we can ensure that AI technology serves the greater good and contributes positively to society.</p>`,
    featuredImage: {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      publicId: "ethical-ai-development",
      alt: "Ethical AI concept illustration"
    },
    category: "Research",
    tags: ["Ethics", "AI Safety", "Bias", "Responsibility"],
    status: "published" as const,
    publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    readTime: 8,
    views: 945
  }
];

const sampleVideos = [
  {
    title: "Introduction to AInSeconds Platform",
    slug: "introduction-to-ainseconds-platform",
    description: "Get started with AInSeconds and discover how our platform can transform your AI workflow. This comprehensive introduction covers all the essential features and capabilities.",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop",
    publicId: "intro-ainseconds-platform",
    duration: 180, // 3 minutes
    category: "Getting Started",
    tags: ["Introduction", "Platform", "Tutorial"],
    status: "published" as const,
    publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    views: 520,
    likes: 45
  },
  {
    title: "Building AI Applications with No Code",
    slug: "building-ai-applications-with-no-code",
    description: "Learn how to create powerful AI applications without writing a single line of code. Perfect for beginners and non-technical users who want to leverage AI capabilities.",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    publicId: "no-code-ai-applications",
    duration: 420, // 7 minutes
    category: "Tutorials",
    tags: ["No Code", "Applications", "Beginner"],
    status: "published" as const,
    publishedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    views: 1200,
    likes: 89
  },
  {
    title: "Advanced AI Model Fine-tuning Techniques",
    slug: "advanced-ai-model-fine-tuning-techniques",
    description: "Dive deep into advanced techniques for fine-tuning AI models to achieve optimal performance for your specific use cases. Includes practical examples and best practices.",
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=450&fit=crop",
    publicId: "advanced-model-finetuning",
    duration: 900, // 15 minutes
    category: "Advanced",
    tags: ["Fine-tuning", "Models", "Advanced", "Optimization"],
    status: "published" as const,
    publishedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    views: 780,
    likes: 67
  }
];

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Clear existing data
    await (News as any).deleteMany({});
    await (Video as any).deleteMany({});

    // Insert sample news one by one to trigger pre-save middleware
    const newsResults = [];
    for (const newsData of sampleNews) {
      // Ensure author is set for all articles
      const newsWithAuthor = {
        ...newsData,
        author: newsData.author || {
          name: "AInSeconds Team",
          avatar: "/images/ainseconds-avatar.svg"
        }
      };
      const news = new News(newsWithAuthor);
      const saved = await news.save();
      newsResults.push(saved);
    }
    console.log(`Inserted ${newsResults.length} news articles`);

    // Insert sample videos one by one to trigger pre-save middleware
    const videoResults = [];
    for (const videoData of sampleVideos) {
      const video = new Video(videoData);
      const saved = await video.save();
      videoResults.push(saved);
    }
    console.log(`Inserted ${videoResults.length} videos`);

    return NextResponse.json({
      message: 'Database seeded successfully',
      news: newsResults.length,
      videos: videoResults.length
    });

  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}
