// src/context/ShopContext.jsx
import React, { createContext, useState, useContext } from 'react'; // ✅ ADD useContext

// 1️⃣ Create context
export const ShopContext = createContext();

// 2️⃣ Create provider component
export const ShopProvider = ({ children }) => {
  // Store auth token
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // ✅ ADD THIS: User preferences state
  const [userPreferences, setUserPreferences] = useState({
    selectedMood: '',           // e.g., "Need Motivation", "Feeling Low"
    selectedLanguages: [],      // e.g., ["Telugu", "Hindi", "English"]
    selectedContentType: '',    // e.g., "Movies", "Music", "Books"
    selectedFilters: [],        // e.g., ["Action", "Drama", "Crime"]
    selectedMoodType: ''        // Optional: More specific mood
  });

  // Your backend API base URL from env
  const backendUrl = import.meta.env.VITE_API_URL;

  // Optional: Save token in localStorage whenever it changes
  const saveToken = (newToken) => {
    setToken(newToken);
    if (newToken) localStorage.setItem('token', newToken);
    else localStorage.removeItem('token');
  };

  // ✅ ADD THIS: Function to update preferences
  const updatePreferences = (newPreferences) => {
    setUserPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  };

  return (
    <ShopContext.Provider
      value={{
        // Existing auth values
        token,
        setToken: saveToken,
        backendUrl,

        // ✅ ADD THESE: User preferences
        userPreferences,
        setUserPreferences,
        updatePreferences // Optional helper function
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

// ✅ ADD THIS AT THE BOTTOM: Custom hook to use context
export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShopContext must be used within a ShopProvider');
  }
  return context;
};