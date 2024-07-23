<template>
  <div class="header">
    <div class="w-1/3">
      <BImage
        :image-props="{
          src: imageSourceLogo,
          alt: 'logo FAIR FAX',
          style: 'h-20',
        }"
      />
    </div>
    <InputSearch class="w-1/3" />
    <UserMenu class="w-1/3" />
  </div>
</template>
<script lang="ts" setup>
import imageSourceLogo from '@/assets/logo.png';
import BImage from '@/components/baseComponents/BImage.vue';
import InputSearch from '@/components/sharedComponents/InputSearch.vue';
import UserMenu from '@/components/sharedComponents/UserMenu.vue';
</script>
<style scoped>
.header {
  @apply min-h-40 w-full bg-black flex gap-4;
  @apply justify-between p-4 items-center flex-col lg:flex-row lg:gap-0;
}
</style>
