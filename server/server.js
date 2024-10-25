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

// Custom route for adding a collaborator
server.patch('/books/:id/collaborators', (req, res) => {
  const db = router.db; // lowdb instance
  const bookId = req.params.id;
  const { collaboratorId } = req.body;

  const book = db.get('books').find({ id: bookId }).value();
  if (book) {
    if (!book.collaborators) {
      book.collaborators = [];
    }
    book.collaborators.push(collaboratorId);
    db.write();
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
