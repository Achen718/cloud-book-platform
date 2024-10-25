// server/websocket.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let books = {}; // In-memory storage for simplicity

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const data = JSON.parse(message);
    const { bookId, sections } = data;

    // Update the book data
    books[bookId] = sections;

    // Broadcast the updated sections to all clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ bookId, sections }));
      }
    });
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
