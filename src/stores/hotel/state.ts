import { StateHotel } from './types';

export const state: StateHotel = {
  originalHotels: [],
  refinedHotels: [],
  selectedHotel: {
    id: 0,
    name: '',
    location: '',
    reserved: false,
    price: 0,
    rating: 0,
    image: '',
    accommodates: 0,
    type: '',
    descriptionType: '',
    rooms: 0,
    availableCheckIn: '',
    availableCheckOut: '',
  },
  loading: false,
  error: null,
};
