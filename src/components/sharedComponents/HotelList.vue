<template>
  <div class="container-list-hotel">
    <div class="list-hotel">
      <h1>{{ title }}</h1>
      <GeneralFilter class="self-end" />
      <ul v-if="!loading" class="hotels">
        <li v-for="cardHotel in hotels" :key="cardHotel.id">
          <CardHotel :card-hotel="cardHotel" />
        </li>
      </ul>
      <div v-if="loading">Carregando...</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, onMounted } from 'vue';
import useHotelStore from '@/stores/hotel';
import { storeToRefs } from 'pinia';
import CardHotel from './CardHotel.vue';
import GeneralFilter from './GeneralFilter.vue';

defineProps({
  title: { type: String, default: 'Lista de Hotéis' },
});

const hotelStore = useHotelStore();
const { hotels, loading } = storeToRefs(hotelStore);

onMounted(() => {
  hotelStore.getHotels();
});
</script>

<style scoped lang="scss">
.container-list-hotel {
  @apply flex flex-col justify-center w-full;
  .list-hotel {
    @apply flex flex-col justify-center items-center w-4/5 mx-auto pt-4;
  }
  .hotels {
    @apply grid grid-cols-3 gap-4 w-full;
  }
}
</style>
