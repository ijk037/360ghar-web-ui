import { createAxiosInstance } from './http';

const publicApi = createAxiosInstance({ withAuth: false });

export const referralService = {
  submitReferral: async (referralData) => {
    const response = await publicApi.post('/referrals/', referralData);
    return response.data;
  },

  getLocalities: async () => {
    const response = await publicApi.get('/localities/');
    return response.data;
  },

  verifyReferralStatus: async (referralId) => {
    const response = await publicApi.get(`/referrals/${referralId}/status`);
    return response.data;
  },
};

export default referralService;
