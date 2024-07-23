import { shallowMount } from '@vue/test-utils';
import BInput from '@/components/baseComponents/BInput.vue';

describe('BInput.vue', () => {
  it('should render label when showLabel is true', () => {
    const wrapper = shallowMount(BInput, {
      props: {
        showLabel: true,
        labelText: 'Test Label',
      },
    });
    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Test Label');
  });

  it('should not display label when showLabel is false', () => {
    const wrapper = shallowMount(BInput, {
      props: {
        showLabel: false,
        labelText: 'Test Label',
      },
    });
    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.element.style.display).toBe('none');
  });

  it('should bind input value to v-model', async () => {
    const wrapper = shallowMount(BInput, {
      props: {
        showLabel: true,
        labelText: 'Test Label',
      },
    });
    const input = wrapper.find('input');
    await input.setValue('Test Value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Test Value']);
  });

  it('should pass down attributes to the input element', () => {
    const wrapper = shallowMount(BInput, {
      props: {
        showLabel: true,
        labelText: 'Test Label',
      },
      attrs: {
        type: 'text',
        placeholder: 'Enter text here',
      },
    });
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('text');
    expect(input.attributes('placeholder')).toBe('Enter text here');
  });

  it('should set input id to labelText prop value', () => {
    const wrapper = shallowMount(BInput, {
      props: {
        showLabel: true,
        labelText: 'Test Label',
      },
    });
    const input = wrapper.find('input');
    expect(input.attributes('id')).toBe('Test Label');
  });
});
