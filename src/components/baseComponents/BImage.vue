<template>
  <img :src="imageProps.src" :alt="imageProps.alt" :class="imageProps.style" />
</template>
<script lang="ts" setup>
type imageProps = {
  src: string;
  alt: string;
  style?: string;
};

const props = defineProps<{ imageProps: imageProps }>();
</script>
