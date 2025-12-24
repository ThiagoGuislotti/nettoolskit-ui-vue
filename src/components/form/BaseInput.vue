<template>
  <q-input
    v-model="internalValue"
    :label="label"
    :type="type"
    :placeholder="placeholder"
    :outlined="outlined"
    :filled="filled"
    :dense="dense"
    :readonly="readonly"
    :disable="disable"
    :rules="rules"
    :lazy-rules="lazyRules"
    :aria-describedby="ariaDescribedBy"
    stack-label
    class="base-input"
    @update:model-value="handleUpdate"
  >
    <template v-if="prependIcon" v-slot:prepend>
      <q-icon :name="prependIcon" />
    </template>
    
    <template v-if="appendIcon" v-slot:append>
      <q-icon :name="appendIcon" />
    </template>

    <template v-if="$slots.prepend" v-slot:prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.append" v-slot:append>
      <slot name="append" />
    </template>

    <template v-if="hint" v-slot:hint>
      {{ hint }}
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { baseFieldPropsDefaults, useBaseField } from '../../composables/forms/useBaseField'

const props = defineProps({
  ...baseFieldPropsDefaults,
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String as () => 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'textarea',
    default: 'text'
  }
})

const emit = defineEmits(['update:modelValue'])

const { internalValue, handleUpdate } = useBaseField(props, emit)
</script>

<style scoped lang="scss">
.base-input {
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
