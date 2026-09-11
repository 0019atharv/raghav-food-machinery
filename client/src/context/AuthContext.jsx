import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('rfpm_token');
    const storedUser = localStorage.getItem('rfpm_user');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        // Verify with backend
        api.getMe()
          .then(res => {
            if (res.success && res.user) {
              setUser(res.user);
              localStorage.setItem('rfpm_user', JSON.stringify(res.user));
            }
          })
          .catch(() => {
            // keep stored or clear if token expired
          })
          .finally(() => setLoading(false));
      } catch (e) {
        setUser(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    if (res.success && res.token) {
      localStorage.setItem('rfpm_token', res.token);
      localStorage.setItem('rfpm_user', JSON.stringify(res.user));
      setUser(res.user);
      return res;
    }
    throw new Error(res.message || 'Login failed');
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    if (res.success && res.token) {
      localStorage.setItem('rfpm_token', res.token);
      localStorage.setItem('rfpm_user', JSON.stringify(res.user));
      setUser(res.user);
      return res;
    }
    throw new Error(res.message || 'Registration failed');
  };

  const verifyOTP = async (otpData) => {
    const res = await api.verifyOTP(otpData);
    if (res.success && res.token) {
      localStorage.setItem('rfpm_token', res.token);
      localStorage.setItem('rfpm_user', JSON.stringify(res.user));
      setUser(res.user);
      return res;
    }
    throw new Error(res.message || 'OTP verification failed');
  };

  const enableAdminDemo = async () => {
    try {
      return await login('admin@raghavfoodprocessingmachines.com', 'admin123');
    } catch (err) {
      const demoUser = {
        _id: 'admin_demo',
        name: 'Raghav Admin (Demo)',
        email: 'admin@raghavfoodprocessingmachines.com',
        role: 'admin'
      };
      localStorage.setItem('rfpm_token', 'demo_admin_jwt_token');
      localStorage.setItem('rfpm_user', JSON.stringify(demoUser));
      setUser(demoUser);
      return { success: true, user: demoUser };
    }
  };

  const logout = () => {
    localStorage.removeItem('rfpm_token');
    localStorage.removeItem('rfpm_user');
    setUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        login,
        register,
        verifyOTP,
        enableAdminDemo,
        logout,
        authModalOpen,
        setAuthModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

