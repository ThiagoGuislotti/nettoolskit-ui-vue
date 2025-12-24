<template>
  <section class="base-section" :class="sectionClasses" :style="sectionStyle">
    <div class="base-section__container" :class="containerClasses">
      <!-- Section Header -->
      <div v-if="title || subtitle || $slots.header" class="base-section__header">
        <slot name="header">
          <span v-if="badge" class="base-section__badge">{{ badge }}</span>
          <h2 v-if="title" class="base-section__title">{{ title }}</h2>
          <p v-if="subtitle" class="base-section__subtitle">{{ subtitle }}</p>
        </slot>
      </div>

      <!-- Section Content -->
      <div class="base-section__content">
        <slot />
      </div>

      <!-- Section Footer -->
      <div v-if="$slots.footer" class="base-section__footer">
        <slot name="footer" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// ✅ NUNCA usar default export (frontend.instructions.md)
// ✅ TypeScript interface para props

interface Props {
  variant?: 'default' | 'light' | 'dark' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  title?: string
  subtitle?: string
  badge?: string
  centered?: boolean
  fullWidth?: boolean
  bgColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  title: '',
  subtitle: '',
  badge: '',
  centered: true,
  fullWidth: false,
  bgColor: ''
})

const sectionClasses = computed(() => ({
  [`base-section--${props.variant}`]: true,
  [`base-section--${props.size}`]: true,
  'base-section--centered': props.centered
}))

const containerClasses = computed(() => ({
  'base-section__container--full-width': props.fullWidth
}))

const sectionStyle = computed(() => {
  if (props.bgColor) {
    return { backgroundColor: props.bgColor }
  }
  return {}
})
</script>

<style lang="scss" scoped>
.base-section {
  font-family: var(--font-family);
  width: 100%;

  // Variants
  &--default {
    background-color: var(--color-surface-primary);
  }

  &--light {
    background-color: var(--color-bg-light);
  }

  &--dark {
    background-color: var(--color-footer-bg);
    color: var(--color-text-inverse);
    
    .base-section__subtitle {
      color: var(--color-footer-text-muted);
    }
  }

  &--gradient {
    background: var(--gradient-hero);
  }

  // Sizes
  &--sm {
    padding: var(--space-lg) 0;
  }

  &--md {
    padding: var(--space-xl) 0;
    
    @media (min-width: 1024px) {
      padding: var(--space-2xl) 0;
    }
  }

  &--lg {
    padding: var(--space-2xl) 0;
    
    @media (min-width: 1024px) {
      padding: var(--space-3xl) 0;
    }
  }

  &--xl {
    padding: var(--space-3xl) 0;
    
    @media (min-width: 1024px) {
      padding: calc(var(--space-3xl) * 1.5) 0;
    }
  }

  // Centered
  &--centered {
    .base-section__header {
      text-align: center;
    }
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-md);
    
    @media (min-width: 600px) {
      padding: 0 var(--space-lg);
    }
    
    @media (min-width: 1024px) {
      padding: 0 var(--space-xl);
    }

    &--full-width {
      max-width: none;
      padding: 0;
    }
  }

  &__header {
    margin-bottom: var(--space-xl);
    
    @media (min-width: 1024px) {
      margin-bottom: var(--space-2xl);
    }
  }

  &__badge {
    display: inline-block;
    padding: var(--space-xs) var(--space-md);
    background-color: var(--color-action-primary);
    color: var(--color-text-inverse);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--border-radius-xl);
    margin-bottom: var(--space-md);
  }

  &__title {
    font-family: var(--font-family-display);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
    margin: 0 0 var(--space-md) 0;
    color: inherit;
    
    @media (min-width: 1024px) {
      font-size: var(--font-size-3xl);
    }
  }

  &__subtitle {
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    max-width: 700px;
    margin: 0 auto;
    line-height: var(--line-height-relaxed);
  }

  &__content {
    // Content styles handled by children
  }

  &__footer {
    margin-top: var(--space-xl);
    
    @media (min-width: 1024px) {
      margin-top: var(--space-2xl);
    }
  }
}
</style>
