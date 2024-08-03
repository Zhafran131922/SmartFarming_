// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const scheme = useColorScheme();
  const [isDark, setIsDark] = useState(scheme === 'dark');

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = {
    isDark,
    colors: {
      background: isDark ? '#1b1b1b' : '#ffffff',
      text: isDark ? '#ffffff' : '#333333',
      card: isDark ? '#333333' : '#f2f2f2',
      border: isDark ? '#333333' : '#ffffff',
    },
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
