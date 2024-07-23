import { shallowMount, VueWrapper, RouterLinkStub } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import BButton from '@/components/baseComponents/BButton.vue';
import UserMenu from '@/components/sharedComponents/UserMenu.vue';

describe('UserMenu.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    const pinia = createTestingPinia({ stubActions: false });
    setActivePinia(pinia);

    wrapper = shallowMount(UserMenu, {
      global: {
        components: {
          BButton,
        },
        stubs: {
          'router-link': RouterLinkStub,
        },
      },
    });
  });

  it('should render "Entrar" button when not logged in', () => {
    const loginButton = wrapper.findComponent(BButton);
    expect(loginButton.exists()).toBe(true);
  });

  it('should log in the user when "Entrar" button is clicked', async () => {
    const loginButton = wrapper.findComponent(BButton);
    await loginButton.trigger('click');
    expect(wrapper.vm.isLogged).toBe(true);
  });

  it('should render "Usuário" button when logged in', async () => {
    wrapper.vm.logUser(true);
    await wrapper.vm.$nextTick();
    const userButton = wrapper.findAllComponents(BButton)[0];
    expect(userButton.exists()).toBe(true);
  });

  it('should show menu when "Usuário" button is clicked', async () => {
    wrapper.vm.logUser(true);
    await wrapper.vm.$nextTick();
    const userButton = wrapper.findAllComponents(BButton)[0];
    await userButton.trigger('click');
    expect(wrapper.vm.isShowingMenu).toBe(true);
    const menu = wrapper.find('ul');
    expect(menu.exists()).toBe(true);
  });

  it('should log out the user when "sair" button is clicked', async () => {
    wrapper.vm.logUser(true);
    await wrapper.vm.$nextTick();
    wrapper.vm.showMenu();
    await wrapper.vm.$nextTick();
    const logoutButton = wrapper.findAllComponents(BButton)[1];
    await logoutButton.trigger('click');
    expect(wrapper.vm.isLogged).toBe(false);
  });

  it('should render menu items when menu is showing', async () => {
    wrapper.vm.logUser(true);
    await wrapper.vm.$nextTick();
    wrapper.vm.showMenu();
    await wrapper.vm.$nextTick();
    const menuItems = wrapper.findAll('li');
    expect(menuItems.length).toBeGreaterThan(0);
  });
});
