import { mount } from '@vue/test-utils';
import DynamicVHtml from '@/components/DynamicVHtml.vue';

describe('DynamicVHtml', () => {
  it('should render content in v-html span', () => {
    const content = 'test';
    const wrapper = mount(DynamicVHtml, {
      props: {
        content,
        useVHtml: true
      }
    });

    const useVHtmlSpan = wrapper.find('[data-test="span-v-html"]');

    expect(useVHtmlSpan.exists()).toBe(true);
  });
});
