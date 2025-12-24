<template>
  <header class="base-landing-header" :class="headerClasses" :style="headerStyle">
    <div class="header-container" :style="containerStyle">
      <!-- Logo -->
      <div class="header-logo">
        <BaseLogo
          :letter="logoLetter"
          :text="logoText"
          :link-to="logoLink"
          :size="logoSize"
          :icon-color="logoIconColor"
          :text-color="logoTextColor"
          :gradient="logoGradient"
        />
      </div>

      <!-- Desktop Navigation -->
      <nav v-if="navItems.length > 0" class="header-nav">
        <a
          v-for="(item, index) in navItems"
          :key="index"
          :href="item.href"
          class="header-nav-item"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Desktop CTA -->
      <div class="header-actions">
        <slot name="actions">
          <a 
            v-if="ctaText" 
            :href="ctaLink" 
            class="header-cta-btn"
            :class="`cta-${ctaVariant}`"
            :style="ctaVariant === 'primary' ? ctaPrimaryStyle : {}"
          >
            <slot name="cta-icon" />
            {{ ctaText }}
          </a>
        </slot>
      </div>

      <!-- Mobile Menu Button -->
      <button 
        class="header-mobile-btn"
        @click="toggleMobileMenu"
        aria-label="Abrir menu"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
        >
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </div>

    <!-- Mobile Drawer -->
    <BaseMobileDrawer
      v-model="mobileMenuOpen"
      :side="mobileDrawerSide"
      :width="mobileDrawerWidth"
      :nav-items="navItems"
      :cta-text="ctaText"
      :cta-link="ctaLink"
      :compress-label="compressLabel"
      @nav-click="handleNavClick"
      @cta-click="handleCtaClick"
    >
      <slot name="mobile-extra" />
    </BaseMobileDrawer>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseLogo from '../ui/BaseLogo.vue';
import BaseMobileDrawer from './BaseMobileDrawer.vue';
import { useTheme } from '../../composables/ui/useTheme';
import type { NavItem } from '../../config/brand.config';

/**
 * BaseLandingHeader - Header padronizado para landing pages
 * 
 * Funcionalidades:
 * - Logo configurável (usa BaseLogo internamente)
 * - Menu de navegação responsivo
 * - Botão CTA com variantes
 * - Menu hambúrguer no mobile
 * - Drawer lateral com botão "Comprimir"
 * - Sombra e altura padronizadas
 */

interface Props {
  // Logo
  /** Letra do logo */
  logoLetter?: string;
  /** Texto do logo */
  logoText?: string;
  /** Link do logo */
  logoLink?: string;
  /** Tamanho do logo */
  logoSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Cor do ícone do logo */
  logoIconColor?: string;
  /** Cor do texto do logo */
  logoTextColor?: string;
  /** Usar gradiente no logo */
  logoGradient?: boolean;
  
  // Navegação
  /** Itens de navegação */
  navItems?: NavItem[];
  
  // CTA
  /** Texto do botão CTA */
  ctaText?: string;
  /** Link do botão CTA */
  ctaLink?: string;
  /** Variante do botão CTA */
  ctaVariant?: 'primary' | 'secondary' | 'outline';
  
  // Layout
  /** Altura do header em pixels */
  height?: number;
  /** Header fixo no topo */
  sticky?: boolean;
  /** Sombra do header */
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  /** Cor de fundo */
  background?: string;
  /** Largura máxima do container */
  maxWidth?: number;
  /** Padding horizontal */
  paddingX?: string;
  
  // Mobile
  /** Breakpoint para mobile */
  mobileBreakpoint?: number;
  /** Lado do drawer mobile */
  mobileDrawerSide?: 'left' | 'right';
  /** Largura do drawer mobile */
  mobileDrawerWidth?: number;
  /** Texto do botão comprimir */
  compressLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  logoLink: '/',
  logoSize: 'md',
  logoGradient: true,
  navItems: () => [],
  ctaText: '',
  ctaLink: '#',
  ctaVariant: 'primary',
  height: 64,
  sticky: false,
  shadow: 'sm',
  background: '#ffffff',
  maxWidth: 1200,
  paddingX: '20px',
  mobileBreakpoint: 768,
  mobileDrawerSide: 'right',
  mobileDrawerWidth: 280,
  compressLabel: 'Comprimir',
});

const emit = defineEmits<{
  (e: 'nav-click', item: NavItem): void;
  (e: 'cta-click'): void;
  (e: 'mobile-toggle', open: boolean): void;
}>();

const { theme } = useTheme();

const mobileMenuOpen = ref(false);

// Computed styles
const shadowMap = {
  none: 'none',
  sm: '0 1px 3px rgba(0, 0, 0, 0.06)',
  md: '0 2px 8px rgba(0, 0, 0, 0.08)',
  lg: '0 4px 12px rgba(0, 0, 0, 0.12)',
};

const headerClasses = computed(() => ({
  'header-sticky': props.sticky,
}));

const headerStyle = computed(() => ({
  '--header-height': `${props.height}px`,
  '--header-shadow': shadowMap[props.shadow],
  '--header-bg': props.background,
  '--mobile-breakpoint': `${props.mobileBreakpoint}px`,
}));

const containerStyle = computed(() => ({
  maxWidth: `${props.maxWidth}px`,
  paddingLeft: props.paddingX,
  paddingRight: props.paddingX,
}));

const ctaPrimaryStyle = computed(() => ({
  background: theme.value.gradients.primary,
}));

// Methods
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  emit('mobile-toggle', mobileMenuOpen.value);
}

function handleNavClick(item: NavItem) {
  emit('nav-click', item);
}

function handleCtaClick() {
  emit('cta-click');
}
</script>

<style scoped lang="scss">
.base-landing-header {
  width: 100%;
  height: var(--header-height);
  background: var(--header-bg);
  box-shadow: var(--header-shadow);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  z-index: 100;
  
  &.header-sticky {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin: 0 auto;
}

.header-logo {
  flex-shrink: 0;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 32px;
  
  @media (max-width: 768px) {
    display: none;
  }
}

.header-nav-item {
  color: #424242;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: #212121;
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  
  @media (max-width: 768px) {
    display: none;
  }
}

.header-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &.cta-primary {
    color: white;
    
    &:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
  }
  
  &.cta-secondary {
    background: #f5f5f5;
    color: #424242;
    
    &:hover {
      background: #e0e0e0;
    }
  }
  
  &.cta-outline {
    background: transparent;
    color: #424242;
    border: 1px solid #e0e0e0;
    
    &:hover {
      background: #f5f5f5;
      border-color: #bdbdbd;
    }
  }
}

.header-mobile-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  color: #424242;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f5f5f5;
  }
  
  @media (max-width: 768px) {
    display: flex;
  }
}
</style>
