export type Hotel = {
  id: number;
  name: string;
  location: string;
  reserved: boolean;
  price: number;
  rating: number;
  image: string;
  accommodates: number;
  type: string;
  descriptionType: string;
  rooms: number;
  availableCheckIn: string;
  availableCheckOut: string;
};
export type StateHotel = {
  originalHotels: Hotel[];
  refinedHotels: Hotel[];
  selectedHotel: Hotel;
  loading: boolean;
  error: string | null;
};
