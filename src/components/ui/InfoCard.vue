<template>
  <div class="info-card" :class="{ 'info-card--elevated': variant === 'elevated' }">
    <div v-if="headerBg" class="info-card__header info-card__header--colored" :style="{ backgroundColor: headerBg }">
      <div v-if="icon" class="info-card__header-content">
        <q-icon :name="icon" size="2rem" class="info-card__icon" />
        <div>
          <div class="info-card__title">{{ title }}</div>
          <div v-if="subtitle" class="info-card__subtitle">{{ subtitle }}</div>
        </div>
      </div>
      <template v-else>
        <div class="info-card__title">{{ title }}</div>
        <div v-if="subtitle" class="info-card__subtitle">{{ subtitle }}</div>
      </template>
    </div>

    <div v-else class="info-card__header">
      <div v-if="icon" class="info-card__header-content">
        <q-icon :name="icon" size="2rem" class="info-card__icon" :style="{ color: iconColor }" />
        <div>
          <div class="info-card__title">{{ title }}</div>
          <div v-if="subtitle" class="info-card__subtitle">{{ subtitle }}</div>
        </div>
      </div>
      <template v-else>
        <div class="info-card__title">{{ title }}</div>
        <div v-if="subtitle" class="info-card__subtitle">{{ subtitle }}</div>
      </template>
    </div>

    <div v-if="separator" class="info-card__separator"></div>

    <div class="info-card__content">
      <slot />
    </div>

    <div v-if="$slots.actions" class="info-card__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  icon?: string
  iconColor?: string
  headerBg?: string
  variant?: 'default' | 'elevated'
  separator?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  separator: false
})
</script>

<style lang="scss" scoped>
.info-card {
  background: var(--ntk-card-bg);
  border-radius: var(--ntk-radius-xl);
  box-shadow: var(--ntk-shadow-card);
  overflow: hidden;
  transition: all var(--ntk-transition-base);
  font-family: var(--ntk-font-family);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--ntk-shadow-card-hover);
  }

  &--elevated {
    box-shadow: var(--ntk-shadow-card-hover);
  }

  &__header {
    padding: 1.5rem;

    &--colored {
      background: var(--ntk-primary);
      color: var(--ntk-text-inverse);

      .info-card__title,
      .info-card__subtitle {
        color: var(--ntk-text-inverse);
      }

      .info-card__icon {
        color: var(--ntk-text-inverse) !important;
      }
    }
  }

  &__header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__icon {
    color: var(--ntk-primary);
  }

  &__title {
    font-size: var(--ntk-font-size-xl);
    font-weight: var(--ntk-font-weight-bold);
    color: var(--ntk-text-dark);
  }

  &__subtitle {
    font-size: var(--ntk-font-size-sm);
    color: var(--ntk-text-light);
    margin-top: 0.25rem;
  }

  &__separator {
    height: 1px;
    background: var(--ntk-border-light);
  }

  &__content {
    padding: 1.5rem;
    color: var(--ntk-text-dark);
    
    strong {
      color: var(--ntk-primary);
      font-weight: var(--ntk-font-weight-semibold);
    }
  }

  &__actions {
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    border-top: 1px solid var(--ntk-border-light);
  }
}
</style>
