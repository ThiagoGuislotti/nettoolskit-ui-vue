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
    class="base-date-picker"
    @update:model-value="handleUpdate"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date 
            v-model="internalValue" 
            minimal
            today-btn
            color="primary"
            locale="{
              days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
              daysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
              months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
              monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
            }"
            @update:model-value="handleUpdate"
          >
            <div class="row items-center justify-end q-gutter-xs">
              <q-btn label="Hoje" flat color="primary" @click="setToday" />
              <q-btn v-close-popup label="Fechar" flat color="primary" />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
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
  placeholder: {
    type: String,
    default: 'DD/MM/YYYY'
  }
})

const emit = defineEmits(['update:modelValue'])

const { internalValue, handleUpdate } = useBaseField(props, emit)

const setToday = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  const dateString = `${year}/${month}/${day}`
  
  internalValue.value = dateString
  handleUpdate(dateString)
}
</script>

<style scoped lang="scss">
.base-date-picker {
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
.q-date {
  font-family: 'Inter', sans-serif;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  background: #fafafa !important;

  .q-date__header {
    background-color: #1976d2 !important;
    color: #ffffff !important;
  }

  .q-date__view {
    background: #fafafa !important;
  }

  .q-date__calendar {
    background: #fafafa !important;
    
    .q-btn {
      color: #424242 !important;
      
      &.q-btn--flat {
        color: #424242 !important;
      }
    }
  }

  .q-date__calendar-item .q-btn {
    color: #424242 !important;
    
    &:hover {
      background-color: #f5f5f5 !important;
    }
    
    &.q-btn--unelevated {
      background-color: #1976d2 !important;
      color: #ffffff !important;
    }
  }

  .q-btn--flat {
    color: #1976d2 !important;
  }
}
</style>
