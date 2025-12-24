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

  :deep(.q-chip) {
    background-color: #1976d2;
    color: white;
    border-radius: 8px;
  }
}
</style>

<style lang="scss">
.q-menu {
  background: #fafafa !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  .q-item {
    font-family: 'Inter', sans-serif;
    color: #424242 !important;
    border-radius: 4px;
    margin: 4px 8px;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f5f5f5 !important;
    }

    &.q-item--active,
    &[aria-selected="true"] {
      background-color: #1976d2 !important;
      color: #ffffff !important;
      
      .q-item__label {
        color: #ffffff !important;
      }
    }
  }

  .q-item__label {
    color: #424242 !important;
  }

  .q-checkbox {
    .q-checkbox__inner {
      color: #1976d2 !important;
    }
  }
}
</style>
