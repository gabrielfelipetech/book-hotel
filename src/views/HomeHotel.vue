<template>
  <div v-if="tete">
    <h1 class="bg-blue-500">Home Hotel</h1>
    <BInput />
  </div>
</template>

<script setup lang="ts">
import BInput from '@/components/baseComponents/BInput.vue';

const tete = true;
</script>
