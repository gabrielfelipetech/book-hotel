import { RouteRecordRaw } from 'vue-router';
import HotelList from '../views/HotelList.vue';
import HotelReservation from '../views/HotelReservation.vue';

const hotelRoutes: Array<RouteRecordRaw> = [
  {
    path: '/hotels',
    name: 'HotelList',
    component: HotelList,
  },
  {
    path: '/hotels/:id/reserve',
    name: 'HotelReservation',
    component: HotelReservation,
    props: true,
  },
];

export default hotelRoutes;
