import { shallowMount } from '@vue/test-utils';
import CardListHotel from '@/components/sharedComponents/CardListHotel.vue';
import CardHotel from '@/components/sharedComponents/CardHotel.vue';
import { Hotel } from '@/stores/hotel/types';

describe('CardListHotel.vue', () => {
  const cardHotels: Hotel[] = [
    {
      id: 1,
      name: 'Hotel 1',
      location: 'Location 1',
      reserved: false,
      price: 100,
      rating: 4.5,
      image: 'image-url-1',
      accommodates: 2,
      type: 'Double Room',
      descriptionType: '1 Bed, 1 Bath',
      rooms: 1,
      availableCheckIn: '2024-01-01',
      availableCheckOut: '2024-01-05',
    },
    {
      id: 2,
      name: 'Hotel 2',
      location: 'Location 2',
      reserved: true,
      price: 150,
      rating: 4.7,
      image: 'image-url-2',
      accommodates: 3,
      type: 'Triple Room',
      descriptionType: '2 Beds, 1 Bath',
      rooms: 2,
      availableCheckIn: '2024-02-01',
      availableCheckOut: '2024-02-05',
    },
  ];

  it('should render a list of hotels', () => {
    const wrapper = shallowMount(CardListHotel, {
      props: {
        cardHotels,
        isComparable: false,
      },
    });

    const hotelItems = wrapper.findAllComponents(CardHotel);
    expect(hotelItems).toHaveLength(cardHotels.length);
  });

  it('should emit event with selected hotels for comparison', async () => {
    const wrapper = shallowMount(CardListHotel, {
      props: {
        cardHotels,
        isComparable: true,
      },
    });

    const hotelItems = wrapper.findAllComponents(CardHotel);
    await hotelItems[0].vm.$emit('select', {
      cardHotel: cardHotels[0],
      selected: true,
    });
    await hotelItems[1].vm.$emit('select', {
      cardHotel: cardHotels[1],
      selected: true,
    });

    const emitted = wrapper.emitted();

    expect(emitted).toHaveProperty('emitCardHotelsSelectedForCompare');
  });

  it('should remove a hotel from selected list when deselected', async () => {
    const wrapper = shallowMount(CardListHotel, {
      props: {
        cardHotels,
        isComparable: true,
      },
    });

    const hotelItems = wrapper.findAllComponents(CardHotel);
    await hotelItems[0].vm.$emit('select', {
      cardHotel: cardHotels[0],
      selected: true,
    });
    await hotelItems[1].vm.$emit('select', {
      cardHotel: cardHotels[1],
      selected: true,
    });
    await hotelItems[0].vm.$emit('select', {
      cardHotel: cardHotels[0],
      selected: false,
    });

    const emitted = wrapper.emitted();

    expect(emitted).toHaveProperty('emitCardHotelsSelectedForCompare');
  });
});
