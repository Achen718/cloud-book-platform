// server/server.js
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom route for updating a book
server.put('/books/:id', (req, res) => {
  const db = router.db; // lowdb instance
  const bookId = req.params.id;
  const updatedBook = req.body;

  const bookIndex = db.get('books').findIndex({ id: bookId }).value();
  if (bookIndex !== -1) {
    db.get('books').splice(bookIndex, 1, updatedBook).write();
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Custom route for setting a collaborator role
server.patch('/users/:id', (req, res) => {
  console.log(`Received request to set role for user ${req.params.id}`);
  const db = router.db; // lowdb instance
  const userId = req.params.id;
  const { role, bookId } = req.body;

  const user = db.get('users').find({ id: userId }).value();
  if (user) {
    console.log(`User found: ${JSON.stringify(user)}`);
    if (!user.role[role]) {
      user.role[role] = [];
    }
    user.role[role].push(bookId);
    db.get('users').find({ id: userId }).assign({ role: user.role }).write();
    res.json(user);
  } else {
    console.log(`User not found: ${userId}`);
    res.status(404).json({ message: 'User not found' });
  }
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
