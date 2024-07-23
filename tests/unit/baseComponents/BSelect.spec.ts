import { shallowMount } from '@vue/test-utils';
import BSelect from '@/components/baseComponents/BSelect.vue';

describe('BSelect.vue', () => {
  it('should render options when passed', () => {
    const options = [
      { name: 'Option 1', value: '1' },
      { name: 'Option 2', value: '2' },
    ];
    const wrapper = shallowMount(BSelect, {
      props: { options },
    });
    const optionElements = wrapper.findAll('option');
    expect(optionElements[1].text()).toBe('Option 1');
    expect(optionElements[2].text()).toBe('Option 2');
  });

  it('should render disabled option with default value', () => {
    const options = [
      { name: 'Option 1', value: '1' },
      { name: 'Option 2', value: '2' },
    ];
    const wrapper = shallowMount(BSelect, {
      props: { options },
    });
    const disabledOption = wrapper.find('option[disabled]');
    expect(disabledOption.exists()).toBe(true);
    expect(disabledOption.text()).toBe('Filtrar');
  });

  it('should render disabled option with provided value', () => {
    const options = [
      { name: 'Option 1', value: '1' },
      { name: 'Option 2', value: '2' },
    ];
    const wrapper = shallowMount(BSelect, {
      props: {
        options,
        disabledOption: 'Selecione uma opção',
      },
    });
    const disabledOption = wrapper.find('option[disabled]');
    expect(disabledOption.exists()).toBe(true);
    expect(disabledOption.text()).toBe('Selecione uma opção');
  });

  it('should emit update:selected with the selected value when option is selected', async () => {
    const options = [
      { name: 'Option 1', value: '1' },
      { name: 'Option 2', value: '2' },
    ];
    const wrapper = shallowMount(BSelect, {
      props: { options },
    });
    const select = wrapper.find('select');
    await select.setValue('1');
    expect(wrapper.emitted('update:selected')).toBeTruthy();
    expect(wrapper.emitted('update:selected')?.[0]).toEqual(['1']);
  });

  it('should set the initial value of select to empty string', () => {
    const options = [
      { name: 'Option 1', value: '1' },
      { name: 'Option 2', value: '2' },
    ];
    const wrapper = shallowMount(BSelect, {
      props: { options },
    });
    const select = wrapper.find('select');
    expect(select.element.value).toBe('');
  });
});
