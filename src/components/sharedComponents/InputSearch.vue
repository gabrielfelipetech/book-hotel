<template>
  <form
    ref="formSearchHotelsRef"
    class="h-auto w-full mx-auto"
    @submit.prevent="searchHotels"
  >
    <div class="w-2/4 mx-auto">
      <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
      <BInput
        v-model="searchOptions.searchQuery"
        type="text"
        placeholder="Pesquise pelo hotel"
        class="bg-slate-200 w-full"
        :showLabel="false"
        labelText="pesquisar por hotel"
        @click="showOptions"
      />
      <button type="submit" class="hidden">pesquisar</button>
      <div v-if="isShowingOptions" class="bg-white flex w-full">
        <BInput
          v-model="searchOptions.checkInDate"
          type="date"
          :showLabel="true"
          labelText="Check-in"
          class="w-full"
        />
        <BInput
          v-model="searchOptions.checkOutDate"
          type="date"
          :showLabel="true"
          labelText="Check-out"
          class="w-full"
        />
        <BInput
          v-model="searchOptions.rooms"
          type="number"
          :showLabel="true"
          labelText="Quartos"
          placeholder="Numero de quartos"
          class="w-full"
        />
        <BInput
          v-model="searchOptions.accommodates"
          type="number"
          :showLabel="true"
          labelText="Hospedes"
          placeholder="Numero de hospedes"
          class="w-full"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, onUnmounted } from 'vue';
import BInput from '../baseComponents/BInput.vue';

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

const searchHotels = () => {
  console.log('Buscar por:', searchOptions.value);
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
