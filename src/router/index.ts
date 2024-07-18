import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import homeRoutes from './homeRoutes';
import hotelRoutes from './hotelRoutes';
import reservationRoutes from './reservationRoutes';
import accountRoutes from './accountRoutes';

const routes: Array<RouteRecordRaw> = [
  ...homeRoutes,
  ...hotelRoutes,
  ...reservationRoutes,
  ...accountRoutes,
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
