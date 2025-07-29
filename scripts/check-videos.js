async function checkVideos() {
  try {
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch('http://localhost:3000/api/videos?limit=100');
    const data = await response.json();
    
    console.log('Total videos:', data.totalCount);
    console.log('\nVideo details:');
    
    data.videos.forEach((video, index) => {
      console.log(`\n${index + 1}. ${video.title}`);
      console.log(`   Status: ${video.status}`);
      console.log(`   Video URL: ${video.videoUrl}`);
      console.log(`   Thumbnail: ${video.thumbnailUrl}`);
      console.log(`   Duration: ${video.duration}s`);
      console.log(`   Category: ${video.category}`);
      console.log(`   Created: ${new Date(video.createdAt).toLocaleDateString()}`);
    });
    
    // Check for videos without proper URLs
    const videosWithoutUrl = data.videos.filter(v => !v.videoUrl || v.videoUrl === '');
    const videosWithoutThumbnail = data.videos.filter(v => !v.thumbnailUrl || v.thumbnailUrl === '');
    
    console.log(`\n📊 Summary:`);
    console.log(`   Total videos: ${data.videos.length}`);
    console.log(`   Published videos: ${data.videos.filter(v => v.status === 'published').length}`);
    console.log(`   Videos without URL: ${videosWithoutUrl.length}`);
    console.log(`   Videos without thumbnail: ${videosWithoutThumbnail.length}`);
    
    if (videosWithoutUrl.length > 0) {
      console.log('\n❌ Videos missing video URLs:');
      videosWithoutUrl.forEach(v => console.log(`   - ${v.title}`));
    }
    
    if (videosWithoutThumbnail.length > 0) {
      console.log('\n❌ Videos missing thumbnails:');
      videosWithoutThumbnail.forEach(v => console.log(`   - ${v.title}`));
    }
    
  } catch (error) {
    console.error('❌ Error checking videos:', error);
  }
}

checkVideos();
