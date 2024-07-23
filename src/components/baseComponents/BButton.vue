<template>
  <button
    v-bind="$attrs"
    :class="[buttonColor, buttonHeightClass, buttonWidthClass]"
    @click="handleClick"
  >
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
  height: {
    type: String,
    default: 'auto',
    validator: (value: string) =>
      [
        'auto',
        'full',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
      ].includes(value),
  },
  width: {
    type: String,
    default: 'auto',
    validator: (value: string) =>
      [
        'auto',
        'full',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
      ].includes(value),
  },
});

const emit = defineEmits(['click']);

const handleClick = (event: Event) => {
  emit('click', event);
};

const buttonColor = computed(
  () =>
    (props.color === 'primary' && 'bg-green-500 text-white') ||
    (props.color === 'secondary' && 'bg-blue-500 text-white'),
);

const buttonHeightClass = computed(
  () =>
    (props.height === 'auto' && 'h-auto') ||
    (props.height === 'full' && 'h-full') ||
    (props.height && `h-${props.height}`),
);

const buttonWidthClass = computed(
  () =>
    (props.width === 'auto' && 'w-auto') ||
    (props.width === 'full' && 'w-full') ||
    (props.width && `w-${props.width}`),
);
</script>
