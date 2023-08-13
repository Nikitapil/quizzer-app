import { mount } from '@vue/test-utils';
import StarRating from '@/components/StarRating.vue';

describe('StarRating component tests', () => {
  it('should render rating with default star count', () => {
    const wrapper = mount(StarRating);

    const btns = wrapper.findAll('button');

    expect(btns.length).toBe(5);
  });

  it('should render rating with custom star count', () => {
    const wrapper = mount(StarRating, {
      props: {
        starsCount: 4
      }
    });

    const btns = wrapper.findAll('button');

    expect(btns.length).toBe(4);
  });

  it('should not render rating while loading', () => {
    const wrapper = mount(StarRating, {
      props: {
        isLoading: true
      }
    });

    const btns = wrapper.findAll('button');

    expect(btns.length).toBe(0);
  });

  it('should emit value on click star', async () => {
    const wrapper = mount(StarRating, {});

    const btns = wrapper.findAll('button');

    await btns[1].trigger('click');

    expect(wrapper.emitted('select')?.[0]).toEqual([2]);
    expect(btns[0].classes()).toContain('selected');
    expect(btns[1].classes()).toContain('selected');
  });
});
