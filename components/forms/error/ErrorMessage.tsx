import { Typography } from '@material-tailwind/react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <Typography variant='small' color='red' className='mt-1'>
    {message}
  </Typography>
);

export default ErrorMessage;
