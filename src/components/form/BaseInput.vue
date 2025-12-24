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
  font-family: var(--ntk-font-family);

  :deep(.q-field__control) {
    border-radius: var(--ntk-radius-md);
    border: 1px solid var(--ntk-input-border);
    background: var(--ntk-input-bg);
    transition: all var(--ntk-transition-base);

    &:hover {
      border-color: var(--ntk-input-border-hover);
    }
  }

  :deep(.q-field--outlined.q-field--focused .q-field__control) {
    border-color: var(--ntk-input-border-focus);
    box-shadow: none;
  }

  :deep(.q-field__label) {
    color: var(--ntk-input-label);
    font-weight: var(--ntk-font-weight-medium);
  }

  :deep(.q-field__native) {
    color: var(--ntk-input-text);
    font-family: var(--ntk-font-family);
  }

  :deep(.q-icon) {
    color: var(--ntk-input-icon);
  }
}
</style>
