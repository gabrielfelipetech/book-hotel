<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <div class="w-full flex flex-col py-2 bg-slate-50">
    <h1 class="mx-auto text-xl">
      {{ isReservation ? 'Reservar' : 'Detalhes do Hotel' }}
    </h1>
    <div class="flex flex-row gap-4 my-4">
      <CardHotel :card-hotel="hotel" :is-selectable="false" class="w-2/4" />
      <form
        v-if="isReservation"
        class="flex gap-2 flex-col p-2 shadow-xl rounded-lg h-min bg-white w-2/4"
        @submit.prevent="submitReservation"
      >
        <BInput
          v-model="reservationValues.name"
          type="text"
          :show-label="true"
          label-text="Nome"
          class="w-full"
        />
        <BInput
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
        <div
          v-if="reservationValues.paymentMethod === 'credit_card'"
          class="flex flex-col gap-4"
        >
          <div class="flex flex-row gap-2">
            <BInput
              v-model="reservationValues.cvv"
              type="number"
              :show-label="true"
              label-text="Numero do cartão"
              class="w-full"
            />

            <BInput
              v-model="reservationValues.validDateCreditCard"
              type="number"
              :show-label="true"
              label-text="Data de validade"
              class="w-full"
            />
          </div>
          <BInput
            v-model="reservationValues.creditCardNumber"
            type="number"
            :show-label="true"
            label-text="Numero do cartão"
            class="w-full"
          />
        </div>

        <BButton
          button-text="Reservar"
          color="primary"
          height="10"
          @click.prevent="submitReservation"
        />
      </form>
    </div>
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

type ReservationValues = {
  name: string;
  phone: number;
  paymentMethod: string;
  creditCardNumber?: number;
  validDateCreditCard?: number;
  cvv?: number;
};
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
const reservationValues = ref<ReservationValues>({
  name: '',
  phone: 0,
  paymentMethod: '',
  creditCardNumber: undefined,
  validDateCreditCard: undefined,
  cvv: undefined,
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
