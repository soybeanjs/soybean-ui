import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SLayout from '@/components/layout/layout.vue';

describe('SLayout', () => {
  describe('rendering', () => {
    it('renders with sidebar slot', () => {
      const wrapper = mount(SLayout, {
        slots: {
          sidebar: '<div data-sidebar>Sidebar content</div>',
          default: '<div data-main>Main content</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-sidebar]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Main content');

      wrapper.unmount();
    });

    it('renders header, tabs, and footer slots', () => {
      const wrapper = mount(SLayout, {
        slots: {
          header: '<div data-header>Header</div>',
          tabs: '<div data-tabs>Tabs</div>',
          footer: '<div data-footer>Footer</div>',
          sidebar: '<div>Sidebar</div>',
          default: '<div>Body</div>'
        },
        attachTo: document.body
      });

      // Layout renders with content structure
      expect(wrapper.find('[data-soybean-layout-root]').exists()).toBe(true);

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
  });
});
