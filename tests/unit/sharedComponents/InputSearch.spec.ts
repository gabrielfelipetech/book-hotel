import { shallowMount, VueWrapper } from '@vue/test-utils';
import BButton from '@/components/baseComponents/BButton.vue';
import BInput from '@/components/baseComponents/BInput.vue';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import useHotelStore from '@/stores/hotel';
import SearchHotelForm from '@/components/sharedComponents/InputSearch.vue';

describe('SearchHotelForm.vue', () => {
  let wrapper: VueWrapper<any>;
  let hotelStore: ReturnType<typeof useHotelStore>;
  let searchHotelsSpy: jest.SpyInstance;

  beforeEach(() => {
    const pinia = createTestingPinia({ stubActions: false });
    setActivePinia(pinia);

    wrapper = shallowMount(SearchHotelForm, {
      global: {
        components: {
          BButton,
          BInput,
        },
      },
    });

    hotelStore = useHotelStore();
    searchHotelsSpy = jest.spyOn(wrapper.vm, 'searchHotels');
  });

  it('should render the form', () => {
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('should render search input', () => {
    const searchInput = wrapper.findComponent(BInput);
    expect(searchInput.exists()).toBe(true);
    expect(searchInput.attributes('placeholder')).toBe(
      'Pesquise por localização',
    );
  });

  it('should show additional search options when input is clicked', async () => {
    const searchInput = wrapper.findComponent(BInput);
    await searchInput.trigger('click');

    expect(wrapper.vm.isShowingOptions).toBe(true);
    expect(wrapper.findAllComponents(BInput).length).toBe(5);
  });

  it('should hide options when clicking outside', async () => {
    wrapper.vm.isShowingOptions = true;
    await wrapper.vm.$nextTick();

    document.body.click();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isShowingOptions).toBe(false);
  });
});
