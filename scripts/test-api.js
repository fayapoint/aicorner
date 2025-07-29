#!/usr/bin/env node

/**
 * Simple script to test API endpoints locally and in production
 * Usage: node scripts/test-api.js [base-url]
 * Example: node scripts/test-api.js https://ainseconds.shop
 */

const baseUrl = process.argv[2] || 'http://localhost:3000';

async function testEndpoint(endpoint, method = 'GET', body = null) {
  const url = `${baseUrl}${endpoint}`;
  console.log(`\n🧪 Testing ${method} ${url}`);
  
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(url, options);
    const data = await response.text();
    
    console.log(`✅ Status: ${response.status}`);
    console.log(`📄 Response: ${data.substring(0, 200)}${data.length > 200 ? '...' : ''}`);
    
    return { status: response.status, data };
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return { error: error.message };
  }
}

async function runTests() {
  console.log(`🚀 Testing API endpoints on: ${baseUrl}`);
  
  // Test health endpoint
  await testEndpoint('/api/health');
  
  // Test login endpoint
  await testEndpoint('/api/auth/login', 'POST', {
    username: 'admin',
    password: 'test-password'
  });
  
  // Test news endpoint
  await testEndpoint('/api/news');
  
  console.log('\n✨ Tests completed!');
  console.log('\n📝 Next steps:');
  console.log('1. If health check fails, verify API routes are deployed correctly');
  console.log('2. If login fails, check environment variables in Netlify');
  console.log('3. Visit /admin in your browser to test the admin panel');
}

// Only run if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testEndpoint, runTests };
