import { RouteRecordRaw } from 'vue-router';

const homeRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeHotel.vue'),
  },
];

export default homeRoutes;
