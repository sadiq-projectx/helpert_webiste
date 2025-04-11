"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeColors {
  primaryColor: string;
  surfaceColor: string;
  textColor: string;
  secondaryTextColor: string;
}

interface ThemeContextType {
  themeColors: ThemeColors;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const defaultThemeColors: ThemeColors = {
  primaryColor: '#007AFF',
  surfaceColor: '#FFFFFF',
  textColor: '#000000',
  secondaryTextColor: '#666666',
};

const darkThemeColors: ThemeColors = {
  primaryColor: '#0A84FF',
  surfaceColor: '#1C1C1E',
  textColor: '#FFFFFF',
  secondaryTextColor: '#EBEBF5',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const themeColors = isDarkMode ? darkThemeColors : defaultThemeColors;

  return (
    <ThemeContext.Provider value={{ themeColors, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 