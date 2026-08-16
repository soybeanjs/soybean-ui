import { describe, expect, it } from 'vitest';
import { computed, defineComponent, h, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { provideAppLayoutContext, useAppLayoutContext } from '../../../src/composables/use-app-layout-context';
import { SAppLayout } from '../../../src/components/app-layout';
import { SAppMenu } from '../../../src/components/app-menu';
import type { AppLayoutMode, AppMenuData } from '../../../src/types';

const modeReader = defineComponent({
  setup() {
    const context = useAppLayoutContext();
    return { context };
  },
  template: '<div data-test="mode">{{ context ? context.mode.value : "null" }}</div>'
});

const contextReader = defineComponent({
  setup() {
    const context = useAppLayoutContext();
    return {
      context
    };
  },
  template: `
    <div>
      <span data-test="sider-visible">{{ context ? String(context.siderVisible.value) : "null" }}</span>
      <span data-test="header-menu-el">{{ context ? context.headerMenuEl.value : "null" }}</span>
      <span data-test="sider-menu-el">{{ context ? context.siderMenuEl.value : "null" }}</span>
    </div>
  `
});

const menuData: AppMenuData[] = [{ key: 'dashboard', label: 'Dashboard' }];

function mountAppLayout(mode: 'vertical' | 'horizontal') {
  return mount(SAppLayout, {
    props: { mode },
    slots: {
      default: '<div>content</div>'
    }
  });
}

describe('SAppLayout', () => {
  it('renders the unified layout root by default', () => {
    const wrapper = mountAppLayout('vertical');
    expect(wrapper.find('[data-soybean-layout-root]').exists()).toBe(true);
  });

  it('is expanded by default and toggles via the layout rail', async () => {
    const wrapper = mountAppLayout('vertical');
    const root = wrapper.find('[data-soybean-layout-root]');
    expect(root.attributes('data-state')).toBe('expanded');

    await wrapper.find('[data-soybean-layout-rail]').trigger('click');
    expect(wrapper.find('[data-soybean-layout-root]').attributes('data-state')).toBe('collapsed');

    await wrapper.find('[data-soybean-layout-rail]').trigger('click');
    expect(wrapper.find('[data-soybean-layout-root]').attributes('data-state')).toBe('expanded');
  });

  it('forwards the unified layout props to the underlying SLayout', () => {
    const wrapper = mount(SAppLayout, {
      props: { mode: 'vertical', orientation: 'horizontal', variant: 'floating', scrollBehavior: 'content' }
    });

    const root = wrapper.find('[data-soybean-layout-root]');
    expect(root.attributes('data-orientation')).toBe('horizontal');
    expect(root.attributes('data-variant')).toBe('floating');
  });

  it('provides the mode to the app layout context', () => {
    const wrapper = mount(SAppLayout, {
      props: { mode: 'vertical' },
      slots: {
        default: () => h(modeReader)
      }
    });

    expect(wrapper.find('[data-test="mode"]').text()).toBe('vertical');
  });

  it('hides the sider and exposes mount ids for horizontal mode', () => {
    const wrapper = mount(SAppLayout, {
      props: { mode: 'horizontal' },
      slots: {
        default: () => h(contextReader)
      }
    });

    expect(wrapper.find('[data-test="sider-visible"]').text()).toBe('false');
    expect(wrapper.find('[data-test="header-menu-el"]').text()).toBe('app-header-menu');
    expect(wrapper.find('[data-test="sider-menu-el"]').text()).toBe('app-sider-menu');
  });

  it('applies the layout mode to the sider visibility', () => {
    const wrapper = mount(SAppLayout, {
      props: { mode: 'vertical' },
      slots: {
        default: () => h(contextReader)
      }
    });

    expect(wrapper.find('[data-test="sider-visible"]').text()).toBe('true');
  });

  it('drives AppMenu from the AppLayout context mode', () => {
    const contextHost = defineComponent({
      props: {
        ctxMode: { type: String, default: 'horizontal' }
      },
      setup(props) {
        const mode = computed(() => props.ctxMode as AppLayoutMode);
        provideAppLayoutContext({
          mode,
          open: ref(true),
          siderCollapse: ref(false),
          isMobile: ref(false),
          mixSiderFixed: ref(false),
          hasSecondLevel: ref(true),
          mixHasDrawer: ref(false),
          mixMenuWidth: ref(220),
          sidebarWidth: ref(220),
          collapsedSidebarWidth: ref(64),
          siderVisible: computed(() => mode.value !== 'horizontal'),
          // empty mount ids → AppMenu renders in place (no teleport in jsdom)
          headerMenuEl: ref(''),
          siderMenuEl: ref('')
        });
        return { menuData };
      },
      template: '<SAppMenu :data="menuData" />'
    });

    const wrapper = mount(contextHost, {
      global: {
        components: { SAppMenu },
        stubs: { RouterLink: true }
      }
    });

    expect(wrapper.find('[data-soybean-app-horizontal]').exists()).toBe(true);
    expect(wrapper.find('[data-soybean-first-level-menu-root]').exists()).toBe(false);
  });
});
