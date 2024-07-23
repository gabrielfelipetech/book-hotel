import { shallowMount } from '@vue/test-utils';
import BButton from '@/components/baseComponents/BButton.vue';

describe('BButton.vue', () => {
  it('should render button text properly', () => {
    const wrapper = shallowMount(BButton, {
      props: {
        buttonText: 'Click Me',
      },
    });
    expect(wrapper.text()).toMatch('Click Me');
  });

  it('should apply primary color class', () => {
    const wrapper = shallowMount(BButton, {
      props: {
        buttonText: 'Click Me',
        color: 'primary',
      },
    });
    expect(wrapper.classes()).toContain('bg-green-500');
    expect(wrapper.classes()).toContain('text-white');
  });

  it('should apply secondary color class', () => {
    const wrapper = shallowMount(BButton, {
      props: {
        buttonText: 'Click Me',
        color: 'secondary',
      },
    });
    expect(wrapper.classes()).toContain('bg-blue-500');
    expect(wrapper.classes()).toContain('text-white');
  });

  it('should apply height class', () => {
    const wrapper = shallowMount(BButton, {
      props: {
        buttonText: 'Click Me',
        height: '5',
      },
    });
    expect(wrapper.classes()).toContain('h-5');
  });

  it('should apply width class', () => {
    const wrapper = shallowMount(BButton, {
      props: {
        buttonText: 'Click Me',
        width: '10',
      },
    });
    expect(wrapper.classes()).toContain('w-10');
  });

  it('should emit click event when clicked', async () => {
    const wrapper = shallowMount(BButton, {
      props: {
        buttonText: 'Click Me',
      },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
