import { mount } from '@vue/test-utils';
import BreadCrumbs from '@/modules/app/components/BreadCrumbs.vue';
import { i18n } from '@/main';
import { useAppStore } from '@/modules/app/store/AppStore';
import { BREADCRUMBS } from '@/constants/breadcrumbs';
import router from '@/router';
import { useBreadCrumbs } from '@/composables/useBreadCrumbs';

describe('Breadcrumbs tests', () => {
  it('should render breadcrumbs correct', () => {
    const store = useAppStore();

    store.setBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.GAME]);

    const wrapper = mount(BreadCrumbs, {
      global: {
        plugins: [i18n, router]
      },
      props: {
        breadcrumbs: store.breadCrumbs
      }
    });

    const links = wrapper.findAll('a');
    const spans = wrapper.findAll('span');

    expect(links.length).toBe(1);
    expect(spans.length).toBe(1);
  });

  it('should work with useBreadCrumbs hooks', () => {
    const store = useAppStore();

    useBreadCrumbs([BREADCRUMBS.MAIN, BREADCRUMBS.GAME]);

    const wrapper = mount(BreadCrumbs, {
      global: {
        plugins: [i18n, router]
      },
      props: {
        breadcrumbs: store.breadCrumbs
      }
    });

    const links = wrapper.findAll('a');
    const spans = wrapper.findAll('span');

    expect(links.length).toBe(1);
    expect(spans.length).toBe(1);
    expect(links[0].text()).toBe('Main /');
    expect(spans[0].text()).toBe('Quiz');
  });
});
