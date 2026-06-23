import { create } from 'zustand';
import { dataHubService } from '../services/dataHubService';

export const useDataHubStore = create((set, get) => ({
  // State
  auctionAlerts: [],
  circleRateSectors: [],
  isLoadingAlerts: false,
  isLoadingSectors: false,

  // Actions
  fetchAuctionAlerts: async () => {
    if (get().isLoadingAlerts) return;
    set({ isLoadingAlerts: true });
    try {
      const alerts = await dataHubService.getMyAuctionAlerts();
      const alertItems = Array.isArray(alerts) ? alerts : (Array.isArray(alerts?.items) ? alerts.items : []);
      set({ auctionAlerts: alertItems });
    } catch {
      set({ auctionAlerts: [] });
    } finally {
      set({ isLoadingAlerts: false });
    }
  },

  addAlert: async (alertData) => {
    const alert = await dataHubService.createAuctionAlert(alertData);
    set((state) => ({ auctionAlerts: [...state.auctionAlerts, alert] }));
    return alert;
  },

  updateAlert: async (id, data) => {
    const updated = await dataHubService.updateAuctionAlert(id, data);
    set((state) => ({
      auctionAlerts: state.auctionAlerts.map((a) => (a.id === id ? updated : a)),
    }));
    return updated;
  },

  deleteAlert: async (id) => {
    await dataHubService.deleteAuctionAlert(id);
    set((state) => ({
      auctionAlerts: state.auctionAlerts.filter((a) => a.id !== id),
    }));
  },

  fetchCircleRateSectors: async () => {
    if (get().circleRateSectors.length > 0 || get().isLoadingSectors) return;
    set({ isLoadingSectors: true });
    try {
      const sectors = await dataHubService.getCircleRateSectors();
      const sectorItems = Array.isArray(sectors) ? sectors : (Array.isArray(sectors?.items) ? sectors.items : []);
      set({ circleRateSectors: sectorItems });
    } catch {
      set({ circleRateSectors: [] });
    } finally {
      set({ isLoadingSectors: false });
    }
  },
}));

