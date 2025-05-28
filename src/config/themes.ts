
export interface Theme {
  id: string;
  name: string;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    ring: string;
  };
  fonts: {
    primary: string;
    mono: string;
  };
}

export const themes: Theme[] = [
  {
    id: 'light',
    name: 'Minimal Light',
    colors: {
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      primary: '220 14.3% 95.9%',
      primaryForeground: '220.9 39.3% 11%',
      secondary: '220 14.3% 95.9%',
      secondaryForeground: '220.9 39.3% 11%',
      accent: '220 14.3% 95.9%',
      accentForeground: '220.9 39.3% 11%',
      muted: '220 14.3% 95.9%',
      mutedForeground: '220 8.9% 46.1%',
      border: '220 13% 91%',
      input: '220 13% 91%',
      ring: '262.1 83.3% 57.8%',
    },
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, Consolas, monospace',
    },
  },
  {
    id: 'dark',
    name: 'Midnight Dark',
    colors: {
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      card: '222.2 84% 4.9%',
      cardForeground: '210 40% 98%',
      primary: '217.2 91.2% 59.8%',
      primaryForeground: '222.2 84% 4.9%',
      secondary: '217.2 32.6% 17.5%',
      secondaryForeground: '210 40% 98%',
      accent: '217.2 32.6% 17.5%',
      accentForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      mutedForeground: '215 20.2% 65.1%',
      border: '217.2 32.6% 17.5%',
      input: '217.2 32.6% 17.5%',
      ring: '224.3 76.3% 94.1%',
    },
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, Consolas, monospace',
    },
  },
  {
    id: 'matrix',
    name: 'Digital Matrix',
    colors: {
      background: '120 100% 2%',
      foreground: '120 100% 85%',
      card: '120 100% 4%',
      cardForeground: '120 100% 85%',
      primary: '120 100% 12%',
      primaryForeground: '120 100% 95%',
      secondary: '120 80% 8%',
      secondaryForeground: '120 100% 85%',
      accent: '120 100% 15%',
      accentForeground: '120 100% 95%',
      muted: '120 60% 6%',
      mutedForeground: '120 40% 50%',
      border: '120 100% 12%',
      input: '120 80% 6%',
      ring: '120 100% 50%',
    },
    fonts: {
      primary: 'JetBrains Mono, Courier New, monospace',
      mono: 'JetBrains Mono, Courier New, monospace',
    },
  },
  {
    id: 'beach',
    name: 'Tropical Paradise',
    colors: {
      background: '192 100% 97%',
      foreground: '203 39% 15%',
      card: '190 100% 94%',
      cardForeground: '203 39% 15%',
      primary: '176 77% 47%',
      primaryForeground: '0 0% 100%',
      secondary: '39 100% 82%',
      secondaryForeground: '203 39% 15%',
      accent: '24 100% 65%',
      accentForeground: '203 39% 15%',
      muted: '185 25% 88%',
      mutedForeground: '203 23% 42%',
      border: '184 44% 80%',
      input: '185 25% 85%',
      ring: '176 77% 47%',
    },
    fonts: {
      primary: 'Poppins, -apple-system, sans-serif',
      mono: 'Fira Code, monospace',
    },
  },
  {
    id: 'cyberpunk',
    name: 'Neon Streets',
    colors: {
      background: '270 100% 3%',
      foreground: '300 100% 90%',
      card: '270 80% 6%',
      cardForeground: '300 100% 90%',
      primary: '300 100% 40%',
      primaryForeground: '270 100% 3%',
      secondary: '180 100% 20%',
      secondaryForeground: '300 100% 90%',
      accent: '60 100% 45%',
      accentForeground: '270 100% 3%',
      muted: '270 40% 12%',
      mutedForeground: '300 30% 65%',
      border: '300 100% 20%',
      input: '270 40% 8%',
      ring: '300 100% 50%',
    },
    fonts: {
      primary: 'Orbitron, futura, sans-serif',
      mono: 'Share Tech Mono, monospace',
    },
  },
  {
    id: 'forest',
    name: 'Enchanted Woods',
    colors: {
      background: '120 30% 97%',
      foreground: '120 50% 12%',
      card: '120 25% 94%',
      cardForeground: '120 50% 12%',
      primary: '142 76% 28%',
      primaryForeground: '0 0% 100%',
      secondary: '85 35% 78%',
      secondaryForeground: '120 50% 12%',
      accent: '45 87% 65%',
      accentForeground: '120 50% 12%',
      muted: '120 20% 88%',
      mutedForeground: '120 25% 40%',
      border: '120 25% 82%',
      input: '120 20% 90%',
      ring: '142 76% 28%',
    },
    fonts: {
      primary: 'Merriweather, Georgia, serif',
      mono: 'Inconsolata, monospace',
    },
  },
  {
    id: 'sunset',
    name: 'Golden Hour',
    colors: {
      background: '25 100% 98%',
      foreground: '15 80% 15%',
      card: '20 100% 95%',
      cardForeground: '15 80% 15%',
      primary: '14 100% 57%',
      primaryForeground: '0 0% 100%',
      secondary: '320 60% 82%',
      secondaryForeground: '15 80% 15%',
      accent: '45 100% 55%',
      accentForeground: '15 80% 15%',
      muted: '25 40% 90%',
      mutedForeground: '15 40% 45%',
      border: '25 60% 85%',
      input: '25 40% 92%',
      ring: '14 100% 57%',
    },
    fonts: {
      primary: 'Playfair Display, Times, serif',
      mono: 'Source Code Pro, monospace',
    },
  },
  {
    id: 'arctic',
    name: 'Frozen Tundra',
    colors: {
      background: '200 50% 98%',
      foreground: '210 100% 12%',
      card: '200 40% 95%',
      cardForeground: '210 100% 12%',
      primary: '195 100% 35%',
      primaryForeground: '0 0% 100%',
      secondary: '200 25% 88%',
      secondaryForeground: '210 100% 12%',
      accent: '220 100% 65%',
      accentForeground: '210 100% 12%',
      muted: '200 20% 92%',
      mutedForeground: '210 50% 40%',
      border: '200 30% 85%',
      input: '200 20% 90%',
      ring: '195 100% 35%',
    },
    fonts: {
      primary: 'Montserrat, Helvetica, sans-serif',
      mono: 'Roboto Mono, monospace',
    },
  },
  {
    id: 'retro',
    name: 'Synthwave Arcade',
    colors: {
      background: '300 20% 6%',
      foreground: '50 100% 85%',
      card: '300 25% 10%',
      cardForeground: '50 100% 85%',
      primary: '300 100% 50%',
      primaryForeground: '300 20% 6%',
      secondary: '180 100% 35%',
      secondaryForeground: '50 100% 85%',
      accent: '350 100% 55%',
      accentForeground: '300 20% 6%',
      muted: '300 15% 18%',
      mutedForeground: '50 40% 65%',
      border: '300 80% 25%',
      input: '300 15% 12%',
      ring: '300 100% 50%',
    },
    fonts: {
      primary: 'Press Start 2P, Courier, monospace',
      mono: 'Press Start 2P, Courier, monospace',
    },
  },
  {
    id: 'midnight',
    name: 'Royal Navy',
    colors: {
      background: '220 100% 4%',
      foreground: '220 30% 92%',
      card: '220 80% 8%',
      cardForeground: '220 30% 92%',
      primary: '220 100% 45%',
      primaryForeground: '0 0% 100%',
      secondary: '240 40% 18%',
      secondaryForeground: '220 30% 92%',
      accent: '260 80% 55%',
      accentForeground: '220 100% 4%',
      muted: '220 40% 12%',
      mutedForeground: '220 20% 68%',
      border: '220 60% 18%',
      input: '220 40% 10%',
      ring: '220 100% 45%',
    },
    fonts: {
      primary: 'Lato, Arial, sans-serif',
      mono: 'Ubuntu Mono, monospace',
    },
  },
];
