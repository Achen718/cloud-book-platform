'use client';
import { useState, useEffect } from 'react';
import { Card, Typography, Button, Input } from '@material-tailwind/react';
import { useBook } from '@/context/bookContext';
import { useRouter } from 'next/navigation';

interface SectionProps {
  section: {
    id: string;
    title: string;
    subsections: SectionProps['section'][];
  };
  addSubsection: (parentId: string) => void;
  editSection: (id: string, newTitle: string) => void;
}

const Section = ({ section, addSubsection, editSection }: SectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(section.title);

  const handleEdit = () => {
    editSection(section.id, title);
    setIsEditing(false);
  };

  return (
    <div className='ml-4'>
      {isEditing ? (
        <div>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='mb-2'
          />
          <Button onClick={handleEdit}>Save</Button>
        </div>
      ) : (
        <div>
          <Typography variant='h6' color='blue-gray'>
            {section.title}
          </Typography>
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
        </div>
      )}
      <Button onClick={() => addSubsection(section.id)}>Add Subsection</Button>
      {section.subsections.map((subsection) => (
        <Section
          key={subsection.id}
          section={subsection}
          addSubsection={addSubsection}
          editSection={editSection}
        />
      ))}
    </div>
  );
};

interface BookEditorProps {
  bookId: string;
}

const BookEditor = ({ bookId }: BookEditorProps) => {
  const {
    sections,
    addSection,
    addSubsection,
    editSection,
    setSections,
    addCollaborator,
  } = useBook();
  const [title, setTitle] = useState('');
  const [collaboratorId, setCollaboratorId] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`http://localhost:3001/books/${bookId}`);
      const data = await response.json();
      setTitle(data.title);
      setSections(data.sections);
    };
    fetchBook();
  }, [bookId]);

  const saveBook = async () => {
    // Fetch the current book data to include collaborators and authorId
    const response = await fetch(`http://localhost:3001/books/${bookId}`);
    const currentBookData = await response.json();

    const bookData = {
      id: bookId,
      title,
      sections,
      collaborators: currentBookData.collaborators,
      authorId: currentBookData.authorId,
    };

    await fetch(`http://localhost:3001/books/${bookId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    router.push('/author/books');
  };

  const handleAddCollaborator = () => {
    addCollaborator(collaboratorId);
    setCollaboratorId('');
  };

  return (
    <Card className='p-4 shadow-xl shadow-blue-gray-900/5 w-screen80'>
      <Typography variant='h4' color='blue-gray' className='mb-4'>
        Book Editor
      </Typography>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='mb-4'
        placeholder='Book Title'
      />
      <Button onClick={addSection} className='mb-4'>
        Add Section
      </Button>
      {sections.map((section) => (
        <Section
          key={section.id}
          section={section}
          addSubsection={addSubsection}
          editSection={editSection}
        />
      ))}
      <Input
        value={collaboratorId}
        onChange={(e) => setCollaboratorId(e.target.value)}
        className='mb-4'
        placeholder='Collaborator ID'
      />
      <Button onClick={handleAddCollaborator} className='mb-4'>
        Add Collaborator
      </Button>
      <Button onClick={saveBook} className='mt-4'>
        Save Book
      </Button>
    </Card>
  );
};

export default BookEditor;
