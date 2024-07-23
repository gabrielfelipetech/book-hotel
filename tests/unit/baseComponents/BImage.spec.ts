import { shallowMount } from '@vue/test-utils';
import BImage from '@/components/baseComponents/BImage.vue';

describe('BImage.vue', () => {
  it('should render image with correct src attribute', () => {
    const wrapper = shallowMount(BImage, {
      props: {
        imageProps: {
          src: 'https://example.com/image.jpg',
          alt: 'Example Image',
        },
      },
    });
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('https://example.com/image.jpg');
  });

  it('should render image with correct alt attribute', () => {
    const wrapper = shallowMount(BImage, {
      props: {
        imageProps: {
          src: 'https://example.com/image.jpg',
          alt: 'Example Image',
        },
      },
    });
    const img = wrapper.find('img');
    expect(img.attributes('alt')).toBe('Example Image');
  });

  it('should apply correct class when style prop is provided', () => {
    const wrapper = shallowMount(BImage, {
      props: {
        imageProps: {
          src: 'https://example.com/image.jpg',
          alt: 'Example Image',
          style: 'h-24 w-24',
        },
      },
    });
    const img = wrapper.find('img');
    expect(img.classes()).toContain('h-24');
    expect(img.classes()).toContain('w-24');
  });

  it('should not apply any class when style prop is not provided', () => {
    const wrapper = shallowMount(BImage, {
      props: {
        imageProps: {
          src: 'https://example.com/image.jpg',
          alt: 'Example Image',
        },
      },
    });
    const img = wrapper.find('img');
    expect(img.classes().length).toBe(0);
  });
});
