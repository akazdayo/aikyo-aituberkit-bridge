import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8000');

ws.on('open', () => {
  console.log('Connected to ws://localhost:8000');
  setInterval(() => {
    const randomHiragana = Array.from({ length: 10 }, () =>
      String.fromCharCode(0x3042 + Math.floor(Math.random() * 83))
    ).join('');
    const message = {
      text: randomHiragana,
      role: 'assistant',
      emotion: 'neutral',
      type: 'message',
    }
    ws.send(JSON.stringify(message));
    console.log('Sent:', randomHiragana);
  }, 1000);
});

ws.on('message', (data) => {
  console.log('Received:', data.toString());
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

ws.on('close', () => {
  console.log('Connection closed');
});