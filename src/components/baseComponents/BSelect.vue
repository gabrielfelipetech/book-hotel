<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <select v-model="selectedOption" @change="emitSelection">
    <option disabled value="">{{ disabledOption }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

defineProps({
  disabledOption: { type: String, default: 'Filtrar' },
  options: {
    type: Array as () => { name: string; value: any }[],
    required: true,
  },
});

const emit = defineEmits(['update:selected']);

const selectedOption = ref('');
const emitSelection = () => {
  emit('update:selected', selectedOption.value);
};
</script>
