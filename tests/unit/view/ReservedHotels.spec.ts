import { shallowMount, VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import ReservedHotels from '@/views/ReservedHotels.vue';
import HotelList from '@/components/sharedComponents/HotelList.vue';
import useHotelStore from '@/stores/hotel';

describe('ReservedHotels.vue', () => {
  let wrapper: VueWrapper<any>;
  let hotelStore: ReturnType<typeof useHotelStore>;

  beforeEach(() => {
    const pinia = createTestingPinia({ stubActions: false });
    setActivePinia(pinia);

    hotelStore = useHotelStore();
    hotelStore.getReservedHotels = jest.fn();

    wrapper = shallowMount(ReservedHotels, {
      global: {
        components: {
          HotelList,
        },
      },
    });
  });

  it('should call getReservedHotels on mounted', () => {
    expect(hotelStore.getReservedHotels).toHaveBeenCalled();
  });

  it('should render HotelList with correct props', () => {
    const hotelList = wrapper.findComponent(HotelList);
    expect(hotelList.exists()).toBe(true);
    expect(hotelList.props('title')).toBe('Hotéis reservados');
    expect(hotelList.props('hotelsType')).toBe('reserved');
    expect(hotelList.props('isComparable')).toBe(false);
  });
});
