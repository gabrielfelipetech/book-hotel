<template>
  <div class="w-full h-full">
    <div>
      <HotelList
        title="Hotéis reservados"
        hotels-type="reserved"
        :is-comparable="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import HotelList from '@/components/sharedComponents/HotelList.vue';
import useHotelStore from '@/stores/hotel';
import { onMounted } from 'vue';

const hotelStore = useHotelStore();

onMounted(() => {
  hotelStore.getReservedHotels();
});
</script>
