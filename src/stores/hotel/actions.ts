import api from '@/api';
import { Hotel, StateHotel } from './types';

export const actions = {
  async getHotels(this: StateHotel) {
    this.loading = true;
    try {
      const response = await api.get('/hotels');
      this.originalHotels = response.data;
      this.refinedHotels = [...this.originalHotels];
    } finally {
      this.loading = false;
    }
  },
  async getReservedHotels(this: StateHotel) {
    try {
      const response = await api.get('/hotels?reserved=true');
      this.refinedHotels = response.data;
    } finally {
      this.loading = false;
    }
  },
  async filterHotels(
    this: StateHotel,
    filter: string,
    isReservedContext: boolean,
  ) {
    let url = isReservedContext ? '/hotels?reserved=true' : '/hotels';
    const character = isReservedContext ? '&' : '?';
    switch (filter) {
      case 'cheapest':
        url += `${character}_sort=price&_order=asc`;
        break;
      case 'least_relevant':
        url += `${character}_sort=rating&_order=asc`;
        break;
      case 'least_rooms':
        url += `${character}_sort=rooms&_order=asc`;
        break;
      default:
        url += `${character}_sort=rooms&_order=desc`;
    }
    this.loading = true;
    try {
      const response = await api.get(url);
      this.refinedHotels = response.data;
    } finally {
      this.loading = false;
    }
  },
  async reserveHotel(this: StateHotel, hotelId: number) {
    this.loading = true;
    try {
      const response = await api.patch(`/hotels/${hotelId}`, {
        reserved: true,
      });
      this.originalHotels = response.data;
    } finally {
      this.loading = false;
    }
  },
  async searchHotels(this: StateHotel, searchOptions: any) {
    this.loading = true;
    try {
      const params = new URLSearchParams();
      console.log(params);
      if (searchOptions.searchQuery) {
        params.append(
          'location',
          searchOptions.searchQuery.trim().toLowerCase().replace('+', ' '),
        );
      }
      if (searchOptions.checkInDate) {
        params.append('availableCheckIn', searchOptions.checkInDate);
      }
      if (searchOptions.checkOutDate) {
        params.append('availableCheckOut', searchOptions.checkOutDate);
      }
      if (searchOptions.rooms > 0) {
        params.append('rooms', searchOptions.rooms.toString());
      }
      if (searchOptions.accommodates > 0) {
        params.append('accommodates', searchOptions.accommodates.toString());
      }

      const response = await api.get(`/hotels?${params.toString()}`);
      this.refinedHotels = response.data;
    } finally {
      this.loading = false;
    }
  },
  selectHotel(this: StateHotel, hotel: Hotel) {
    this.selectedHotel = hotel;
  },
};
