/**
 * NetToolsKit UI Vue
 * Biblioteca de componentes Vue 3 + Quasar com sistema de temas
 * 
 * @packageDocumentation
 */

// ============================================
// Plugins
// ============================================
export { NtkThemePlugin, useNtkTheme } from './plugins';
export type { NtkThemeOptions } from './plugins';

// ============================================
// Composables
// ============================================
export { useTheme, initTheme } from './composables/ui/useTheme';
export { useDialog } from './composables/ui/useDialog';
export { useDialogActions } from './composables/ui/useDialogActions';
export { useResponsive } from './composables/ui/useResponsive';
export { useNotification } from './composables/services/useNotification';
export { useFormRules } from './composables/forms/useFormRules';
export { useBaseField } from './composables/forms/useBaseField';
export { useFilters } from './composables/data/useFilters';
export { useTableColumns } from './composables/data/useTableColumns';
export { useAsync } from './composables/utils/useAsync';
export { useDebounce } from './composables/utils/useDebounce';

// ============================================
// Config
// ============================================
export { themes, defaultTheme, sentinelaTheme, plateaTheme, darkTheme } from './config/theme.config';
export type { ThemeConfig, ThemeColors, ThemeFonts, ThemeLogo, ThemeGradients, ThemeName } from './config/theme.config';

// ============================================
// Styles
// ============================================
export { DESIGN_TOKENS, CSS_VARS, getCssVar, setCssVar } from './styles';
export type { DesignTokens } from './styles';

// ============================================
// Utils
// ============================================
export * from './utils';
