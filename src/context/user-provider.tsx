'use client';
import { createContext, useContext } from 'react';
import type { User } from '@supabase/supabase-js';
import { useGetUserData } from '@/hooks/query/use-get-user-data';

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading: loading } = useGetUserData();

  return (
    <AuthContext.Provider value={{ user: user ?? null, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
