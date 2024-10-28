import { Input, Typography } from '@material-tailwind/react';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  error,
}) => (
  <>
    <Typography variant='h6' color='blue-gray' className='-mb-3'>
      {label}
    </Typography>
    <Input
      size='lg'
      type={type}
      placeholder={label}
      className='!border-t-blue-gray-200 focus:!border-t-gray-900'
      labelProps={{
        className: 'before:content-none after:content-none',
      }}
      value={value}
      onChange={onChange}
      required
    />
    {error && (
      <Typography variant='small' color='red' className='mt-1'>
        {error}
      </Typography>
    )}
  </>
);

export default FormInput;
