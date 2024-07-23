import { shallowMount, VueWrapper } from '@vue/test-utils';
import BImage from '@/components/baseComponents/BImage.vue';
import InputSearch from '@/components/sharedComponents/InputSearch.vue';
import UserMenu from '@/components/sharedComponents/UserMenu.vue';
import Header from '@/components/sharedComponents/HeaderHotel.vue';

describe('Header.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = shallowMount(Header, {
      global: {
        components: {
          BImage,
          InputSearch,
          UserMenu,
        },
      },
    });
  });

  it('should render the logo', () => {
    const logo = wrapper.findComponent(BImage);
    expect(logo.exists()).toBe(true);
    const imageProps = logo.props('imageProps');
    expect(imageProps.alt).toBe('logo FAIR FAX');
  });

  it('should render InputSearch component', () => {
    const inputSearch = wrapper.findComponent(InputSearch);
    expect(inputSearch.exists()).toBe(true);
  });

  it('should render UserMenu component', () => {
    const userMenu = wrapper.findComponent(UserMenu);
    expect(userMenu.exists()).toBe(true);
  });
});
