
import { useState, useEffect } from 'react';
import { themes, Theme } from '../config/themes';

export const useTheme = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    const savedThemeId = localStorage.getItem('boxingTimer-themeId');
    if (savedThemeId) {
      const theme = themes.find(t => t.id === savedThemeId);
      if (theme) {
        setCurrentTheme(theme);
        applyTheme(theme);
      }
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    
    // Apply CSS custom properties for colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVar, value);
    });

    // Apply font family
    root.style.setProperty('--font-primary', theme.fonts.primary);
    root.style.setProperty('--font-mono', theme.fonts.mono);

    // Apply design properties
    root.style.setProperty('--border-radius', theme.design.borderRadius);
    root.style.setProperty('--use-shadows', theme.design.shadows ? '1' : '0');
    root.style.setProperty('--use-gradients', theme.design.gradients ? '1' : '0');
    root.style.setProperty('--button-style', theme.design.buttonStyle);
  };

  const changeTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      applyTheme(theme);
      localStorage.setItem('boxingTimer-themeId', themeId);
    }
  };

  return {
    currentTheme,
    themes,
    changeTheme,
  };
};
