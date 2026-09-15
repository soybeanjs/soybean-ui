import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import SAppShell from '@/components/app-shell/app-shell.vue';
import type { AppShellMode } from '@/components/app-shell/types';
import SBreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import SNavMenu from '@/components/nav-menu/nav-menu.vue';
import SPageTabs from '@/components/page-tabs/page-tabs.vue';
import SSplitNav from '@/components/split-nav/split-nav.vue';
import STreeMenu from '@/components/tree-menu/tree-menu.vue';
import { splitNavPaneMetrics, splitNavVariants } from '@/styles/split-nav';
import type { ThemeSize } from '@/theme';
import { getA11yViolations } from '../../shared/a11y';

const items = [
  {
    value: 'overview',
    label: 'Overview',
    icon: 'lucide:layout-dashboard'
  },
  {
    value: 'draft',
    label: 'Draft',
    icon: 'lucide:file-pen',
    hidden: true
  },
  {
    value: 'workbench',
    label: 'Workbench',
    icon: 'lucide:layout-grid',
    children: [
      {
        value: 'projects',
        label: 'Projects',
        icon: 'lucide:folder-kanban',
        children: [
          {
            value: 'soybean-ui',
            label: 'Soybean UI',
            icon: 'lucide:book-open'
          }
        ]
      },
      {
        value: 'tasks',
        label: 'Tasks',
        icon: 'lucide:list-todo'
      }
    ]
  }
];

const breadcrumbs = [
  {
    value: 'home',
    label: 'Home'
  },
  {
    value: 'overview',
    label: 'Overview'
  }
];

const tabs = [
  {
    value: 'overview',
    label: 'Overview'
  },
  {
    value: 'projects',
    label: 'Projects'
  }
];

const themeSizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

describe('SAppShell', () => {
  describe('rendering', () => {
    it('renders the default sidebar skeleton', () => {
      const wrapper = mount(SAppShell, {
        props: { items },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-app-shell]').attributes('data-mode')).toBe('sidebar');
      expect(wrapper.find('[data-soybean-app-shell-sidebar]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-app-shell-header]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-app-shell-menu-sidebar]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-app-shell-content]').exists()).toBe(true);
      expect(wrapper.findComponent(STreeMenu).exists()).toBe(true);
      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-orientation')).toBe('horizontal');

      wrapper.unmount();
    });

    it('renders the logo slot only when provided', () => {
      const withoutLogo = mount(SAppShell, {
        props: { items },
        attachTo: document.body
      });

      expect(withoutLogo.find('[data-soybean-app-shell-logo]').exists()).toBe(false);

      withoutLogo.unmount();

      const withLogo = mount(SAppShell, {
        props: { items },
        slots: { logo: '<span data-logo>Logo</span>' },
        attachTo: document.body
      });

      expect(withLogo.find('[data-soybean-app-shell-logo]').exists()).toBe(true);
      expect(withLogo.find('[data-logo]').exists()).toBe(true);

      withLogo.unmount();
    });

    it('renders no breadcrumb without an active menu', () => {
      const wrapper = mount(SAppShell, {
        props: { items },
        attachTo: document.body
      });

      expect(wrapper.findComponent(SBreadcrumb).exists()).toBe(false);

      wrapper.unmount();
    });

    it('derives the breadcrumb trail from the menu tree', () => {
      const wrapper = mount(SAppShell, {
        props: { items, modelValue: 'soybean-ui' },
        attachTo: document.body
      });

      const breadcrumb = wrapper.findComponent(SBreadcrumb);

      expect(breadcrumb.exists()).toBe(true);
      expect(breadcrumb.text()).toContain('Workbench');
      expect(breadcrumb.text()).toContain('Projects');
      expect(breadcrumb.text()).toContain('Soybean UI');

      wrapper.unmount();
    });

    it('turns the active menu siblings into an ancestor dropdown', () => {
      const wrapper = mount(SAppShell, {
        props: { items, modelValue: 'soybean-ui' },
        attachTo: document.body
      });

      const crumbs = wrapper.findAll('[data-soybean-breadcrumb-item]');

      expect(crumbs).toHaveLength(3);
      // Ancestors whose menu has children become menu buttons; the last crumb is the page.
      expect(crumbs[0].find('button').attributes('aria-haspopup')).toBe('menu');
      expect(crumbs[1].find('button').attributes('aria-haspopup')).toBe('menu');
      expect(crumbs[2].find('button').exists()).toBe(false);
      expect(crumbs[2].find('[data-soybean-breadcrumb-page]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('prefers explicit breadcrumb data over the derived trail', () => {
      const wrapper = mount(SAppShell, {
        props: { items, modelValue: 'soybean-ui', breadcrumbs },
        attachTo: document.body
      });

      expect(wrapper.findComponent(SBreadcrumb).exists()).toBe(true);

      const breadcrumb = wrapper.findComponent(SBreadcrumb);

      expect(breadcrumb.text()).toContain('Home');
      expect(breadcrumb.text()).not.toContain('Workbench');

      wrapper.unmount();
    });

    it('renders the tabs region only when tabs are provided', () => {
      const withoutTabs = mount(SAppShell, {
        props: { items },
        attachTo: document.body
      });

      expect(withoutTabs.findComponent(SPageTabs).exists()).toBe(false);

      withoutTabs.unmount();

      const withTabs = mount(SAppShell, {
        props: { items, tabs, tabValue: 'overview' },
        attachTo: document.body
      });

      expect(withTabs.findComponent(SPageTabs).exists()).toBe(true);

      withTabs.unmount();
    });

    it('applies the root class and per-slot ui overrides', () => {
      const wrapper = mount(SAppShell, {
        props: {
          items,
          class: 'my-shell',
          ui: { header: 'custom-header' },
          layoutUi: { tab: 'custom-layout-tab' }
        },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-app-shell]').classes()).toContain('my-shell');
      expect(wrapper.find('[data-soybean-app-shell-header]').classes()).toContain('custom-header');
      expect(wrapper.find('[data-soybean-layout-tab]').classes()).toContain('custom-layout-tab');

      wrapper.unmount();
    });

    it('prefers layoutUi over the shell region defaults', () => {
      const wrapper = mount(SAppShell, {
        props: {
          items,
          layoutUi: { header: 'override-header' }
        },
        attachTo: document.body
      });

      const headerClasses = wrapper.find('[data-soybean-layout-header]').classes();

      expect(headerClasses).toContain('override-header');
      expect(headerClasses).not.toContain('bg-background');

      wrapper.unmount();
    });
  });

  describe('modes', () => {
    it('renders the top mode without a sidebar and with a nav menu in the header', () => {
      const wrapper = mount(SAppShell, {
        props: { items, mode: 'top' },
        slots: { logo: '<span data-logo>Logo</span>' },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-app-shell-sidebar]').exists()).toBe(false);
      expect(wrapper.findComponent(SNavMenu).exists()).toBe(true);
      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-orientation')).toBe('vertical');
      expect(wrapper.find('[data-soybean-layout-trigger]').exists()).toBe(false);
      expect(wrapper.find('[data-soybean-app-shell-header] [data-logo]').exists()).toBe(true);

      wrapper.unmount();
    });

    it('drops hidden options for every renderer', () => {
      for (const mode of ['sidebar', 'top', 'dual-vertical'] as const) {
        const wrapper = mount(SAppShell, {
          props: { items, mode },
          attachTo: document.body
        });

        expect(wrapper.text()).not.toContain('Draft');

        wrapper.unmount();
      }
    });

    it('renders the dual-vertical mode in place inside the sidebar', () => {
      const wrapper = mount(SAppShell, {
        props: { items, mode: 'dual-vertical' },
        attachTo: document.body
      });

      expect(wrapper.findComponent(SSplitNav).exists()).toBe(true);
      expect(wrapper.find('[data-soybean-app-shell-menu-sidebar] [data-soybean-split-nav-root]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-split-nav-dual-vertical]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-app-shell-mount-vertical]').exists()).toBe(false);
      expect(wrapper.find('[data-soybean-app-shell-mount-horizontal]').exists()).toBe(false);

      wrapper.unmount();
    });

    it('teleports both panes into the header and sidebar mount targets', () => {
      const scenes: { mode: AppShellMode; header: string; sidebar: string }[] = [
        {
          mode: 'vertical-horizontal',
          header: '[data-soybean-split-nav-sub-horizontal]',
          sidebar: '[data-soybean-split-nav-vertical-first-level]'
        },
        {
          mode: 'horizontal-vertical',
          header: '[data-soybean-split-nav-horizontal-first-level]',
          sidebar: '[data-soybean-split-nav-sub-vertical]'
        },
        {
          mode: 'horizontal-dual-vertical',
          header: '[data-soybean-split-nav-horizontal-first-level]',
          sidebar: '[data-soybean-split-nav-dual-vertical]'
        }
      ];

      for (const scene of scenes) {
        const wrapper = mount(SAppShell, {
          props: { items, mode: scene.mode, modelValue: 'projects' },
          attachTo: document.body
        });

        expect(wrapper.find(`[data-soybean-app-shell-mount-horizontal] ${scene.header}`).exists()).toBe(true);
        expect(wrapper.find(`[data-soybean-app-shell-mount-vertical] ${scene.sidebar}`).exists()).toBe(true);

        wrapper.unmount();
      }
    });
  });

  describe('state reflection', () => {
    it('collapses the sidebar and the menu together via v-model:open', async () => {
      const wrapper = mount(SAppShell, {
        props: { items, defaultOpen: false },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-state')).toBe('collapsed');
      expect(wrapper.find('[data-soybean-tree-menu-root]').attributes('data-state')).toBe('collapsed');

      await wrapper.setProps({ open: true });

      expect(wrapper.find('[data-soybean-layout-root]').attributes('data-state')).toBe('expanded');
      expect(wrapper.find('[data-soybean-tree-menu-root]').attributes('data-state')).toBe('expanded');

      wrapper.unmount();
    });

    it('emits update:open from the header trigger', async () => {
      const wrapper = mount(SAppShell, {
        props: { items, defaultOpen: false },
        attachTo: document.body
      });

      await nextTick();
      await wrapper.find('[data-soybean-layout-trigger]').trigger('click');
      await nextTick();

      expect(wrapper.emitted('update:open')?.at(-1)).toEqual([true]);

      wrapper.unmount();
    });

    it('forwards menu selection through update:modelValue and select', async () => {
      const wrapper = mount(SAppShell, {
        props: { items },
        attachTo: document.body
      });

      const leaf = wrapper
        .findAll('[data-soybean-tree-menu-button]')
        .find(button => button.text().includes('Overview'));

      expect(leaf).toBeDefined();

      await leaf?.trigger('click');
      await nextTick();

      expect(wrapper.emitted('update:modelValue')?.at(-1)?.[0]).toBe('overview');
      expect(wrapper.emitted('select')?.at(-1)?.[0]).toBe('overview');

      wrapper.unmount();
    });

    it('forwards split-nav open events', async () => {
      const wrapper = mount(SAppShell, {
        props: { items, mode: 'dual-vertical' },
        attachTo: document.body
      });

      const railItem = wrapper
        .findAll('[data-soybean-split-nav-first-level-item]')
        .find(item => item.text().includes('Workbench'));

      expect(railItem).toBeDefined();

      await railItem?.trigger('click');
      await nextTick();

      expect(wrapper.emitted('open')?.at(-1)?.[0]).toMatchObject({ value: 'workbench' });

      wrapper.unmount();
    });

    it('overlays the nested pane while the sidebar is collapsed', () => {
      const wrapper = mount(SAppShell, {
        props: { items, mode: 'dual-vertical', modelValue: 'soybean-ui', defaultOpen: false },
        attachTo: document.body
      });

      const region = wrapper.find('[data-soybean-app-shell-menu-sidebar]');

      expect(region.attributes('data-overlay')).toBe('true');
      expect(wrapper.find('[data-soybean-split-nav-sub-vertical]').classes()).toContain('absolute');

      wrapper.unmount();
    });

    it('shows the nested pane when a rail parent is activated while collapsed', async () => {
      const wrapper = mount(SAppShell, {
        props: { items, mode: 'dual-vertical', modelValue: 'overview', defaultOpen: false },
        attachTo: document.body
      });

      expect(wrapper.find('[data-soybean-split-nav-sub-vertical]').exists()).toBe(false);

      const railItem = wrapper
        .findAll('[data-soybean-split-nav-first-level-item]')
        .find(item => item.text().includes('Workbench'));

      expect(railItem).toBeDefined();

      await railItem?.trigger('click');
      await nextTick();

      expect(wrapper.find('[data-soybean-app-shell-menu-sidebar]').attributes('data-overlay')).toBe('true');
      expect(wrapper.find('[data-soybean-split-nav-sub-vertical]').exists()).toBe(true);
      expect(wrapper.find('[data-soybean-layout-root]').attributes('style') ?? '').toContain(
        '--soybean-sidebar-width: 5rem'
      );

      wrapper.unmount();
    });

    it('forwards tab interactions and the active tab', async () => {
      const liveTabs = tabs.map(tab => ({ ...tab }));
      const wrapper = mount(SAppShell, {
        props: { items, tabs: liveTabs, tabValue: 'overview' },
        attachTo: document.body
      });

      const tab = wrapper.findAll('[data-soybean-page-tabs-item]').find(item => item.text().includes('Projects'));

      expect(tab).toBeDefined();

      await tab?.trigger('click');
      await nextTick();

      expect(wrapper.emitted('update:tabValue')?.at(-1)?.[0]).toBe('projects');
      expect(wrapper.emitted('tabClick')?.at(-1)?.[0]).toMatchObject({ value: 'projects' });

      await tab?.find('[data-soybean-page-tabs-close]').trigger('click');
      await nextTick();

      expect(wrapper.emitted('tabClose')?.at(-1)?.[0]).toMatchObject({ value: 'projects' });
      // `SPageTabs` removes a closed tab by mutating the given collection in place;
      // `update:tabs` only fires for bulk operations and reorders.
      expect(liveTabs.map(item => item.value)).toEqual(['overview']);

      wrapper.unmount();
    });
  });

  describe('derived sidebar widths', () => {
    it('keeps the layout defaults for the single-pane modes', () => {
      const sidebar = mount(SAppShell, {
        props: { items },
        attachTo: document.body
      });

      const sidebarStyle = sidebar.find('[data-soybean-layout-root]').attributes('style') ?? '';

      expect(sidebarStyle).toContain('--soybean-sidebar-width: 15rem');
      expect(sidebarStyle).toContain('--soybean-collapsed-sidebar-width: 3.125rem');

      sidebar.unmount();

      const top = mount(SAppShell, {
        props: { items, mode: 'top' },
        attachTo: document.body
      });

      expect(top.find('[data-soybean-layout-root]').attributes('style') ?? '').toContain(
        '--soybean-layout-start-gap: 0px'
      );

      top.unmount();
    });

    it('keeps only the rail while the active menu has no children', () => {
      const wrapper = mount(SAppShell, {
        props: { items, mode: 'dual-vertical', modelValue: 'overview' },
        attachTo: document.body
      });

      const style = wrapper.find('[data-soybean-layout-root]').attributes('style') ?? '';

      expect(style).toContain('--soybean-sidebar-width: 5rem');
      expect(style).toContain('--soybean-collapsed-sidebar-width: 5rem');

      wrapper.unmount();
    });

    it('reserves the nested pane once a first-level menu with children is active', () => {
      const expanded = mount(SAppShell, {
        props: { items, mode: 'dual-vertical', modelValue: 'soybean-ui' },
        attachTo: document.body
      });

      const expandedStyle = expanded.find('[data-soybean-layout-root]').attributes('style') ?? '';

      expect(expandedStyle).toContain('--soybean-sidebar-width: 20rem');
      expect(expandedStyle).toContain('--soybean-collapsed-sidebar-width: 5rem');

      expanded.unmount();

      const collapsed = mount(SAppShell, {
        props: { items, mode: 'dual-vertical', modelValue: 'soybean-ui', defaultOpen: false },
        attachTo: document.body
      });

      // A collapsed sidebar keeps its rail: the pane overlays instead of widening it.
      expect(collapsed.find('[data-soybean-layout-root]').attributes('style') ?? '').toContain(
        '--soybean-layout-start-gap: 5rem'
      );

      collapsed.unmount();
    });

    it('sizes the sidebar to the nested tree pane for horizontal-vertical', () => {
      const expanded = mount(SAppShell, {
        props: { items, mode: 'horizontal-vertical', modelValue: 'soybean-ui' },
        attachTo: document.body
      });

      expect(expanded.find('[data-soybean-layout-root]').attributes('style') ?? '').toContain(
        '--soybean-sidebar-width: 15rem'
      );

      expanded.unmount();

      // No rail in this mode: an empty pane means no sidebar at all.
      const empty = mount(SAppShell, {
        props: { items, mode: 'horizontal-vertical', modelValue: 'overview' },
        attachTo: document.body
      });

      expect(empty.find('[data-soybean-layout-root]').attributes('style') ?? '').toContain(
        '--soybean-sidebar-width: 0rem'
      );

      empty.unmount();
    });

    it('keeps splitNavPaneMetrics in sync with the split-nav recipe tokens', () => {
      for (const size of themeSizes) {
        const classes = splitNavVariants({ size });

        expect(classes.firstLevel).toContain(
          `--soybean-split-nav-first-level-width:${splitNavPaneMetrics[size].rail}rem`
        );
        expect(classes.subVertical).toContain(`--soybean-split-nav-tree-width:${splitNavPaneMetrics[size].tree}rem`);
      }
    });
  });

  describe('accessibility', () => {
    it('has no violations for the sidebar skeleton', async () => {
      const wrapper = mount(SAppShell, {
        props: { items, breadcrumbs, tabs, tabValue: 'overview' },
        slots: { logo: '<span>Logo</span>', footer: '<span>Footer</span>' },
        attachTo: document.body
      });

      const violations = await getA11yViolations(wrapper.element as Element);

      expect(violations.map(violation => `${violation.id}: ${violation.nodes[0]?.html ?? ''}`)).toEqual([]);

      wrapper.unmount();
    });
  });
});
