import { create } from 'zustand';
import { authService } from '../services/authService';
import { getSupabaseAccessToken, onSupabaseAuthStateChange } from '../services/supabaseClient';

function readStoredUser() {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

let hasAuthSubscription = false;

const useAuthStore = create((set, get) => ({
  user: readStoredUser(),
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isInitializing: true,
  error: null,

  initializeAuth: async () => {
    if (!hasAuthSubscription) {
      hasAuthSubscription = true;
      onSupabaseAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          localStorage.removeItem('user');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
          return;
        }

        set({
          token: session.access_token,
          isAuthenticated: true,
        });

        if (event === 'TOKEN_REFRESHED' && get().user) {
          return;
        }

        try {
          const userProfile = await authService.getCurrentUser();
          localStorage.setItem('user', JSON.stringify(userProfile));
          set({ user: userProfile });
        } catch {
          await authService.logout();
          localStorage.removeItem('user');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          });
        }
      });
    }

    set({ isInitializing: true, error: null });
    const token = await getSupabaseAccessToken();

    if (!token) {
      localStorage.removeItem('user');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isInitializing: false,
      });
      return;
    }

    const cachedUser = readStoredUser();
    if (cachedUser) {
      set({
        user: cachedUser,
        token,
        isAuthenticated: true,
      });
    }

    try {
      const userProfile = await authService.getCurrentUser();
      localStorage.setItem('user', JSON.stringify(userProfile));
      set({
        user: userProfile,
        token,
        isAuthenticated: true,
        isInitializing: false,
      });
    } catch {
      await authService.logout();
      localStorage.removeItem('user');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isInitializing: false,
      });
    }
  },

  login: async (emailOrPhone, password) => {
    try {
      set({ isLoading: true, error: null });
      const data = await authService.login(emailOrPhone, password);

      if (data.access_token) {
        const userProfile = data.user || (await authService.getCurrentUser());
        if (userProfile) {
          localStorage.setItem('user', JSON.stringify(userProfile));
        }

        set({
          token: data.access_token,
          user: userProfile,
          isAuthenticated: true,
          isLoading: false,
          isInitializing: false,
        });

        return true;
      }

      set({ isLoading: false, isInitializing: false, error: 'Failed to login' });
      return false;
    } catch (error) {
      set({
        isLoading: false,
        isInitializing: false,
        error: error.response?.data?.detail?.message || error.response?.data?.detail || error.message || 'Failed to login'
      });
      return false;
    }
  },

  register: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      const result = await authService.register(userData);

      if (result.access_token) {
        const userProfile = result.user || (await authService.getCurrentUser());
        if (userProfile) {
          localStorage.setItem('user', JSON.stringify(userProfile));
        }

        set({
          token: result.access_token,
          user: userProfile,
          isAuthenticated: true,
          isLoading: false,
          isInitializing: false,
        });
        return true;
      }

      set({ isLoading: false, isInitializing: false });
      const identifier = userData.phone || userData.email;
      if (!identifier) return false;
      return get().login(identifier, userData.password);
    } catch (error) {
      set({
        isLoading: false,
        isInitializing: false,
        error: error.response?.data?.detail?.message || error.response?.data?.detail || error.message || 'Registration failed'
      });
      return false;
    }
  },

  logout: async () => {
    await authService.logout();
    localStorage.removeItem('user');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isInitializing: false,
    });
  },

  updateProfile: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      const updatedUser = await authService.updateCurrentUser(userData);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      set({
        user: updatedUser,
        isLoading: false,
      });
      return true;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || 'Failed to update profile'
      });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
