// Simple test file for URL parser - can be run manually for testing
import { URLParser } from './url-parser';

async function testURLParser() {
  console.log('🧪 Testing URL Parser...\n');

  const testUrls = [
    // YouTube URLs
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ',
    
    // News URLs (these might fail due to anti-bot protection)
    'https://techcrunch.com/2024/01/01/example-article/',
    'https://www.theverge.com/2024/1/1/example-article',
    
    // Simple test page
    'https://example.com'
  ];

  for (const url of testUrls) {
    console.log(`\n📄 Testing: ${url}`);
    try {
      const result = await URLParser.parseURL(url);
      console.log('✅ Result:', {
        type: result.type,
        title: result.title?.substring(0, 50) + '...',
        description: result.description?.substring(0, 100) + '...',
        thumbnail: result.thumbnail ? 'Present' : 'None',
        author: result.author || 'None'
      });
    } catch (error) {
      console.log('❌ Error:', error.message);
    }
  }
}

// Export for manual testing
export { testURLParser };

// Uncomment to run directly
// testURLParser().catch(console.error);
