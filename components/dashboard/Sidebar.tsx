'use client';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from '@material-tailwind/react';
import Link from 'next/link';

export function Sidebar() {
  return (
    <Card className='h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5'>
      <div className='mb-2 p-4'>
        <Typography variant='h5' color='blue-gray'>
          Author Home
        </Typography>
      </div>
      <List>
        <Link href='/author/books'>
          <ListItem>
            <ListItemPrefix></ListItemPrefix>
            My Books
          </ListItem>
        </Link>

        <ListItem>
          <ListItemPrefix></ListItemPrefix>
          Shared Books
        </ListItem>
        <Link href='/author/profile'>
          <ListItem>
            <ListItemPrefix></ListItemPrefix>
            Profile
          </ListItem>
        </Link>
        <Link href='/author/settings'>
          <ListItem>
            <ListItemPrefix></ListItemPrefix>
            Settings
          </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix></ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
