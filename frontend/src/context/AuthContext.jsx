/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('hca_token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        if (decoded.exp * 1000 > Date.now()) {
          return { phone: decoded.phone, role: decoded.role, token };
        } else {
          localStorage.removeItem('hca_token');
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
        localStorage.removeItem('hca_token');
      }
    }
    return null;
  });

  const login = ({ token, role, phone }) => {
    localStorage.setItem('hca_token', token);
    setUser({ phone, role, token });
  };

  const logout = () => {
    localStorage.removeItem('hca_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}
