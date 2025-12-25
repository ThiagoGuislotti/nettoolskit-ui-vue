<template>
  <div class="base-stat-card" :class="cardClasses">
    <!-- Icon -->
    <div v-if="icon || $slots.icon" class="stat-icon" :style="iconStyle">
      <slot name="icon">
        <span>{{ icon }}</span>
      </slot>
    </div>
    
    <!-- Value -->
    <div class="stat-value">
      <span v-if="prefix" class="stat-prefix">{{ prefix }}</span>
      <span class="stat-number" :style="valueStyle">{{ formattedValue }}</span>
      <span v-if="suffix" class="stat-suffix">{{ suffix }}</span>
    </div>
    
    <!-- Label -->
    <div class="stat-label">{{ label }}</div>
    
    <!-- Trend -->
    <div v-if="trend" class="stat-trend" :class="trendClass">
      <span class="trend-icon">{{ trend.direction === 'up' ? '↑' : '↓' }}</span>
      <span class="trend-value">{{ Math.abs(trend.value) }}%</span>
    </div>
    
    <!-- Extra content -->
    <div v-if="$slots.default" class="stat-extra">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '../../composables/ui/useTheme';

/**
 * BaseStatCard - Card de estatísticas/métricas
 * 
 * Usado em landing pages para exibir números importantes como:
 * - Usuários ativos
 * - Downloads
 * - Avaliações
 * - Métricas de negócio
 */

interface TrendData {
  value: number;
  direction: 'up' | 'down';
}

interface Props {
  /** Valor principal (número ou string) */
  value: string | number;
  /** Label descritivo */
  label: string;
  /** Ícone (emoji ou texto) */
  icon?: string;
  /** Prefixo antes do valor (ex: R$, $) */
  prefix?: string;
  /** Sufixo após o valor (ex: +, %, K) */
  suffix?: string;
  /** Dados de tendência */
  trend?: TrendData;
  /** Variante visual */
  variant?: 'default' | 'outlined' | 'gradient' | 'minimal';
  /** Tamanho */
  size?: 'sm' | 'md' | 'lg';
  /** Cor do valor (sobrescreve tema) */
  valueColor?: string;
  /** Cor do ícone (sobrescreve tema) */
  iconColor?: string;
  /** Animação de contagem */
  animated?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  animated: false,
});

const { theme } = useTheme();

const cardClasses = computed(() => [
  `variant-${props.variant}`,
  `size-${props.size}`,
]);

const formattedValue = computed(() => {
  if (typeof props.value === 'number') {
    // Formata números grandes (1000 -> 1K, 1000000 -> 1M)
    if (props.value >= 1000000) {
      return (props.value / 1000000).toFixed(1) + 'M';
    }
    if (props.value >= 1000) {
      return (props.value / 1000).toFixed(1) + 'K';
    }
    return props.value.toLocaleString('pt-BR');
  }
  return props.value;
});

const valueStyle = computed(() => {
  if (props.valueColor) {
    return { color: props.valueColor };
  }
  if (props.variant === 'gradient') {
    return {
      background: theme.value.gradients.primary,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    };
  }
  return {};
});

const iconStyle = computed(() => {
  if (props.iconColor) {
    return { color: props.iconColor };
  }
  return { color: theme.value.colors.primary };
});

const trendClass = computed(() => ({
  'trend-up': props.trend?.direction === 'up',
  'trend-down': props.trend?.direction === 'down',
}));
</script>

<style scoped lang="scss">
.base-stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem;
  border-radius: 12px;
  transition: all 0.2s ease;
}

// Variantes
.variant-default {
  background: white;
  border: 1px solid #e0e0e0;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

.variant-outlined {
  background: transparent;
  border: 2px solid #e0e0e0;
  
  &:hover {
    border-color: #bdbdbd;
  }
}

.variant-gradient {
  background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
  border: 1px solid #e0e0e0;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
}

.variant-minimal {
  background: transparent;
  border: none;
  padding: 1rem;
}

// Ícone
.stat-icon {
  font-size: 2rem;
  margin-bottom: 0.75rem;
}

// Valor
.stat-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: 0.5rem;
}

.stat-prefix,
.stat-suffix {
  font-size: 1.25rem;
  font-weight: 600;
  color: #757575;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #212121;
  line-height: 1;
  font-family: 'Poppins', 'Inter', sans-serif;
}

// Label
.stat-label {
  font-size: 0.875rem;
  color: #757575;
  font-weight: 500;
}

// Trend
.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  
  &.trend-up {
    background: rgba(76, 175, 80, 0.1);
    color: #4caf50;
  }
  
  &.trend-down {
    background: rgba(244, 67, 54, 0.1);
    color: #f44336;
  }
}

.stat-extra {
  margin-top: 0.75rem;
}

// Tamanhos
.size-sm {
  padding: 1rem;
  
  .stat-icon {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .stat-number {
    font-size: 1.75rem;
  }
  
  .stat-prefix,
  .stat-suffix {
    font-size: 1rem;
  }
  
  .stat-label {
    font-size: 0.75rem;
  }
}

.size-lg {
  padding: 2rem;
  
  .stat-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  .stat-number {
    font-size: 3.5rem;
  }
  
  .stat-prefix,
  .stat-suffix {
    font-size: 1.5rem;
  }
  
  .stat-label {
    font-size: 1rem;
  }
}
</style>
