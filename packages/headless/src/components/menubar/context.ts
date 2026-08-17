import { computed, shallowRef, watchEffect } from 'vue';
import { useDirection } from '../config-provider/context';
import { provideMenuUi } from '../menu/context';
import { useCollection, useContext, useUiContext } from '../../composables';
import type { DefinedValue } from '../../types';
import type {
  MenubarCollectionItemData,
  MenubarMenuContextParams,
  MenubarRootContextParams,
  MenubarUiSlot
} from './types';

export const {
  provideCollectionContext: provideMenubarCollectionContext,
  useCollectionContext: useMenubarCollectionContext,
  useCollectionItem: useMenubarCollectionItem
} = useCollection<MenubarCollectionItemData>('Menubar');

export const [provideMenubarRootContext, useMenubarRootContext] = useContext(
  'MenubarRoot',
  (params: MenubarRootContextParams) => {
    const { modelValue, currentTabStopId } = params;

    const dir = useDirection(params.dir);
    const hoverable = computed(() => params.trigger.value === 'hover');

    const isLinkTriggerHovered = shallowRef(false);

    // When `true`, hovering a trigger opens the menu after `delayDuration`;
    // when `false` (a menu was just closed), hovering opens instantly.
    const isOpenDelayed = shallowRef(true);

    let openDelayedTimer: ReturnType<typeof setTimeout> | null = null;
    let openTimer: ReturnType<typeof setTimeout> | null = null;

    const clearOpenDelayedTimer = () => {
      if (openDelayedTimer) {
        clearTimeout(openDelayedTimer);
        openDelayedTimer = null;
      }
    };

    const startOpenDelayedTimer = () => {
      clearOpenDelayedTimer();
      openDelayedTimer = setTimeout(() => {
        isOpenDelayed.value = true;
      }, params.skipDelayDuration.value);
    };

    const resetOpenDelayed = () => {
      clearOpenDelayedTimer();
      isOpenDelayed.value = false;
    };

    const clearOpenTimer = () => {
      if (openTimer) {
        clearTimeout(openTimer);
        openTimer = null;
      }
    };

    const startOpenTimer = (value: DefinedValue) => {
      clearOpenTimer();
      openTimer = setTimeout(() => {
        onMenuOpen(value);
      }, params.delayDuration.value);
    };

    const onMenuOpen = (value: DefinedValue) => {
      clearOpenTimer();
      isLinkTriggerHovered.value = false;
      modelValue.value = value;
      currentTabStopId.value = String(value);
    };

    const onMenuClose = () => {
      clearOpenTimer();
      isLinkTriggerHovered.value = false;
      modelValue.value = '';
    };

    const onMenuToggle = (value: DefinedValue) => {
      clearOpenTimer();
      isLinkTriggerHovered.value = false;
      modelValue.value = modelValue.value ? '' : value;
      currentTabStopId.value = String(value);
    };

    const setTriggerLink = () => {
      clearOpenTimer();
      isLinkTriggerHovered.value = true;
      modelValue.value = '';
    };

    const onHoverPointerEnter = (value: DefinedValue) => {
      // A menu is already open or we're within the skip-delay window: open
      // instantly; otherwise schedule a delayed open.
      if (modelValue.value || !isOpenDelayed.value) {
        onMenuOpen(value);
      } else {
        startOpenTimer(value);
      }
    };

    const onHoverPointerLeave = () => {
      // Cancel a pending delayed open when the pointer leaves before the delay
      // elapses. Closing an already-open menu is handled by the grace area in
      // `MenubarContent`.
      clearOpenTimer();
    };

    watchEffect(() => {
      if (!hoverable.value) return;

      if (modelValue.value) {
        resetOpenDelayed();
      } else {
        startOpenDelayedTimer();
      }
    });

    return {
      ...params,
      dir,
      hoverable,
      isLinkTriggerHovered,
      onMenuOpen,
      onMenuClose,
      onMenuToggle,
      onHoverPointerEnter,
      onHoverPointerLeave,
      setTriggerLink
    };
  }
);

export const [provideMenubarMenuContext, useMenubarMenuContext] = useContext(
  'MenubarMenu',
  (params: MenubarMenuContextParams) => params
);

export const [provideMenubarUi, useMenubarUi] = useUiContext<MenubarUiSlot>('MenubarUi', ui => {
  provideMenuUi(ui);

  return ui;
});
