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
  iconColor: '#1976d2',
  variant: 'default',
  separator: false
})
</script>

<style lang="scss" scoped>
.info-card {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &--elevated {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  &__header {
    padding: 1.5rem;

    &--colored {
      background: #1976d2;
      color: white;

      .info-card__title,
      .info-card__subtitle {
        color: white;
      }

      .info-card__icon {
        color: white !important;
      }
    }
  }

  &__header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__icon {
    color: #1976d2;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #424242;
  }

  &__subtitle {
    font-size: 0.875rem;
    color: #757575;
    margin-top: 0.25rem;
  }

  &__separator {
    height: 1px;
    background: #f0f0f0;
  }

  &__content {
    padding: 1.5rem;
    color: #424242;
    
    strong {
      color: #1976d2;
      font-weight: 600;
    }
  }

  &__actions {
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    border-top: 1px solid #f0f0f0;
  }
}
</style>