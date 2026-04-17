import { shallowRef } from 'vue';
import { useCollection, useContext, useUiContext } from '../../composables';
import { DefinedValue } from '../../types';
import { useDirection } from '../config-provider/context';
import { provideMenuUi } from '../menu/context';
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
    const isLinkTriggerHovered = shallowRef(false);

    const onMenuOpen = (value: DefinedValue) => {
      isLinkTriggerHovered.value = false;
      modelValue.value = value;
      currentTabStopId.value = String(value);
    };

    const onMenuClose = () => {
      isLinkTriggerHovered.value = false;
      modelValue.value = '';
    };

    const onMenuToggle = (value: DefinedValue) => {
      isLinkTriggerHovered.value = false;
      modelValue.value = modelValue.value ? '' : value;
      currentTabStopId.value = String(value);
    };

    const setTriggerLink = () => {
      isLinkTriggerHovered.value = true;
      modelValue.value = '';
    };

    return {
      ...params,
      dir,
      isLinkTriggerHovered,
      onMenuOpen,
      onMenuClose,
      onMenuToggle,
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
