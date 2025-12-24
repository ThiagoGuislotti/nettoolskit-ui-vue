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
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
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
    font-size: 0.875rem;
    color: #757575;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  &__value {
    font-size: 2.5rem;
    color: #424242;
    font-weight: 800;
    line-height: 1.2;
  }

  &__trend {
    font-size: 0.875rem;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    &--positive {
      color: #4caf50;
    }

    &--negative {
      color: #f44336;
    }

    &--neutral {
      color: #757575;
    }
  }

  &__icon {
    color: #1976d2;
    opacity: 0.3;
  }
}
</style>