import { watch } from 'vue';
import type { WatchSource } from 'vue';
import { useAppLayoutContext } from '../../composables/use-app-layout-context';

/**
 * Report sider-menu facts derived from menu data back to the `AppLayout`
 * context so the layout can adapt the sider width (对齐 soybean-admin
 * `base-layout` 的 `siderWidth` 计算).
 */
export function useSiderMenuSync(options: {
  /** Whether the active first-level branch renders second-level menus. */
  hasSecondLevel?: WatchSource<boolean>;
  /** Whether the pinned child drawer occupies sider space. */
  mixHasDrawer?: WatchSource<boolean>;
}): void {
  const context = useAppLayoutContext();

  if (!context) {
    return;
  }

  if (options.hasSecondLevel) {
    watch(
      options.hasSecondLevel,
      value => {
        context.hasSecondLevel.value = value;
      },
      { immediate: true }
    );
  }

  if (options.mixHasDrawer) {
    watch(
      options.mixHasDrawer,
      value => {
        context.mixHasDrawer.value = value;
      },
      { immediate: true }
    );
  }
}
