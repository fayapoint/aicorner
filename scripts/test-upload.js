async function testImageUpload() {
  try {
    const fetch = (await import('node-fetch')).default;
    const FormData = (await import('form-data')).default;
    const fs = (await import('fs')).default;
    
    // Create a simple test image (1x1 pixel PNG)
    const testImageBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
      0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0xF8, 0x00, 0x00, 0x00,
      0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x00, 0x37, 0x6E, 0xF9, 0x24, 0x00,
      0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
    ]);

    const formData = new FormData();
    formData.append('file', testImageBuffer, {
      filename: 'test.png',
      contentType: 'image/png'
    });

    const response = await fetch('http://localhost:3000/api/upload/image', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    console.log('Image upload test result:', result);
    
    if (response.ok) {
      console.log('✅ Image upload successful!');
      console.log('URL:', result.secure_url);
    } else {
      console.log('❌ Image upload failed:', result);
    }
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testImageUpload();
