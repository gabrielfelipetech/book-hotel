<template>
  <ul class="hotels">
    <li v-for="cardHotel in cardHotels" :key="cardHotel.id">
      <CardHotel
        :is-selectable="isComparable"
        :card-hotel="cardHotel"
        @select="setCardsSelecteds($event)"
      />
    </li>
  </ul>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import type { Hotel } from '@/stores/hotel/types';
import CardHotel from './CardHotel.vue';

const emit = defineEmits(['emitCardHotelsSelectedForCompare']);

defineProps<{
  cardHotels: Hotel[];
  isComparable: boolean;
}>();
const cardHotelsSelectedForCompare = ref<Hotel[]>([]);

const setCardsSelecteds = (event: any) => {
  const isCardAlreadySelected = cardHotelsSelectedForCompare.value.filter(
    (cardHotel: Hotel) => cardHotel.id === event.cardHotel.id,
  );
  if (event.selected && !isCardAlreadySelected.length) {
    cardHotelsSelectedForCompare.value.push(event.cardHotel);
  } else if (!event.selected) {
    cardHotelsSelectedForCompare.value = [
      ...cardHotelsSelectedForCompare.value.filter(
        (cardHotel: Hotel) => cardHotel.id !== event.cardHotel.id,
      ),
    ];
  }
  emit('emitCardHotelsSelectedForCompare', {
    cardHotelsSelectedForCompare: cardHotelsSelectedForCompare.value,
  });
};
</script>
