### README for Nav Component

### General: 
-The NavbarDefault component interacts with the Link component from next/link to handle navigation.

### How to use:
- The component itself is a plug-n-play UI component. It includes navigation links and handles responsive behavior.

### Example
```
import { NavbarDefault } from '@/components/layout/nav/NavBar';

const MyApp = () => {
  return (
    <div>
      <NavbarDefault />
    </div>
  );
};

export default MyApp;
```

export default MyApp;
### Interactions:
- **Component Interactions**: 
  - The NavbarDefault component interacts with the Link component from next/link to handle navigation.
- **State Management**: 
  - The component uses local state to manage the open/close state of the navigation menu on smaller screens.
- **Event Handling**: 
  - The component handles user actions such as clicking on navigation links and resizing the window. These actions trigger state updates and responsive behavior.
- **API Interactions**: 
  - The component does not interact with any APIs.
- **Lifecycle Methods**: 
  - The component uses the useEffect hook to add an event listener for window resize events to handle responsive behavior.


### My Throught process:
- This was to create a responsive navigation bar that adapts to different screen sizes and provides easy navigation throughout the application. The component uses @material-tailwind/react for styling and next/link for navigation.
