<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    class="base-button"
  >
    <span v-if="loading" class="base-button__spinner" aria-hidden="true">
      <q-spinner size="1em" />
    </span>
    <span :class="{ 'base-button__content--loading': loading }">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { QSpinner } from 'quasar'

interface Props {
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'success' | 'danger'
  size?: 'sm' | 'default' | 'large'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'default',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false
})

const buttonClasses = computed(() => ({
  [`base-button--${props.variant}`]: true,
  [`base-button--${props.size}`]: true,
  'base-button--disabled': props.disabled,
  'base-button--loading': props.loading,
  'base-button--full-width': props.fullWidth
}))
</script>

<style lang="scss" scoped>
.base-button {
  // Base styles
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 18px;
  min-height: 34px;
  font-family: var(--ntk-font-family);
  font-size: var(--ntk-font-size-sm);
  font-weight: var(--ntk-font-weight-medium);
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  border: none;
  border-radius: var(--ntk-radius-sm);
  background: transparent;
  transition: all var(--ntk-transition-fast);

  &:focus-visible {
    outline: 2px solid var(--ntk-primary);
    outline-offset: 2px;
  }

  // Variants
  &--primary {
    color: var(--ntk-text-inverse);
    background: var(--ntk-primary);
    border: 2px solid transparent;

    &:hover:not(:disabled) {
      background: var(--ntk-primary-dark);
      transform: translateY(-2px);
      box-shadow: var(--ntk-shadow-lg);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--secondary {
    color: var(--ntk-primary);
    background: transparent;
    border: 2px solid var(--ntk-primary);

    &:hover:not(:disabled) {
      background: var(--ntk-primary);
      color: var(--ntk-text-inverse);
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  }

  &--outlined {
    color: var(--ntk-text-dark);
    background: transparent;
    border: 2px solid var(--ntk-border-color);

    &:hover:not(:disabled) {
      background: var(--ntk-bg-tertiary);
      border-color: var(--ntk-primary);
      color: var(--ntk-primary);
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }
  }

  &--text {
    color: var(--ntk-text-dark);
    background: transparent;
    border: 2px solid transparent;
    padding: 8px 16px;

    &:hover:not(:disabled) {
      background: var(--ntk-bg-tertiary);
      color: var(--ntk-primary);
    }

    &:active:not(:disabled) {
      opacity: 0.7;
    }
  }

  &--success {
    color: var(--ntk-text-inverse);
    background: var(--ntk-success);
    border: 2px solid transparent;

    &:hover:not(:disabled) {
      background: var(--ntk-success-dark);
      transform: translateY(-2px);
      box-shadow: var(--ntk-shadow-lg);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--danger {
    color: var(--ntk-text-inverse);
    background: var(--ntk-error);
    border: 2px solid transparent;

    &:hover:not(:disabled) {
      background: var(--ntk-error-dark);
      transform: translateY(-2px);
      box-shadow: var(--ntk-shadow-lg);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  // Sizes
  &--sm {
    padding: 4px 12px;
    min-height: 28px;
    font-size: var(--ntk-font-size-xs);
  }

  &--default {
    padding: 6px 18px;
    min-height: 34px;
    font-size: var(--ntk-font-size-sm);
  }

  &--large {
    padding: 10px 28px;
    min-height: 44px;
    font-size: var(--ntk-font-size-base);
  }

  // States
  &--disabled,
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &--loading {
    cursor: wait;
  }

  &--full-width {
    width: 100%;
  }

  // Spinner
  &__spinner {
    display: inline-flex;
  }

  &__content--loading {
    opacity: 0.7;
  }
}

// Motion preferences (accessibility)
@media (prefers-reduced-motion: reduce) {
  .base-button {
    transition: none;

    &:active:not(:disabled) {
      transform: none;
    }
  }
}
</style>
