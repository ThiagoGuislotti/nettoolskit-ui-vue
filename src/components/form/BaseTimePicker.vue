<template>
  <q-input
    v-model="internalValue"
    :label="label"
    :placeholder="placeholder"
    :outlined="outlined"
    :filled="filled"
    :dense="dense"
    :readonly="readonly"
    :disable="disable"
    :rules="rules"
    :lazy-rules="lazyRules"
    stack-label
    class="base-time-picker"
    @update:model-value="handleUpdate"
  >
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time 
            v-model="internalValue" 
            mask="HH:mm"
            color="primary"
            :format24h="timeFormat24h"
            @update:model-value="handleUpdate"
          >
            <div class="row items-center justify-between q-px-sm">
              <q-btn 
                :label="timeFormat24h ? '12h' : '24h'" 
                color="primary" 
                flat 
                dense
                @click="timeFormat24h = !timeFormat24h" 
              />
              <div class="row items-center q-gutter-sm">
                <q-btn label="Agora" color="primary" flat @click="setNowTime" />
                <q-btn v-close-popup label="OK" color="primary" flat />
              </div>
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { baseFieldPropsDefaults, useBaseField } from '../../composables/forms/useBaseField'

const props = defineProps({
  ...baseFieldPropsDefaults,
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'HH:mm'
  }
})

const emit = defineEmits(['update:modelValue'])

const { internalValue, handleUpdate } = useBaseField(props, emit)
const timeFormat24h = ref(true)

const setNowTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  internalValue.value = `${hours}:${minutes}`
  emit('update:modelValue', internalValue.value)
}
</script>

<style scoped lang="scss">
.base-time-picker {
  font-family: 'Inter', sans-serif;

  :deep(.q-field__control) {
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.24);
    background: #ffffff;
    transition: all 0.3s ease;

    &:hover {
      border-color: rgba(0, 0, 0, 0.87);
    }
  }

  :deep(.q-field--outlined.q-field--focused .q-field__control) {
    border-color: #1976d2;
    box-shadow: none;
  }

  :deep(.q-field__label) {
    color: #757575;
    font-weight: 500;
  }

  :deep(.q-field__native) {
    color: #424242;
    font-family: 'Inter', sans-serif;
  }

  :deep(.q-icon) {
    color: #757575;
  }
}
</style>

<style lang="scss">
.q-time {
  font-family: 'Inter', sans-serif;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  background: #fafafa !important;

  .q-time__header {
    background-color: #1976d2 !important;
    color: #ffffff !important;
  }

  .q-time__content {
    background: #fafafa !important;
  }

  .q-time__clock {
    background: #fafafa !important;
    
    .q-time__clock-position {
      background: #fafafa !important;
      color: #424242 !important;
      
      &--active {
        background: #1976d2 !important;
        color: #ffffff !important;
      }
    }
  }

  .q-time__clock-pointer {
    background-color: #1976d2 !important;
    
    &::before,
    &::after {
      background-color: #1976d2 !important;
    }
  }

  .q-btn--flat {
    color: #1976d2 !important;
  }
}
</style>
