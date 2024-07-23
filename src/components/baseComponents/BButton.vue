<template>
  <button v-bind="$attrs" @click="handleClick" :class="buttonClasses">
    {{ buttonText }}
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary'].includes(value),
  },
});

const emit = defineEmits(['click']);

const handleClick = (event: Event) => {
  emit('click', event);
};

const buttonClasses = computed(() =>
  props.color === 'primary'
    ? 'bg-green-500 text-white'
    : 'bg-blue-500 text-white',
);
</script>
