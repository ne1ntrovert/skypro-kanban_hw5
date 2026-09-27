import React, { createContext, useContext, useState } from 'react';
import { loginRequest, registerRequest } from '../api/auth.js';

const STORAGE_KEY = 'kanban-user';
const AuthContext = createContext(null);

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [authLoading, setAuthLoading] = useState(false);

  function persist(nextUser) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }

  async function login(login, password) {
    setAuthLoading(true);
    try {
      const authUser = await loginRequest({ login, password });
      if (!authUser) throw new Error('Сервер не вернул токен авторизации');
      persist(authUser);
      return authUser;
    } finally {
      setAuthLoading(false);
    }
  }

  async function register(name, login, password) {
    setAuthLoading(true);
    try {
      let authUser = await registerRequest({ name, login, password });
      // Некоторые бэкенды не возвращают токен сразу при регистрации —
      // в этом случае логинимся тем же паролем, чтобы получить токен.
      if (!authUser) {
        authUser = await loginRequest({ login, password });
      }
      if (!authUser) throw new Error('Сервер не вернул токен авторизации');
      persist(authUser);
      return authUser;
    } finally {
      setAuthLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  const value = {
    user,
    token: user?.token || null,
    isAuth: Boolean(user?.token),
    authLoading,
    login,
    register,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
