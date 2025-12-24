<template>
  <div class="metric-card">
    <div class="metric-card__content">
      <div class="metric-card__info">
        <div class="metric-card__label">{{ label }}</div>
        <div class="metric-card__value">{{ value }}</div>
        <div v-if="trend" class="metric-card__trend" :class="trendClass">
          <q-icon :name="trendIcon" size="xs" /> {{ trend }}
        </div>
      </div>
      <q-icon :name="icon" size="3rem" class="metric-card__icon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label: string
  value: string | number
  icon: string
  trend?: string
  trendType?: 'positive' | 'negative' | 'neutral'
}

const props = withDefaults(defineProps<Props>(), {
  trendType: 'neutral'
})

const trendClass = computed(() => {
  if (!props.trend) return ''
  return `metric-card__trend--${props.trendType}`
})

const trendIcon = computed(() => {
  if (props.trendType === 'positive') return 'trending_up'
  if (props.trendType === 'negative') return 'trending_down'
  return 'trending_flat'
})
</script>

<style lang="scss" scoped>
.metric-card {
  background: var(--ntk-card-bg);
  border-radius: var(--ntk-radius-xl);
  box-shadow: var(--ntk-shadow-card);
  padding: 1.5rem;
  transition: all var(--ntk-transition-base);
  font-family: var(--ntk-font-family);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--ntk-shadow-card-hover);
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__info {
    flex: 1;
  }

  &__label {
    font-size: var(--ntk-font-size-sm);
    color: var(--ntk-text-light);
    margin-bottom: 0.5rem;
    font-weight: var(--ntk-font-weight-medium);
  }

  &__value {
    font-size: 2.5rem;
    color: var(--ntk-text-dark);
    font-weight: var(--ntk-font-weight-extrabold);
    line-height: 1.2;
  }

  &__trend {
    font-size: var(--ntk-font-size-sm);
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    &--positive {
      color: var(--ntk-success);
    }

    &--negative {
      color: var(--ntk-error);
    }

    &--neutral {
      color: var(--ntk-text-light);
    }
  }

  &__icon {
    color: var(--ntk-primary);
    opacity: 0.3;
  }
}
</style>
