// components/books/BooksList.tsx
'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  Button,
} from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const BooksList = () => {
  const { data: session } = useSession();
  const currentUser = session?.user;

  interface Book {
    id: string;
    title: string;
    authorId: string;
    sections: any[];
  }

  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:3001/books');
      const data = await response.json();
      const filteredBooks = data.filter(
        (book: Book) => book.authorId === currentUser?.id
      );
      setBooks(filteredBooks);
    };

    if (currentUser) {
      fetchBooks();
    }
  }, [currentUser]);

  const handleCreateBook = async () => {
    const newBook = {
      id: Date.now().toString(),
      title: 'New Book',
      authorId: currentUser?.id || '',
      collaborators: [],
      sections: [],
    };
    await fetch('http://localhost:3001/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });
    setBooks([...books, newBook]);
  };

  const handleEditBook = (bookId: string) => {
    router.push(`/author/books/${bookId}`);
  };

  return (
    <Card className='p-4 shadow-xl shadow-blue-gray-900/5 w-screen80'>
      <Typography variant='h4' color='blue-gray' className='mb-4'>
        My Books
      </Typography>
      <List>
        {books.map((book) => (
          <ListItem key={book.id} onClick={() => handleEditBook(book.id)}>
            {book.title}
            {/* <Button onClick={() => handleEditBook(book.id)}>Edit</Button> */}
          </ListItem>
        ))}
      </List>
      <Button onClick={handleCreateBook}>Create New Book</Button>
    </Card>
  );
};

export default BooksList;
