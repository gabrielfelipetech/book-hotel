import { shallowMount, VueWrapper, RouterLinkStub } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import BButton from '@/components/baseComponents/BButton.vue';
import BSelect from '@/components/baseComponents/BSelect.vue';
import CardListHotel from '@/components/sharedComponents/CardListHotel.vue';
import HotelList from '@/components/sharedComponents/HotelList.vue';
import useHotelStore from '@/stores/hotel';
import { useRoute } from 'vue-router';

jest.mock('vue-router', () => ({
  useRoute: jest.fn().mockReturnValue({
    name: 'defaultRoute',
  }),
}));

describe('HotelList.vue', () => {
  let wrapper: VueWrapper<any>;
  let hotelStore: ReturnType<typeof useHotelStore>;

  beforeEach(() => {
    const pinia = createTestingPinia({ stubActions: false });
    setActivePinia(pinia);

    wrapper = shallowMount(HotelList, {
      global: {
        components: {
          BButton,
          BSelect,
          CardListHotel,
        },
        stubs: {
          'router-link': RouterLinkStub,
        },
      },
      props: {
        title: 'Lista de Hotéis',
        isComparable: false,
        hotelsType: 'total',
      },
    });

    hotelStore = useHotelStore();
  });

  it('should render the title', () => {
    expect(wrapper.find('h1').text()).toBe('Lista de Hotéis');
  });

  it('should render BSelect component', () => {
    const selectComponent = wrapper.findComponent(BSelect);
    expect(selectComponent.exists()).toBe(true);
  });

  it('should display loading text when loading is true', async () => {
    hotelStore.loading = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.find('p').text()).toBe('Carregando...');
  });

  it('should render CardListHotel component when loading is false', async () => {
    hotelStore.loading = false;
    await wrapper.vm.$nextTick();
    const cardListHotelComponent = wrapper.findComponent(CardListHotel);
    expect(cardListHotelComponent.exists()).toBe(true);
  });

  it('should update cardHotelsSelectedForCompare when receiveCardHotelsSelected is called', () => {
    const valueEmitted = {
      cardHotelsSelectedForCompare: [{ id: 1, name: 'Test Hotel' }],
    };
    wrapper.vm.receiveCardHotelsSelected(valueEmitted);
    expect(wrapper.vm.cardHotelsSelectedForCompare).toEqual(
      valueEmitted.cardHotelsSelectedForCompare,
    );
  });

  it('should call filterHotels method from hotelStore when handleSelectionFilter is called', () => {
    const filterHotelsSpy = jest.spyOn(hotelStore, 'filterHotels');
    wrapper.vm.handleSelectionFilter('cheapest');
    expect(filterHotelsSpy).toHaveBeenCalledWith('cheapest', false);
  });
});
