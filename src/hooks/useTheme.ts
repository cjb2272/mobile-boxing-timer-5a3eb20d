
import { useState, useEffect } from 'react';
import { themes, Theme } from '../config/themes';
import { useAppSettings } from './useAppSettings';

export const useTheme = () => {
  const { settings, updateThemeId } = useAppSettings();
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    const theme = themes.find(t => t.id === settings.themeId) || themes[0];
    setCurrentTheme(theme);
    applyTheme(theme);
  }, [settings.themeId]);

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
      updateThemeId(themeId);
    }
  };

  return {
    currentTheme,
    themes,
    changeTheme,
  };
};
