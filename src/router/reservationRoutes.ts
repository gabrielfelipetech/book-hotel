import { RouteRecordRaw } from 'vue-router';

const reservationRoutes: Array<RouteRecordRaw> = [
  {
    path: '/reservations',
    name: 'ReservedHotels',
    component: () => import('@/views/ReservedHotels.vue'),
  },
];

export default reservationRoutes;
