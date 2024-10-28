interface State {
  email: string;
  password: string;
  name: string;
  emailError: string;
  passwordError: string;
}

type Action =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL_ERROR'; payload: string }
  | { type: 'SET_PASSWORD_ERROR'; payload: string };

export const initialState: State = {
  email: '',
  password: '',
  name: '',
  emailError: '',
  passwordError: '',
};

export const signUpReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL_ERROR':
      return { ...state, emailError: action.payload };
    case 'SET_PASSWORD_ERROR':
      return { ...state, passwordError: action.payload };
    default:
      return state;
  }
};
