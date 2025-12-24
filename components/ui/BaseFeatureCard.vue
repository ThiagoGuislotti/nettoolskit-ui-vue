<template>
  <div 
    class="feature-card" 
    :class="[
      `variant-${variant}`,
      `size-${size}`,
      { 'hoverable': hoverable, 'clickable': clickable }
    ]"
    @click="handleClick"
  >
    <div class="feature-icon" :class="[`icon-${iconStyle}`]" :style="iconCustomStyle">
      <slot name="icon">
        <span v-if="icon">{{ icon }}</span>
      </slot>
    </div>
    
    <div class="feature-content">
      <h3 class="feature-title">{{ title }}</h3>
      <p v-if="description" class="feature-description">{{ description }}</p>
      <slot></slot>
    </div>
    
    <div v-if="$slots.footer" class="feature-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '../../composables/ui/useTheme';

interface Props {
  /** Ícone (emoji ou texto) */
  icon?: string;
  /** Título do card */
  title: string;
  /** Descrição do card */
  description?: string;
  /** Variante visual */
  variant?: 'default' | 'outlined' | 'elevated' | 'accent-left' | 'accent-top';
  /** Tamanho do card */
  size?: 'sm' | 'md' | 'lg';
  /** Estilo do ícone */
  iconStyle?: 'default' | 'circle' | 'square' | 'gradient';
  /** Cor do ícone (sobrescreve tema) */
  iconColor?: string;
  /** Efeito hover */
  hoverable?: boolean;
  /** Card clicável */
  clickable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  iconStyle: 'default',
  hoverable: true,
  clickable: false,
});

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const { theme } = useTheme();

const iconCustomStyle = computed(() => {
  if (props.iconColor) {
    return { color: props.iconColor };
  }
  if (props.iconStyle === 'gradient') {
    return {
      background: `linear-gradient(135deg, ${theme.value.colors.primary} 0%, ${theme.value.colors.primaryDark} 100%)`,
      color: 'white',
    };
  }
  return {};
});

const handleClick = () => {
  if (props.clickable) {
    emit('click');
  }
};
</script>

<style scoped lang="scss">
.feature-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--theme-background, #ffffff);
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &.hoverable:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
  
  &.clickable {
    cursor: pointer;
  }
}

// Variantes
.variant-default {
  border: 1px solid var(--theme-border, #e0e0e0);
}

.variant-outlined {
  border: 2px solid var(--theme-border, #e0e0e0);
  background: transparent;
}

.variant-elevated {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: none;
}

.variant-accent-left {
  border-left: 4px solid var(--theme-primary, #1976d2);
  border-radius: 0 12px 12px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.variant-accent-top {
  border-top: 4px solid var(--theme-primary, #1976d2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

// Ícone
.feature-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
  
  &.icon-circle {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--theme-background-light, #f5f5f5);
    border-radius: 50%;
  }
  
  &.icon-square {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--theme-background-light, #f5f5f5);
    border-radius: 12px;
  }
  
  &.icon-gradient {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    font-size: 1.5rem;
  }
}

// Conteúdo
.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--theme-text, #424242);
  margin: 0 0 0.5rem 0;
  font-family: var(--theme-font-display, 'Poppins', sans-serif);
}

.feature-description {
  font-size: 0.9rem;
  color: var(--theme-text-light, #757575);
  margin: 0;
  line-height: 1.6;
}

.feature-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--theme-border, #e0e0e0);
}

// Tamanhos
.size-sm {
  padding: 1rem;
  
  .feature-icon {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    
    &.icon-circle,
    &.icon-square,
    &.icon-gradient {
      width: 40px;
      height: 40px;
      font-size: 1.25rem;
    }
  }
  
  .feature-title {
    font-size: 1rem;
  }
  
  .feature-description {
    font-size: 0.85rem;
  }
}

.size-lg {
  padding: 2rem;
  
  .feature-icon {
    font-size: 2.5rem;
    margin-bottom: 1.25rem;
    
    &.icon-circle,
    &.icon-square,
    &.icon-gradient {
      width: 72px;
      height: 72px;
      font-size: 2rem;
    }
  }
  
  .feature-title {
    font-size: 1.25rem;
  }
  
  .feature-description {
    font-size: 1rem;
  }
}
</style>
