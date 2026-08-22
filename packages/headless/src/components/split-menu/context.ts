import { computed } from 'vue';
import { useDirection } from '../config-provider/context';
import { provideMenuUi } from '../menu/context';
import { provideMenubarUi } from '../menubar/context';
import { provideTreeMenuUi } from '../tree-menu/context';
import { useContext, useUiContext } from '../../composables';
import type { SplitMenuItemContext, SplitMenuRootContextParams, SplitMenuUiSlot } from './types';

export const [provideSplitMenuRootContext, useSplitMenuRootContext] = useContext(
  'SplitMenuRoot',
  (params: SplitMenuRootContextParams) => {
    const { modelValue, collapsed } = params;

    const dir = useDirection(params.dir);
    const onModelValueChange = (value: string) => {
      modelValue.value = value;
    };
    const onCollapsedChange = (value: boolean) => {
      collapsed.value = value;
    };

    return {
      ...params,
      dir,
      onModelValueChange,
      onCollapsedChange
    };
  }
);

export const [provideSplitMenuItemContext, useSplitMenuItemContext] = useContext<SplitMenuItemContext>('SplitMenuItem');

export const [provideSplitMenuUi, useSplitMenuUi] = useUiContext<SplitMenuUiSlot>('SplitMenuUi', ui => {
  // Forward the SplitMenu slot classes into the nested TreeMenu / Menubar /
  // Menu UiContexts so the item primitives pick up the shared classes.
  const treeUi = computed(() => ({
    root: ui.value.panelVertical,
    item: ui.value.item,
    button: ui.value.item,
    itemLabel: ui.value.itemLabel,
    itemLinkIcon: ui.value.itemLinkIcon,
    collapsibleIcon: ui.value.collapsibleIcon
  }));

  provideTreeMenuUi(treeUi);

  const menuUi = computed(() => ({
    item: ui.value.item,
    itemIcon: ui.value.itemIcon,
    itemLabel: ui.value.itemLabel,
    itemLinkIcon: ui.value.itemLinkIcon,
    itemIndicator: ui.value.itemIcon,
    shortcut: ui.value.shortcut,
    separator: ui.value.separator
  }));

  const menubarUi = computed(() => ({
    root: ui.value.panelHorizontal,
    trigger: ui.value.trigger,
    triggerIcon: ui.value.triggerIcon,
    item: ui.value.item,
    itemIcon: ui.value.itemIcon,
    itemLabel: ui.value.itemLabel,
    itemLinkIcon: ui.value.itemLinkIcon,
    shortcut: ui.value.shortcut,
    separator: ui.value.separator
  }));

  provideMenubarUi(menubarUi);
  provideMenuUi(menuUi);

  return ui;
});
