import { mount } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';

describe('Pagination tests', () => {
  it('should not be rendered with 1 page', () => {
    const wrapper = mount(Pagination, {
      props: {
        totalItemsCount: 5,
        limit: 10,
        currentPage: 1
      }
    });

    const container = wrapper.find('[data-test="pagination"]');

    expect(container.exists()).toBeFalsy();
  });

  it('should render five button pages', () => {
    const wrapper = mount(Pagination, {
      props: {
        totalItemsCount: 50,
        limit: 10,
        currentPage: 1
      }
    });

    const buttons = wrapper.findAll('button');

    expect(buttons.length).toBe(5);
  });

  it('should emit change-page', () => {
    const wrapper = mount(Pagination, {
      props: {
        totalItemsCount: 50,
        limit: 10,
        currentPage: 1
      }
    });

    const buttons = wrapper.findAll('button');
    buttons[1].trigger('click');

    expect(wrapper.emitted('change-page')?.[0]).toEqual([2]);
    expect(wrapper.emitted('change-page')).toBeTruthy();
  });

  it('should show current page', () => {
    const wrapper = mount(Pagination, {
      props: {
        totalItemsCount: 50,
        limit: 10,
        currentPage: 1
      }
    });

    const buttons = wrapper.findAll('button');

    expect(buttons[0].classes()).toContain('primary');
  });
});
