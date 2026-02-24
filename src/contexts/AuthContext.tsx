import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  username: string;
  login: (username: string) => void;
  signup: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  username: '',
  login: () => {},
  signup: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('lt_logged_in') === 'true');
  const [username, setUsername] = useState(() => localStorage.getItem('lt_username') || '');

  useEffect(() => {
    localStorage.setItem('lt_logged_in', String(isLoggedIn));
    localStorage.setItem('lt_username', username);
  }, [isLoggedIn, username]);

  const login = (name: string) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  const signup = (name: string) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
