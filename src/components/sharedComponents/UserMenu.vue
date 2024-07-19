<template>
  <div class="">
    <div v-if="!isLogged" class="w-min ml-auto">
      <button class="bg-white" @click="logUser(true)">Entrar</button>
    </div>
    <div v-if="isLogged" class="w-min ml-auto">
      <button class="bg-white" @click="showMenu">Usuário</button>
      <ul v-if="isShowingMenu" class="bg-white">
        <li v-for="configuration in configurations" :key="configuration.name">
          <router-link :to="configuration.path">{{
            configuration.name
          }}</router-link>
        </li>
        <li><button @click="logUser(false)">Sair</button></li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';

const isLogged = ref(false);
const configurations = computed(() => [
  { name: 'Reservas', path: '/reservations' },
  { name: 'Conta', path: '/account' },
]);
const isShowingMenu = ref(false);
const showMenu = () => {
  isShowingMenu.value = !isShowingMenu.value;
};
const logUser = (value: boolean) => {
  isLogged.value = value;
};
</script>
