import api from './api';

export const deletionService = {
  // Submit account/data deletion request
  submitDeletionRequest: async (requestData) => {
    const response = await api.post('/account/delete-request/', requestData);
    return response.data;
  },

  // Get status of deletion request
  getDeletionRequestStatus: async (requestId) => {
    const response = await api.get(`/account/delete-request/${requestId}/status/`);
    return response.data;
  },

  // Cancel deletion request
  cancelDeletionRequest: async (requestId) => {
    const response = await api.post(`/account/delete-request/${requestId}/cancel/`);
    return response.data;
  },
};

export default deletionService;