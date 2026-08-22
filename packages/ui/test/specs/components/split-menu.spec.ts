import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import { mount } from '@vue/test-utils';
import SSplitMenu from '@/components/split-menu/split-menu.vue';
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
    children: [
      {
        value: 'projects',
        label: 'Projects',
        icon: 'lucide:folder-kanban',
        children: [
          {
            value: 'soybean-ui',
            label: 'Soybean UI'
          }
        ]
      },
      {
        value: 'tasks',
        label: 'Tasks'
      }
    ]
  },
  {
    value: 'settings',
    label: 'Settings',
    icon: 'lucide:settings'
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
  }
];

describe('SSplitMenu', () => {
  describe('rendering', () => {
    it('renders the split menu root and panels for dual-vertical mode', () => {
      const wrapper = mount(SSplitMenu, {
        props: {
          items,
          mode: 'dual-vertical'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-split-menu-root]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-split-menu-root]').attributes('data-mode')).toBe('dual-vertical');
      expect(wrapper.findAll('[data-soybean-split-menu-panel]')).toHaveLength(2);

      wrapper.unmount();
    });

    it('renders three panels for horizontal-dual-vertical mode', () => {
      const wrapper = mount(SSplitMenu, {
        props: {
          items,
          mode: 'horizontal-dual-vertical'
        },
        attachTo: document.body
      });

      const panels = wrapper.findAll('[data-soybean-split-menu-panel]');

      expect(panels).toHaveLength(3);
      expect(panels[0].attributes('data-orientation')).toBe('horizontal');
      expect(panels[1].attributes('data-depth')).toBe('2');
      expect(panels[2].attributes('data-depth')).toBe('3');

      wrapper.unmount();
    });

    it('exposes the depth data attribute on each panel', () => {
      const wrapper = mount(SSplitMenu, {
        props: {
          items,
          mode: 'horizontal-vertical'
        },
        attachTo: document.body
      });

      const panels = wrapper.findAll('[data-soybean-split-menu-panel]');

      expect(panels[0].attributes('data-depth')).toBe('1');
      expect(panels[0].attributes('data-orientation')).toBe('horizontal');
      expect(panels[1].attributes('data-depth')).toBe('2');
      expect(panels[1].attributes('data-orientation')).toBe('vertical');

      wrapper.unmount();
    });

    it('renders top and bottom slots', () => {
      const wrapper = mount(SSplitMenu, {
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

    it('forwards item slots through the compact wrapper', () => {
      const wrapper = mount(SSplitMenu, {
        props: {
          items
        },
        slots: {
          item: ({ item }: { item: { label: string } }) => h('span', { class: 'split-item-slot' }, `Item:${item.label}`)
        },
        attachTo: document.body
      });

      expect(wrapper.find('.split-item-slot').exists()).toBe(true);
      expect(wrapper.text()).toContain('Item:Overview');

      wrapper.unmount();
    });

    it('does not leak as / asChild props to the DOM', () => {
      const wrapper = mount(SSplitMenu, {
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
  });

  describe('state', () => {
    it('reflects the default active value', () => {
      const wrapper = mount(SSplitMenu, {
        props: {
          items,
          defaultValue: 'overview'
        },
        attachTo: document.body
      });

      const activeItem = wrapper.find('[data-soybean-split-menu-panel] [data-active="true"]');

      expect(activeItem.exists()).toBe(true);
      expect(activeItem.text()).toContain('Overview');

      wrapper.unmount();
    });

    it('emits update:modelValue and select when a leaf is clicked', async () => {
      const wrapper = mount(SSplitMenu, {
        props: {
          items,
          mode: 'dual-vertical'
        },
        attachTo: document.body
      });

      const leafButton = wrapper.findAll('[data-soybean-tree-menu-button]')[0];

      await leafButton.trigger('click');

      expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('overview');
      expect(wrapper.emitted('select')?.at(-1)?.[0]).toBe('overview');

      wrapper.unmount();
    });

    it('drives the second panel with the active level-1 item', async () => {
      const wrapper = mount(SSplitMenu, {
        props: {
          items,
          mode: 'dual-vertical',
          modelValue: 'workspace'
        },
        attachTo: document.body
      });

      // The level-2 panel (depth 2) shows the children of the active level-1 item.
      const panels = wrapper.findAll('[data-soybean-split-menu-panel]');
      const secondPanel = panels[1];

      expect(secondPanel.text()).toContain('Projects');
      expect(secondPanel.text()).toContain('Tasks');

      wrapper.unmount();
    });
  });

  describe('collapsed', () => {
    it('exposes the collapsed state on the root', async () => {
      const wrapper = mount(SSplitMenu, {
        props: {
          items,
          collapsed: true
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-split-menu-root]').attributes('data-state')).toBe('collapsed');

      wrapper.unmount();
    });
  });

  describe('disabled', () => {
    it('blocks activation for a disabled item', async () => {
      const wrapper = mount(SSplitMenu, {
        props: {
          items: disabledItems
        },
        attachTo: document.body
      });

      const lockedButton = wrapper.findAll('[data-soybean-tree-menu-button]')[1];

      expect(lockedButton.attributes('data-disabled')).toBeDefined();

      await lockedButton.trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();

      wrapper.unmount();
    });
  });

  describe('teleport', () => {
    it('mounts horizontal and vertical panels into the target elements', async () => {
      const headerEl = document.createElement('div');
      headerEl.id = 'split-header';
      const siderEl = document.createElement('div');
      siderEl.id = 'split-sider';
      document.body.appendChild(headerEl);
      document.body.appendChild(siderEl);

      const wrapper = mount(SSplitMenu, {
        props: {
          items,
          mode: 'horizontal-vertical',
          horizontalMenuEl: 'split-header',
          verticalMenuEl: 'split-sider'
        },
        attachTo: document.body
      });

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(headerEl.querySelector('[data-soybean-split-menu-panel]')).toBeTruthy();
      expect(siderEl.querySelector('[data-soybean-split-menu-panel]')).toBeTruthy();

      wrapper.unmount();
      headerEl.remove();
      siderEl.remove();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations in the default state', async () => {
      const wrapper = mount(SSplitMenu, {
        props: {
          items
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });

    it('has no a11y violations with an active value', async () => {
      const wrapper = mount(SSplitMenu, {
        props: {
          items,
          defaultValue: 'overview'
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
