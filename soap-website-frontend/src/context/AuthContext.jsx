// src/context/AuthContext.jsx

'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { authAPI } from '@/services/api';

const AuthContext = createContext({
  user: null,
  loading: true,
  isLoggedIn: false,
  isAdmin: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  refreshUser: async () => {},
  updateProfile: async () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync session from Supabase and LocalStorage
  const initAuth = async () => {
    try {
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const u = session.user;
          const userMeta = u.user_metadata || {};
          const isAdmin = u.email === 'admin@soapco.com' || userMeta.role === 'admin';
          const profile = {
            id: u.id,
            email: u.email,
            name: userMeta.name || u.email.split('@')[0],
            phone: userMeta.phone || '',
            role: isAdmin ? 'admin' : (userMeta.role || 'customer'),
          };
          setUser(profile);
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', session.access_token);
            localStorage.setItem('userName', profile.name);
            localStorage.setItem('userEmail', profile.email);
            localStorage.setItem('userRole', profile.role);
          }
          setLoading(false);
          return;
        }
      }
    } catch (sbErr) {
      console.warn('Supabase session load notice:', sbErr);
    }

    // Fallback to local storage
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('userEmail');
      const storedName = localStorage.getItem('userName');
      const storedRole = localStorage.getItem('userRole') || 'customer';

      if (storedEmail) {
        setUser({
          id: 'usr_stored',
          name: storedName || 'Customer',
          email: storedEmail,
          role: storedRole
        });
      } else {
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    initAuth();

    // Listen to Supabase auth state changes
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session?.user) {
            const u = session.user;
            const userMeta = u.user_metadata || {};
            const isAdmin = u.email === 'admin@soapco.com' || userMeta.role === 'admin';
            const profile = {
              id: u.id,
              email: u.email,
              name: userMeta.name || u.email.split('@')[0],
              phone: userMeta.phone || '',
              role: isAdmin ? 'admin' : (userMeta.role || 'customer'),
            };
            setUser(profile);
            if (typeof window !== 'undefined') {
              localStorage.setItem('token', session.access_token);
              localStorage.setItem('userName', profile.name);
              localStorage.setItem('userEmail', profile.email);
              localStorage.setItem('userRole', profile.role);
            }
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            if (typeof window !== 'undefined') {
              localStorage.removeItem('token');
              localStorage.removeItem('userName');
              localStorage.removeItem('userEmail');
              localStorage.removeItem('userRole');
            }
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // 1. Try Supabase Auth
      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error && data?.session?.user) {
          const u = data.session.user;
          const userMeta = u.user_metadata || {};
          const isAdmin = email.toLowerCase().includes('admin') || userMeta.role === 'admin';
          const profile = {
            id: u.id,
            email: u.email,
            name: userMeta.name || email.split('@')[0],
            phone: userMeta.phone || '',
            role: isAdmin ? 'admin' : (userMeta.role || 'customer'),
          };

          if (typeof window !== 'undefined') {
            localStorage.setItem('token', data.session.access_token);
            localStorage.setItem('userName', profile.name);
            localStorage.setItem('userEmail', profile.email);
            localStorage.setItem('userRole', profile.role);
          }

          setUser(profile);
          return { success: true, user: profile };
        }
      }

      // 2. Fallback to API login
      const response = await authAPI.login({ email, password });
      const { token, role, user: userData } = response.data || {};

      const finalUser = userData || {
        id: `usr_${Date.now()}`,
        email,
        name: email.toLowerCase().includes('admin') ? 'Atishay Admin' : email.split('@')[0],
        role: role || (email.toLowerCase().includes('admin') ? 'admin' : 'customer')
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token || `demo_jwt_${Date.now()}`);
        localStorage.setItem('userName', finalUser.name);
        localStorage.setItem('userEmail', finalUser.email);
        localStorage.setItem('userRole', finalUser.role);
      }

      setUser(finalUser);
      return { success: true, user: finalUser };
    } catch (err) {
      console.error('Login error in AuthContext:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      // 1. Try Supabase Auth SignUp
      if (supabase) {
        const { data, error } = await supabase.auth.signUp({
          email: payload.email,
          password: payload.password,
          options: {
            data: {
              name: payload.name,
              phone: payload.phone || '',
              role: 'customer'
            }
          }
        });

        if (!error && (data?.user || data?.session)) {
          const u = data.user || data.session?.user;
          const profile = {
            id: u.id,
            name: payload.name,
            email: payload.email,
            phone: payload.phone || '',
            role: 'customer'
          };

          if (typeof window !== 'undefined') {
            if (data.session?.access_token) {
              localStorage.setItem('token', data.session.access_token);
            }
            localStorage.setItem('userName', profile.name);
            localStorage.setItem('userEmail', profile.email);
            localStorage.setItem('userRole', 'customer');
          }

          setUser(profile);
          return { success: true, user: profile };
        }
      }

      // 2. Fallback to API register
      const response = await authAPI.register(payload);
      const { token, user: userData } = response.data || {};

      const finalUser = userData || {
        id: response.data?.userId || `usr_${Date.now()}`,
        name: payload.name,
        email: payload.email,
        phone: payload.phone || '',
        role: 'customer'
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', token || `demo_jwt_${Date.now()}`);
        localStorage.setItem('userName', finalUser.name);
        localStorage.setItem('userEmail', finalUser.email);
        localStorage.setItem('userRole', 'customer');
      }

      setUser(finalUser);
      return { success: true, user: finalUser };
    } catch (err) {
      console.error('Registration error in AuthContext:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch {}

    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
    }
    setUser(null);
  };

  const updateProfile = async (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    if (typeof window !== 'undefined') {
      if (updates.name) localStorage.setItem('userName', updates.name);
      if (updates.email) localStorage.setItem('userEmail', updates.email);
    }
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        refreshUser: initAuth,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
