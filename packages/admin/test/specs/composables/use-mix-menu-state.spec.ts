import { describe, expect, it } from 'vitest';
import { computed, nextTick, ref } from 'vue';
import { useMixMenuState } from '../../../src/components/app-menu/use-mix-menu-state';
import type { AppMenuData } from '../../../src/types';

const data: AppMenuData[] = [
  {
    key: 'dashboard',
    label: 'Dashboard'
  },
  {
    key: 'system',
    label: 'System',
    children: [
      { key: 'users', label: 'Users' },
      {
        key: 'menus',
        label: 'Menus',
        children: [
          { key: 'menus-overview', label: 'Overview' },
          { key: 'menus-config', label: 'Config' }
        ]
      }
    ]
  }
];

describe('useMixMenuState', () => {
  it('splits the tree into first/second/child levels', () => {
    const dataRef = ref(data);
    const selectedKey = ref<string | undefined>('menus-overview');
    const mix = useMixMenuState(
      computed(() => dataRef.value),
      selectedKey
    );

    expect(mix.firstLevelMenus.value).toHaveLength(2);
    expect(mix.activeFirstLevelKey.value).toBe('system');
    expect(mix.secondLevelMenus.value.map(item => item.key)).toEqual(['users', 'menus']);
    expect(mix.activeSecondLevelKey.value).toBe('menus');
    expect(mix.childLevelMenus.value.map(item => item.key)).toEqual(['menus-overview', 'menus-config']);
    expect(mix.isActiveSecondLevelHasChildren.value).toBe(true);
  });

  it('derives a leaf first-level item', () => {
    const dataRef = ref(data);
    const selectedKey = ref<string | undefined>('dashboard');
    const mix = useMixMenuState(
      computed(() => dataRef.value),
      selectedKey
    );

    expect(mix.activeFirstLevelKey.value).toBe('dashboard');
    expect(mix.secondLevelMenus.value).toHaveLength(0);
    expect(mix.isActiveFirstLevelHasChildren.value).toBe(false);
  });

  it('handleSelectFirstLevel switches the active branch without navigating', async () => {
    const dataRef = ref(data);
    const selectedKey = ref<string | undefined>('dashboard');
    const mix = useMixMenuState(
      computed(() => dataRef.value),
      selectedKey
    );

    const hasChildren = mix.handleSelectFirstLevel('system');
    await nextTick();

    expect(hasChildren).toBe(true);
    expect(mix.activeFirstLevelKey.value).toBe('system');
    expect(mix.secondLevelMenus.value).toHaveLength(2);
  });

  it('prunes hidden first-level nodes', () => {
    const dataRef = ref<AppMenuData[]>([{ key: 'hidden', label: 'H', hideInMenu: true }]);
    const selectedKey = ref<string | undefined>(undefined);
    const mix = useMixMenuState(
      computed(() => dataRef.value),
      selectedKey
    );

    expect(mix.firstLevelMenus.value).toHaveLength(0);
  });
});
