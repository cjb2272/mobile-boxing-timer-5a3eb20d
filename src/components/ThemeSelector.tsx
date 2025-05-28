
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTheme } from '../hooks/useTheme';

const ThemeSelector: React.FC = () => {
  const { currentTheme, themes, changeTheme } = useTheme();

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-card-foreground mb-2">
        App Style
      </label>
      <Select value={currentTheme.id} onValueChange={changeTheme}>
        <SelectTrigger className="w-full bg-background border-border text-foreground">
          <SelectValue placeholder="Select a style" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border text-card-foreground z-50">
          {themes.map((theme) => (
            <SelectItem 
              key={theme.id} 
              value={theme.id}
              className="hover:bg-accent hover:text-accent-foreground"
            >
              {theme.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ThemeSelector;
