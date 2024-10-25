// context/bookContext.tsx
'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

interface Section {
  id: string;
  title: string;
  subsections: Section[];
}

interface BookContextProps {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
  addSection: () => void;
  addSubsection: (parentId: string) => void;
  editSection: (id: string, newTitle: string) => void;
  addCollaborator: (collaboratorId: string) => void;
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

interface BookProviderProps {
  bookId: string;
  children: React.ReactNode;
}

export const BookProvider: React.FC<BookProviderProps> = ({
  children,
  bookId,
}) => {
  const [sections, setSections] = useState<Section[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.bookId === bookId) {
        setSections(data.sections);
      }
    };
    return () => {
      ws.current?.close();
    };
  }, [bookId]);

  const sendUpdate = (updatedSections: Section[]) => {
    setSections(updatedSections);
    ws.current?.send(JSON.stringify({ bookId, sections: updatedSections }));
  };

  const addSection = () => {
    const newSection = {
      id: Date.now().toString(),
      title: 'New Section',
      subsections: [],
    };
    const updatedSections = [...sections, newSection];
    sendUpdate(updatedSections);
  };

  const addSubsection = (parentId: string) => {
    const addSubsectionRecursive = (sections: Section[]): Section[] => {
      return sections.map((section) => {
        if (section.id === parentId) {
          const newSubsection = {
            id: Date.now().toString(),
            title: 'New Subsection',
            subsections: [],
          };
          return {
            ...section,
            subsections: [...section.subsections, newSubsection],
          };
        }
        return {
          ...section,
          subsections: addSubsectionRecursive(section.subsections),
        };
      });
    };
    const updatedSections = addSubsectionRecursive(sections);
    sendUpdate(updatedSections);
  };

  const editSection = (id: string, newTitle: string) => {
    const editSectionRecursive = (sections: Section[]): Section[] => {
      return sections.map((section) => {
        if (section.id === id) {
          return {
            ...section,
            title: newTitle,
          };
        }
        return {
          ...section,
          subsections: editSectionRecursive(section.subsections),
        };
      });
    };
    const updatedSections = editSectionRecursive(sections);
    sendUpdate(updatedSections);
  };

  const addCollaborator = async (collaboratorId: string) => {
    await fetch(`http://localhost:3001/books/${bookId}/collaborators`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ collaboratorId }),
    });
  };

  return (
    <BookContext.Provider
      value={{
        sections,
        setSections,
        addSection,
        addSubsection,
        editSection,
        addCollaborator,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
};
