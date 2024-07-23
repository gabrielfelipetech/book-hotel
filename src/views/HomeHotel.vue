<template>
  <div class="w-full h-full flex flex-col">
    <HeaderHotel />
    <HotelList hotels-type="total" :is-comparable="true" />
  </div>
</template>

<script setup lang="ts">
import HeaderHotel from '@/components/sharedComponents/HeaderHotel.vue';
import HotelList from '@/components/sharedComponents/HotelList.vue';
import useHotelStore from '@/stores/hotel';
import { onMounted } from 'vue';

const hotelStore = useHotelStore();
onMounted(() => {
  hotelStore.getHotels();
});
</script>
