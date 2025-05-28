
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useTheme } from '../hooks/useTheme';

const ThemeSelector: React.FC = () => {
  const { currentTheme, themes, changeTheme } = useTheme();

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        App Style
      </label>
      <Select value={currentTheme.id} onValueChange={changeTheme}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a style" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 z-50">
          {themes.map((theme) => (
            <SelectItem 
              key={theme.id} 
              value={theme.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
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
