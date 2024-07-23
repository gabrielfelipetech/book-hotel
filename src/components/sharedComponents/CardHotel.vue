<template>
  <div class="card">
    <div class="card-content">
      <BImage
        :imageProps="{
          src: cardHotel.image,
          alt: cardHotel.name,
          style: 'h-24',
        }"
      />
      <h2>Nome: {{ cardHotel.name }}</h2>
      <p>Localização: {{ cardHotel.location }}</p>
      <p>Descrição: {{ cardHotel.descriptionType }}</p>
      <p>Preço: {{ cardHotel.price }}</p>
      <p>Nota: {{ cardHotel.rating }}</p>
      <p>Quartos: {{ cardHotel.rooms }}</p>
      <p>Pessoas: {{ cardHotel.accommodates }}</p>
      <label v-if="isSelectable">
        <input type="checkbox" v-model="selected" @change="emitSelection" />
        Comparar
      </label>
      <BButton
        v-if="!isCurrentRouteHotelReservation"
        :button-text="buttonLabel"
        color="primary"
        @click="goToHotelReserveOrDetails"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Hotel } from '@/stores/hotel/types';
import useHotelStore from '@/stores/hotel';
import BImage from '../baseComponents/BImage.vue';
import BButton from '../baseComponents/BButton.vue';

const props = defineProps<{
  cardHotel: Hotel;
  isSelectable: boolean;
}>();
const emit = defineEmits(['select']);
const hotelStore = useHotelStore();
const selected = ref(false);

const buttonLabel = computed(() =>
  props.cardHotel.reserved ? 'Ver detalhes' : 'Reservar',
);
const router = useRouter();

const goToHotelReserveOrDetails = () => {
  hotelStore.selectHotel(props.cardHotel);
  router.push({
    name: 'HotelReservation',
    params: {
      id: props.cardHotel.id,
    },
  });
};
const route = useRoute();
const isCurrentRouteHotelReservation = computed(
  () => route.name === 'HotelReservation',
);
const emitSelection = () => {
  emit('select', { cardHotel: props.cardHotel, selected: selected.value });
};
</script>

<style scoped lang="scss">
.card {
  .card-content {
    @apply flex flex-col gap-2 px-2;
  }
}
</style>
