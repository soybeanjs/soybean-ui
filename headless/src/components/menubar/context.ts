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

    const onMenuOpen = (value: DefinedValue) => {
      modelValue.value = value;
      currentTabStopId.value = String(value);
    };

    const onMenuClose = () => {
      modelValue.value = '';
    };

    const onMenuToggle = (value: DefinedValue) => {
      modelValue.value = modelValue.value ? '' : value;
      currentTabStopId.value = String(value);
    };

    const setTriggerLink = () => {
      modelValue.value = '__MENUBAR_TRIGGER_LINK__';
    };

    return {
      ...params,
      dir,
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
