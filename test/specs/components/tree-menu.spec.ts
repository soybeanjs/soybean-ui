import { describe, expect, it } from 'vitest';
import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { getA11yViolations } from '../../shared/a11y';
import STreeMenu from '../../../src/components/tree-menu/tree-menu.vue';

const items = [
  {
    value: 'overview',
    label: 'Overview',
    icon: 'lucide:house'
  },
  {
    value: 'workspace',
    label: 'Workspace',
    icon: 'lucide:folder-tree',
    isGroup: true,
    children: [
      {
        value: 'projects',
        label: 'Projects',
        badge: 'New'
      },
      {
        value: 'settings',
        label: 'Settings',
        children: [
          {
            value: 'profile',
            label: 'Profile'
          },
          {
            value: 'security',
            label: 'Security'
          }
        ]
      }
    ]
  }
];

const collapsedItems = [
  {
    value: 'analytics',
    label: 'Analytics',
    icon: 'lucide:chart-column',
    dropdownMenuProps: {
      open: true,
      portalProps: { disabled: true }
    },
    children: [
      {
        value: 'reports',
        label: 'Reports'
      },
      {
        value: 'insights',
        label: 'Insights'
      }
    ]
  }
];

describe('STreeMenu', () => {
  describe('rendering', () => {
    it('renders the compact tree menu structure', () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          expanded: ['settings']
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-tree-menu-root]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Workspace');
      expect(wrapper.text()).toContain('Projects');
      expect(wrapper.text()).toContain('Profile');

      wrapper.unmount();
    });

    it('forwards item slots through the compact wrapper', () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items
        },
        slots: {
          item: ({ item }) => h('span', { class: 'tree-menu-item-slot' }, `Item:${item.label}`)
        },
        attachTo: document.body
      });

      expect(wrapper.find('.tree-menu-item-slot').exists()).toBe(true);
      expect(wrapper.text()).toContain('Item:Overview');

      wrapper.unmount();
    });
  });

  describe('active state', () => {
    it('emits update:modelValue when a leaf item is clicked', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          modelValue: 'projects'
        },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-tree-menu-button]')[0].trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0][0]).toBe('overview');

      wrapper.unmount();
    });

    it('renders collapsed child menus with dropdown-menu compact', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          collapsed: true,
          items: collapsedItems,
          modelValue: 'analytics'
        },
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[data-soybean-tree-menu-root]').attributes('data-state')).toBe('collapsed');
      expect(document.body.textContent).toContain('Reports');
      expect(document.body.textContent).toContain('Insights');

      wrapper.unmount();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations in the default expanded state', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          expanded: ['settings']
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
