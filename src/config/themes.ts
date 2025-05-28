
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
    name: 'Basic Light',
    colors: {
      background: '0 0% 100%',
      foreground: '222.2 84% 4.9%',
      card: '0 0% 100%',
      cardForeground: '222.2 84% 4.9%',
      primary: '222.2 47.4% 11.2%',
      primaryForeground: '210 40% 98%',
      secondary: '210 40% 96.1%',
      secondaryForeground: '222.2 47.4% 11.2%',
      accent: '210 40% 96.1%',
      accentForeground: '222.2 47.4% 11.2%',
      muted: '210 40% 96.1%',
      mutedForeground: '215.4 16.3% 46.9%',
      border: '214.3 31.8% 91.4%',
      input: '214.3 31.8% 91.4%',
      ring: '222.2 84% 4.9%',
    },
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, Consolas, monospace',
    },
  },
  {
    id: 'dark',
    name: 'Basic Dark',
    colors: {
      background: '222.2 84% 4.9%',
      foreground: '210 40% 98%',
      card: '222.2 84% 4.9%',
      cardForeground: '210 40% 98%',
      primary: '210 40% 98%',
      primaryForeground: '222.2 47.4% 11.2%',
      secondary: '217.2 32.6% 17.5%',
      secondaryForeground: '210 40% 98%',
      accent: '217.2 32.6% 17.5%',
      accentForeground: '210 40% 98%',
      muted: '217.2 32.6% 17.5%',
      mutedForeground: '215 20.2% 65.1%',
      border: '217.2 32.6% 17.5%',
      input: '217.2 32.6% 17.5%',
      ring: '212.7 26.8% 83.9%',
    },
    fonts: {
      primary: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, Consolas, monospace',
    },
  },
  {
    id: 'matrix',
    name: 'Matrix Green',
    colors: {
      background: '120 100% 3%',
      foreground: '120 100% 50%',
      card: '120 100% 5%',
      cardForeground: '120 100% 50%',
      primary: '120 100% 25%',
      primaryForeground: '120 100% 90%',
      secondary: '120 50% 8%',
      secondaryForeground: '120 100% 50%',
      accent: '120 100% 15%',
      accentForeground: '120 100% 80%',
      muted: '120 50% 10%',
      mutedForeground: '120 50% 40%',
      border: '120 100% 15%',
      input: '120 100% 8%',
      ring: '120 100% 50%',
    },
    fonts: {
      primary: 'JetBrains Mono, Courier New, monospace',
      mono: 'JetBrains Mono, Courier New, monospace',
    },
  },
  {
    id: 'beach',
    name: 'Beach Vibes',
    colors: {
      background: '195 100% 95%',
      foreground: '200 25% 20%',
      card: '190 100% 97%',
      cardForeground: '200 25% 20%',
      primary: '195 100% 40%',
      primaryForeground: '0 0% 100%',
      secondary: '45 100% 85%',
      secondaryForeground: '200 25% 20%',
      accent: '25 100% 70%',
      accentForeground: '200 25% 20%',
      muted: '190 50% 90%',
      mutedForeground: '200 25% 40%',
      border: '190 50% 80%',
      input: '190 50% 85%',
      ring: '195 100% 40%',
    },
    fonts: {
      primary: 'Poppins, -apple-system, sans-serif',
      mono: 'Fira Code, monospace',
    },
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    colors: {
      background: '270 50% 5%',
      foreground: '300 100% 80%',
      card: '270 50% 8%',
      cardForeground: '300 100% 80%',
      primary: '300 100% 50%',
      primaryForeground: '270 50% 5%',
      secondary: '180 100% 25%',
      secondaryForeground: '300 100% 80%',
      accent: '60 100% 50%',
      accentForeground: '270 50% 5%',
      muted: '270 30% 15%',
      mutedForeground: '300 50% 60%',
      border: '300 100% 25%',
      input: '270 30% 12%',
      ring: '300 100% 50%',
    },
    fonts: {
      primary: 'Orbitron, futura, sans-serif',
      mono: 'Share Tech Mono, monospace',
    },
  },
  {
    id: 'forest',
    name: 'Forest Calm',
    colors: {
      background: '120 25% 95%',
      foreground: '120 30% 15%',
      card: '120 20% 97%',
      cardForeground: '120 30% 15%',
      primary: '120 40% 30%',
      primaryForeground: '0 0% 100%',
      secondary: '80 30% 85%',
      secondaryForeground: '120 30% 15%',
      accent: '40 60% 70%',
      accentForeground: '120 30% 15%',
      muted: '120 15% 90%',
      mutedForeground: '120 20% 40%',
      border: '120 20% 80%',
      input: '120 15% 88%',
      ring: '120 40% 30%',
    },
    fonts: {
      primary: 'Merriweather, Georgia, serif',
      mono: 'Inconsolata, monospace',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    colors: {
      background: '15 100% 96%',
      foreground: '340 30% 20%',
      card: '20 100% 98%',
      cardForeground: '340 30% 20%',
      primary: '15 100% 50%',
      primaryForeground: '0 0% 100%',
      secondary: '340 60% 85%',
      secondaryForeground: '340 30% 20%',
      accent: '60 100% 60%',
      accentForeground: '340 30% 20%',
      muted: '20 50% 92%',
      mutedForeground: '340 20% 40%',
      border: '20 40% 85%',
      input: '20 40% 90%',
      ring: '15 100% 50%',
    },
    fonts: {
      primary: 'Playfair Display, Times, serif',
      mono: 'Source Code Pro, monospace',
    },
  },
  {
    id: 'arctic',
    name: 'Arctic Ice',
    colors: {
      background: '200 30% 97%',
      foreground: '200 50% 15%',
      card: '200 25% 99%',
      cardForeground: '200 50% 15%',
      primary: '200 80% 40%',
      primaryForeground: '0 0% 100%',
      secondary: '180 20% 90%',
      secondaryForeground: '200 50% 15%',
      accent: '220 100% 70%',
      accentForeground: '200 50% 15%',
      muted: '200 15% 93%',
      mutedForeground: '200 30% 35%',
      border: '200 20% 85%',
      input: '200 15% 90%',
      ring: '200 80% 40%',
    },
    fonts: {
      primary: 'Montserrat, Helvetica, sans-serif',
      mono: 'Roboto Mono, monospace',
    },
  },
  {
    id: 'retro',
    name: 'Retro Arcade',
    colors: {
      background: '300 15% 8%',
      foreground: '50 100% 80%',
      card: '300 15% 12%',
      cardForeground: '50 100% 80%',
      primary: '300 100% 60%',
      primaryForeground: '300 15% 8%',
      secondary: '180 100% 40%',
      secondaryForeground: '50 100% 80%',
      accent: '350 100% 60%',
      accentForeground: '300 15% 8%',
      muted: '300 10% 20%',
      mutedForeground: '50 50% 60%',
      border: '300 50% 25%',
      input: '300 10% 15%',
      ring: '300 100% 60%',
    },
    fonts: {
      primary: 'Press Start 2P, Courier, monospace',
      mono: 'Press Start 2P, Courier, monospace',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight Blue',
    colors: {
      background: '220 50% 8%',
      foreground: '220 20% 85%',
      card: '220 50% 10%',
      cardForeground: '220 20% 85%',
      primary: '220 80% 50%',
      primaryForeground: '0 0% 100%',
      secondary: '240 30% 20%',
      secondaryForeground: '220 20% 85%',
      accent: '260 60% 60%',
      accentForeground: '220 50% 8%',
      muted: '220 30% 15%',
      mutedForeground: '220 15% 60%',
      border: '220 40% 20%',
      input: '220 30% 12%',
      ring: '220 80% 50%',
    },
    fonts: {
      primary: 'Lato, Arial, sans-serif',
      mono: 'Ubuntu Mono, monospace',
    },
  },
];
