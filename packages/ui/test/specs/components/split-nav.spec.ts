import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import { mount } from '@vue/test-utils';
import SSplitNav from '@/components/split-nav/split-nav.vue';
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

describe('SSplitNav', () => {
  describe('rendering', () => {
    it('renders the root and first-level rail for dual-vertical mode', () => {
      const wrapper = mount(SSplitNav, {
        props: {
          items,
          mode: 'dual-vertical'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-split-nav-root]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-split-nav-root]').attributes('data-mode')).toBe('dual-vertical');
      expect(wrapper.find('[data-soybean-split-nav-dual-vertical]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-split-nav-vertical-first-level]').exists()).toBe(true);
      expect(wrapper.findAll('[data-soybean-split-nav-first-level-item]')).toHaveLength(3);

      wrapper.unmount();
    });

    it('renders a nested dual-vertical pane for horizontal-dual-vertical when a parent is active', () => {
      const wrapper = mount(SSplitNav, {
        props: {
          items,
          mode: 'horizontal-dual-vertical',
          modelValue: 'workspace'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-split-nav-horizontal-first-level]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-split-nav-dual-vertical]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-split-nav-vertical-first-level]').exists()).toBe(true);
      expect(wrapper.text()).toContain('Projects');
      expect(wrapper.text()).toContain('Tasks');

      wrapper.unmount();
    });

    it('renders horizontal first-level and nested tree for horizontal-vertical', () => {
      const wrapper = mount(SSplitNav, {
        props: {
          items,
          mode: 'horizontal-vertical',
          modelValue: 'workspace'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-split-nav-horizontal-first-level]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-split-nav-sub-vertical]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-split-nav-sub-vertical]').text()).toContain('Projects');

      wrapper.unmount();
    });

    it('renders vertical first-level and nested menubar for vertical-horizontal', () => {
      const wrapper = mount(SSplitNav, {
        props: {
          items,
          mode: 'vertical-horizontal',
          modelValue: 'workspace'
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-split-nav-vertical-first-level]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-split-nav-sub-horizontal]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('forwards first-level-item and item slots', () => {
      const wrapper = mount(SSplitNav, {
        props: {
          items,
          modelValue: 'workspace'
        },
        slots: {
          'first-level-item': ({ item }: { item: { label: string } }) =>
            h('span', { class: 'first-level-slot' }, `Rail:${item.label}`),
          item: ({ item }: { item: { label: string } }) => h('span', { class: 'tree-item-slot' }, `Item:${item.label}`)
        },
        attachTo: document.body
      });

      expect(wrapper.find('.first-level-slot').exists()).toBe(true);
      expect(wrapper.text()).toContain('Rail:Overview');
      expect(wrapper.find('.tree-item-slot').exists()).toBe(true);
      expect(wrapper.text()).toContain('Item:Projects');

      wrapper.unmount();
    });

    it('does not leak as / asChild props to the DOM', () => {
      const wrapper = mount(SSplitNav, {
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
    it('reflects the default active value on the first-level item', () => {
      const wrapper = mount(SSplitNav, {
        props: {
          items,
          defaultValue: 'overview'
        },
        attachTo: document.body
      });

      const activeItem = wrapper.find('[data-soybean-split-nav-first-level-item][data-state="active"]');

      expect(activeItem.exists()).toBe(true);
      expect(activeItem.text()).toContain('Overview');

      wrapper.unmount();
    });

    it('emits update:modelValue and select when a leaf is clicked', async () => {
      const wrapper = mount(SSplitNav, {
        props: {
          items,
          mode: 'dual-vertical'
        },
        attachTo: document.body
      });

      const leaf = wrapper.find('[data-soybean-split-nav-first-level-item][data-value="overview"]');

      await leaf.trigger('click');

      expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('overview');
      expect(wrapper.emitted('select')?.at(-1)?.[0]).toBe('overview');

      wrapper.unmount();
    });

    it('activates a parent without emitting select and drives the nested tree', async () => {
      const wrapper = mount(SSplitNav, {
        props: {
          items,
          mode: 'dual-vertical'
        },
        attachTo: document.body
      });

      const parent = wrapper.find('[data-soybean-split-nav-first-level-item][data-value="workspace"]');

      await parent.trigger('click');

      expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('workspace');
      expect(wrapper.emitted('select')).toBeFalsy();
      expect(wrapper.find('[data-soybean-split-nav-sub-vertical]').text()).toContain('Projects');
      expect(wrapper.find('[data-soybean-split-nav-sub-vertical]').text()).toContain('Tasks');

      wrapper.unmount();
    });
  });

  describe('disabled', () => {
    it('blocks activation for a disabled first-level item', async () => {
      const wrapper = mount(SSplitNav, {
        props: {
          items: disabledItems
        },
        attachTo: document.body
      });

      const locked = wrapper.find('[data-soybean-split-nav-first-level-item][data-value="locked"]');

      expect(locked.attributes('data-disabled')).toBeDefined();

      await locked.trigger('click');

      expect(wrapper.emitted('update:modelValue')).toBeFalsy();

      wrapper.unmount();
    });
  });

  describe('teleport', () => {
    it('mounts the dual-vertical pane as one block into the vertical target', async () => {
      const siderEl = document.createElement('div');
      siderEl.id = 'split-nav-sider';
      document.body.appendChild(siderEl);

      const wrapper = mount(SSplitNav, {
        props: {
          items,
          mode: 'dual-vertical',
          modelValue: 'workspace',
          verticalMountedId: 'split-nav-sider'
        },
        attachTo: document.body
      });

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(siderEl.querySelector('[data-soybean-split-nav-dual-vertical]')).toBeTruthy();
      expect(siderEl.querySelector('[data-soybean-split-nav-vertical-first-level]')).toBeTruthy();
      expect(siderEl.querySelector('[data-soybean-split-nav-sub-vertical]')).toBeTruthy();
      expect(
        wrapper.find('[data-soybean-split-nav-root]').element.querySelector('[data-soybean-split-nav-dual-vertical]')
      ).toBeNull();

      wrapper.unmount();
      siderEl.remove();
    });

    it('mounts horizontal and vertical panes into independent targets', async () => {
      const headerEl = document.createElement('div');
      headerEl.id = 'split-nav-header';
      const siderEl = document.createElement('div');
      siderEl.id = 'split-nav-sider';
      document.body.appendChild(headerEl);
      document.body.appendChild(siderEl);

      const wrapper = mount(SSplitNav, {
        props: {
          items,
          mode: 'horizontal-vertical',
          modelValue: 'workspace',
          horizontalMountedId: 'split-nav-header',
          verticalMountedId: 'split-nav-sider'
        },
        attachTo: document.body
      });

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(headerEl.querySelector('[data-soybean-split-nav-horizontal-first-level]')).toBeTruthy();
      expect(siderEl.querySelector('[data-soybean-split-nav-sub-vertical]')).toBeTruthy();

      wrapper.unmount();
      headerEl.remove();
      siderEl.remove();
    });

    it('mounts vertical-horizontal first-level and menubar into independent targets', async () => {
      const headerEl = document.createElement('div');
      headerEl.id = 'split-nav-vh-header';
      const siderEl = document.createElement('div');
      siderEl.id = 'split-nav-vh-sider';
      document.body.appendChild(headerEl);
      document.body.appendChild(siderEl);

      const wrapper = mount(SSplitNav, {
        props: {
          items,
          mode: 'vertical-horizontal',
          modelValue: 'workspace',
          verticalMountedId: 'split-nav-vh-sider',
          horizontalMountedId: 'split-nav-vh-header'
        },
        attachTo: document.body
      });

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(siderEl.querySelector('[data-soybean-split-nav-vertical-first-level]')).toBeTruthy();
      expect(headerEl.querySelector('[data-soybean-split-nav-sub-horizontal]')).toBeTruthy();
      expect(siderEl.querySelector('[data-soybean-split-nav-sub-horizontal]')).toBeNull();
      expect(headerEl.querySelector('[data-soybean-split-nav-vertical-first-level]')).toBeNull();

      wrapper.unmount();
      headerEl.remove();
      siderEl.remove();
    });
  });

  describe('accessibility', () => {
    it('has no a11y violations in the default state', async () => {
      const wrapper = mount(SSplitNav, {
        props: {
          items
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });

    it('has no a11y violations with an active nested pane', async () => {
      const wrapper = mount(SSplitNav, {
        props: {
          items,
          defaultValue: 'workspace'
        },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element);

      expect(violations).toHaveLength(0);

      wrapper.unmount();
    });
  });
});
