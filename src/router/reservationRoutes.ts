import { RouteRecordRaw } from 'vue-router';
import ReservedHotels from '../views/ReservedHotels.vue';

const reservationRoutes: Array<RouteRecordRaw> = [
  {
    path: '/reservations',
    name: 'ReservedHotels',
    component: ReservedHotels,
  },
];

export default reservationRoutes;
