import { describe, expect, it } from 'vitest';
import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { LayoutTrigger, LayoutRail } from '@soybeanjs/headless/layout';
import SLayout from '@/components/layout/layout.vue';

describe('SLayout', () => {
  describe('rendering', () => {
    it('renders with all slots', () => {
      const wrapper = mount(SLayout, {
        slots: {
          header: '<div data-header>Header</div>',
          tab: '<div data-tab>Tab</div>',
          sidebar: '<div data-sidebar>Sidebar</div>',
          footer: '<div data-footer>Footer</div>',
          default: '<div data-main>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').exists()).toBe(true);
      expect(wrapper.find('[data-header]').exists()).toBe(true);
      expect(wrapper.find('[data-tab]').exists()).toBe(true);
      expect(wrapper.find('[data-sidebar]').exists()).toBe(true);
      expect(wrapper.find('[data-footer]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Main');

      wrapper.unmount();
    });

    it('applies custom root class', () => {
      const wrapper = mount(SLayout, {
        props: { class: 'my-layout' },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('.my-layout').exists()).toBe(true);

      wrapper.unmount();
    });

    it('applies per-slot ui overrides', () => {
      const wrapper = mount(SLayout, {
        props: {
          ui: {
            header: 'custom-header',
            content: 'custom-content'
          }
        },
        slots: {
          sidebar: '<div>Sidebar</div>',
          header: '<div>Header</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('.custom-header').exists()).toBe(true);
      expect(wrapper.find('.custom-content').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('defaults', () => {
    it('defaults to horizontal orientation, sidebar variant and expanded state', () => {
      const wrapper = mount(SLayout, {
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      const root = wrapper.find('[data-soybean-layout-root]');
      expect(root.attributes('data-orientation')).toBe('horizontal');
      expect(root.attributes('data-variant')).toBe('sidebar');
      expect(root.attributes('data-state')).toBe('expanded');

      wrapper.unmount();
    });
  });

  describe('state reflection', () => {
    it('reflects data-orientation attribute', () => {
      const wrapper = mount(SLayout, {
        props: { orientation: 'vertical' },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-orientation')).toBe('vertical');

      wrapper.unmount();
    });

    it('reflects data-scroll-behavior attribute', () => {
      const wrapper = mount(SLayout, {
        props: { scrollBehavior: 'wrapper' },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-scroll-behavior')).toBe('wrapper');

      wrapper.unmount();
    });

    it('reflects data-fixed-top attribute', () => {
      const wrapper = mount(SLayout, {
        props: { fixedTop: true },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-fixed-top')).toBe('true');

      wrapper.unmount();
    });

    it('reflects data-fixed-footer attribute', () => {
      const wrapper = mount(SLayout, {
        props: { fixedFooter: true },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-fixed-footer')).toBe('true');

      wrapper.unmount();
    });

    it('reflects data-stretch-footer attribute', () => {
      const wrapper = mount(SLayout, {
        props: { stretchFooter: false },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-stretch-footer')).toBe('false');

      wrapper.unmount();
    });

    it('reflects expanded/collapsed state via data-state', () => {
      const wrapper = mount(SLayout, {
        props: { defaultOpen: true },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-state')).toBe('expanded');

      wrapper.unmount();
    });

    it('reflects collapsed state via data-state', () => {
      const wrapper = mount(SLayout, {
        props: { defaultOpen: false },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-state')).toBe('collapsed');

      wrapper.unmount();
    });

    it('reflects data-side attribute on root', () => {
      const wrapper = mount(SLayout, {
        props: { side: 'right' },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-side')).toBe('right');

      wrapper.unmount();
    });

    it('reflects data-variant attribute on root', () => {
      const wrapper = mount(SLayout, {
        props: { variant: 'floating' },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-variant')).toBe('floating');

      wrapper.unmount();
    });

    it('reflects data-collapsible when collapsed and clears it when expanded', async () => {
      const wrapper = mount(SLayout, {
        props: { defaultOpen: false, collapsible: 'offcanvas' },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      const root = wrapper.find('[data-soybean-layout-root]');
      expect(root.attributes('data-state')).toBe('collapsed');
      expect(root.attributes('data-collapsible')).toBe('offcanvas');

      await wrapper.setProps({ open: true });
      expect(root.attributes('data-state')).toBe('expanded');
      expect(root.attributes('data-collapsible')).toBe('');

      wrapper.unmount();
    });

    it('emits update:open when state changes via trigger', async () => {
      const wrapper = mount(SLayout, {
        props: { defaultOpen: false },
        slots: {
          sidebar: '<div>Sidebar</div>',
          header: () => h(LayoutTrigger),
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      await nextTick();

      const trigger = wrapper.find('[data-soybean-layout-trigger]');
      await trigger.trigger('click');
      await nextTick();

      expect(wrapper.emitted('update:open')).toBeTruthy();
      expect(wrapper.emitted('update:open')?.at(-1)).toEqual([true]);

      wrapper.unmount();
    });

    it('supports v-model:open', async () => {
      const wrapper = mount(SLayout, {
        props: { open: false, 'onUpdate:open': (v: boolean) => wrapper.setProps({ open: v }) },
        slots: {
          sidebar: '<div>Sidebar</div>',
          header: () => h(LayoutTrigger),
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      const root = wrapper.find('[data-soybean-layout-root]');
      expect(root.attributes('data-state')).toBe('collapsed');

      await wrapper.find('[data-soybean-layout-trigger]').trigger('click');
      await nextTick();

      expect(root.attributes('data-state')).toBe('expanded');

      wrapper.unmount();
    });
  });

  describe('variants', () => {
    it('renders sidebar variant by default', () => {
      const wrapper = mount(SLayout, {
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-variant')).toBe('sidebar');

      wrapper.unmount();
    });

    it('renders floating variant', () => {
      const wrapper = mount(SLayout, {
        props: { variant: 'floating' },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-variant')).toBe('floating');

      wrapper.unmount();
    });

    it('renders inset variant', () => {
      const wrapper = mount(SLayout, {
        props: { variant: 'inset' },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-variant')).toBe('inset');

      wrapper.unmount();
    });
  });

  describe('sidebar visibility', () => {
    it('sidebar is visible by default', () => {
      const wrapper = mount(SLayout, {
        slots: {
          sidebar: '<div data-sidebar>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-sidebar]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('hides sidebar when sidebarVisible is false', () => {
      const wrapper = mount(SLayout, {
        props: { sidebarVisible: false },
        slots: {
          sidebar: '<div data-sidebar>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-sidebar]').exists()).toBe(false);

      wrapper.unmount();
    });

    it('hides header when headerVisible is false', () => {
      const wrapper = mount(SLayout, {
        props: { headerVisible: false },
        slots: {
          header: '<div data-header>Header</div>',
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-header]').exists()).toBe(false);

      wrapper.unmount();
    });

    it('hides tab when tabVisible is false', () => {
      const wrapper = mount(SLayout, {
        props: { tabVisible: false },
        slots: {
          tab: '<div data-tab>Tab</div>',
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-tab]').exists()).toBe(false);

      wrapper.unmount();
    });

    it('hides footer when footerVisible is false', () => {
      const wrapper = mount(SLayout, {
        props: { footerVisible: false },
        slots: {
          footer: '<div data-footer>Footer</div>',
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-footer]').exists()).toBe(false);

      wrapper.unmount();
    });
  });

  describe('fullContent', () => {
    it('reflects data-full-content attribute', () => {
      const wrapper = mount(SLayout, {
        props: { fullContent: true },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-full-content')).toBe('true');

      wrapper.unmount();
    });

    it('defaults data-full-content to false', () => {
      const wrapper = mount(SLayout, {
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-full-content')).toBe('false');

      wrapper.unmount();
    });
  });

  describe('mobile', () => {
    it('does not render mobile drawer when isMobile is false', () => {
      const wrapper = mount(SLayout, {
        props: { isMobile: false },
        slots: {
          sidebar: '<div data-sidebar>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-mobile]').exists()).toBe(false);

      wrapper.unmount();
    });

    it('reflects data-mobile attribute on root', () => {
      const wrapper = mount(SLayout, {
        props: { isMobile: true },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-mobile')).toBe('true');

      wrapper.unmount();
    });
  });

  describe('start gap CSS variable', () => {
    it('sets start gap to sidebar width when expanded', () => {
      const wrapper = mount(SLayout, {
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      const style = wrapper.find('[data-soybean-layout-root]').attributes('style') || '';
      expect(style).toContain('--soybean-layout-start-gap: 15rem');

      wrapper.unmount();
    });

    it('sets start gap to collapsed width when collapsed with icon collapsible', () => {
      const wrapper = mount(SLayout, {
        props: { defaultOpen: false, collapsible: 'icon' },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      const style = wrapper.find('[data-soybean-layout-root]').attributes('style') || '';
      expect(style).toContain('--soybean-layout-start-gap: 3.125rem');

      wrapper.unmount();
    });

    it('sets start gap to 0rem when collapsed with offcanvas collapsible', () => {
      const wrapper = mount(SLayout, {
        props: { defaultOpen: false, collapsible: 'offcanvas' },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      const style = wrapper.find('[data-soybean-layout-root]').attributes('style') || '';
      expect(style).toContain('--soybean-layout-start-gap: 0rem');

      wrapper.unmount();
    });

    it('keeps start gap at sidebar width for floating and inset variants', () => {
      for (const variant of ['floating', 'inset'] as const) {
        const wrapper = mount(SLayout, {
          props: { variant },
          slots: {
            sidebar: '<div>Sidebar</div>',
            default: '<div>Main</div>'
          },
          attachTo: document.body
        });

        const style = wrapper.find('[data-soybean-layout-root]').attributes('style') || '';
        expect(style).toContain('--soybean-layout-start-gap: 15rem');

        wrapper.unmount();
      }
    });

    it('sets start gap to 0px when sidebar is hidden', () => {
      const wrapper = mount(SLayout, {
        props: { sidebarVisible: false },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      const style = wrapper.find('[data-soybean-layout-root]').attributes('style') || '';
      expect(style).toContain('--soybean-layout-start-gap: 0px');

      wrapper.unmount();
    });
  });

  describe('CSS variables', () => {
    it('sets sidebar width CSS variable', () => {
      const wrapper = mount(SLayout, {
        props: { sidebarWidth: 300 },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      const style = wrapper.find('[data-soybean-layout-root]').attributes('style') || '';
      expect(style).toContain('--soybean-sidebar-width');

      wrapper.unmount();
    });

    it('sets header height CSS variable', () => {
      const wrapper = mount(SLayout, {
        props: { headerHeight: 64 },
        slots: {
          sidebar: '<div>Sidebar</div>',
          default: '<div>Main</div>'
        },
        attachTo: document.body
      });

      const style = wrapper.find('[data-soybean-layout-root]').attributes('style') || '';
      expect(style).toContain('--soybean-layout-header-height');

      wrapper.unmount();
    });
  });
});

describe('LayoutTrigger', () => {
  it('renders with aria-expanded reflecting open state', async () => {
    const wrapper = mount(SLayout, {
      props: { defaultOpen: true },
      slots: {
        sidebar: '<div>Sidebar</div>',
        header: () => h(LayoutTrigger),
        default: '<div>Main</div>'
      },
      attachTo: document.body
    });

    await nextTick();

    const trigger = wrapper.find('[data-soybean-layout-trigger]');
    expect(trigger.exists()).toBe(true);
    expect(trigger.attributes('aria-expanded')).toBe('true');

    wrapper.unmount();
  });

  it('reflects aria-expanded false when collapsed', async () => {
    const wrapper = mount(SLayout, {
      props: { defaultOpen: false },
      slots: {
        sidebar: '<div>Sidebar</div>',
        header: () => h(LayoutTrigger),
        default: '<div>Main</div>'
      },
      attachTo: document.body
    });

    await nextTick();

    const trigger = wrapper.find('[data-soybean-layout-trigger]');
    expect(trigger.attributes('aria-expanded')).toBe('false');

    wrapper.unmount();
  });

  it('toggles sidebar open state on click', async () => {
    const wrapper = mount(SLayout, {
      props: { defaultOpen: false },
      slots: {
        sidebar: '<div data-sidebar>Sidebar</div>',
        header: () => h(LayoutTrigger),
        default: '<div>Main</div>'
      },
      attachTo: document.body
    });

    await nextTick();

    const trigger = wrapper.find('[data-soybean-layout-trigger]');
    expect(trigger.attributes('aria-expanded')).toBe('false');

    await trigger.trigger('click');
    await nextTick();

    expect(trigger.attributes('aria-expanded')).toBe('true');

    wrapper.unmount();
  });
});

describe('LayoutRail', () => {
  it('renders with aria-expanded reflecting open state', async () => {
    const wrapper = mount(SLayout, {
      props: { defaultOpen: true },
      slots: {
        sidebar: () => h(LayoutRail),
        default: '<div>Main</div>'
      },
      attachTo: document.body
    });

    await nextTick();

    const rail = wrapper.find('[data-soybean-layout-rail]');
    expect(rail.exists()).toBe(true);
    expect(rail.attributes('aria-expanded')).toBe('true');
    expect(rail.attributes('tabindex')).toBe('-1');

    wrapper.unmount();
  });

  it('reflects aria-expanded false when collapsed', async () => {
    const wrapper = mount(SLayout, {
      props: { defaultOpen: false },
      slots: {
        sidebar: () => h(LayoutRail),
        default: '<div>Main</div>'
      },
      attachTo: document.body
    });

    await nextTick();

    const rail = wrapper.find('[data-soybean-layout-rail]');
    expect(rail.attributes('aria-expanded')).toBe('false');

    wrapper.unmount();
  });

  it('toggles sidebar open state on click', async () => {
    const wrapper = mount(SLayout, {
      props: { defaultOpen: true },
      slots: {
        sidebar: () => h(LayoutRail),
        default: '<div>Main</div>'
      },
      attachTo: document.body
    });

    await nextTick();

    const rail = wrapper.find('[data-soybean-layout-rail]');
    expect(rail.attributes('aria-expanded')).toBe('true');

    await rail.trigger('click');
    await nextTick();

    expect(rail.attributes('aria-expanded')).toBe('false');

    wrapper.unmount();
  });
});
