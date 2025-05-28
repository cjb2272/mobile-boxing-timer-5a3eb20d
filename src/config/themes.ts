
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
    destructive: string;
    destructiveForeground: string;
  };
  fonts: {
    primary: string;
    mono: string;
  };
  design: {
    borderRadius: string;
    shadows: boolean;
    gradients: boolean;
    buttonStyle: 'pill' | 'sharp' | 'rounded' | 'organic';
  };
}

export const themes: Theme[] = [
  {
    id: 'light',
    name: 'Minimal Light',
    colors: {
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 98%',
      cardForeground: '222.2 84% 4.9%',
      primary: '220 14.3% 95.9%',
      primaryForeground: '220.9 39.3% 11%',
      secondary: '210 40% 96%',
      secondaryForeground: '222.2 47.4% 11.2%',
      accent: '210 40% 96.1%',
      accentForeground: '222.2 47.4% 11.2%',
      muted: '210 40% 94%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '214.3 31.8% 91.4%',
      input: '214.3 31.8% 91.4%',
      ring: '222.2 84% 4.9%',
      destructive: '0 84.2% 60.2%',
      destructiveForeground: '210 40% 98%',
    },
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, Consolas, monospace',
    },
    design: {
      borderRadius: '0.5rem',
      shadows: false,
      gradients: false,
      buttonStyle: 'rounded',
    },
  },
  {
    id: 'dark',
    name: 'Midnight Dark',
    colors: {
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      card: '217.2 32.6% 17.5%',
      cardForeground: '210 40% 98%',
      primary: '217.2 91.2% 59.8%',
      primaryForeground: '222.2 84% 4.9%',
      secondary: '217.2 32.6% 12%',
      secondaryForeground: '210 40% 98%',
      accent: '217.2 32.6% 20%',
      accentForeground: '210 40% 98%',
      muted: '217.2 32.6% 15%',
      mutedForeground: '215 20.2% 65.1%',
      border: '217.2 32.6% 17.5%',
      input: '217.2 32.6% 17.5%',
      ring: '224.3 76.3% 94.1%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '210 40% 98%',
    },
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, Consolas, monospace',
    },
    design: {
      borderRadius: '0.75rem',
      shadows: true,
      gradients: false,
      buttonStyle: 'rounded',
    },
  },
  {
    id: 'matrix',
    name: 'Digital Matrix',
    colors: {
      background: '120 100% 2%',
      foreground: '120 100% 85%',
      card: '120 80% 6%',
      cardForeground: '120 100% 85%',
      primary: '120 100% 25%',
      primaryForeground: '120 100% 95%',
      secondary: '120 60% 8%',
      secondaryForeground: '120 100% 85%',
      accent: '120 100% 15%',
      accentForeground: '120 100% 95%',
      muted: '120 80% 4%',
      mutedForeground: '120 40% 50%',
      border: '120 100% 12%',
      input: '120 80% 6%',
      ring: '120 100% 50%',
      destructive: '0 100% 40%',
      destructiveForeground: '120 100% 95%',
    },
    fonts: {
      primary: 'JetBrains Mono, Courier New, monospace',
      mono: 'JetBrains Mono, Courier New, monospace',
    },
    design: {
      borderRadius: '0rem',
      shadows: false,
      gradients: false,
      buttonStyle: 'sharp',
    },
  },
  {
    id: 'beach',
    name: 'Tropical Paradise',
    colors: {
      background: '192 100% 97%',
      foreground: '203 39% 15%',
      card: '185 60% 88%',
      cardForeground: '203 39% 15%',
      primary: '176 77% 47%',
      primaryForeground: '0 0% 100%',
      secondary: '185 45% 80%',
      secondaryForeground: '203 39% 15%',
      accent: '39 100% 75%',
      accentForeground: '203 39% 15%',
      muted: '185 35% 85%',
      mutedForeground: '203 23% 42%',
      border: '184 44% 75%',
      input: '185 25% 85%',
      ring: '176 77% 47%',
      destructive: '24 100% 55%',
      destructiveForeground: '0 0% 100%',
    },
    fonts: {
      primary: 'Poppins, -apple-system, sans-serif',
      mono: 'Fira Code, monospace',
    },
    design: {
      borderRadius: '2rem',
      shadows: true,
      gradients: true,
      buttonStyle: 'pill',
    },
  },
  {
    id: 'cyberpunk',
    name: 'Neon Streets',
    colors: {
      background: '270 100% 3%',
      foreground: '300 100% 90%',
      card: '270 80% 8%',
      cardForeground: '300 100% 90%',
      primary: '300 100% 50%',
      primaryForeground: '270 100% 3%',
      secondary: '270 60% 12%',
      secondaryForeground: '300 100% 90%',
      accent: '180 100% 40%',
      accentForeground: '270 100% 3%',
      muted: '270 40% 6%',
      mutedForeground: '300 30% 65%',
      border: '300 100% 20%',
      input: '270 40% 8%',
      ring: '300 100% 50%',
      destructive: '350 100% 55%',
      destructiveForeground: '270 100% 3%',
    },
    fonts: {
      primary: 'Orbitron, futura, sans-serif',
      mono: 'Share Tech Mono, monospace',
    },
    design: {
      borderRadius: '0.25rem',
      shadows: true,
      gradients: true,
      buttonStyle: 'sharp',
    },
  },
  {
    id: 'forest',
    name: 'Enchanted Woods',
    colors: {
      background: '120 30% 97%',
      foreground: '120 50% 12%',
      card: '120 25% 90%',
      cardForeground: '120 50% 12%',
      primary: '142 76% 28%',
      primaryForeground: '0 0% 100%',
      secondary: '120 20% 85%',
      secondaryForeground: '120 50% 12%',
      accent: '85 60% 70%',
      accentForeground: '120 50% 12%',
      muted: '120 15% 88%',
      mutedForeground: '120 25% 40%',
      border: '120 25% 80%',
      input: '120 20% 90%',
      ring: '142 76% 28%',
      destructive: '15 85% 45%',
      destructiveForeground: '0 0% 100%',
    },
    fonts: {
      primary: 'Merriweather, Georgia, serif',
      mono: 'Inconsolata, monospace',
    },
    design: {
      borderRadius: '1.5rem',
      shadows: true,
      gradients: false,
      buttonStyle: 'organic',
    },
  },
  {
    id: 'sunset',
    name: 'Golden Hour',
    colors: {
      background: '25 100% 98%',
      foreground: '15 80% 15%',
      card: '25 80% 85%',
      cardForeground: '15 80% 15%',
      primary: '14 100% 57%',
      primaryForeground: '0 0% 100%',
      secondary: '25 60% 80%',
      secondaryForeground: '15 80% 15%',
      accent: '320 60% 75%',
      accentForeground: '15 80% 15%',
      muted: '25 40% 88%',
      mutedForeground: '15 40% 45%',
      border: '25 60% 82%',
      input: '25 40% 92%',
      ring: '14 100% 57%',
      destructive: '0 85% 55%',
      destructiveForeground: '0 0% 100%',
    },
    fonts: {
      primary: 'Playfair Display, Times, serif',
      mono: 'Source Code Pro, monospace',
    },
    design: {
      borderRadius: '1rem',
      shadows: true,
      gradients: true,
      buttonStyle: 'rounded',
    },
  },
  {
    id: 'arctic',
    name: 'Frozen Tundra',
    colors: {
      background: '200 50% 98%',
      foreground: '210 100% 12%',
      card: '200 30% 92%',
      cardForeground: '210 100% 12%',
      primary: '195 100% 35%',
      primaryForeground: '0 0% 100%',
      secondary: '200 20% 88%',
      secondaryForeground: '210 100% 12%',
      accent: '220 80% 75%',
      accentForeground: '210 100% 12%',
      muted: '200 15% 90%',
      mutedForeground: '210 50% 40%',
      border: '200 30% 85%',
      input: '200 20% 90%',
      ring: '195 100% 35%',
      destructive: '200 85% 45%',
      destructiveForeground: '0 0% 100%',
    },
    fonts: {
      primary: 'Montserrat, Helvetica, sans-serif',
      mono: 'Roboto Mono, monospace',
    },
    design: {
      borderRadius: '0.375rem',
      shadows: true,
      gradients: false,
      buttonStyle: 'rounded',
    },
  },
  {
    id: 'retro',
    name: 'Synthwave Arcade',
    colors: {
      background: '300 20% 6%',
      foreground: '50 100% 85%',
      card: '300 40% 12%',
      cardForeground: '50 100% 85%',
      primary: '300 100% 50%',
      primaryForeground: '300 20% 6%',
      secondary: '300 25% 15%',
      secondaryForeground: '50 100% 85%',
      accent: '180 100% 45%',
      accentForeground: '300 20% 6%',
      muted: '300 20% 10%',
      mutedForeground: '50 40% 65%',
      border: '300 80% 25%',
      input: '300 15% 12%',
      ring: '300 100% 50%',
      destructive: '350 100% 55%',
      destructiveForeground: '300 20% 6%',
    },
    fonts: {
      primary: 'Press Start 2P, Courier, monospace',
      mono: 'Press Start 2P, Courier, monospace',
    },
    design: {
      borderRadius: '0rem',
      shadows: true,
      gradients: true,
      buttonStyle: 'sharp',
    },
  },
  {
    id: 'midnight',
    name: 'Royal Navy',
    colors: {
      background: '220 100% 4%',
      foreground: '220 30% 92%',
      card: '220 60% 12%',
      cardForeground: '220 30% 92%',
      primary: '220 100% 45%',
      primaryForeground: '0 0% 100%',
      secondary: '220 40% 15%',
      secondaryForeground: '220 30% 92%',
      accent: '260 60% 50%',
      accentForeground: '220 100% 4%',
      muted: '220 50% 8%',
      mutedForeground: '220 20% 68%',
      border: '220 60% 18%',
      input: '220 40% 10%',
      ring: '220 100% 45%',
      destructive: '220 85% 50%',
      destructiveForeground: '0 0% 100%',
    },
    fonts: {
      primary: 'Lato, Arial, sans-serif',
      mono: 'Ubuntu Mono, monospace',
    },
    design: {
      borderRadius: '0.5rem',
      shadows: true,
      gradients: false,
      buttonStyle: 'rounded',
    },
  },
];
