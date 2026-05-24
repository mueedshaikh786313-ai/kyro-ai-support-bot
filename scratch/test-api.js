async function test() {
  try {
    const res = await fetch('http://localhost:8081/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activeBot: 'kyro',
        messages: [
          {
            id: '1',
            role: 'user',
            content: 'Hello, what is Kyro?',
            parts: [{ type: 'text', text: 'Hello, what is Kyro?' }]
          }
        ]
      })
    });
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Response:', text.slice(0, 500));
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
