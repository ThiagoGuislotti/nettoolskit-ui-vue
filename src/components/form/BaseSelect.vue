<template>
  <q-select
    v-model="internalValue"
    :options="options"
    :label="label"
    :placeholder="placeholder"
    :outlined="outlined"
    :filled="filled"
    :dense="dense"
    :readonly="readonly"
    :disable="disable"
    :multiple="multiple"
    :use-chips="useChips"
    :emit-value="emitValue"
    :map-options="mapOptions"
    :rules="rules"
    :lazy-rules="lazyRules"
    stack-label
    class="base-select"
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

    <!-- Select all / Deselect all actions for multiple select -->
    <template v-if="multiple" v-slot:before-options>
      <q-item>
        <q-item-section>
          <div class="row q-gutter-sm q-px-sm">
            <q-btn 
              label="Marcar todos" 
              size="sm" 
              flat 
              dense
              color="primary"
              @click="selectAll"
            />
            <q-btn 
              label="Desmarcar todos" 
              size="sm" 
              flat 
              dense
              color="grey-7"
              @click="deselectAll"
            />
          </div>
        </q-item-section>
      </q-item>
      <q-separator />
    </template>

    <!-- Show checkmark on selected options -->
    <template v-if="multiple" v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section side>
          <q-checkbox 
            :model-value="scope.selected" 
            dense
            color="primary"
            @update:model-value="scope.toggleOption(scope.opt)"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label || scope.opt }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { baseFieldPropsDefaults, useBaseField } from '../../composables/forms/useBaseField'

const props = defineProps({
  ...baseFieldPropsDefaults,
  modelValue: {
    type: [String, Number, Array, Object, null],
    default: null
  },
  options: {
    type: Array,
    required: true
  },
  multiple: {
    type: Boolean,
    default: false
  },
  useChips: {
    type: Boolean,
    default: false
  },
  emitValue: {
    type: Boolean,
    default: true
  },
  mapOptions: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue'])

const { internalValue, handleUpdate } = useBaseField(props, emit)

const selectAll = () => {
  if (props.multiple && props.emitValue) {
    const allValues = props.options.map((opt: any) => opt.value || opt)
    internalValue.value = allValues
    handleUpdate(allValues)
  } else if (props.multiple) {
    internalValue.value = [...props.options]
    handleUpdate([...props.options])
  }
}

const deselectAll = () => {
  if (props.multiple) {
    internalValue.value = []
    handleUpdate([])
  }
}
</script>

<style scoped lang="scss">
.base-select {
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

  :deep(.q-chip) {
    background-color: var(--ntk-primary);
    color: var(--ntk-text-inverse);
    border-radius: var(--ntk-radius-md);
  }
}
</style>

<style lang="scss">
.q-menu {
  background: var(--ntk-menu-bg) !important;
  box-shadow: var(--ntk-shadow-popup);
  border-radius: var(--ntk-radius-md);

  .q-item {
    font-family: var(--ntk-font-family);
    color: var(--ntk-text-dark) !important;
    border-radius: var(--ntk-radius-sm);
    margin: 4px 8px;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--ntk-menu-item-hover) !important;
    }

    &.q-item--active,
    &[aria-selected="true"] {
      background-color: var(--ntk-menu-item-active-bg) !important;
      color: var(--ntk-menu-item-active-text) !important;
      
      .q-item__label {
        color: var(--ntk-menu-item-active-text) !important;
      }
    }
  }

  .q-item__label {
    color: var(--ntk-text-dark) !important;
  }

  .q-checkbox {
    .q-checkbox__inner {
      color: var(--ntk-primary) !important;
    }
  }
}
</style>
