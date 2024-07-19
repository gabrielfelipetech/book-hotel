import api from '@/api';
import { StateHotel } from './types';

export const actions = {
  async getHotels(this: StateHotel) {
    this.loading = true;
    this.error = null;
    try {
      const response = await api.get('/hotels');
      this.hotels = response.data;
    } finally {
      this.loading = false;
    }
  },
};
