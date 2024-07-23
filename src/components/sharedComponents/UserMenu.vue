<template>
  <div class="">
    <div v-if="!isLogged" class="w-auto ml-auto">
      <BButton
        button-text="Entrar"
        color="primary"
        height="10"
        width="full"
        @click="logUser(true)"
      />
    </div>
    <div v-if="isLogged" class="w-auto ml-auto">
      <BButton
        button-text="Usuário"
        color="secondary"
        height="10"
        width="full"
        @click="showMenu"
      />

      <ul v-if="isShowingMenu" class="bg-white">
        <li v-for="configuration in configurations" :key="configuration.name">
          <router-link class="text-lg" :to="configuration.path">
            {{
              configuration.name
            }}
          </router-link>
        </li>
        <li>
          <BButton
            button-text="sair"
            color="secondary"
            width="full"
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
