import { useCallback, useContext } from 'react';
import { LazyToastContext } from './lazyToastContext';

const importToast = () => import('react-toastify');

export const useLazyToast = () => {
  const { setLoaded } = useContext(LazyToastContext);

  const showToast = useCallback(
    (method, message, options = {}) => {
      setLoaded(true);

      importToast()
        .then(({ toast }) => {
          if (method === 'default') {
            toast(message, options);
            return;
          }

          toast[method](message, options);
        })
        .catch((error) => {
          console.error('Failed to load toast notification library:', error);
        });
    },
    [setLoaded]
  );

  return {
    toast: useCallback((message, options = {}) => showToast('default', message, options), [showToast]),
    success: useCallback((message, options = {}) => showToast('success', message, options), [showToast]),
    error: useCallback((message, options = {}) => showToast('error', message, options), [showToast]),
    warning: useCallback((message, options = {}) => showToast('warning', message, options), [showToast]),
    info: useCallback((message, options = {}) => showToast('info', message, options), [showToast]),
  };
};
