import { createContext } from 'react';

export const LazyToastContext = createContext({ loaded: false, setLoaded: () => {} });
