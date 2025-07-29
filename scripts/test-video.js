async function testVideoCreation() {
  try {
    const fetch = (await import('node-fetch')).default;
    
    const testVideo = {
      title: "Test Video",
      description: "Test description",
      videoUrl: "https://example.com/video.mp4",
      thumbnailUrl: "https://example.com/thumb.jpg",
      publicId: "test-video-id",
      duration: 120,
      category: "Getting Started",
      tags: ["test"],
      status: "draft"
    };

    const response = await fetch('http://localhost:3001/api/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testVideo)
    });

    const result = await response.json();
    console.log('Test result:', result);
    
    if (response.ok) {
      console.log('✅ Video creation successful!');
      
      // Clean up - delete the test video
      const deleteResponse = await fetch(`http://localhost:3001/api/videos/${result._id}`, {
        method: 'DELETE'
      });
      
      if (deleteResponse.ok) {
        console.log('✅ Test video cleaned up successfully!');
      }
    } else {
      console.log('❌ Video creation failed:', result);
    }
  } catch (error) {
    console.error('❌ Test error:', error);
  }
}

testVideoCreation();
