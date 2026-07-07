import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('access_token'));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('access_token');
      if (storedToken) {
        try {
          const response = await api.get('/me');
          setUser(response.data.user);
        } catch (err) {
          console.error("Failed to restore session:", err);
          // Token expired or invalid
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/login', { email, password });
      const { access_token, user: loggedUser } = response.data;
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      
      setToken(access_token);
      setUser(loggedUser);
      setIsLoading(false);
      return { success: true, user: loggedUser };
    } catch (err) {
      setIsLoading(false);
      const errMsg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errMsg);
      return { 
        success: false, 
        message: errMsg,
        errors: err.response?.data?.errors 
      };
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/register', userData);
      const { access_token, user: registeredUser } = response.data;
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('user', JSON.stringify(registeredUser));
      
      setToken(access_token);
      setUser(registeredUser);
      setIsLoading(false);
      return { success: true, user: registeredUser };
    } catch (err) {
      setIsLoading(false);
      const errMsg = err.response?.data?.message || 'Registration failed.';
      setError(errMsg);
      return { 
        success: false, 
        message: errMsg,
        errors: err.response?.data?.errors 
      };
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await api.post('/logout');
    } catch (err) {
      console.error("Logout request failed, cleaning local session anyway:", err);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
