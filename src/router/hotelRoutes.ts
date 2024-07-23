import { RouteRecordRaw } from 'vue-router';

const hotelRoutes: Array<RouteRecordRaw> = [
  {
    path: '/hotels/:id',
    name: 'HotelReservation',
    component: () => import('@/views/HotelReservation.vue'),
    props: true,
  },
];

export default hotelRoutes;
