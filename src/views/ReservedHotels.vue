<template>
  <div class="w-full h-full bg-slate-50">
    <div>
      <HotelList
        class="py-10"
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
