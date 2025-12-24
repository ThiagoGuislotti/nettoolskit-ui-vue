<template>
  <q-drawer
    :model-value="modelValue"
    :mini="mini"
    :width="width"
    :mini-width="miniWidth"
    :breakpoint="breakpoint"
    :class="drawerClass"
    @update:model-value="$emit('update:model-value', $event)"
  >
    <q-scroll-area class="fit">
      <!-- Header (Logo/Brand) -->
      <div v-if="$slots.header || logo" class="base-sidebar__header">
        <slot name="header">
          <div class="base-sidebar__logo">
            <img v-if="logo" :src="logo" :alt="logoAlt" class="base-sidebar__logo-img" />
            <span v-if="!mini && brandName" class="base-sidebar__brand">{{ brandName }}</span>
          </div>
        </slot>
      </div>

      <!-- Navigation Items -->
      <q-list padding :class="listClass">
        <template v-for="(item, index) in items" :key="item.id || index">
          <!-- Separator -->
          <q-separator v-if="item.type === 'separator'" :class="separatorClass" />

          <!-- Navigation Item -->
          <q-item
            v-else
            clickable
            :to="item.to"
            :exact="item.exact"
            :disable="item.disabled"
            :class="itemClass"
            @click="handleItemClick(item)"
          >
            <q-item-section v-if="item.icon" avatar>
              <q-icon :name="item.icon" />
            </q-item-section>

            <q-item-section v-if="!mini">
              <q-item-label>{{ item.label }}</q-item-label>
              <q-item-label v-if="item.caption" caption>{{ item.caption }}</q-item-label>
            </q-item-section>

            <!-- Badge -->
            <q-item-section v-if="!mini && item.badge" side>
              <q-badge :color="item.badgeColor || 'primary'" :label="item.badge" />
            </q-item-section>

            <!-- Tooltip for mini mode -->
            <q-tooltip v-if="mini && item.label" anchor="center right" self="center left" :offset="[10, 0]">
              {{ item.label }}
            </q-tooltip>
          </q-item>
        </template>
      </q-list>

      <!-- Footer (Toggle Button) -->
      <div v-if="showToggle" class="base-sidebar__footer">
        <slot name="footer">
          <q-item clickable @click="$emit('toggle')" :class="itemClass">
            <q-item-section avatar>
              <q-icon :name="mini ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'" />
            </q-item-section>
            <q-item-section v-if="!mini">
              <q-item-label>{{ toggleLabel }}</q-item-label>
            </q-item-section>
            <q-tooltip v-if="mini" anchor="center right" self="center left" :offset="[10, 0]">
              {{ toggleTooltip }}
            </q-tooltip>
          </q-item>
        </slot>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface SidebarItem {
  id?: string | number
  type?: 'item' | 'separator'
  label?: string
  caption?: string
  icon?: string
  to?: string
  exact?: boolean
  disabled?: boolean
  badge?: string | number
  badgeColor?: string
  onClick?: () => void
}

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  mini: {
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 200
  },
  miniWidth: {
    type: Number,
    default: 64
  },
  breakpoint: {
    type: Number,
    default: 0
  },
  items: {
    type: Array as () => SidebarItem[],
    default: () => []
  },
  bgColor: {
    type: String,
    default: 'white'
  },
  textColor: {
    type: String,
    default: 'grey-8'
  },
  activeColor: {
    type: String,
    default: 'primary'
  },
  logo: {
    type: String,
    default: ''
  },
  logoAlt: {
    type: String,
    default: 'Logo'
  },
  brandName: {
    type: String,
    default: ''
  },
  showToggle: {
    type: Boolean,
    default: true
  },
  toggleLabel: {
    type: String,
    default: 'Comprimir'
  },
  toggleTooltip: {
    type: String,
    default: 'Expandir Menu'
  }
})

const emit = defineEmits(['update:model-value', 'toggle', 'item-click'])

const drawerClass = computed(() => [
  'base-sidebar',
  `bg-${props.bgColor}`,
  `text-${props.textColor}`
])

const listClass = computed(() => [
  'base-sidebar__list'
])

const itemClass = computed(() => [
  'base-sidebar__item'
])

const separatorClass = computed(() => [
  'base-sidebar__separator',
  'q-my-md'
])

const handleItemClick = (item: SidebarItem) => {
  if (item.onClick) {
    item.onClick()
  }
  emit('item-click', item)
}
</script>

<style scoped lang="scss">
.base-sidebar {
  font-family: 'Inter', sans-serif;
  border-right: 1px solid rgba(0, 0, 0, 0.12);

  :deep(.q-scrollarea__content) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}

.base-sidebar__header {
  padding: 20px 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.base-sidebar__logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.base-sidebar__logo-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.base-sidebar__brand {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1976d2;
  font-family: 'Inter', sans-serif;
}

.base-sidebar__list {
  flex: 1;
  padding-top: 16px;
}

.base-sidebar__item {
  border-radius: 8px;
  margin: 4px 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.04);
  }

  :deep(.q-item__section--avatar) {
    min-width: 40px;
  }

  :deep(.q-icon) {
    font-size: 24px;
  }

  :deep(.q-item__label) {
    font-weight: 500;
    font-size: 0.875rem;
  }

  :deep(.q-item__label--caption) {
    font-size: 0.75rem;
    opacity: 0.7;
  }

  &.q-router-link--active {
    background: rgba(25, 118, 210, 0.08);
    color: #1976d2;

    :deep(.q-icon) {
      color: #1976d2;
    }

    :deep(.q-item__label) {
      font-weight: 600;
      color: #1976d2;
    }
  }
}

.base-sidebar__separator {
  opacity: 0.12;
  margin: 16px 12px;
}

.base-sidebar__footer {
  padding: 16px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  margin-top: auto;
}
</style>
