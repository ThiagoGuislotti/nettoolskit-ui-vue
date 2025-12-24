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
    :rows="rows"
    :rules="rules"
    :lazy-rules="lazyRules"
    type="textarea"
    stack-label
    class="base-textarea"
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
  </q-input>
</template>

<script setup lang="ts">
import { baseFieldPropsDefaults, useBaseField } from '../../composables/forms/useBaseField'

const props = defineProps({
  ...baseFieldPropsDefaults,
  modelValue: {
    type: String,
    default: ''
  },
  rows: {
    type: [Number, String],
    default: 3
  }
})

const emit = defineEmits(['update:modelValue'])

const { internalValue, handleUpdate } = useBaseField(props, emit)
</script>

<style scoped lang="scss">
.base-textarea {
  font-family: 'Inter', sans-serif;

  :deep(.q-field__control) {
    border-radius: 12px;
    border: 2px solid #f0f0f0;
    background: #ffffff;
    transition: all 0.3s ease;

    &:hover {
      border-color: #1976d2;
    }
  }

  :deep(.q-field--outlined.q-field--focused .q-field__control) {
    border-color: #1976d2;
    box-shadow: 0 4px 8px rgba(25, 118, 210, 0.2);
  }

  :deep(.q-field__label) {
    color: #757575;
    font-weight: 500;
  }

  :deep(.q-field__native) {
    color: #424242;
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
  }

  :deep(.q-icon) {
    color: #757575;
  }
}
</style>
