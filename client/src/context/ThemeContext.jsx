import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const themes = [
  {
    id: 'dark',
    name: 'Obsidian Slate (Dark)',
    description: 'Deep graphite slate with safety amber accents',
    icon: 'Moon',
    preview: '#0B111E',
    accent: '#F59E0B'
  },
  {
    id: 'light',
    name: 'Precision Steel (Light)',
    description: 'Clean stainless steel white with crisp industrial accents',
    icon: 'Sun',
    preview: '#F8FAFC',
    accent: '#D97706'
  },
  {
    id: 'navy',
    name: 'Cobalt CNC (Navy)',
    description: 'High-tech precision cobalt with cyan & gold highlights',
    icon: 'Compass',
    preview: '#0A122A',
    accent: '#06B6D4'
  },
  {
    id: 'amber',
    name: 'Safety Amber (Contrast)',
    description: 'High-visibility industrial engineering palette',
    icon: 'Shield',
    preview: '#181204',
    accent: '#FBBF24'
  }
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('rfpm_theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    // Remove all previous theme classes
    root.classList.remove('theme-dark', 'theme-light', 'theme-navy', 'theme-amber');
    // Add current theme class
    root.classList.add(`theme-${theme}`);
    root.setAttribute('data-theme', theme);
    
    // Also toggle Tailwind's 'dark' class appropriately
    if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }

    try {
      localStorage.setItem('rfpm_theme', theme);
    } catch (e) {}
  }, [theme]);

  const changeTheme = (newThemeId) => {
    if (themes.some(t => t.id === newThemeId)) {
      setTheme(newThemeId);
    }
  };

  const isLight = theme === 'light';

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, themes, isLight }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

