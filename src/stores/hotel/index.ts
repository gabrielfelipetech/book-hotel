import { defineStore } from 'pinia';
import { state } from './state';
import { actions } from './actions';
import { getters } from './getters';

const useHotelStore = defineStore({
  id: 'hotelStore',
  state: () => state,
  actions,
  getters,
});
export default useHotelStore;
