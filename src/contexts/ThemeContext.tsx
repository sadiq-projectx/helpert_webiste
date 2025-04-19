"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = "light" | "dark";

interface ThemeColors {
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  secondaryTextColor: string;
  primaryColor: string;
  dividerColor: string;
}

const lightTheme: ThemeColors = {
  backgroundColor: "#ffffff",
  surfaceColor: "#f9fafb",
  textColor: "#1f2937",
  secondaryTextColor: "#6b7280",
  primaryColor: "#3b82f6",
  dividerColor: "#d1d5db",
};

const darkTheme: ThemeColors = {
  backgroundColor: "#181818",
  surfaceColor: "#1f2937",
  textColor: "#f3f4f6",
  secondaryTextColor: "#9ca3af",
  primaryColor: "#2563eb",
  dividerColor: "#374151",
};

interface ThemeContextType {
  theme: Theme;
  themeColors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    // Update localStorage and document class when theme changes
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const themeColors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, themeColors, toggleTheme }}>
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