<template>
  <button
    class="base-chip"
    :class="[
      `base-chip--${variant}`,
      { 'base-chip--selected': selected, 'base-chip--disabled': disabled }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type ChipVariant = 'default' | 'primary' | 'secondary' | 'outlined'

interface Props {
  variant?: ChipVariant
  selected?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  selected: false,
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style scoped lang="scss">
.base-chip {
  padding: 10px 20px;
  background: var(--bg-light, #f5f5f5);
  border: 2px solid transparent;
  border-radius: 24px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-dark, #424242);
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  outline: none;

  &:hover:not(.base-chip--disabled) {
    background: var(--bg-white, #ffffff);
    border-color: var(--primary-color, #1976d2);
    color: var(--primary-color, #1976d2);
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active:not(.base-chip--disabled) {
    transform: translateY(0);
  }

  &--primary {
    background: var(--primary-color, #1976d2);
    color: white;
    border-color: var(--primary-color, #1976d2);

    &:hover:not(.base-chip--disabled) {
      background: var(--primary-dark, #1565c0);
      border-color: var(--primary-dark, #1565c0);
      color: white;
    }
  }

  &--secondary {
    background: var(--bg-light, #f5f5f5);
    color: var(--text-dark, #424242);
    border-color: var(--border-color, #e0e0e0);

    &:hover:not(.base-chip--disabled) {
      background: var(--bg-white, #ffffff);
      border-color: var(--primary-color, #1976d2);
      color: var(--primary-color, #1976d2);
    }
  }

  &--outlined {
    background: transparent;
    border-color: var(--border-color, #e0e0e0);
    color: var(--text-dark, #424242);

    &:hover:not(.base-chip--disabled) {
      background: var(--bg-light, #f5f5f5);
      border-color: var(--primary-color, #1976d2);
      color: var(--primary-color, #1976d2);
    }
  }

  &--selected {
    background: var(--primary-color, #1976d2);
    border-color: var(--primary-color, #1976d2);
    color: white;

    &:hover:not(.base-chip--disabled) {
      background: var(--primary-dark, #1565c0);
      border-color: var(--primary-dark, #1565c0);
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
