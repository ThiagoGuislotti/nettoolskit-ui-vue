/**
 * useBaseField - Composable for form fields
 * 
 * Centralizes common props, v-model logic and shared handlers
 * across all form components (BaseInput, BaseSelect, etc.)
 * 
 * @example
 * const { baseProps, internalValue, handleUpdate } = useBaseField(props, emit)
 */

import { ref, watch, type Ref } from 'vue'
import type { ValidationRule } from 'quasar'

/**
 * Base props shared by all form components
 */
export interface BaseFieldProps {
  modelValue?: string | number | Array<any> | object | null
  label?: string
  placeholder?: string
  outlined?: boolean
  filled?: boolean
  dense?: boolean
  readonly?: boolean
  disable?: boolean
  rules?: ValidationRule[]
  lazyRules?: boolean
  prependIcon?: string
  appendIcon?: string
  hint?: string
  ariaDescribedBy?: string
}

/**
 * Base props with default values
 */
export const baseFieldPropsDefaults = {
  modelValue: {
    type: [String, Number, Array, Object, null] as any,
    default: null
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  outlined: {
    type: Boolean,
    default: true
  },
  filled: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disable: {
    type: Boolean,
    default: false
  },
  rules: {
    type: Array as () => ValidationRule[],
    default: () => []
  },
  lazyRules: {
    type: Boolean,
    default: true
  },
  prependIcon: {
    type: String,
    default: ''
  },
  appendIcon: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  ariaDescribedBy: {
    type: String,
    default: ''
  }
}

/**
 * Composable useBaseField
 * 
 * @param props - Component props
 * @param emit - Component emit function
 * @returns Object with internal value and update handler
 */
export function useBaseField<T = any>(
  props: BaseFieldProps,
  emit: (event: 'update:modelValue', value: T) => void
) {
  // Reactive internal value
  const internalValue: Ref<T> = ref(props.modelValue as T) as Ref<T>

  // Watch to synchronize external modelValue with internal
  watch(
    () => props.modelValue,
    (newValue) => {
      internalValue.value = newValue as T
    }
  )

  // Handler to update value and emit event
  const handleUpdate = (value: T) => {
    internalValue.value = value
    emit('update:modelValue', value)
  }

  return {
    internalValue,
    handleUpdate
  }
}

/**
 * Extracted base props (to use with defineProps)
 */
export type BaseFieldPropsExtracted = {
  modelValue?: string | number | Array<any> | object | null
  label: string
  placeholder?: string
  outlined?: boolean
  filled?: boolean
  dense?: boolean
  readonly?: boolean
  disable?: boolean
  rules?: ValidationRule[]
  lazyRules?: boolean
  prependIcon?: string
  appendIcon?: string
  hint?: string
  ariaDescribedBy?: string
}