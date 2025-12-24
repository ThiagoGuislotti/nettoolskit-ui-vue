<template>
  <component 
    :is="linkTo ? 'a' : 'div'" 
    :href="linkTo" 
    class="base-logo" 
    :class="[`size-${size}`, { 'with-text': showText, 'clickable': linkTo }]"
  >
    <div class="logo-icon" :style="iconStyle">
      {{ letter }}
    </div>
    <div v-if="showText" class="logo-content">
      <span class="logo-text" :style="textStyle">{{ text }}</span>
      <span v-if="tagline && showTagline" class="logo-tagline">{{ tagline }}</span>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '../../composables/ui/useTheme';

interface Props {
  /** Letra do logo (sobrescreve tema) */
  letter?: string;
  /** Texto do logo (sobrescreve tema) */
  text?: string;
  /** Tagline do logo (sobrescreve tema) */
  tagline?: string;
  /** Mostrar texto ao lado do ícone */
  showText?: boolean;
  /** Mostrar tagline abaixo do texto */
  showTagline?: boolean;
  /** Tamanho do logo */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Cor do ícone (sobrescreve tema) */
  iconColor?: string;
  /** Cor do texto (sobrescreve tema) */
  textColor?: string;
  /** Link para navegação */
  linkTo?: string;
  /** Usar gradiente no ícone */
  gradient?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showText: true,
  showTagline: false,
  size: 'md',
  gradient: true,
});

const { theme } = useTheme();

// Valores do tema ou props
const letter = computed(() => props.letter || theme.value.logo.letter);
const text = computed(() => props.text || theme.value.logo.text);
const tagline = computed(() => props.tagline || theme.value.logo.tagline);

// Estilos dinâmicos
const iconStyle = computed(() => {
  const color = props.iconColor || theme.value.colors.primary;
  const colorDark = theme.value.colors.primaryDark;
  
  return {
    background: props.gradient 
      ? `linear-gradient(135deg, ${color} 0%, ${colorDark} 100%)`
      : color,
  };
});

const textStyle = computed(() => ({
  color: props.textColor || theme.value.colors.primary,
}));
</script>

<style scoped lang="scss">
.base-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  
  &.clickable {
    cursor: pointer;
    
    &:hover .logo-icon {
      transform: scale(1.05);
    }
  }
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  border-radius: 8px;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.logo-content {
  display: flex;
  flex-direction: column;
}

.logo-text {
  font-weight: 700;
  line-height: 1.2;
}

.logo-tagline {
  font-size: 0.65em;
  color: var(--theme-text-muted, #9e9e9e);
  font-weight: 400;
}

// Tamanhos
.size-sm {
  .logo-icon {
    width: 28px;
    height: 28px;
    font-size: 14px;
    border-radius: 6px;
  }
  .logo-text {
    font-size: 16px;
  }
}

.size-md {
  .logo-icon {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
  .logo-text {
    font-size: 20px;
  }
}

.size-lg {
  .logo-icon {
    width: 48px;
    height: 48px;
    font-size: 24px;
    border-radius: 10px;
  }
  .logo-text {
    font-size: 28px;
  }
}

.size-xl {
  .logo-icon {
    width: 64px;
    height: 64px;
    font-size: 32px;
    border-radius: 12px;
  }
  .logo-text {
    font-size: 36px;
  }
}
</style>
