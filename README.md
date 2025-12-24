# 🎨 NetToolsKit UI Vue

> UI Component Library for Vue 3 + Quasar - Reusable components, composables, and design system

[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js)](https://vuejs.org/)
[![Quasar](https://img.shields.io/badge/Quasar-2.x-1976D2?logo=quasar)](https://quasar.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📦 Estrutura

```
nettoolskit-ui-vue/
├── adapters/           # Adaptadores para frameworks (Quasar, etc.)
├── components/
│   ├── form/           # Inputs, selects, datepickers
│   ├── layout/         # Header, footer, sidebar, sections
│   └── ui/             # Buttons, cards, badges, etc.
├── composables/
│   ├── data/           # useFilters, useTableColumns
│   ├── forms/          # useFormRules, useBaseField
│   ├── services/       # useNotification
│   ├── ui/             # useDialog, useResponsive, useTheme
│   └── utils/          # useDebounce, useAsync
├── config/
│   └── theme.config.ts # Sistema de temas
├── services/           # NotificationService, FilterService
├── styles/
│   ├── design-system.scss
│   └── global.scss
├── utils/              # Validators, async helpers
└── index.ts            # Single entry point
```

## 🧩 Componentes

### Form Components
| Componente | Descrição |
|------------|-----------|
| `BaseInput` | Input de texto com validação |
| `BaseSelect` | Select dropdown |
| `BaseMultiSelect` | Select múltiplo |
| `BaseTextarea` | Área de texto |
| `BaseDatePicker` | Seletor de data |
| `BaseTimePicker` | Seletor de hora |

### Layout Components
| Componente | Descrição |
|------------|-----------|
| `BaseHeader` | Header responsivo |
| `BaseSidebar` | Sidebar navegável |
| `BaseFooter` | Footer com variantes dark/light |
| `BaseSection` | Seções de landing page |
| `BaseHero` | Hero sections |

### UI Components
| Componente | Descrição |
|------------|-----------|
| `BaseButton` | Botões com variantes |
| `BaseCard` | Cards com accent-left/top |
| `BaseChip` | Badges/chips |
| `BaseLogo` | Logo dinâmico por tema |
| `BaseFeatureCard` | Cards de funcionalidades |
| `BaseSteps` | Timeline/passos |
| `BaseCreditCard` | Cards de créditos |
| `BasePricingCard` | Cards de preços |
| `MetricCard` | Cards de métricas |
| `SectionHeader` | Headers de seção |
| `InfoCard` | Cards informativos |

## 🎨 Sistema de Temas

```typescript
import { useTheme, sentinelaTheme, plateaTheme } from '@nettoolskit/ui-vue';

// Usar tema
const { setTheme, theme, primaryColor } = useTheme();

// Trocar tema em runtime
setTheme('sentinela'); // Azul (#1976d2)
setTheme('platea');    // Verde (#4A9B7F)
setTheme('dark');      // Escuro
```

### Temas Disponíveis

| Tema | Cor Primária | Uso |
|------|--------------|-----|
| `sentinela` | #1976d2 (Azul) | Projeto Sentinela |
| `platea` | #4A9B7F (Verde) | Projeto PlaTEA |
| `dark` | #90caf9 (Azul claro) | Modo escuro |

## 🔧 Composables

### UI
```typescript
import { useTheme, useDialog, useResponsive } from '@nettoolskit/ui-vue';

// Tema
const { theme, setTheme, primaryColor } = useTheme();

// Diálogos
const { confirm, alert } = useDialog();

// Responsividade
const { isMobile, isTablet, isDesktop } = useResponsive();
```

### Forms
```typescript
import { useFormRules, useBaseField } from '@nettoolskit/ui-vue';

// Regras de validação
const { required, email, minLength } = useFormRules();

// Campo base
const { value, error, validate } = useBaseField(initialValue);
```

### Utils
```typescript
import { useDebounce, useAsync } from '@nettoolskit/ui-vue';

// Debounce
const debouncedSearch = useDebounce(searchFn, 300);

// Async com loading/error
const { data, loading, error, execute } = useAsync(fetchData);
```

## 📐 Design System

### Cores
```scss
// Cores semânticas
--color-primary: #1976d2;
--color-primary-dark: #1565c0;
--color-primary-light: #42a5f5;

// Ações
--color-action-success: #4caf50;
--color-action-warning: #ff9800;
--color-action-danger: #f44336;

// Superfícies
--color-surface-light: #f5f5f5;
--color-surface-dark: #1a1a2e;
```

### Tipografia
```scss
--font-family-display: 'Poppins', sans-serif;
--font-family-body: 'Inter', sans-serif;
```

### Espaçamento
```scss
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 32px;
--space-xl: 48px;
--space-2xl: 64px;
```

### Breakpoints
```scss
@mixin mobile { @media (max-width: 599px) { @content; } }
@mixin tablet { @media (min-width: 600px) and (max-width: 1023px) { @content; } }
@mixin desktop { @media (min-width: 1024px) { @content; } }
@mixin large-desktop { @media (min-width: 1440px) { @content; } }
```

## 📝 Uso

```typescript
// Importar componentes
import {
  BaseButton,
  BaseCard,
  BaseFooter,
  BaseFeatureCard,
  BaseSteps,
} from '@nettoolskit/ui-vue';

// Importar composables
import {
  useTheme,
  useDialog,
  useFormRules,
} from '@nettoolskit/ui-vue';

// Importar configuração de temas
import {
  sentinelaTheme,
  plateaTheme,
  darkTheme,
} from '@nettoolskit/ui-vue';
```

## 🚀 Projetos que Usam

- [Sentinela](https://github.com/ThiagoGuislotti/sentinela) - Sistema de monitoramento de redes sociais
- [PlaTEA](https://github.com/ThiagoGuislotti/PlaTEA) - Agenda visual assistida

## 📄 Licença

MIT © [Thiago Guislotti](https://github.com/ThiagoGuislotti)
