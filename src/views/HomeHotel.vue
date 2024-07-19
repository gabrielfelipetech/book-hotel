<template>
  <div class="w-full h-full flex flex-col">
    <HeaderHotel />
    <HotelList />
  </div>
</template>

<script setup lang="ts">
import HeaderHotel from '@/components/sharedComponents/HeaderHotel.vue';
import HotelList from '@/components/sharedComponents/HotelList.vue';
</script>
