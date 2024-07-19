<template>
  <div class="card">
    <BImage
      :imageProps="{ src: cardHotel.image, alt: cardHotel.name, style: 'h-24' }"
    />
    <div class="card-content">
      <h2>Nome: {{ cardHotel.name }}</h2>
      <p>Localização: {{ cardHotel.location }}</p>
      <p>Descrição: {{ cardHotel.descriptionType }}</p>
      <p>Preço: {{ cardHotel.price }}</p>
      <p>Nota: {{ cardHotel.rating }}</p>
      <button>{{ buttonLabel }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import BImage from '../baseComponents/BImage.vue';

type CardHotelProps = {
  id: number;
  name: string;
  location: string;
  reserved: boolean;
  price: number;
  rating: number;
  image: string;
  accommodates: number;
  type: string;
  descriptionType: string;
  rooms: number;
  availableCheckIn: string;
  availableCheckOut: string;
};

const props = defineProps<{ cardHotel: CardHotelProps }>();
const buttonLabel = computed(() =>
  props.cardHotel.reserved ? 'Ver detalhes' : 'Reservar',
);
</script>

<style scoped></style>
