import { describe, expect, it } from 'vitest';
import { h, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import STreeMenu from '@/components/tree-menu/tree-menu.vue';
import { getA11yViolations } from '../../shared/a11y';

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

const actionItems = [
  {
    value: 'design-engineering',
    label: 'Design Engineering',
    icon: 'lucide:frame',
    actions: [
      {
        label: 'Edit',
        value: 'edit',
        icon: 'lucide:pencil'
      },
      {
        label: 'Delete',
        value: 'delete',
        icon: 'lucide:trash'
      }
    ]
  },
  {
    value: 'plain',
    label: 'Plain'
  }
];

const disabledItems = [
  {
    value: 'overview',
    label: 'Overview'
  },
  {
    value: 'locked',
    label: 'Locked',
    disabled: true
  },
  {
    value: 'section',
    label: 'Section',
    disabled: true,
    children: [
      {
        value: 'child',
        label: 'Child'
      }
    ]
  }
];

const keyboardItems = [
  {
    value: 'overview',
    label: 'Overview'
  },
  {
    value: 'locked',
    label: 'Locked',
    disabled: true
  },
  {
    value: 'projects',
    label: 'Projects'
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
];

function getButtonWithText(wrapper: VueWrapper, label: string) {
  const button = wrapper.findAll('[data-soybean-tree-menu-button]').find(item => item.text().includes(label));

  if (!button) {
    throw new Error(`tree menu button with text "${label}" not found`);
  }

  return button;
}

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

    it('renders nested children only when the parent is expanded', () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          defaultExpanded: ['settings']
        },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Profile');
      expect(wrapper.text()).toContain('Security');
      expect(wrapper.text()).not.toContain('Child-of-workspace');

      wrapper.unmount();
    });

    it('renders group labels for group items', () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items
        },
        attachTo: document.body
      });

      const groupLabel = wrapper.find('[data-soybean-tree-menu-group-label]');

      expect(groupLabel.exists()).toBe(true);
      expect(groupLabel.text()).toContain('Workspace');

      wrapper.unmount();
    });

    it('renders top and bottom slots', () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items
        },
        slots: {
          top: '<div data-top>Top</div>',
          bottom: '<div data-bottom>Bottom</div>'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-top]').exists()).toBe(true);
      expect(wrapper.find('[data-bottom]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('renders a link item as an anchor', () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items: [
            {
              value: 'soybean',
              label: 'Soybean UI',
              href: 'https://ui.soybeanjs.cn'
            }
          ]
        },
        attachTo: document.body
      });

      const link = wrapper.find('a[data-soybean-tree-menu-button]');

      expect(link.exists()).toBe(true);
      expect(link.attributes('href')).toBe('https://ui.soybeanjs.cn');

      wrapper.unmount();
    });

    it('renders the item actions trigger with a localized aria-label', () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items: actionItems
        },
        attachTo: document.body
      });

      const actionButton = wrapper.find('[data-soybean-dropdown-menu-trigger]');

      expect(actionButton.exists()).toBe(true);
      expect(actionButton.attributes('aria-label')).toBe('Open Design Engineering actions');

      wrapper.unmount();
    });

    it('does not leak as / asChild props to the DOM', () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items
        },
        attachTo: document.body
      });
      const html = wrapper.html();

      expect(html).not.toContain('aschild');
      expect(html).not.toMatch(/as="/);

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

    it('forwards item-leading and item-trailing slots', () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items
        },
        slots: {
          'item-leading': ({ item }) => h('span', { class: 'leading-slot' }, `Lead:${item.label}`),
          'item-trailing': ({ item }) => h('span', { class: 'trailing-slot' }, `Trail:${item.label}`)
        },
        attachTo: document.body
      });

      expect(wrapper.find('.leading-slot').exists()).toBe(true);
      expect(wrapper.find('.trailing-slot').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('state', () => {
    it('activates the default value on mount', () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          defaultValue: 'overview'
        },
        attachTo: document.body
      });

      const activeButton = wrapper.find('[data-soybean-tree-menu-button][data-active="true"]');

      expect(activeButton.exists()).toBe(true);
      expect(activeButton.text()).toContain('Overview');

      wrapper.unmount();
    });

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

    it('respects a controlled modelValue', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          modelValue: 'overview'
        },
        attachTo: document.body
      });

      await wrapper.findAll('[data-soybean-tree-menu-button]')[0].trigger('click');

      expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('overview');

      await wrapper.setProps({ modelValue: 'projects' });

      expect(wrapper.find('[data-soybean-tree-menu-button][data-active="true"]').text()).toContain('Projects');

      wrapper.unmount();
    });
  });

  describe('expand and collapse', () => {
    it('expands a parent on click and exposes the collapsible state', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items
        },
        attachTo: document.body
      });

      expect(wrapper.text()).not.toContain('Profile');

      const parentTrigger = wrapper.find('[data-soybean-tree-menu-collapsible-trigger]');

      expect(parentTrigger.attributes('aria-expanded')).toBe('false');

      await parentTrigger.trigger('click');

      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('true');
      expect(wrapper.text()).toContain('Profile');

      wrapper.unmount();
    });

    it('collapses an expanded parent on a second click', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          defaultExpanded: ['settings']
        },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Profile');

      await wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').trigger('click');

      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('false');
      expect(wrapper.text()).not.toContain('Profile');

      wrapper.unmount();
    });

    it('emits update:expanded for a controlled expanded state', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items
        },
        attachTo: document.body
      });

      await wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').trigger('click');

      expect(wrapper.emitted('update:expanded')?.at(-1)?.[0]).toEqual(['settings']);

      wrapper.unmount();
    });

    it('restores the expanded state after toggling collapse off', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          defaultExpanded: ['settings']
        },
        attachTo: document.body
      });

      expect(wrapper.text()).toContain('Profile');

      await wrapper.setProps({ collapsed: true });
      await nextTick();

      expect(wrapper.find('[data-soybean-tree-menu-root]').attributes('data-state')).toBe('collapsed');
      expect(wrapper.text()).not.toContain('Profile');

      await wrapper.setProps({ collapsed: false });
      await nextTick();

      expect(wrapper.find('[data-soybean-tree-menu-root]').attributes('data-state')).toBe('expanded');
      expect(wrapper.text()).toContain('Profile');

      wrapper.unmount();
    });
  });

  describe('expand strategy', () => {
    it('defaults to "keep" and preserves manual expansion when another item is activated', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          defaultExpanded: ['settings']
        },
        attachTo: document.body
      });

      const trigger = wrapper.find('[data-soybean-tree-menu-collapsible-trigger]');

      expect(trigger.attributes('aria-expanded')).toBe('true');

      await getButtonWithText(wrapper, 'Security').trigger('click');

      expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('security');
      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('true');
      expect(wrapper.text()).toContain('Profile');
      expect(wrapper.emitted('update:expanded')).toBeFalsy();

      wrapper.unmount();
    });

    it('"active" strategy expands only the active menu and its ancestors on mount', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          expandStrategy: 'active',
          defaultValue: 'security'
        },
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('true');
      expect(wrapper.text()).toContain('Security');
      expect(wrapper.text()).toContain('Profile');

      wrapper.unmount();
    });

    it('"active" strategy emits update:expanded without group nodes', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          expandStrategy: 'active',
          defaultValue: 'security'
        },
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.emitted('update:expanded')?.at(-1)?.[0]).toEqual(['settings', 'security']);

      wrapper.unmount();
    });

    it('"active" strategy collapses non-active branches when the active menu changes', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          expandStrategy: 'active',
          defaultValue: 'security'
        },
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('true');

      await getButtonWithText(wrapper, 'Projects').trigger('click');
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('projects');
      expect(wrapper.emitted('update:expanded')?.at(-1)?.[0]).toEqual(['projects']);
      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('false');
      expect(wrapper.text()).not.toContain('Profile');

      wrapper.unmount();
    });

    it('"active" strategy expands nothing when no menu is active', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          expandStrategy: 'active'
        },
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('false');
      expect(wrapper.text()).not.toContain('Profile');

      wrapper.unmount();
    });

    it('"active" strategy expands nothing when the active value is not in the tree', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          expandStrategy: 'active',
          defaultValue: 'missing'
        },
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('false');

      wrapper.unmount();
    });

    it('switching from "keep" to "active" collapses the menu to the active path', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          defaultValue: 'security',
          defaultExpanded: ['settings']
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('true');

      await wrapper.setProps({ expandStrategy: 'active' });
      await nextTick();

      expect(wrapper.emitted('update:expanded')?.at(-1)?.[0]).toEqual(['settings', 'security']);
      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('true');

      wrapper.unmount();
    });

    it('switching from "active" to "keep" preserves the current expansion', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          expandStrategy: 'active',
          defaultValue: 'security'
        },
        attachTo: document.body
      });

      await nextTick();

      await wrapper.setProps({ expandStrategy: 'keep' });
      await nextTick();

      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('true');
      expect(wrapper.text()).toContain('Profile');

      wrapper.unmount();
    });

    it('"active" strategy re-syncs the active path after uncollapsing', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          expandStrategy: 'active',
          defaultValue: 'security',
          collapsed: true
        },
        attachTo: document.body
      });

      await nextTick();

      expect(wrapper.find('[data-soybean-tree-menu-root]').attributes('data-state')).toBe('collapsed');

      await wrapper.setProps({ collapsed: false });
      await nextTick();

      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('true');
      expect(wrapper.text()).toContain('Security');

      wrapper.unmount();
    });
  });

  describe('collapsed', () => {
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

  describe('disabled', () => {
    it('blocks activation for a disabled item', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items: disabledItems,
          modelValue: 'overview'
        },
        attachTo: document.body
      });

      const lockedButton = wrapper.findAll('[data-soybean-tree-menu-button]')[1];

      expect(lockedButton.attributes('data-disabled')).toBeDefined();

      await lockedButton.trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();

      wrapper.unmount();
    });

    it('blocks expansion for a disabled parent', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items: disabledItems
        },
        attachTo: document.body
      });

      const sectionTrigger = wrapper.find('[data-soybean-tree-menu-collapsible-trigger]');

      await sectionTrigger.trigger('click');

      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('false');
      expect(wrapper.text()).not.toContain('Child');

      wrapper.unmount();
    });
  });

  describe('keyboard', () => {
    it('renders interactive elements as native buttons', () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items
        },
        attachTo: document.body
      });

      const buttons = wrapper.findAll('[data-soybean-tree-menu-button]');

      expect(buttons.length).toBeGreaterThan(0);
      buttons.forEach(button => {
        expect(button.element.tagName).toBe('BUTTON');
      });

      wrapper.unmount();
    });

    it('marks the collapsible trigger with aria-expanded for screen readers', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          defaultExpanded: ['settings']
        },
        attachTo: document.body
      });

      // the content id is initialized in the content component setup, wait for it to settle
      await nextTick();
      await nextTick();

      const trigger = wrapper.find('[data-soybean-tree-menu-collapsible-trigger]');

      expect(trigger.attributes('aria-expanded')).toBe('true');
      expect(trigger.attributes('aria-controls')).toBeTruthy();

      wrapper.unmount();
    });

    it('marks the active item button with aria-current semantics via data-active', () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          defaultValue: 'overview'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-tree-menu-button][data-active="true"]').exists()).toBe(true);

      wrapper.unmount();
    });
  });

  describe('keyboard navigation', () => {
    it('exposes the tree semantics', () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items,
          defaultExpanded: ['settings']
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-tree-menu-root]').attributes('role')).toBe('tree');

      const item = wrapper.find('[data-soybean-tree-menu-item]');

      // The item wrapper carries the treeitem role and its selection state.
      expect(item.attributes('role')).toBe('treeitem');
      expect(item.attributes('aria-selected')).toBe('false');

      // Nested lists become groups.
      expect(wrapper.find('[data-soybean-tree-menu-sub]').attributes('role')).toBe('group');

      wrapper.unmount();
    });

    it('converges to a single tab stop and focuses the active item on entry', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items: keyboardItems,
          defaultExpanded: ['settings'],
          defaultValue: 'profile'
        },
        attachTo: document.body
      });

      const buttons = wrapper.findAll('[data-soybean-tree-menu-button]');

      // Every item is removed from the natural tab order.
      buttons.forEach(button => {
        expect(button.attributes('tabindex')).toBe('-1');
      });

      // Entering the tree focuses the active item.
      await wrapper.find('[data-soybean-tree-menu-root]').trigger('focus');
      await nextTick();

      expect(document.activeElement?.textContent).toContain('Profile');
      expect(getButtonWithText(wrapper, 'Profile').attributes('tabindex')).toBe('0');

      wrapper.unmount();
    });

    it('roams visible items with ↓/↑, skips disabled items and stops at the edges', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items: keyboardItems
        },
        attachTo: document.body
      });

      const [overview, , projects] = wrapper.findAll('[data-soybean-tree-menu-button]');

      (overview.element as HTMLElement).focus();

      // The disabled "locked" item is skipped.
      await overview.trigger('keydown', { key: 'ArrowDown' });
      await nextTick();

      expect(document.activeElement).toBe(projects.element);

      // No wrap-around at the end: focus stays on the last item.
      const settings = getButtonWithText(wrapper, 'Settings');
      (settings.element as HTMLElement).focus();

      await settings.trigger('keydown', { key: 'ArrowDown' });
      await nextTick();

      expect(document.activeElement).toBe(settings.element);

      await settings.trigger('keydown', { key: 'ArrowUp' });
      await nextTick();

      expect(document.activeElement).toBe(projects.element);

      wrapper.unmount();
    });

    it('expands, enters children, returns to the parent and collapses with ←/→', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items: keyboardItems
        },
        attachTo: document.body
      });

      const settings = getButtonWithText(wrapper, 'Settings');
      (settings.element as HTMLElement).focus();

      // Closed branch: expands in place, focus does not move.
      await settings.trigger('keydown', { key: 'ArrowRight' });
      await nextTick();

      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('true');
      expect(document.activeElement).toBe(settings.element);

      // Expanded branch: moves into the first child.
      await settings.trigger('keydown', { key: 'ArrowRight' });
      await nextTick();

      expect(document.activeElement?.textContent).toContain('Profile');

      // Leaf child: ← returns to the parent.
      const profile = getButtonWithText(wrapper, 'Profile');
      await profile.trigger('keydown', { key: 'ArrowLeft' });
      await nextTick();

      expect(document.activeElement).toBe(settings.element);

      // Expanded branch: ← collapses in place.
      await settings.trigger('keydown', { key: 'ArrowLeft' });
      await nextTick();

      expect(wrapper.find('[data-soybean-tree-menu-collapsible-trigger]').attributes('aria-expanded')).toBe('false');
      expect(document.activeElement).toBe(settings.element);

      wrapper.unmount();
    });

    it('treats ← on a root-level leaf as a no-op', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items: keyboardItems
        },
        attachTo: document.body
      });

      const overview = getButtonWithText(wrapper, 'Overview');
      (overview.element as HTMLElement).focus();

      await overview.trigger('keydown', { key: 'ArrowLeft' });
      await nextTick();

      expect(document.activeElement).toBe(overview.element);
      expect(wrapper.emitted('update:expanded')).toBeFalsy();

      wrapper.unmount();
    });

    it('jumps to the first and last visible item with Home/End', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items: keyboardItems,
          defaultExpanded: ['settings']
        },
        attachTo: document.body
      });

      const security = getButtonWithText(wrapper, 'Security');
      (security.element as HTMLElement).focus();

      await security.trigger('keydown', { key: 'Home' });
      await nextTick();

      expect(document.activeElement?.textContent).toContain('Overview');

      const overview = getButtonWithText(wrapper, 'Overview');
      await overview.trigger('keydown', { key: 'End' });
      await nextTick();

      expect(document.activeElement?.textContent).toContain('Security');

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

    it('has no a11y violations in the collapsed state', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          collapsed: true,
          items: collapsedItems
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });

    it('has no a11y violations with item actions', async () => {
      const wrapper = mount(STreeMenu, {
        props: {
          items: actionItems
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
