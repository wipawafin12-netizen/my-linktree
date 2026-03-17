import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { RecordModel } from 'pocketbase';
import pb from '../lib/pb';

type AuthContextType = {
  isLoggedIn: boolean;
  username: string;
  user: RecordModel | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  username: '',
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<RecordModel | null>(pb.authStore.record);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isLoggedIn = pb.authStore.isValid && !!user;
  const username = user?.name || user?.email?.split('@')[0] || '';

  useEffect(() => {
    // Check if existing auth is valid
    if (pb.authStore.isValid) {
      setUser(pb.authStore.record);
    }
    setLoading(false);

    // Listen for auth changes
    const unsubscribe = pb.authStore.onChange((_token, record) => {
      setUser(record);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setError(null);
    try {
      const result = await pb.collection('users').authWithPassword(email, password);
      setUser(result.record);
    } catch (err: any) {
      const message = err?.response?.message || 'Login failed. Please check your credentials.';
      setError(message);
      throw err;
    }
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setError(null);
    try {
      await pb.collection('users').create({
        name,
        email,
        password,
        passwordConfirm: password,
      });
      // Auto login after signup
      const result = await pb.collection('users').authWithPassword(email, password);
      setUser(result.record);
    } catch (err: any) {
      const message = err?.response?.message || 'Signup failed. Please try again.';
      setError(message);
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    pb.authStore.clear();
    setUser(null);
    setError(null);
    // Clear old localStorage keys
    localStorage.removeItem('lt_logged_in');
    localStorage.removeItem('lt_username');
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
