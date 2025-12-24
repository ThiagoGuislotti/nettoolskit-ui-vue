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
  background: var(--ntk-chip-bg);
  border: 2px solid var(--ntk-chip-border);
  border-radius: var(--ntk-radius-2xl);
  font-size: var(--ntk-font-size-sm);
  font-weight: var(--ntk-font-weight-medium);
  color: var(--ntk-chip-text);
  cursor: pointer;
  transition: all var(--ntk-transition-base);
  font-family: var(--ntk-font-family);
  outline: none;

  &:hover:not(.base-chip--disabled) {
    background: var(--ntk-bg-primary);
    border-color: var(--ntk-primary);
    color: var(--ntk-primary);
    transform: translateY(-2px);
    box-shadow: var(--ntk-shadow-sm);
  }

  &:active:not(.base-chip--disabled) {
    transform: translateY(0);
  }

  &--primary {
    background: var(--ntk-primary);
    color: var(--ntk-text-inverse);
    border-color: var(--ntk-primary);

    &:hover:not(.base-chip--disabled) {
      background: var(--ntk-primary-dark);
      border-color: var(--ntk-primary-dark);
      color: var(--ntk-text-inverse);
    }
  }

  &--secondary {
    background: var(--ntk-chip-bg);
    color: var(--ntk-chip-text);
    border-color: var(--ntk-border-color);

    &:hover:not(.base-chip--disabled) {
      background: var(--ntk-bg-primary);
      border-color: var(--ntk-primary);
      color: var(--ntk-primary);
    }
  }

  &--outlined {
    background: transparent;
    border-color: var(--ntk-border-color);
    color: var(--ntk-chip-text);

    &:hover:not(.base-chip--disabled) {
      background: var(--ntk-chip-bg);
      border-color: var(--ntk-primary);
      color: var(--ntk-primary);
    }
  }

  &--selected {
    background: var(--ntk-chip-bg-selected);
    border-color: var(--ntk-chip-bg-selected);
    color: var(--ntk-chip-text-selected);

    &:hover:not(.base-chip--disabled) {
      background: var(--ntk-primary-dark);
      border-color: var(--ntk-primary-dark);
    }
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
