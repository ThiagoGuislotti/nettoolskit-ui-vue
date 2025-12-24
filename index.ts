/**
 * Shared Module - Single Index Export
 * 
 * ⭐ ÚNICO PONTO DE ENTRADA para todo o módulo shared
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
 * } from '@shared'
 * ```
 */

// ============================================================================
// ADAPTERS
// ============================================================================
export * from './adapters/QuasarNotificationAdapter'

// ============================================================================
// COMPONENTS - Form
// ============================================================================
export { default as BaseInput } from './components/form/BaseInput.vue'
export { default as BaseSelect } from './components/form/BaseSelect.vue'
export { default as BaseMultiSelect } from './components/form/BaseMultiSelect.vue'
export { default as BaseTextarea } from './components/form/BaseTextarea.vue'
export { default as BaseDatePicker } from './components/form/BaseDatePicker.vue'
export { default as BaseTimePicker } from './components/form/BaseTimePicker.vue'

// ============================================================================
// COMPONENTS - Layout
// ============================================================================
export { default as BaseHeader } from './components/layout/BaseHeader.vue'
export { default as BaseSidebar } from './components/layout/BaseSidebar.vue'
export { default as BaseFooter } from './components/layout/BaseFooter.vue'
export { default as BaseSection } from './components/layout/BaseSection.vue'
export { default as BaseHero } from './components/layout/BaseHero.vue'

// ============================================================================
// COMPONENTS - UI
// ============================================================================
export { default as BaseButton } from './components/ui/BaseButton.vue'
export { default as BaseCard } from './components/ui/BaseCard.vue'
export { default as BaseChip } from './components/ui/BaseChip.vue'
export { default as MetricCard } from './components/ui/MetricCard.vue'
export { default as SectionHeader } from './components/ui/SectionHeader.vue'
export { default as InfoCard } from './components/ui/InfoCard.vue'
export { default as BasePricingCard } from './components/ui/BasePricingCard.vue'
export { default as BaseLogo } from './components/ui/BaseLogo.vue'
export { default as BaseFeatureCard } from './components/ui/BaseFeatureCard.vue'
export { default as BaseSteps } from './components/ui/BaseSteps.vue'
export { default as BaseCreditCard } from './components/ui/BaseCreditCard.vue'

// ============================================================================
// COMPOSABLES - Forms
// ============================================================================
export * from './composables/forms/useFormRules'
export * from './composables/forms/useBaseField'

// ============================================================================
// COMPOSABLES - UI
// ============================================================================
export * from './composables/ui/useDialog'
export * from './composables/ui/useDialogActions'
export * from './composables/ui/useResponsive'
export * from './composables/ui/useTheme'

// ============================================================================
// COMPOSABLES - Data
// ============================================================================
export * from './composables/data/useFilters'
export * from './composables/data/useTableColumns'

// ============================================================================
// COMPOSABLES - Utils
// ============================================================================
export * from './composables/utils/useDebounce'
export * from './composables/utils/useAsync'

// ============================================================================
// COMPOSABLES - Services
// ============================================================================
export * from './composables/services/useNotification'

// ============================================================================
// SERVICES
// ============================================================================
export * from './services/NotificationService'
export * from './services/FilterService'
export * from './services/FormValidationService'

// ============================================================================
// UTILS - Validators
// ============================================================================
export * from './utils/validators'

// ============================================================================
// UTILS - Async
// ============================================================================
export * from './utils/async'

// ============================================================================
// TYPES (Future)
// ============================================================================
// export * from './types'

// ============================================================================
// CONFIG - Theme
// ============================================================================
export * from './config/theme.config'
