import { RouteRecordRaw } from 'vue-router';
import AccountSettings from '../views/AccountSettings.vue';

const accountRoutes: Array<RouteRecordRaw> = [
  {
    path: '/account',
    name: 'AccountSettings',
    component: AccountSettings,
  },
];

export default accountRoutes;
