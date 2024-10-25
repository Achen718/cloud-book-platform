### 1. README for BookEditor Component

### General: 
- This is to edit books

### How to use:
- The `BookEditor` component allows users to edit the details of a book, including its title, sections, and collaborators. It provides functionality to add, edit, and save sections and subsections, as well as to add collaborators.
- the books/[id] page fetches books by id and passes props to the bookContext and Bookeditor component

### Example Usage

```
import BookEditor from '@/components/books/editor/BookEditor';
import { BookProvider } from '@/context/bookContext';

const BookEditorPage = ({ params }) => {
  const { id } = params;

  return (
    <BookProvider bookId={id}>
      <BookEditor bookId={id} />
    </BookProvider>
  );
};

export default BookEditorPage;
```

export default MyApp;
### Interactions:
- **Component Interactions**: 
  - The BookEditor component interacts with the Section component to handle the creation and editing of sections and subsections. The Section component is recursively rendered for each subsection.
  - The BookEditor component uses the useBook hook from the BookProvider context to access and manage the book's state, including sections and collaborators.
- **State Management**: 
  - The component uses the useBook hook from the BookProvider context to manage the book's sections and collaborators. The context provides the state and functions to update the state.
- **Event Handling**: 
  - Add Section: Clicking the "Add Section" button triggers the addSection function, which adds a new section to the book.
  - Add Subsection: Clicking the "Add Subsection" button triggers the addSubsection function, which adds a new subsection to the specified section.
  - Edit Section: Editing a section's title triggers the editSection function, which updates the section's title.
  - Save Book: Clicking the "Save Book" button triggers the saveBook function, which saves the book's data and redirects to the /author/books page.
  - Add Collaborator: Clicking the "Add Collaborator" button triggers the handleAddCollaborator function, which adds a new collaborator to the book.
- **API Interactions**: 
  - Fetching Book Data: The component fetches the book's data from an API when it mounts using the useEffect hook.
  - Saving Book Data: The saveBook function sends a PUT request to update the book's data on the server.

- **Lifecycle Methods**: 
  - The useEffect hook is used to fetch the book's data when the component mounts and to update the state when the book's data changes.
