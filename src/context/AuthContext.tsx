'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email?: string | null;
  phone: string;
  address?: string | null;
  city?: string | null;
  role: 'CUSTOMER' | 'SUPER_ADMIN' | 'MANAGER' | 'VENDOR';
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (phone: string, pass: string) => Promise<{ success: boolean; message: string }>;
  register: (data: {
    name: string;
    phone: string;
    pass: string;
    city: string;
    address: string;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUserLocally: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: UserProfile;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('zakjomok_token');
      const savedUser = localStorage.getItem('zakjomok_user');
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to load auth state', e);
    }
    setIsLoaded(true);
  }, []);

  const authenticate = async (
    endpoint: 'login' | 'register',
    payload: {
      phone: string;
      password: string;
      name?: string;
      city?: string;
      address?: string;
    },
  ) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data: AuthResponse = await res.json();
      if (res.ok && data.success && data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('zakjomok_token', data.token);
        localStorage.setItem('zakjomok_user', JSON.stringify(data.user));
        return { success: true, message: data.message || 'সফলভাবে সম্পন্ন হয়েছে।' };
      }
      return { success: false, message: data.message || 'অনুরোধটি সম্পন্ন করা যায়নি।' };
    } catch (error) {
      console.error(`Authentication ${endpoint} request failed:`, error);
      return { success: false, message: 'সার্ভারের সাথে সংযোগ করা যাচ্ছে না। আবার চেষ্টা করুন।' };
    }
  };

  const login = (phone: string, pass: string) =>
    authenticate('login', { phone, password: pass });

  const register = (data: {
    name: string;
    phone: string;
    pass: string;
    city: string;
    address: string;
  }) =>
    authenticate('register', {
      name: data.name,
      phone: data.phone,
      password: data.pass,
      city: data.city,
      address: data.address,
    });

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('zakjomok_token');
    localStorage.removeItem('zakjomok_user');
  };

  const updateUserLocally = (updated: Partial<UserProfile>) => {
    if (user) {
      const newUser = { ...user, ...updated };
      setUser(newUser);
      localStorage.setItem('zakjomok_user', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUserLocally,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
