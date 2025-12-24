# Samples

This directory contains sample files to help you get started with nettoolskit-ui-vue.

## DemoPage.vue

A comprehensive showcase of all components and composables in the library.

### Usage

1. Copy `DemoPage.vue` to your project's pages directory
2. Add a route to the page in your router configuration
3. Adjust import paths based on your project structure

### Example Router Configuration

```typescript
// router/routes.ts
import DemoPage from '@/pages/DemoPage.vue'

const routes = [
  {
    path: '/demo',
    name: 'demo',
    component: DemoPage,
    meta: {
      title: 'Design System Demo'
    }
  }
]
```

### What's Included

The DemoPage showcases:

- **Theme System**: Runtime theme switching with useTheme
- **Composables**: useNotification, useDialog, useResponsive, useDebounce, useFormRules, useAsync
- **Buttons & Chips**: BaseButton, BaseChip with variants
- **Cards**: BaseCard, MetricCard, InfoCard
- **Form Inputs**: BaseInput, BaseSelect, BaseMultiSelect, BaseTextarea, BaseDatePicker, BaseTimePicker
- **Metrics**: Dashboard metric cards with trends
- **Design Tokens**: Colors, shadows, spacing scale

### Adjusting Import Paths

The sample uses relative imports. Adjust based on your project structure:

```typescript
// If using @shared alias
import { BaseButton, useNotification } from '@shared'

// If using direct imports
import BaseButton from '@/shared/components/ui/BaseButton.vue'
import { useNotification } from '@/shared/composables/services/useNotification'
```

### Screenshot

![Demo Page Screenshot](../docs/demo-page-screenshot.png)

## Contributing

Feel free to add more samples! Each sample should:

1. Be self-contained and runnable
2. Include clear documentation
3. Demonstrate best practices
4. Use relative imports that can be easily adjusted
