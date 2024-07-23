import { shallowMount } from '@vue/test-utils';
import CardHotel from '@/components/sharedComponents/CardHotel.vue';
import { createPinia, setActivePinia } from 'pinia';
import { useRouter, useRoute } from 'vue-router';

jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
  useRoute: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};
const mockRoute = {
  name: '',
};

beforeEach(() => {
  setActivePinia(createPinia());
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  (useRoute as jest.Mock).mockReturnValue(mockRoute);
});

describe('CardHotel.vue', () => {
  it('should render hotel details correctly', async () => {
    const cardHotel = {
      id: 1,
      name: 'Hotel 1',
      location: 'Location 1',
      reserved: false,
      price: 100,
      rating: 4.5,
      image: 'image-url',
      accommodates: 2,
      type: 'Double Room',
      descriptionType: '1 Bed, 1 Bath',
      rooms: 1,
      availableCheckIn: '2024-01-01',
      availableCheckOut: '2024-01-05',
    };

    const wrapper = shallowMount(CardHotel, {
      props: {
        cardHotel,
        isSelectable: false,
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Hotel 1');
    expect(wrapper.text()).toContain('Location 1');
    expect(wrapper.text()).toContain('100');
    expect(wrapper.text()).toContain('4.5');
  });

  it('should render "Reservar" button when not reserved', async () => {
    const cardHotel = {
      id: 1,
      name: 'Hotel 1',
      location: 'Location 1',
      reserved: false,
      price: 100,
      rating: 4.5,
      image: 'image-url',
      accommodates: 2,
      type: 'Double Room',
      descriptionType: '1 Bed, 1 Bath',
      rooms: 1,
      availableCheckIn: '2024-01-01',
      availableCheckOut: '2024-01-05',
    };

    const wrapper = shallowMount(CardHotel, {
      props: {
        cardHotel,
        isSelectable: false,
      },
    });

    await wrapper.vm.$nextTick();

    const button = wrapper.findComponent({ name: 'BButton' });
    expect(button.exists()).toBe(true);
  });

  it('should not render "Reservar" button on HotelReservation route', async () => {
    mockRoute.name = 'HotelReservation';

    const cardHotel = {
      id: 1,
      name: 'Hotel 1',
      location: 'Location 1',
      reserved: false,
      price: 100,
      rating: 4.5,
      image: 'image-url',
      accommodates: 2,
      type: 'Double Room',
      descriptionType: '1 Bed, 1 Bath',
      rooms: 1,
      availableCheckIn: '2024-01-01',
      availableCheckOut: '2024-01-05',
    };

    const wrapper = shallowMount(CardHotel, {
      props: {
        cardHotel,
        isSelectable: false,
      },
    });

    await wrapper.vm.$nextTick();

    const button = wrapper.findComponent({ name: 'BButton' });
    expect(button.exists()).toBe(false);
  });

  it('should render checkbox if isSelectable is true', async () => {
    const cardHotel = {
      id: 1,
      name: 'Hotel 1',
      location: 'Location 1',
      reserved: false,
      price: 100,
      rating: 4.5,
      image: 'image-url',
      accommodates: 2,
      type: 'Double Room',
      descriptionType: '1 Bed, 1 Bath',
      rooms: 1,
      availableCheckIn: '2024-01-01',
      availableCheckOut: '2024-01-05',
    };

    const wrapper = shallowMount(CardHotel, {
      props: {
        cardHotel,
        isSelectable: true,
      },
    });

    await wrapper.vm.$nextTick();

    const checkbox = wrapper.find('input[type="checkbox"]');
    expect(checkbox.exists()).toBe(true);
  });
});
