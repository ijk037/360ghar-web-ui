/**
 * Haptic Feedback Utility
 * Provides vibration feedback for mobile devices
 * Respects user's motion preferences
 */

/**
 * Check if vibration is supported and allowed
 */
export const isVibrationSupported = () => {
    return typeof navigator !== 'undefined' && 'vibrate' in navigator;
};

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Trigger haptic feedback
 * @param {number|number[]} pattern - Vibration pattern in milliseconds
 * @returns {boolean} - Whether vibration was triggered
 */
export const triggerHaptic = (pattern = 50) => {
    // Respect user's motion preferences
    if (prefersReducedMotion()) {
        return false;
    }

    // Check if vibration is supported
    if (!isVibrationSupported()) {
        return false;
    }

    try {
        navigator.vibrate(pattern);
        return true;
    } catch (error) {
        console.warn('Haptic feedback failed:', error);
        return false;
    }
};

/**
 * Light tap feedback (gentle)
 */
export const hapticLight = () => triggerHaptic(20);

/**
 * Medium tap feedback (default)
 */
export const hapticMedium = () => triggerHaptic(50);

/**
 * Heavy tap feedback (strong)
 */
export const hapticHeavy = () => triggerHaptic(100);

/**
 * Success pattern feedback
 */
export const hapticSuccess = () => triggerHaptic([50, 100, 50]);

/**
 * Error pattern feedback
 */
export const hapticError = () => triggerHaptic([100, 50, 100]);

/**
 * Selection feedback (for toggles, switches)
 */
export const hapticSelection = () => triggerHaptic(10);

/**
 * React hook for haptic feedback
 * Returns haptic functions that can be used in components
 */
export const useHaptic = () => {
    return {
        trigger: triggerHaptic,
        light: hapticLight,
        medium: hapticMedium,
        heavy: hapticHeavy,
        success: hapticSuccess,
        error: hapticError,
        selection: hapticSelection,
        isSupported: isVibrationSupported(),
        prefersReducedMotion: prefersReducedMotion()
    };
};

export default {
    triggerHaptic,
    hapticLight,
    hapticMedium,
    hapticHeavy,
    hapticSuccess,
    hapticError,
    hapticSelection,
    isVibrationSupported,
    prefersReducedMotion,
    useHaptic
};
