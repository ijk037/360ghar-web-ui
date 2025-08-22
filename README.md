## Environment

Create a `.env` file in the project root with:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_GOOGLE_PLACES_API_KEY=YOUR_GOOGLE_PLACES_API_KEY
```

Ensure Google Places API is enabled in your Google Cloud project and the key has HTTP referrer restrictions for your dev domain (e.g., http://localhost:5173/*).
