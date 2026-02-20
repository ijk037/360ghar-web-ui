import api from './api';
import { ensureSupabaseClient } from './supabaseClient';

export const authService = {
  // Login user directly with Supabase Auth (phone-first, email optional)
  login: async (phoneOrEmail, password) => {
    const client = ensureSupabaseClient();
    const identifier = (phoneOrEmail || '').trim();
    const credentials = identifier.includes('@')
      ? { email: identifier, password }
      : { phone: identifier, password };

    const { data, error } = await client.auth.signInWithPassword(credentials);
    if (error || !data.session) {
      throw new Error(error?.message || 'Login failed');
    }

    const response = await api.get('/users/profile/');
    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_in: data.session.expires_in,
      token_type: data.session.token_type,
      user: response.data,
    };
  },

  // Register new user directly with Supabase Auth
  register: async (userData) => {
    const client = ensureSupabaseClient();
    const phone = (userData.phone || '').trim();
    const email = (userData.email || '').trim();

    const payload = {
      password: userData.password,
      options: {
        data: {
          full_name: userData.full_name || '',
          email: email || null,
        },
      },
    };

    if (phone) {
      payload.phone = phone;
    } else if (email) {
      payload.email = email;
    } else {
      throw new Error('Phone or email is required');
    }

    const { data, error } = await client.auth.signUp(payload);
    if (error) {
      throw new Error(error.message);
    }

    if (!data.session) {
      return {
        access_token: null,
        refresh_token: null,
        expires_in: null,
        token_type: null,
        user: null,
      };
    }

    const response = await api.get('/users/profile/');
    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_in: data.session.expires_in,
      token_type: data.session.token_type,
      user: response.data,
    };
  },

  // Get current user profile
  getCurrentUser: async () => {
    const response = await api.get('/users/profile/');
    return response.data;
  },

  // Update current user profile
  updateCurrentUser: async (userData) => {
    const response = await api.put('/users/profile/', userData);
    return response.data;
  },

  // Logout - clear localStorage
  logout: async () => {
    const client = ensureSupabaseClient();
    await client.auth.signOut();
    localStorage.removeItem('user');
  },
};

export default authService; 
