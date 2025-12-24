<template>
  <div 
    class="credit-card" 
    :class="[
      `variant-${variant}`,
      { 'hoverable': hoverable }
    ]"
  >
    <div class="credit-icon" :style="iconStyle">
      <slot name="icon">
        <span>{{ icon }}</span>
      </slot>
    </div>
    
    <div class="credit-info">
      <h4 class="credit-name">{{ name }}</h4>
      <p v-if="description" class="credit-description">{{ description }}</p>
    </div>
    
    <div class="credit-amount" :style="amountStyle">
      <span class="amount">{{ formattedCredits }}</span>
      <span class="label">{{ creditLabel }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '../../composables/ui/useTheme';

interface Props {
  /** Ícone (emoji ou texto) */
  icon: string;
  /** Nome da ação */
  name: string;
  /** Descrição da ação */
  description?: string;
  /** Quantidade de créditos */
  credits: number;
  /** Label dos créditos */
  creditLabel?: string;
  /** Variante visual */
  variant?: 'default' | 'compact' | 'detailed';
  /** Efeito hover */
  hoverable?: boolean;
  /** Cor do ícone */
  iconColor?: string;
  /** Cor do valor */
  amountColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  creditLabel: 'créditos',
  variant: 'default',
  hoverable: true,
});

const { theme } = useTheme();

const iconStyle = computed(() => {
  if (props.iconColor) {
    return { backgroundColor: props.iconColor };
  }
  return {
    backgroundColor: `${theme.value.colors.primary}15`,
  };
});

const amountStyle = computed(() => ({
  color: props.amountColor || theme.value.colors.primary,
}));

const formattedCredits = computed(() => {
  return props.credits.toLocaleString('pt-BR');
});
</script>

<style scoped lang="scss">
.credit-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--theme-background, #ffffff);
  border: 1px solid var(--theme-border, #e0e0e0);
  border-radius: 12px;
  transition: all 0.2s ease;
  
  &.hoverable:hover {
    border-color: var(--theme-primary, #1976d2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

.credit-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.credit-info {
  flex: 1;
  min-width: 0;
}

.credit-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--theme-text, #424242);
  margin: 0 0 0.25rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.credit-description {
  font-size: 0.8rem;
  color: var(--theme-text-muted, #9e9e9e);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.credit-amount {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
  
  .amount {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1;
  }
  
  .label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    opacity: 0.8;
  }
}

// Variantes
.variant-compact {
  padding: 0.75rem 1rem;
  
  .credit-icon {
    width: 36px;
    height: 36px;
    font-size: 1.25rem;
    border-radius: 8px;
  }
  
  .credit-name {
    font-size: 0.85rem;
  }
  
  .credit-description {
    display: none;
  }
  
  .credit-amount {
    .amount {
      font-size: 1.25rem;
    }
    
    .label {
      font-size: 0.65rem;
    }
  }
}

.variant-detailed {
  flex-direction: column;
  text-align: center;
  padding: 1.5rem;
  
  .credit-icon {
    width: 64px;
    height: 64px;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .credit-info {
    margin-bottom: 0.5rem;
  }
  
  .credit-name {
    white-space: normal;
  }
  
  .credit-description {
    white-space: normal;
  }
  
  .credit-amount {
    align-items: center;
    
    .amount {
      font-size: 2rem;
    }
  }
}
</style>
