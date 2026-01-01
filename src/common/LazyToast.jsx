import { lazy, Suspense, useState, useCallback, createContext, useContext } from 'react';

// Lazy load the ToastContainer
const ToastContainerLazy = lazy(() =>
  import('react-toastify').then((m) => {
    // Also load the CSS when the component is loaded
    import('react-toastify/dist/ReactToastify.css');
    return { default: m.ToastContainer };
  })
);

// Context to track if toast has been shown
const ToastLoadedContext = createContext({ loaded: false, setLoaded: () => {} });

/**
 * Provider component that manages lazy toast loading state
 */
export const LazyToastProvider = ({ children }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <ToastLoadedContext.Provider value={{ loaded, setLoaded }}>
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
    </ToastLoadedContext.Provider>
  );
};

/**
 * Hook to get lazy toast functions.
 * All functions are fire-and-forget - they handle errors internally
 * and don't need to be awaited by callers.
 * 
 * @returns {Object} Toast notification functions (success, error, warning, info, toast)
 */
export const useLazyToast = () => {
  const { setLoaded } = useContext(ToastLoadedContext);

  const showToast = useCallback(
    (message, options = {}) => {
      // Mark as loaded to render ToastContainer
      setLoaded(true);

      // Dynamically import toast (fire-and-forget)
      import('react-toastify')
        .then(({ toast }) => toast(message, options))
        .catch((err) => {
          console.error('Failed to load toast notification library:', err);
        });
    },
    [setLoaded]
  );

  const success = useCallback(
    (message, options = {}) => {
      setLoaded(true);
      import('react-toastify')
        .then(({ toast }) => toast.success(message, options))
        .catch((err) => {
          console.error('Failed to load toast notification library:', err);
        });
    },
    [setLoaded]
  );

  const error = useCallback(
    (message, options = {}) => {
      setLoaded(true);
      import('react-toastify')
        .then(({ toast }) => toast.error(message, options))
        .catch((err) => {
          console.error('Failed to load toast notification library:', err);
        });
    },
    [setLoaded]
  );

  const warning = useCallback(
    (message, options = {}) => {
      setLoaded(true);
      import('react-toastify')
        .then(({ toast }) => toast.warning(message, options))
        .catch((err) => {
          console.error('Failed to load toast notification library:', err);
        });
    },
    [setLoaded]
  );

  const info = useCallback(
    (message, options = {}) => {
      setLoaded(true);
      import('react-toastify')
        .then(({ toast }) => toast.info(message, options))
        .catch((err) => {
          console.error('Failed to load toast notification library:', err);
        });
    },
    [setLoaded]
  );

  return { toast: showToast, success, error, warning, info };
};

export default LazyToastProvider;
