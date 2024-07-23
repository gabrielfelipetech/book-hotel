<template>
  <form
    ref="formSearchHotelsRef"
    class="h-auto w-full mx-auto"
    @submit.prevent="searchHotels"
  >
    <div class="w-3/4 mx-auto rounded-lg">
      <BInput
        v-model="searchOptions.searchQuery"
        type="text"
        placeholder="Pesquise por localização"
        class="bg-slate-200 w-full h-10 rounded-lg pl-2"
        :show-label="false"
        label-text="pesquisar por localização"
        @click="showOptions"
      />
      <BButton
        button-text="Pesquisar"
        type="submit"
        color="primary"
        class="hidden"
      />

      <div
        v-if="isShowingOptions"
        class="bg-white flex w-full mt-2 flex-col lg:flex-row"
      >
        <BInput
          v-model="searchOptions.checkInDate"
          type="date"
          :show-label="true"
          label-text="Check-in"
          class="w-full"
        />

        <BInput
          v-model="searchOptions.checkOutDate"
          type="date"
          :show-label="true"
          label-text="Check-out"
          class="w-full"
        />
        <BInput
          v-model="searchOptions.rooms"
          type="number"
          :show-label="true"
          label-text="Quartos"
          placeholder="Numero de quartos"
          class="w-full"
        />
        <BInput
          v-model="searchOptions.accommodates"
          type="number"
          :show-label="true"
          label-text="Hospedes"
          placeholder="Numero de hospedes"
          class="w-full"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted } from 'vue';
import BButton from '@/components/baseComponents/BButton.vue';
import BInput from '@/components/baseComponents/BInput.vue';
import useHotelStore from '@/stores/hotel';

type SearchOptions = {
  searchQuery: string;
  checkInDate: string;
  checkOutDate: string;
  rooms: number;
  accommodates: number;
};

const searchOptions: Ref<SearchOptions> = ref({
  searchQuery: '',
  checkInDate: '',
  checkOutDate: '',
  rooms: 0,
  accommodates: 0,
});

const isShowingOptions = ref(false);
const formSearchHotelsRef = ref<HTMLFormElement | null>(null);

const showOptions = () => {
  isShowingOptions.value = true;
};
const hotelStore = useHotelStore();
const searchHotels = () => {
  hotelStore.searchHotels(searchOptions.value);
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    formSearchHotelsRef.value &&
    !formSearchHotelsRef.value.contains(event.target as Node)
  ) {
    isShowingOptions.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
