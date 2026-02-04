// src/context/ShopContext.jsx
import React, { createContext, useState, useContext } from "react";

// 1️⃣ Create context
export const ShopContext = createContext();

// 2️⃣ Create provider component                                   
export const ShopProvider = ({ children }) => {

  // 🔐 Auth token
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // ✅ User preferences
  const [userPreferences, setUserPreferences] = useState({
    selectedMood: "",
    selectedLanguages: [],
    selectedContentType: "",
    selectedFilters: [],
    selectedMoodType: ""
  });

  // ✅ AI Recommendation Result
  const [aiResult, setAiResult] = useState(null);

  // Backend URL
  const backendUrl = import.meta.env.VITE_API_URL;

  // Save token
  const saveToken = (newToken) => {
    setToken(newToken);
    if (newToken) localStorage.setItem("token", newToken);
    else localStorage.removeItem("token");
  };

  // Update preferences helper
  const updatePreferences = (newPreferences) => {
    setUserPreferences((prev) => ({
      ...prev,
      ...newPreferences
    }));
  };

  return (
    <ShopContext.Provider
      value={{
        // Auth
        token,
        setToken: saveToken,
        backendUrl,

        // Preferences
        userPreferences,
        setUserPreferences,
        updatePreferences,

        // AI Result
        aiResult,
        setAiResult
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

// 3️⃣ Custom hook
export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be used within a ShopProvider");
  }
  return context;
};