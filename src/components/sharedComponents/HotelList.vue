<template>
  <div class="container-list-hotel">
    <div class="list-hotel">
      <h1>{{ title }}</h1>
      <BSelect
        class="self-end"
        :options="options"
        @update:selected="handleSelectionFilter"
      />
      <p v-if="loading">Carregando...</p>
      <div v-else class="w-full">
        <BButton
          v-if="cardHotelsSelectedForCompare.length"
          button-text="Comparar"
          color="primary"
          @click="compareHotels"
        />
        <CardListHotel
          class="mt-4"
          :is-comparable="isComparable"
          :card-hotels="cardHotels"
          @emitCardHotelsSelectedForCompare="receiveCardHotelsSelected($event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import useHotelStore from '@/stores/hotel';
import BButton from '@/components/baseComponents/BButton.vue';
import { useRoute } from 'vue-router';
import { Hotel } from '@/stores/hotel/types';
import BSelect from '@/components/baseComponents/BSelect.vue';
import CardListHotel from './CardListHotel.vue';

const route = useRoute();
const options = computed(() => [
  { name: 'Mais barato', value: 'cheapest' },
  { name: 'Menos relevante', value: 'least_relevant' },
  { name: 'Menos quartos', value: 'least_rooms' },
]);

defineProps({
  title: { type: String, default: 'Lista de Hotéis' },
  isComparable: { type: Boolean, default: false, required: true },
  hotelsType: {
    type: String,
    required: true,
    validator: (value: string) =>
      ['total', 'reserved', 'compared'].includes(value),
  },
});

const hotelStore = useHotelStore();
const cardHotels = ref<Hotel[]>([]);
const cardHotelsSelectedForCompare = ref<Hotel[]>([]);
const { loading, allRefinedHotels } = storeToRefs(hotelStore);
const compareHotels = () => {
  cardHotels.value = [...cardHotelsSelectedForCompare.value];
};
const receiveCardHotelsSelected = (valueEmitted: any) => {
  cardHotelsSelectedForCompare.value =
    valueEmitted.cardHotelsSelectedForCompare;
  if (!valueEmitted.cardHotelsSelectedForCompare.length) {
    cardHotels.value = allRefinedHotels.value;
  }
};
const handleSelectionFilter = (value: string) => {
  const isReservedContext = route.name === 'ReservedHotels';
  hotelStore.filterHotels(value, isReservedContext);
};
watch(
  () => allRefinedHotels.value,
  (newRefinedHotels) => {
    cardHotels.value = newRefinedHotels;
  },
);
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
