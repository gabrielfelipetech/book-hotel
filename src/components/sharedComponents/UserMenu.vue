<template>
  <div class="">
    <div v-if="!isLogged" class="w-min ml-auto">
      <BButton button-text="Entrar" color="primary" @click="logUser(true)" />
    </div>
    <div v-if="isLogged" class="w-min ml-auto">
      <BButton button-text="Usuário" color="secondary" @click="showMenu" />

      <ul v-if="isShowingMenu" class="bg-white">
        <li v-for="configuration in configurations" :key="configuration.name">
          <router-link :to="configuration.path">{{
            configuration.name
          }}</router-link>
        </li>
        <li>
          <BButton
            button-text="sair"
            color="secondary"
            @click="logUser(false)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import BButton from '@/components/baseComponents/BButton.vue';

const isLogged = ref(false);
const configurations = computed(() => [
  { name: 'Reservas', path: '/reservations' },
]);
const isShowingMenu = ref(false);
const showMenu = () => {
  isShowingMenu.value = !isShowingMenu.value;
};
const logUser = (value: boolean) => {
  isLogged.value = value;
};
</script>
