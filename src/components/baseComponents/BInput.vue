<template>
  <div>
    <label
      :for="labelText"
      :style="{ display: showLabel ? 'block' : 'none' }"
      >{{ labelText }}</label
    >
    <input
      :id="labelText"
      v-model="inputValue"
      v-bind="$attrs"
      @input="emitValue"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  showLabel: {
    type: Boolean,
    required: true,
  },
  labelText: {
    type: String,
    required: true,
  },
});

const inputValue = ref('');

const emit = defineEmits(['update:modelValue']);

const emitValue = () => {
  emit('update:modelValue', inputValue.value);
};
</script>
