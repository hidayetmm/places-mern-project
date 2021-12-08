import React from 'react'

interface ThemeContext {
	toggleDark: (value: Boolean) => void;
  }
  
  const defaultState = {
    toggleDark: () => {},
  };
  
  export const ThemeContext = React.createContext<ThemeContext>(defaultState);