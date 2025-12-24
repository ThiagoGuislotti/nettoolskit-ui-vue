/**
 * NetToolsKit UI Vue - Single Entry Point
 * 
 * ⭐ ÚNICO PONTO DE ENTRADA para todo o módulo
 * 
 * Zero repetição: Importa tudo diretamente de cada arquivo,
 * sem index.ts intermediários nas subpastas.
 * 
 * @example
 * ```typescript
 * import {
 *   // Components
 *   BaseButton, BaseInput, MetricCard,
 *   
 *   // Composables
 *   useNotification, useFormRules, useAsync,
 *   
 *   // Services
 *   NotificationService, FilterService,
 *   
 *   // Utils
 *   validateEmail, validateCPF, retry, timeout
 * } from '@nettoolskit/ui-vue'
 * ```
 */

// ============================================================================
// ADAPTERS
// ============================================================================
export * from './src/adapters/QuasarNotificationAdapter'

// ============================================================================
// COMPONENTS - Form
// ============================================================================
export { default as BaseInput } from './src/components/form/BaseInput.vue'
export { default as BaseSelect } from './src/components/form/BaseSelect.vue'
export { default as BaseMultiSelect } from './src/components/form/BaseMultiSelect.vue'
export { default as BaseTextarea } from './src/components/form/BaseTextarea.vue'
export { default as BaseDatePicker } from './src/components/form/BaseDatePicker.vue'
export { default as BaseTimePicker } from './src/components/form/BaseTimePicker.vue'

// ============================================================================
// COMPONENTS - Layout
// ============================================================================
export { default as BaseHeader } from './src/components/layout/BaseHeader.vue'
export { default as BaseSidebar } from './src/components/layout/BaseSidebar.vue'
export { default as BaseFooter } from './src/components/layout/BaseFooter.vue'
export { default as BaseSection } from './src/components/layout/BaseSection.vue'
export { default as BaseHero } from './src/components/layout/BaseHero.vue'

// ============================================================================
// COMPONENTS - UI
// ============================================================================
export { default as BaseButton } from './src/components/ui/BaseButton.vue'
export { default as BaseCard } from './src/components/ui/BaseCard.vue'
export { default as BaseChip } from './src/components/ui/BaseChip.vue'
export { default as MetricCard } from './src/components/ui/MetricCard.vue'
export { default as SectionHeader } from './src/components/ui/SectionHeader.vue'
export { default as InfoCard } from './src/components/ui/InfoCard.vue'
export { default as BasePricingCard } from './src/components/ui/BasePricingCard.vue'
export { default as BaseLogo } from './src/components/ui/BaseLogo.vue'
export { default as BaseFeatureCard } from './src/components/ui/BaseFeatureCard.vue'
export { default as BaseSteps } from './src/components/ui/BaseSteps.vue'
export { default as BaseCreditCard } from './src/components/ui/BaseCreditCard.vue'

// ============================================================================
// COMPOSABLES - Forms
// ============================================================================
export * from './src/composables/forms/useFormRules'
export * from './src/composables/forms/useBaseField'

// ============================================================================
// COMPOSABLES - UI
// ============================================================================
export * from './src/composables/ui/useDialog'
export * from './src/composables/ui/useDialogActions'
export * from './src/composables/ui/useResponsive'
export * from './src/composables/ui/useTheme'

// ============================================================================
// COMPOSABLES - Data
// ============================================================================
export * from './src/composables/data/useFilters'
export * from './src/composables/data/useTableColumns'

// ============================================================================
// COMPOSABLES - Utils
// ============================================================================
export * from './src/composables/utils/useDebounce'
export * from './src/composables/utils/useAsync'

// ============================================================================
// COMPOSABLES - Services
// ============================================================================
export * from './src/composables/services/useNotification'

// ============================================================================
// SERVICES
// ============================================================================
export * from './src/services/NotificationService'
export * from './src/services/FilterService'
export * from './src/services/FormValidationService'

// ============================================================================
// UTILS - Validators
// ============================================================================
export * from './src/utils/validators'

// ============================================================================
// UTILS - Async
// ============================================================================
export * from './src/utils/async'

// ============================================================================
// CONFIG - Theme
// ============================================================================
export * from './src/config/theme.config'
