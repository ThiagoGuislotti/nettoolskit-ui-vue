/**
 * Configuration Exports
 * Exporta todas as configurações de forma centralizada
 */

// Theme Configuration
export {
  type ThemeColors,
  type ThemeFonts,
  type ThemeLogo,
  type ThemeGradients,
  type ThemeConfig,
  type ThemeName,
  sentinelaTheme,
  plateaTheme,
  darkTheme,
  themes,
  defaultTheme,
} from './theme.config';

// Layout Configuration
export {
  type HeaderConfig,
  type SidebarConfig,
  type FooterConfig,
  type ContainerConfig,
  type MobileConfig,
  type LayoutConfig,
  type LayoutPreset,
  defaultLayoutConfig,
  stickyHeaderLayout,
  dashboardLayout,
  layoutPresets,
} from './layout.config';

// Brand Configuration
export {
  type NavItem,
  type SocialLink,
  type FooterSection,
  type BrandConfig,
  type BrandName,
  sentinelaBrand,
  plateaBrand,
  nettoolskitBrand,
  brands,
  getBrand,
} from './brand.config';
