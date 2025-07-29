async function seedDatabase() {
  try {
    const fetch = (await import('node-fetch')).default;

    const response = await fetch('http://localhost:3000/api/seed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('Seed result:', data);
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

seedDatabase();
