### 1. README for BooksList Components

### General: 
- This component displays all books

### How to use:
- The component itself is plug-n-play UI component. It includes the Create and Edit functionality within.

### Example
```
import BooksList from '@/components/books/BooksList';

const MyApp = () => {
  return (
    <div>
      <BooksList />
    </div>
  );
};
```

export default MyApp;
### Interactions:
- **Component Interactions**: 
  - The `BooksList` component interacts with the `BookEditor` component to handle the creation and editing of books. When a user clicks on a book, the `BooksList` component passes the book ID to the `BookEditor` component.
- **State Management**: 
  - The component uses the `useBooks` hook from the `BooksProvider` context to fetch and manage the list of books.
- **Event Handling**: 
  - The component handles user actions such as clicking on a book to edit it or clicking a button to create a new book. These actions trigger state updates and API calls.
- **API Interactions**: 
  - The component fetches the list of books from an API when it mounts using the `useEffect` hook. It also sends API requests to create or update books.
- **Lifecycle Methods**: 
  - The component uses the `useEffect` hook to fetch the list of books when it mounts and to update the list when a book is created or edited.


### My Throught process:
- This was to just display books based on the current User and roles. Roles weren't added yet. I wanted to either add functionality to either filter Current User Books (Role: Author) and Shared books (Role: Collaborator) or to separate them. 
