<template>
  <div 
    class="base-steps" 
    :class="[
      `layout-${layout}`,
      `variant-${variant}`,
      { 'show-arrows': showArrows }
    ]"
  >
    <template v-for="(step, index) in steps" :key="step.number || index">
      <div class="step" :class="{ 'active': activeStep === index }">
        <div class="step-number" :style="numberStyle">
          <slot name="number" :step="step" :index="index">
            {{ step.number || index + 1 }}
          </slot>
        </div>
        <div class="step-content">
          <h3 class="step-title">{{ step.title }}</h3>
          <p v-if="step.description" class="step-description">{{ step.description }}</p>
          <slot :name="`step-${index}`" :step="step"></slot>
        </div>
      </div>
      
      <div 
        v-if="showArrows && index < steps.length - 1" 
        class="step-connector"
        :class="connectorClass"
      >
        <span class="connector-icon">{{ connectorIcon }}</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '../../composables/ui/useTheme';

export interface Step {
  number?: number | string;
  title: string;
  description?: string;
  icon?: string;
}

interface Props {
  /** Lista de passos */
  steps: Step[];
  /** Layout dos passos */
  layout?: 'horizontal' | 'vertical';
  /** Variante visual */
  variant?: 'default' | 'numbered' | 'timeline' | 'minimal';
  /** Mostrar conectores entre passos */
  showArrows?: boolean;
  /** Ícone do conector */
  connectorIcon?: string;
  /** Passo ativo (para highlight) */
  activeStep?: number;
  /** Cor dos números (sobrescreve tema) */
  numberColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  layout: 'horizontal',
  variant: 'default',
  showArrows: true,
  connectorIcon: '→',
  activeStep: -1,
});

const { theme } = useTheme();

const numberStyle = computed(() => {
  const color = props.numberColor || theme.value.colors.primary;
  return {
    background: `linear-gradient(135deg, ${color} 0%, ${theme.value.colors.primaryDark} 100%)`,
  };
});

const connectorClass = computed(() => ({
  'horizontal': props.layout === 'horizontal',
  'vertical': props.layout === 'vertical',
}));
</script>

<style scoped lang="scss">
.base-steps {
  display: flex;
  gap: 1rem;
}

// Layouts
.layout-horizontal {
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  
  .step {
    flex: 1;
    min-width: 200px;
    max-width: 300px;
    text-align: center;
  }
  
  .step-number {
    margin: 0 auto 1rem;
  }
  
  .step-connector {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    margin-top: 1.5rem;
    
    @media (max-width: 768px) {
      display: none;
    }
  }
}

.layout-vertical {
  flex-direction: column;
  
  .step {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .step-number {
    flex-shrink: 0;
  }
  
  .step-connector {
    display: flex;
    justify-content: center;
    padding: 0.5rem 0;
    margin-left: 1.25rem;
    
    .connector-icon {
      transform: rotate(90deg);
    }
  }
}

// Step
.step {
  position: relative;
}

.step-number {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--theme-text, #424242);
  margin: 0 0 0.5rem 0;
  font-family: var(--theme-font-display, 'Poppins', sans-serif);
}

.step-description {
  font-size: 0.9rem;
  color: var(--theme-text-light, #757575);
  margin: 0;
  line-height: 1.6;
}

// Connector
.step-connector {
  .connector-icon {
    font-size: 1.5rem;
    color: var(--theme-text-muted, #9e9e9e);
  }
}

// Variantes
.variant-timeline {
  .layout-vertical & {
    .step {
      position: relative;
      padding-left: 2rem;
      
      &::before {
        content: '';
        position: absolute;
        left: 1.5rem;
        top: 3rem;
        bottom: -1rem;
        width: 2px;
        background: var(--theme-border, #e0e0e0);
      }
      
      &:last-child::before {
        display: none;
      }
    }
    
    .step-number {
      position: absolute;
      left: 0;
      z-index: 1;
    }
  }
}

.variant-minimal {
  .step-number {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }
  
  .step-title {
    font-size: 1rem;
  }
  
  .step-description {
    font-size: 0.85rem;
  }
}

// Active state
.step.active {
  .step-number {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  .step-title {
    color: var(--theme-primary, #1976d2);
  }
}
</style>
