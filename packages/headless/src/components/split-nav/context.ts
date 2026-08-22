import { computed } from 'vue';
import { useDirection } from '../config-provider/context';
import { provideMenuUi } from '../menu/context';
import { provideMenubarUi } from '../menubar/context';
import { provideTreeMenuUi } from '../tree-menu/context';
import { useContext, useUiContext } from '../../composables';
import type { SplitNavRootContextParams, SplitNavUiSlot } from './types';

export const [provideSplitNavRootContext, useSplitNavRootContext] = useContext(
  'SplitNavRoot',
  (params: SplitNavRootContextParams) => {
    const dir = useDirection(params.dir);

    return {
      ...params,
      dir
    };
  }
);

export const [provideSplitNavUi, useSplitNavUi] = useUiContext<SplitNavUiSlot>('SplitNavUi', ui => {
  const treeUi = computed(() => ({
    root: ui.value.subVertical,
    item: ui.value.item,
    button: ui.value.item,
    itemLabel: ui.value.itemLabel,
    itemLinkIcon: ui.value.itemLinkIcon,
    collapsibleIcon: ui.value.collapsibleIcon,
    group: ui.value.group,
    groupLabel: ui.value.groupLabel,
    sub: ui.value.sub
  }));

  provideTreeMenuUi(treeUi);

  const menubarUi = computed(() => ({
    root: ui.value.subHorizontal,
    trigger: ui.value.trigger,
    triggerIcon: ui.value.triggerIcon,
    item: ui.value.item,
    itemIcon: ui.value.itemIcon,
    itemLabel: ui.value.itemLabel,
    itemLinkIcon: ui.value.itemLinkIcon,
    shortcut: ui.value.shortcut,
    separator: ui.value.separator
  }));

  const menuUi = computed(() => ({
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
