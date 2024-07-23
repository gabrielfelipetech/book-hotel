import { shallowMount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import { useRouter } from 'vue-router';
import HotelReservation from '@/views/HotelReservation.vue';
import CardHotel from '@/components/sharedComponents/CardHotel.vue';
import BButton from '@/components/baseComponents/BButton.vue';
import BInput from '@/components/baseComponents/BInput.vue';
import BSelect from '@/components/baseComponents/BSelect.vue';
import useHotelStore from '@/stores/hotel';

jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
}));

describe('HotelReservation.vue', () => {
  let wrapper: VueWrapper<any>;
  let hotelStore: ReturnType<typeof useHotelStore>;
  let routerPushMock: jest.Mock;

  beforeEach(() => {
    const pinia = createTestingPinia({ stubActions: false });
    setActivePinia(pinia);

    hotelStore = useHotelStore();
    hotelStore.selectedHotel = {
      id: 1,
      name: 'Hotel Teste',
      location: 'Local Teste',
      reserved: false,
      price: 100,
      rating: 4,
      image: 'image.png',
      accommodates: 2,
      type: 'Tipo Teste',
      descriptionType: 'Descrição Teste',
      rooms: 1,
      availableCheckIn: '14:00',
      availableCheckOut: '12:00',
    };

    routerPushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });

    wrapper = shallowMount(HotelReservation, {
      global: {
        components: {
          CardHotel,
          BButton,
          BInput,
          BSelect,
        },
      },
    });
  });

  it('should render the component correctly', () => {
    expect(wrapper.findComponent(CardHotel).exists()).toBe(true);
    expect(wrapper.findComponent(BButton).exists()).toBe(true);
    expect(wrapper.findComponent(BInput).exists()).toBe(true);
    expect(wrapper.findComponent(BSelect).exists()).toBe(true);
  });

  it('should display "Reservar" when hotel is not reserved', () => {
    expect(wrapper.find('h1').text()).toBe('Reservar');
  });

  it('should display reservation form when hotel is not reserved', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('should call reserveHotel and redirect to Home on submit', async () => {
    hotelStore.reserveHotel = jest.fn().mockResolvedValue(true);
    await wrapper.find('form').trigger('submit.prevent');
    expect(hotelStore.reserveHotel).toHaveBeenCalledWith(
      hotelStore.selectedHotel.id,
    );
    expect(routerPushMock).toHaveBeenCalledWith({ name: 'Home' });
  });

  it('should update reservationValues.paymentMethod on BSelect update', async () => {
    const select = wrapper.findComponent(BSelect);
    await select.vm.$emit('update:selected', 'credit_card');
    expect(wrapper.vm.reservationValues.paymentMethod).toBe('credit_card');
  });
});
