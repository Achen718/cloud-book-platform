'use client';
import { useEffect, useState } from 'react';
import BookEditor from '@/components/books/editor/BookEditor';
import { BookProvider } from '@/context/bookContext';
import { useParams } from 'next/navigation';

const BookEditorPage = () => {
  const [bookId, setBookId] = useState<string | null>(null);
  const params = useParams<{ id: string }>();
  const { id } = params;

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`http://localhost:3001/books/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBookId(data.id);
      } else {
        console.error('Failed to fetch book data');
      }
    };

    fetchBook();
  }, []);

  if (!bookId) {
    return <div>Loading...</div>;
  }

  return (
    <BookProvider bookId={bookId}>
      <BookEditor bookId={bookId} />
    </BookProvider>
  );
};

export default BookEditorPage;
