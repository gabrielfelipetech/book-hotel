import { StateHotel } from './types';

export const getters = {
  allHotels(state: StateHotel) {
    return state.originalHotels;
  },
  allRefinedHotels(state: StateHotel) {
    return state.refinedHotels;
  },
};
