import { shallowMount, VueWrapper } from '@vue/test-utils';
import HeaderHotel from '@/components/sharedComponents/HeaderHotel.vue';
import HotelList from '@/components/sharedComponents/HotelList.vue';
import HomeHotel from '@/views/HomeHotel.vue';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import useHotelStore from '@/stores/hotel';

describe('HomeHotel.vue', () => {
  let wrapper: VueWrapper<any>;
  let hotelStore: ReturnType<typeof useHotelStore>;
  let getHotelsSpy: jest.SpyInstance;

  beforeEach(() => {
    const pinia = createTestingPinia({ stubActions: false });
    setActivePinia(pinia);

    hotelStore = useHotelStore();
    getHotelsSpy = jest.spyOn(hotelStore, 'getHotels');

    wrapper = shallowMount(HomeHotel, {
      global: {
        components: {
          HeaderHotel,
          HotelList,
        },
      },
    });
  });

  it('should render HeaderHotel component', () => {
    const header = wrapper.findComponent(HeaderHotel);
    expect(header.exists()).toBe(true);
  });

  it('should render HotelList component', () => {
    const hotelList = wrapper.findComponent(HotelList);
    expect(hotelList.exists()).toBe(true);
    expect(hotelList.props('hotelsType')).toBe('total');
    expect(hotelList.props('isComparable')).toBe(true);
  });

  it('should call getHotels method on mounted', () => {
    expect(getHotelsSpy).toHaveBeenCalled();
  });
});
