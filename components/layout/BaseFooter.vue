<template>
  <footer class="base-footer" :class="footerClasses">
    <div class="base-footer__container">
      <!-- Main Content -->
      <div class="base-footer__content">
        <!-- Brand Section -->
        <div class="base-footer__brand">
          <slot name="brand">
            <h3 class="base-footer__logo">{{ brandName }}</h3>
            <p v-if="brandDescription" class="base-footer__description">
              {{ brandDescription }}
            </p>
          </slot>
        </div>

        <!-- Links Sections -->
        <div class="base-footer__links">
          <slot name="links">
            <div
              v-for="(section, index) in linkSections"
              :key="index"
              class="base-footer__link-section"
            >
              <h4 class="base-footer__link-title">{{ section.title }}</h4>
              <ul class="base-footer__link-list">
                <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
                  <a
                    :href="link.href"
                    class="base-footer__link"
                    :target="link.external ? '_blank' : undefined"
                    :rel="link.external ? 'noopener noreferrer' : undefined"
                  >
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </div>
          </slot>
        </div>

        <!-- Social Section -->
        <div v-if="$slots.social || socialLinks.length > 0" class="base-footer__social">
          <slot name="social">
            <h4 class="base-footer__link-title">{{ socialTitle }}</h4>
            <div class="base-footer__social-links">
              <a
                v-for="(social, index) in socialLinks"
                :key="index"
                :href="social.href"
                class="base-footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="social.label"
              >
                <q-icon :name="social.icon" size="20px" />
              </a>
            </div>
          </slot>
        </div>
      </div>

      <!-- Divider -->
      <div class="base-footer__divider"></div>

      <!-- Copyright -->
      <div class="base-footer__copyright">
        <slot name="copyright">
          <p>{{ copyrightText }}</p>
        </slot>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { QIcon } from 'quasar'

// ✅ NUNCA usar default export (frontend.instructions.md)
// ✅ TypeScript interface para props

interface LinkItem {
  label: string
  href: string
  external?: boolean
}

interface LinkSection {
  title: string
  links: LinkItem[]
}

interface SocialLink {
  icon: string
  href: string
  label: string
}

interface Props {
  variant?: 'dark' | 'light'
  brandName?: string
  brandDescription?: string
  linkSections?: LinkSection[]
  socialLinks?: SocialLink[]
  socialTitle?: string
  copyrightText?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'dark',
  brandName: 'Brand',
  brandDescription: '',
  linkSections: () => [],
  socialLinks: () => [],
  socialTitle: 'Redes Sociais',
  copyrightText: `© ${new Date().getFullYear()} Todos os direitos reservados.`
})

const footerClasses = computed(() => ({
  [`base-footer--${props.variant}`]: true
}))
</script>

<style lang="scss" scoped>
.base-footer {
  font-family: var(--font-family);
  
  &--dark {
    background-color: var(--color-footer-bg);
    color: var(--color-footer-text);
  }
  
  &--light {
    background-color: var(--color-bg-light);
    color: var(--color-text-dark);
  }

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--space-2xl) var(--space-md);
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-xl);
    
    @media (min-width: 600px) {
      grid-template-columns: 1fr 1fr;
    }
    
    @media (min-width: 1024px) {
      grid-template-columns: 2fr 3fr 1fr;
    }
  }

  &__brand {
    max-width: 300px;
  }

  &__logo {
    font-family: var(--font-family-display);
    font-size: var(--font-size-xl);
    font-weight: var(--font-weight-bold);
    margin: 0 0 var(--space-sm) 0;
    
    .base-footer--dark & {
      color: var(--color-text-inverse);
    }
  }

  &__description {
    font-size: var(--font-size-sm);
    line-height: var(--line-height-relaxed);
    margin: 0;
    
    .base-footer--dark & {
      color: var(--color-footer-text-muted);
    }
  }

  &__links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: var(--space-lg);
  }

  &__link-section {
    min-width: 140px;
  }

  &__link-title {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 var(--space-md) 0;
    
    .base-footer--dark & {
      color: var(--color-text-inverse);
    }
  }

  &__link-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  &__link {
    font-size: var(--font-size-sm);
    text-decoration: none;
    transition: color var(--transition-fast);
    
    .base-footer--dark & {
      color: var(--color-footer-text-muted);
      
      &:hover {
        color: var(--color-footer-link-hover);
      }
    }
    
    .base-footer--light & {
      color: var(--color-text-secondary);
      
      &:hover {
        color: var(--color-action-primary);
      }
    }
  }

  &__social {
    @media (min-width: 1024px) {
      text-align: right;
    }
  }

  &__social-links {
    display: flex;
    gap: var(--space-md);
    
    @media (min-width: 1024px) {
      justify-content: flex-end;
    }
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: all var(--transition-fast);
    
    .base-footer--dark & {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--color-footer-text);
      
      &:hover {
        background-color: var(--color-footer-link);
        color: var(--color-text-inverse);
      }
    }
    
    .base-footer--light & {
      background-color: var(--color-bg-light);
      color: var(--color-text-secondary);
      
      &:hover {
        background-color: var(--color-action-primary);
        color: var(--color-text-inverse);
      }
    }
  }

  &__divider {
    height: 1px;
    margin: var(--space-xl) 0;
    
    .base-footer--dark & {
      background-color: var(--color-footer-border);
    }
    
    .base-footer--light & {
      background-color: var(--color-border);
    }
  }

  &__copyright {
    text-align: center;
    
    p {
      font-size: var(--font-size-sm);
      margin: 0;
      
      .base-footer--dark & {
        color: var(--color-footer-text-muted);
      }
      
      .base-footer--light & {
        color: var(--color-text-muted);
      }
    }
  }
}
</style>
