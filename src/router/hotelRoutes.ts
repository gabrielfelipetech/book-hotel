import { RouteRecordRaw } from 'vue-router';
import HotelReservation from '../views/HotelReservation.vue';

const hotelRoutes: Array<RouteRecordRaw> = [
  {
    path: '/hotels/:id',
    name: 'HotelReservation',
    component: HotelReservation,
    props: true,
  },
];

export default hotelRoutes;
