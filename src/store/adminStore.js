import { create } from 'zustand';
import { userService } from '../services/userService';
// Placeholder: admin APIs not implemented yet

const useAdminStore = create((set) => ({
  // State
  users: [],
  allProperties: [],
  isLoading: false,
  error: null,

  // Actions
  getAllUsers: async () => {
    set({ isLoading: false, error: 'Admin user management is yet to be implemented' });
    // Show notification
    if (typeof window !== 'undefined' && window.alert) {
      window.alert('Admin user management is yet to be implemented');
    }
    return [];
  },

  getAllProperties: async () => {
    set({ isLoading: false, error: 'Admin property management is yet to be implemented' });
    // Show notification
    if (typeof window !== 'undefined' && window.alert) {
      window.alert('Admin property management is yet to be implemented');
    }
    return [];
  },

  createUser: async () => {
    set({ isLoading: false, error: 'Create user feature is yet to be implemented' });
    // Show notification
    if (typeof window !== 'undefined' && window.alert) {
      window.alert('Create user feature is yet to be implemented');
    }
    return null;
  },

  updateUser: async (id, userData) => {
    try {
      set({ isLoading: true, error: null });
      const updatedUser = await userService.updateUser(id, userData);
      set(state => ({
        users: state.users.map(user =>
          user.id === id ? updatedUser : user
        ),
        isLoading: false,
      }));
      return updatedUser;
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.detail || 'Failed to update user'
      });
      return null;
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAdminStore;