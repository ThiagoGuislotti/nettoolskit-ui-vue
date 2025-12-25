<template>
  <section class="base-cta-section" :class="sectionClasses" :style="sectionStyle">
    <div class="cta-container" :style="containerStyle">
      <!-- Content -->
      <div class="cta-content">
        <h2 class="cta-title">
          <slot name="title">{{ title }}</slot>
        </h2>
        <p v-if="subtitle" class="cta-subtitle">
          <slot name="subtitle">{{ subtitle }}</slot>
        </p>
      </div>
      
      <!-- Actions -->
      <div class="cta-actions">
        <slot name="actions">
          <a 
            :href="primaryCTA.link" 
            class="cta-btn cta-btn--primary"
            :style="primaryBtnStyle"
          >
            {{ primaryCTA.text }}
          </a>
          <a 
            v-if="secondaryCTA" 
            :href="secondaryCTA.link" 
            class="cta-btn cta-btn--secondary"
          >
            {{ secondaryCTA.text }}
          </a>
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '../../composables/ui/useTheme';

/**
 * BaseCTASection - Seção de Call-to-Action
 * 
 * Usado em landing pages para destacar ações importantes como:
 * - Começar agora
 * - Criar conta
 * - Baixar app
 * - Agendar demo
 */

interface CTAButton {
  text: string;
  link: string;
}

interface Props {
  /** Título principal */
  title: string;
  /** Subtítulo opcional */
  subtitle?: string;
  /** Botão CTA primário */
  primaryCTA: CTAButton;
  /** Botão CTA secundário (opcional) */
  secondaryCTA?: CTAButton;
  /** Variante visual */
  variant?: 'default' | 'gradient' | 'dark' | 'light';
  /** Tamanho da seção */
  size?: 'sm' | 'md' | 'lg';
  /** Layout */
  layout?: 'centered' | 'split';
  /** Largura máxima do container */
  maxWidth?: number;
  /** Cor de fundo customizada */
  bgColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'gradient',
  size: 'md',
  layout: 'centered',
  maxWidth: 900,
});

const { theme } = useTheme();

const sectionClasses = computed(() => [
  `variant-${props.variant}`,
  `size-${props.size}`,
  `layout-${props.layout}`,
]);

const sectionStyle = computed(() => {
  const styles: Record<string, string> = {};
  
  if (props.bgColor) {
    styles.background = props.bgColor;
  } else if (props.variant === 'gradient') {
    styles.background = theme.value.gradients.primary;
  }
  
  return styles;
});

const containerStyle = computed(() => ({
  maxWidth: `${props.maxWidth}px`,
}));

const primaryBtnStyle = computed(() => {
  if (props.variant === 'gradient' || props.variant === 'dark') {
    return {
      background: 'white',
      color: theme.value.colors.primary,
    };
  }
  return {
    background: theme.value.gradients.primary,
    color: 'white',
  };
});
</script>

<style scoped lang="scss">
.base-cta-section {
  width: 100%;
}

.cta-container {
  margin: 0 auto;
  padding: 0 20px;
}

// Variantes
.variant-default {
  background: #f5f5f5;
  
  .cta-title,
  .cta-subtitle {
    color: #212121;
  }
  
  .cta-btn--secondary {
    color: #424242;
    border-color: #bdbdbd;
    
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
}

.variant-gradient {
  .cta-title,
  .cta-subtitle {
    color: white;
  }
  
  .cta-btn--secondary {
    color: white;
    border-color: rgba(255, 255, 255, 0.5);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}

.variant-dark {
  background: #1a1a2e;
  
  .cta-title,
  .cta-subtitle {
    color: white;
  }
  
  .cta-btn--secondary {
    color: white;
    border-color: rgba(255, 255, 255, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}

.variant-light {
  background: white;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  
  .cta-title,
  .cta-subtitle {
    color: #212121;
  }
  
  .cta-btn--secondary {
    color: #424242;
    border-color: #bdbdbd;
    
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
}

// Tamanhos
.size-sm {
  padding: 2rem 0;
  
  .cta-title {
    font-size: 1.5rem;
  }
  
  .cta-subtitle {
    font-size: 1rem;
  }
}

.size-md {
  padding: 3rem 0;
  
  .cta-title {
    font-size: 2rem;
  }
  
  .cta-subtitle {
    font-size: 1.125rem;
  }
}

.size-lg {
  padding: 4rem 0;
  
  .cta-title {
    font-size: 2.5rem;
  }
  
  .cta-subtitle {
    font-size: 1.25rem;
  }
}

// Layouts
.layout-centered {
  .cta-container {
    text-align: center;
  }
  
  .cta-content {
    margin-bottom: 1.5rem;
  }
  
  .cta-actions {
    justify-content: center;
  }
}

.layout-split {
  .cta-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }
  
  .cta-content {
    flex: 1;
  }
  
  .cta-actions {
    flex-shrink: 0;
    
    @media (max-width: 768px) {
      width: 100%;
      justify-content: center;
    }
  }
}

// Conteúdo
.cta-title {
  font-family: 'Poppins', 'Inter', sans-serif;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.cta-subtitle {
  margin: 0;
  opacity: 0.9;
  line-height: 1.5;
}

// Botões
.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &--primary {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
  }
  
  &--secondary {
    background: transparent;
    border: 2px solid;
    
    &:hover {
      transform: translateY(-2px);
    }
  }
}
</style>
