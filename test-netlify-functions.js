#!/usr/bin/env node

/**
 * Test script for Netlify Functions
 * Usage: node test-netlify-functions.js [base-url]
 */

const baseUrl = process.argv[2] || 'https://ainseconds.shop';

async function testFunction(endpoint, method = 'GET', body = null) {
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
    console.log(`📄 Response: ${data.substring(0, 300)}${data.length > 300 ? '...' : ''}`);
    
    // Try to parse as JSON
    try {
      const jsonData = JSON.parse(data);
      console.log(`📊 Parsed JSON:`, jsonData);
    } catch (e) {
      console.log(`⚠️  Response is not JSON (might be HTML error page)`);
    }
    
    return { status: response.status, data };
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return { error: error.message };
  }
}

async function runTests() {
  console.log(`🚀 Testing Netlify Functions on: ${baseUrl}`);
  
  // Test health endpoint
  console.log('\n=== Testing Health Check ===');
  await testFunction('/api/health');
  
  // Test login endpoint
  console.log('\n=== Testing Login ===');
  await testFunction('/api/auth/login', 'POST', {
    username: 'admin',
    password: 'ainseconds_admin_2024_secure_key'
  });
  
  console.log('\n✨ Tests completed!');
  console.log('\n📝 Next steps:');
  console.log('1. If health check returns JSON with "functionType": "netlify-function", functions are working');
  console.log('2. If login returns a token, authentication is working');
  console.log('3. If you get HTML responses, the functions are not deployed correctly');
}

// Only run if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testFunction, runTests };
