<template>
  <div
    class="base-card"
    :class="cardClasses"
  >
    <div v-if="$slots.header" class="base-card__header">
      <slot name="header" />
    </div>

    <div class="base-card__body">
      <slot />
    </div>

    <div v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// ✅ NUNCA usar default export (frontend.instructions.md)
// ✅ TypeScript interface para props

interface Props {
  variant?: 'default' | 'outlined' | 'elevated' | 'accent-left' | 'accent-top'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  clickable?: boolean
  accentColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  clickable: false,
  accentColor: 'primary'
})

const cardClasses = computed(() => ({
  [`base-card--${props.variant}`]: true,
  [`base-card--padding-${props.padding}`]: true,
  [`base-card--accent-${props.accentColor}`]: props.variant === 'accent-left' || props.variant === 'accent-top',
  'base-card--clickable': props.clickable
}))
</script>

<style lang="scss" scoped>
.base-card {
  display: flex;
  flex-direction: column;
  background: var(--color-surface-primary);
  border: 2px solid transparent;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  font-family: var(--font-family);

  // Variants
  &--default {
    border-color: transparent;
  }

  &--outlined {
    border-color: var(--color-border);
    box-shadow: none;
  }

  &--elevated {
    border: none;
    box-shadow: var(--shadow-lg);
  }

  &--accent-left {
    border-left-width: 4px;
    border-left-style: solid;
    border-radius: var(--border-radius-md);
  }

  &--accent-top {
    border-top-width: 4px;
    border-top-style: solid;
    border-radius: var(--border-radius-md);
  }

  // Accent colors
  &--accent-primary {
    border-color: var(--color-action-primary);
  }

  &--accent-success {
    border-color: var(--color-success);
  }

  &--accent-warning {
    border-color: var(--color-warning);
  }

  &--accent-danger {
    border-color: var(--color-error);
  }

  &--accent-info {
    border-color: var(--color-info);
  }

  // Padding variants
  &--padding-none {
    .base-card__body {
      padding: 0;
    }
  }

  &--padding-sm {
    .base-card__body {
      padding: var(--space-md);
    }
  }

  &--padding-md {
    .base-card__body {
      padding: var(--space-lg);
    }
  }

  &--padding-lg {
    .base-card__body {
      padding: var(--space-xl);
    }
  }

  // Clickable state
  &--clickable {
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    &:active {
      transform: translateY(-2px);
    }
  }

  // Header
  &__header {
    padding: var(--space-lg);
    padding-bottom: var(--space-md);
    border-bottom: 1px solid var(--color-border-light);
  }

  // Body
  &__body {
    flex: 1;
    padding: var(--space-lg);
  }

  // Footer
  &__footer {
    padding: var(--space-lg);
    padding-top: var(--space-md);
    border-top: 1px solid var(--color-border-light);
  }
}

// Motion preferences (accessibility)
@media (prefers-reduced-motion: reduce) {
  .base-card {
    transition: none;

    &--clickable {
      &:hover {
        transform: none;
      }

      &:active {
        transform: none;
      }
    }
  }
}
</style>
