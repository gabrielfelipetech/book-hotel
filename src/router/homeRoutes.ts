import { RouteRecordRaw } from 'vue-router';
import HomeHotel from '@/views/HomeHotel.vue';

const homeRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeHotel,
  },
];

export default homeRoutes;
