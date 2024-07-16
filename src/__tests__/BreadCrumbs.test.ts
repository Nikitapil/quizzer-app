import { mount } from '@vue/test-utils';
import BreadCrumbs from '@/modules/app/components/BreadCrumbs.vue';
import { BREADCRUMBS } from '@/modules/app/domain/breadcrumbs';

describe('Breadcrumbs tests', () => {
  const breadcrumbs = [BREADCRUMBS.MAIN, BREADCRUMBS.GAME];

  const wrapper = mount(BreadCrumbs, {
    props: {
      breadcrumbs
    }
  });

  it('should render breadcrumbs correct', () => {
    const links = wrapper.findAll('a');
    const spans = wrapper.findAll('span');

    expect(links.length).toBe(1);
    expect(spans.length).toBe(1);
  });
});
