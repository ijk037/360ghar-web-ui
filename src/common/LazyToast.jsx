import { lazy, Suspense, useState } from 'react';
import { LazyToastContext } from './lazyToastContext';

// Lazy load the ToastContainer
const ToastContainerLazy = lazy(() =>
  import('react-toastify').then((m) => {
    // Also load the CSS when the component is loaded
    import('react-toastify/dist/ReactToastify.css');
    return { default: m.ToastContainer };
  })
);

/**
 * Provider component that manages lazy toast loading state
 */
const LazyToastProvider = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <LazyToastContext.Provider value={{ loaded, setLoaded }}>
      {children}
      {loaded && (
        <Suspense fallback={null}>
          <ToastContainerLazy
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Suspense>
      )}
    </LazyToastContext.Provider>
  );
};

export default LazyToastProvider;
