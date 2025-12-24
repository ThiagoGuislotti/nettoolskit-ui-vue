/**
 * Theme Configuration
 * Define temas reutilizáveis para diferentes projetos
 * Basta importar e usar o tema desejado
 */

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundLight: string;
  text: string;
  textLight: string;
  textMuted: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ThemeFonts {
  display: string;
  body: string;
}

export interface ThemeLogo {
  letter: string;
  text: string;
  tagline?: string;
}

export interface ThemeGradients {
  hero: string;
  primary: string;
  loading: string;
}

export interface ThemeConfig {
  name: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  logo: ThemeLogo;
  gradients: ThemeGradients;
}

/**
 * Tema Sentinela - Azul corporativo
 * Para projetos de monitoramento e busca
 */
export const sentinelaTheme: ThemeConfig = {
  name: 'Sentinela',
  colors: {
    primary: '#1976d2',
    primaryDark: '#1565c0',
    primaryLight: '#42a5f5',
    secondary: '#f5f5f5',
    accent: '#1976d2',
    background: '#ffffff',
    backgroundLight: '#f5f7fa',
    text: '#424242',
    textLight: '#757575',
    textMuted: '#9e9e9e',
    border: '#e0e0e0',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8',
  },
  fonts: {
    display: 'Poppins',
    body: 'Inter',
  },
  logo: {
    letter: 'S',
    text: 'Sentinela',
    tagline: 'Sistema de Busca',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
    primary: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
    loading: 'linear-gradient(90deg, #f5f7fa 0%, #e4e8ec 50%, #f5f7fa 100%)',
  },
};

/**
 * Tema PlaTEA - Verde suave
 * Para projetos de acessibilidade e organização
 */
export const plateaTheme: ThemeConfig = {
  name: 'PlaTEA',
  colors: {
    primary: '#4A9B7F',
    primaryDark: '#3a7a63',
    primaryLight: '#6bc4a6',
    secondary: '#f5f3f0',
    accent: '#4A9B7F',
    background: '#ffffff',
    backgroundLight: '#f5f3f0',
    text: '#424242',
    textLight: '#757575',
    textMuted: '#9e9e9e',
    border: '#e0e0e0',
    success: '#28a745',
    warning: '#ffc107',
    error: '#dc3545',
    info: '#17a2b8',
  },
  fonts: {
    display: 'Poppins',
    body: 'Inter',
  },
  logo: {
    letter: 'P',
    text: 'PlaTEA',
    tagline: 'Agenda Visual Assistida',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #ffffff 0%, #f5f3f0 100%)',
    primary: 'linear-gradient(135deg, #4A9B7F 0%, #3a7a63 100%)',
    loading: 'linear-gradient(90deg, #f5f3f0 0%, #e8e6e2 50%, #f5f3f0 100%)',
  },
};

/**
 * Tema Escuro - Para projetos com modo escuro
 */
export const darkTheme: ThemeConfig = {
  name: 'Dark',
  colors: {
    primary: '#6366f1',
    primaryDark: '#4f46e5',
    primaryLight: '#818cf8',
    secondary: '#1e1e2e',
    accent: '#6366f1',
    background: '#0f0f1a',
    backgroundLight: '#1e1e2e',
    text: '#e0e0e0',
    textLight: '#a0a0a0',
    textMuted: '#6b6b6b',
    border: '#2e2e3e',
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
    info: '#3b82f6',
  },
  fonts: {
    display: 'Poppins',
    body: 'Inter',
  },
  logo: {
    letter: 'D',
    text: 'DarkApp',
  },
  gradients: {
    hero: 'linear-gradient(135deg, #0f0f1a 0%, #1e1e2e 100%)',
    primary: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    loading: 'linear-gradient(90deg, #1e1e2e 0%, #2e2e3e 50%, #1e1e2e 100%)',
  },
};

/**
 * Temas disponíveis
 */
export const themes = {
  sentinela: sentinelaTheme,
  platea: plateaTheme,
  dark: darkTheme,
} as const;

export type ThemeName = keyof typeof themes;

/**
 * Tema padrão
 */
export const defaultTheme = sentinelaTheme;
