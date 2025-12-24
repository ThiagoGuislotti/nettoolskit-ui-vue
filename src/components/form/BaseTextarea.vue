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
  font-family: var(--ntk-font-family);

  :deep(.q-field__control) {
    border-radius: var(--ntk-radius-lg);
    border: 2px solid var(--ntk-border-light);
    background: var(--ntk-input-bg);
    transition: all var(--ntk-transition-base);

    &:hover {
      border-color: var(--ntk-input-border-focus);
    }
  }

  :deep(.q-field--outlined.q-field--focused .q-field__control) {
    border-color: var(--ntk-input-border-focus);
    box-shadow: var(--ntk-shadow-focus);
  }

  :deep(.q-field__label) {
    color: var(--ntk-input-label);
    font-weight: var(--ntk-font-weight-medium);
  }

  :deep(.q-field__native) {
    color: var(--ntk-input-text);
    font-family: var(--ntk-font-family);
    line-height: 1.6;
  }

  :deep(.q-icon) {
    color: var(--ntk-input-icon);
  }
}
</style>
