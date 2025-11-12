
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a logged-in user from a session
    setTimeout(() => {
      const storedUser = localStorage.getItem('help-button-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }, 500);
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    // Simulate API call to Firebase Auth
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          uid: 'xyz-123',
          email: email,
          businessName: 'My Awesome Store',
          businessSlug: 'my-awesome-store',
        };
        localStorage.setItem('help-button-user', JSON.stringify(mockUser));
        setUser(mockUser);
        setLoading(false);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('help-button-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
