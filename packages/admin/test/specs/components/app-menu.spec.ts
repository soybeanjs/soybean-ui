import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { toTreeMenuOptions, toNavigationMenuOptions, toMenuOptions } from '../../../src/components/app-menu/shared';
import { SAppMenu } from '../../../src/components/app-menu';
import type { AppMenuData, AppMenuMode } from '../../../src/types';

const menuData: AppMenuData[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'lucide:layout-dashboard'
  },
  {
    key: 'system',
    label: 'System',
    icon: 'lucide:settings',
    badge: '3',
    children: [
      { key: 'users', label: 'Users', icon: 'lucide:users' },
      { key: 'roles', label: 'Roles', icon: 'lucide:shield', hideInMenu: true }
    ]
  }
];

describe('toTreeMenuOptions', () => {
  it('maps AppMenuData to tree menu options', () => {
    const options = toTreeMenuOptions(menuData);
    expect(options).toHaveLength(2);
    expect(options[0]).toMatchObject({ value: 'dashboard', label: 'Dashboard' });
  });

  it('prunes hidden nodes', () => {
    const options = toTreeMenuOptions(menuData);
    const system = options[1];
    expect(system.value).toBe('system');
    expect(system.children).toHaveLength(1);
    expect(system.children?.[0].value).toBe('users');
  });

  it('omits children when all descendants are hidden', () => {
    const options = toTreeMenuOptions([
      { key: 'a', label: 'A', children: [{ key: 'a1', label: 'A1', hideInMenu: true }] }
    ]);
    expect(options[0].children).toBeUndefined();
  });
});

describe('toNavigationMenuOptions', () => {
  it('maps AppMenuData to navigation menu options', () => {
    const options = toNavigationMenuOptions(menuData);
    expect(options).toHaveLength(2);
    expect(options[0]).toMatchObject({ value: 'dashboard', label: 'Dashboard' });
  });

  it('prunes hidden nodes', () => {
    const options = toNavigationMenuOptions(menuData);
    const system = options[1];
    expect(system.children).toHaveLength(1);
    expect(system.children?.[0].value).toBe('users');
  });
});

describe('toMenuOptions', () => {
  it('maps AppMenuData to menubar options', () => {
    const options = toMenuOptions(menuData);
    expect(options).toHaveLength(2);
    expect(options[0]).toMatchObject({ value: 'dashboard', label: 'Dashboard' });
  });

  it('prunes hidden nodes', () => {
    const options = toMenuOptions(menuData);
    const system = options[1];
    expect(system.children).toHaveLength(1);
    expect(system.children?.[0].value).toBe('users');
  });
});

describe('SAppMenu', () => {
  it('renders the tree menu with mapped options', () => {
    const wrapper = mount(SAppMenu, {
      props: { data: menuData }
    });
    expect(wrapper.find('[data-soybean-tree-menu-root]').exists()).toBe(true);
  });

  const modeMarkers: Array<[AppMenuMode, string]> = [
    ['vertical', '[data-soybean-tree-menu-root]'],
    ['vertical-mix', '[data-soybean-first-level-menu-root]'],
    ['vertical-hybrid', '[data-soybean-app-vertical-hybrid]'],
    ['horizontal', '[data-soybean-app-horizontal]'],
    ['top-sidebar', '[data-soybean-app-top-sidebar]'],
    ['top-header', '[data-soybean-app-top-header]']
  ];

  it.each(modeMarkers)('renders the %s mode branch', (mode, marker) => {
    const wrapper = mount(SAppMenu, {
      props: { data: menuData, mode },
      global: { stubs: { RouterLink: true } }
    });
    expect(wrapper.find(marker).exists()).toBe(true);
  });

  it('emits update:selectedKey when a tree leaf is selected', async () => {
    const wrapper = mount(SAppMenu, {
      props: { data: menuData }
    });
    wrapper.vm.$emit('update:selectedKey', 'dashboard');
    expect(wrapper.emitted('update:selectedKey')).toBeTruthy();
    expect(wrapper.emitted('select')).toBeUndefined();
  });
});
