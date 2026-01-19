// src/services/cacheService.js
const CACHE_KEY = 'moodmitra_recommendations';
const OFFLINE_MODE_KEY = 'moodmitra_offline_mode';

export const cacheService = {
  // Save offline mode setting
  setOfflineMode: (isEnabled) => {
    localStorage.setItem(OFFLINE_MODE_KEY, isEnabled.toString());
  },

  // Get offline mode setting
  getOfflineMode: () => {
    return localStorage.getItem(OFFLINE_MODE_KEY) === 'true';
  },

  // Save recommendations to cache
  saveRecommendations: (recommendations) => {
    const cacheData = {
      timestamp: new Date().toISOString(),
      data: recommendations,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  },

  // Get cached recommendations
  getCachedRecommendations: () => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
    return null;
  },

  // Check if cache is valid (less than 24 hours old)
  isCacheValid: () => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      const cacheTime = new Date(parsed.timestamp);
      const now = new Date();
      const diffHours = (now - cacheTime) / (1000 * 60 * 60);
      return diffHours < 24;
    }
    return false;
  },

  // Clear all cache
  clearCache: () => {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(OFFLINE_MODE_KEY);
  },
};