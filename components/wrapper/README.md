# AuthWrapper Component

The `AuthWrapper` component is a higher-order component (HOC) designed to handle authentication logic in your application. It ensures that only authenticated users can access certain parts of your app.

## Features

- **Authentication Check**: Verifies if the user is authenticated.
- **Redirection**: Redirects unauthenticated users to the login page.
- **Customizable**: Easily customizable to fit your authentication flow.

## Installation

To use the `AuthWrapper` component, first install the necessary dependencies:

```bash
npm install @your-org/auth-wrapper
```

## Usage

Wrap your protected components with the `AuthWrapper` to enforce authentication:

```jsx
import AuthWrapper from '@your-org/auth-wrapper';

const ProtectedComponent = () => {
    return (
        <AuthWrapper>
            <YourComponent />
        </AuthWrapper>
    );
};
```

## Props

The `AuthWrapper` component accepts the following props:

| Prop        | Type     | Description                                      |
|-------------|----------|--------------------------------------------------|
| `redirectTo`| `string` | The path to redirect unauthenticated users to.   |
| `children`  | `node`   | The components to render if the user is authenticated. |

## Example

```jsx
import AuthWrapper from '@your-org/auth-wrapper';

const App = () => {
    return (
        <AuthWrapper redirectTo="/login">
            <Dashboard />
        </AuthWrapper>
    );
};

export default App;
```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.
