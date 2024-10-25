import { Sidebar } from '@/components/dashboard/Sidebar';
import { SessionProvider } from 'next-auth/react';
import AuthWrapper from '@/components/wrapper/authWrapper';
import { RoleProvider } from '@/context/roleContext';
import { BookProvider } from '@/context/bookContext';

export default function AuthorLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthWrapper>
        <RoleProvider>
          <section className='flex'>
            <Sidebar />
            <section>{children}</section>
          </section>
        </RoleProvider>
      </AuthWrapper>
    </SessionProvider>
  );
}
