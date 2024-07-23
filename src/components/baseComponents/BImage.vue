<template>
  <img :src="imageProps.src" :alt="imageProps.alt" :class="imageProps.style">
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';

type imageProps = {
  src: string;
  alt: string;
  style?: string;
};
defineProps<{ imageProps: imageProps }>();
</script>
