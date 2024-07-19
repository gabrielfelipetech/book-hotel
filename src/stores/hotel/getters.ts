import { StateHotel } from './types';

export const getters = {
  reservedHotels(state: StateHotel) {
    return state.hotels.filter(hotel => hotel.reserved);
  },
};
