/**
 * Shared Styles Export
 * 
 * Este arquivo centraliza os estilos compartilhados do projeto.
 * Todos os estilos globais seguem o design da landing page:
 * - Inter font family
 * - Primary color: #1976d2
 * - Gradient background
 * - Modern rounded corners
 * - Consistent shadows and animations
 */

// Import global.scss in main App.vue
// @import '@shared/styles/global.scss';

export const DESIGN_TOKENS = {
  colors: {
    primary: '#1976d2',
    primaryDark: '#1565c0',
    textDark: '#424242',
    textLight: '#757575',
    white: '#ffffff',
    border: '#f0f0f0',
    background: '#f5f7fa',
    gradientStart: '#f5f7fa',
    gradientEnd: '#c3cfe2',
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '28px',
  },
  
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.15)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  
  transitions: {
    fast: '150ms ease',
    base: '300ms ease',
    slow: '500ms ease',
  },
  
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif",
} as const

export type DesignTokens = typeof DESIGN_TOKENS