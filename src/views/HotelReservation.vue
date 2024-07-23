<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div>
    <h1>{{ isReservation ? 'Reservar' : 'Detalhes do Hotel' }}</h1>
    <CardHotel :card-hotel="hotel" :isSelectable="false" />
    <form
      v-if="isReservation"
      @submit.prevent="submitReservation"
      class="w-full flex flex-col"
    >
      <BInput
        v-model="reservationValues.name"
        type="text"
        :show-label="true"
        label-text="Nome"
        class="w-full"
      /><BInput
        v-model="reservationValues.phone"
        type="number"
        :show-label="true"
        label-text="Telefone"
        class="w-full"
        placeholder="15987498749"
      />
      <BSelect
        class="w-full"
        :options="options"
        disabled-option="Método de pagamento"
        @update:selected="handleSelectPaymentMethod"
      />
      <BButton
        button-text="Reservar"
        color="primary"
        @click.prevent="submitReservation"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import CardHotel from '@/components/sharedComponents/CardHotel.vue';
import useHotelStore from '@/stores/hotel';
import { Hotel } from '@/stores/hotel/types';
import BInput from '@/components/baseComponents/BInput.vue';
import BSelect from '@/components/baseComponents/BSelect.vue';
import BButton from '@/components/baseComponents/BButton.vue';
import { useRouter } from 'vue-router';

const hotel = ref<Hotel>({
  id: 0,
  name: '',
  location: '',
  reserved: false,
  price: 0,
  rating: 0,
  image: '',
  accommodates: 0,
  type: '',
  descriptionType: '',
  rooms: 0,
  availableCheckIn: '',
  availableCheckOut: '',
});

const hotelStore = useHotelStore();
const router = useRouter();
const isReservation = computed(() => !hotel.value.reserved);
const options = computed(() => [
  { name: 'Cartão de crédito', value: 'credit_card' },
  { name: 'Boleto', value: 'billet' },
  { name: 'PIX', value: 'PIX' },
]);
const reservationValues = ref({
  name: '',
  phone: '',
  paymentMethod: '',
});

const submitReservation = () => {
  hotelStore.reserveHotel(hotel.value.id).finally(() => {
    router.push({ name: 'Home' });
  });
};
const receiveSelectedHotel = () => {
  const { selectedHotel } = hotelStore;
  hotel.value = { ...selectedHotel };
};
const handleSelectPaymentMethod = (value: string) => {
  reservationValues.value.paymentMethod = value;
};
onMounted(() => {
  receiveSelectedHotel();
});
</script>
