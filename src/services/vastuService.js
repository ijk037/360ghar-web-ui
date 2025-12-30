/**
 * Vastu Checker API Service
 *
 * Handles communication with the backend Vastu analysis API.
 * This is a public endpoint - no authentication required.
 */

import { createAxiosInstance } from './http';

// Create axios instance without auth (public endpoint)
const vastuApi = createAxiosInstance({ withAuth: false, enableRetry: false });

/**
 * Analyze a floor plan image for Vastu compliance
 *
 * @param {File} imageFile - The floor plan image file (JPEG, PNG, or WebP)
 * @param {string} northDirection - Direction of North in the image: up, down, left, right, unknown
 * @param {string} notes - Optional user notes about the property (max 1000 chars)
 * @returns {Promise<Object>} Analysis result with score, report, and structured data
 */
export const analyzeFloorPlan = async (
  imageFile,
  northDirection = 'up',
  notes = ''
) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('north_direction', northDirection);
  formData.append('notes', notes || '');
  formData.append('provider', 'glm'); // Default to GLM-4V-Flash

  const response = await vastuApi.post('/vastu/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 180000, // 3 minute timeout for AI processing
  });

  return response.data;
};

/**
 * Check if the Vastu analyzer service is healthy
 *
 * @returns {Promise<Object>} Health status
 */
export const checkHealth = async () => {
  const response = await vastuApi.get('/vastu/health');
  return response.data;
};

export default {
  analyzeFloorPlan,
  checkHealth,
};
