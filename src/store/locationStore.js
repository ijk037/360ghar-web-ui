import { create } from 'zustand';

export const useLocationStore = create((set) => ({
  location: { lat: null, lng: null, name: 'Search any location...' },
  isLocating: true,
  error: null,
  
  // Action to get user's location via browser geolocation
  fetchBrowserLocation: () => {
    set({ isLocating: true, error: null });
    
    if (!navigator.geolocation) {
      // Fallback to a default location if geolocation is not supported
      set({
        location: { lat: 28.4595, lng: 77.0266, name: 'Gurgaon, India' },
        isLocating: false,
        error: "Geolocation not supported. Showing results for Gurgaon.",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        set({
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            name: 'Your Location',
          },
          isLocating: false,
        });
      },
      (error) => {
        // Fallback to a default location (e.g., Gurgaon) if permission is denied
        let errorMessage = "Location permission denied. Showing results for Gurgaon.";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied. Showing results for Gurgaon.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location unavailable. Showing results for Gurgaon.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Showing results for Gurgaon.";
            break;
          default:
            errorMessage = "Location error. Showing results for Gurgaon.";
            break;
        }
        
        set({
          location: { lat: 28.4595, lng: 77.0266, name: 'Gurgaon, India' },
          isLocating: false,
          error: errorMessage,
        });
      },
      {
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 300000 // 5 minutes
      }
    );
  },

  // Action to manually set location (e.g., from Google Places)
  setLocation: (newLocation) => {
    set({ location: newLocation, isLocating: false, error: null });
  },

  // Action to clear error
  clearError: () => {
    set({ error: null });
  },
}));