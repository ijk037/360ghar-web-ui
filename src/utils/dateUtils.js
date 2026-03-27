/**
 * Date utility functions
 */

const OFFSET_OR_Z_SUFFIX = /([zZ]|[+-]\d{2}:\d{2})$/;

const padDatePart = (value) => String(value).padStart(2, '0');

const normalizeServerTimestamp = (value) => {
  if (typeof value !== 'string') return value;

  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.includes('T') && !OFFSET_OR_Z_SUFFIX.test(trimmed)) {
    return `${trimmed}Z`;
  }

  return trimmed;
};

export const parseServerTimestamp = (value) => {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const parsed = new Date(normalizeServerTimestamp(value));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const serverTimestampToLocalInput = (value) => {
  const parsed = parseServerTimestamp(value);
  if (!parsed) return '';

  return [
    parsed.getFullYear(),
    padDatePart(parsed.getMonth() + 1),
    padDatePart(parsed.getDate()),
  ].join('-') + `T${padDatePart(parsed.getHours())}:${padDatePart(parsed.getMinutes())}`;
};

export const localInputToServerTimestamp = (value) => {
  if (!value || typeof value !== 'string') return null;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return parsed.toISOString();
};

export const formatDateOnlyForApi = (value) => {
  if (!value) return null;

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  }

  const parsed = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return [
    parsed.getFullYear(),
    padDatePart(parsed.getMonth() + 1),
    padDatePart(parsed.getDate()),
  ].join('-');
};

/**
 * Get relative time string from a date
 * @param {string|Date} date - Date to format
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return '';
  
  try {
    const now = new Date();
    const past = parseServerTimestamp(date) || new Date(date);
    const diffMs = now - past;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSecs < 60) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffWeeks === 1) return '1 week ago';
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`;
    if (diffMonths === 1) return '1 month ago';
    if (diffMonths < 12) return `${diffMonths} months ago`;
    if (diffYears === 1) return '1 year ago';
    return `${diffYears} years ago`;
  } catch {
    return '';
  }
};

/**
 * Format view count with tooltip text
 * @param {number} count - View count
 * @returns {string} Formatted count
 */
export const getViewCountText = (count) => {
  if (!count && count !== 0) return '';
  
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};
