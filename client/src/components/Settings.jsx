import { useState, useEffect } from 'react';
import { cacheService } from '../services/cacheService';

const Settings = () => {
  const [isOfflineMode, setIsOfflineMode] = useState(false);

  useEffect(() => {
    // Load offline mode setting on mount
    setIsOfflineMode(cacheService.getOfflineMode());
  }, []);

  const handleToggleOfflineMode = () => {
    const newMode = !isOfflineMode;
    setIsOfflineMode(newMode);
    cacheService.setOfflineMode(newMode);
    
    if (newMode) {
      // Show success message
      alert('Offline mode enabled! Recommendations will be cached.');
    }
  };

  const handleClearCache = () => {
    cacheService.clearCache();
    setIsOfflineMode(false);
    alert('Cache cleared! Offline mode disabled.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600 mb-8">Customize your MoodMitra experience</p>

        {/* Offline Mode Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Offline / Lite Mode</h2>
              <p className="text-gray-600">
                Cache recommendations for when you have slow or no internet connection.
                Perfect for travel or limited data.
              </p>
            </div>
            
            {/* Toggle Switch */}
            <button
              onClick={handleToggleOfflineMode}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isOfflineMode ? 'bg-green-500' : 'bg-gray-300'
              }`}
              aria-label="Toggle offline mode"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
                  isOfflineMode ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Status Indicator */}
          {isOfflineMode ? (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Offline Mode Active</p>
                  <p className="text-sm text-green-600 mt-1">
                    Recommendations are being cached. You can access them without internet.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">Offline Mode Inactive</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Turn on to cache recommendations for offline use.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Clear Cache Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={handleClearCache}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Clear All Cached Data
            </button>
            <p className="text-sm text-gray-500 mt-2">
              This will remove all saved recommendations and disable offline mode.
            </p>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">How Offline Mode Works</h3>
          <ul className="text-blue-700 space-y-2">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Saves recommendations when you're online</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Works without internet after first setup</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Automatically updates when you're back online</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Saves mobile data by reducing API calls</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;