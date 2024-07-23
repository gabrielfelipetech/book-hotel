<template>
  <div class="card">
    <div class="card-content">
      <BImage
        class="h-min"
        :image-props="{
          src: cardHotel.image,
          alt: cardHotel.name,
        }"
      />
      <h2>Nome: {{ cardHotel.name }}</h2>
      <p>Localização: {{ cardHotel.location }}</p>
      <p v-if="isCurrentRouteHotelReservation">
        Descrição: {{ cardHotel.descriptionType }}
      </p>
      <p>Preço: {{ cardHotel.price }}</p>
      <p>Nota: {{ cardHotel.rating }}</p>
      <p>Quartos: {{ cardHotel.rooms }}</p>
      <p>Pessoas: {{ cardHotel.accommodates }}</p>
      <p>Check-in: {{ cardHotel.availableCheckIn }}</p>
      <p>check-out: {{ cardHotel.availableCheckOut }}</p>
      <label v-if="isSelectable">
        <input v-model="selected" type="checkbox" @change="emitSelection" />
        Comparar
      </label>
      <BButton
        v-if="!isCurrentRouteHotelReservation"
        :button-text="buttonLabel"
        color="primary"
        height="10"
        width="full"
        @click="goToHotelReserveOrDetails"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineProps,
  defineEmits,
  ref,
  defineAsyncComponent,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Hotel } from '@/stores/hotel/types';
import useHotelStore from '@/stores/hotel';
import BImage from '../baseComponents/BImage.vue';

const BButton = defineAsyncComponent(
  () => import('../baseComponents/BButton.vue'),
);
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
  @apply bg-white;
  .card-content {
    @apply flex flex-col gap-2 p-2 shadow-xl rounded-lg;
  }
}
</style>
