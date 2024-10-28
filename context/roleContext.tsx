'use client';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { useSession } from 'next-auth/react';

type Role = 'Author' | 'Collaborator';

interface RoleContextProps {
  role: Role;
  setRole: (role: Role) => void;
  canCreate: boolean;
  canEdit: boolean;
  grantAccess: (userId: string, role: Role) => void;
  revokeAccess: (userId: string) => void;
}

const RoleContext = createContext<RoleContextProps | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [role, setRole] = useState<Role>('Collaborator');

  useEffect(() => {
    if (session?.user?.role) {
      setRole(session.user.role as Role);
    }
  }, [session]);

  const canCreate = role === 'Author';
  const canEdit = role === 'Author' || role === 'Collaborator';

  const grantAccess = async (userId: string, newRole: Role) => {
    await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: newRole }),
    });
  };

  const revokeAccess = async (userId: string) => {
    await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: 'Collaborator' }),
    });
  };

  return (
    <RoleContext.Provider
      value={{ role, setRole, canCreate, canEdit, grantAccess, revokeAccess }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
