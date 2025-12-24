<template>
  <q-header :elevated="elevated" :class="headerClass">
    <q-toolbar :style="{ height: `${height}px` }">
      <!-- Left Section: Hamburger Menu -->
      <div v-if="showMenuButton" class="base-header__menu-container">
        <q-btn
          flat
          dense
          round
          :icon="menuIcon"
          @click="$emit('toggle-menu')"
          :aria-label="menuAriaLabel"
          color="grey-8"
        >
          <q-tooltip>{{ menuTooltip }}</q-tooltip>
        </q-btn>
      </div>

      <!-- Left Section: Title/Breadcrumb -->
      <q-toolbar-title v-if="title || $slots.title" class="base-header__title">
        <slot name="title">
          <div v-if="breadcrumbs.length > 0" class="base-header__breadcrumb">
            <span
              v-for="(crumb, index) in breadcrumbs"
              :key="index"
              class="base-header__breadcrumb-item"
            >
              <span :class="{ 'base-header__breadcrumb-app': index === 0 }">{{ crumb }}</span>
              <q-icon
                v-if="index < breadcrumbs.length - 1"
                name="chevron_right"
                size="20px"
                class="base-header__breadcrumb-separator"
              />
            </span>
          </div>
          <span v-else class="base-header__title-text">{{ title }}</span>
        </slot>
      </q-toolbar-title>

      <q-space />

      <!-- Center Section: Search (optional) -->
      <div v-if="showSearch && !isMobile" class="base-header__search">
        <q-input
          dense
          borderless
          :model-value="searchValue"
          :placeholder="searchPlaceholder"
          @update:model-value="$emit('update:search-value', $event)"
          class="base-header__search-input"
        >
          <template v-slot:prepend>
            <q-icon name="search" color="grey-7" />
          </template>
        </q-input>
      </div>

      <!-- Right Section: Actions -->
      <div class="base-header__actions">
        <slot name="actions">
          <!-- Default actions: Notifications + User Avatar -->
          <q-btn
            v-if="showNotifications"
            round
            dense
            flat
            icon="notifications"
            color="grey-8"
            @click="$emit('notifications-click')"
          >
            <q-badge
              v-if="notificationCount > 0"
              :label="notificationCount"
              color="red"
              text-color="white"
              floating
            />
            <q-tooltip>Notificações</q-tooltip>
          </q-btn>

          <q-btn
            v-if="showUserAvatar"
            round
            flat
            color="grey-8"
            @click="$emit('user-click')"
          >
            <q-avatar size="26px">
              <img v-if="userAvatar" :src="userAvatar" alt="User Avatar" />
              <q-icon v-else name="account_circle" size="26px" />
            </q-avatar>
            <q-tooltip>{{ userTooltip }}</q-tooltip>
          </q-btn>
        </slot>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuasar } from 'quasar'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  breadcrumbs: {
    type: Array as () => string[],
    default: () => []
  },
  elevated: {
    type: Boolean,
    default: true
  },
  height: {
    type: Number,
    default: 64
  },
  bgColor: {
    type: String,
    default: 'white'
  },
  textColor: {
    type: String,
    default: 'grey-8'
  },
  showMenuButton: {
    type: Boolean,
    default: true
  },
  menuIcon: {
    type: String,
    default: 'menu'
  },
  menuAriaLabel: {
    type: String,
    default: 'Toggle Menu'
  },
  menuTooltip: {
    type: String,
    default: 'Menu'
  },
  showSearch: {
    type: Boolean,
    default: false
  },
  searchValue: {
    type: String,
    default: ''
  },
  searchPlaceholder: {
    type: String,
    default: 'Search'
  },
  showNotifications: {
    type: Boolean,
    default: true
  },
  notificationCount: {
    type: Number,
    default: 0
  },
  showUserAvatar: {
    type: Boolean,
    default: true
  },
  userAvatar: {
    type: String,
    default: ''
  },
  userTooltip: {
    type: String,
    default: 'Conta'
  }
})

defineEmits([
  'toggle-menu',
  'update:search-value',
  'notifications-click',
  'user-click'
])

const $q = useQuasar()
const isMobile = computed(() => !$q.screen.gt.xs)

const headerClass = computed(() => [
  'base-header',
  `bg-${props.bgColor}`,
  `text-${props.textColor}`
])
</script>

<style scoped lang="scss">
.base-header {
  font-family: 'Inter', sans-serif;

  :deep(.q-toolbar) {
    padding: 0 16px;
    gap: 16px;
  }
}

.base-header__menu-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
}

.base-header__title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.125rem;
  flex-shrink: 0;
}

.base-header__title-text {
  font-weight: 600;
}

.base-header__breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
}

.base-header__breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.base-header__breadcrumb-app {
  font-weight: 600;
}

.base-header__breadcrumb-separator {
  color: rgba(0, 0, 0, 0.38);
}

.base-header__search {
  max-width: 400px;
  flex: 1;
}

.base-header__search-input {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 4px 12px;

  :deep(.q-field__control) {
    height: 40px;
  }

  :deep(.q-field__native) {
    font-family: 'Inter', sans-serif;
  }
}

.base-header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
