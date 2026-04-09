import { shallowRef, useId } from 'vue';
import { useCollection, useContext } from '../../composables';
import { useDirection } from '../config-provider/context';
import type {
  MenubarCollectionItemData,
  MenubarMenuContextParams,
  MenubarRootContextParams
} from './types';

export const { provideCollectionContext, useCollectionContext, useCollectionItem } =
  useCollection<MenubarCollectionItemData>('Menubar');

export const [provideMenubarRootContext, useMenubarRootContext] = useContext(
  'MenubarRoot',
  (params: MenubarRootContextParams) => {
    const { currentTabStopId, modelValue } = params;

    const dir = useDirection(params.dir);

    const onMenuOpen = (value: string) => {
      modelValue.value = value;
      currentTabStopId.value = value;
    };

    const onMenuClose = () => {
      modelValue.value = '';
    };

    const onMenuToggle = (value: string) => {
      modelValue.value = modelValue.value ? '' : value;
      currentTabStopId.value = value;
    };

    return {
      ...params,
      dir,
      onMenuOpen,
      onMenuClose,
      onMenuToggle
    };
  }
);

export const [provideMenubarMenuContext, useMenubarMenuContext] = useContext(
  'MenubarMenu',
  (params: MenubarMenuContextParams) => {
    const contentIdBase = useId();
    const triggerIdBase = useId();

    const contentId = shallowRef('');
    const initContentId = () => {
      if (contentId.value) return;

      contentId.value = `soybean-menubar-content-${contentIdBase}`;
    };

    const triggerElement = shallowRef<HTMLElement>();
    const onTriggerElementChange = (element: HTMLElement) => {
      triggerElement.value = element;
    };

    const triggerId = shallowRef('');
    const initTriggerId = () => {
      if (triggerId.value) return;

      triggerId.value = `soybean-menubar-trigger-${triggerIdBase}`;
    };

    const wasKeyboardTriggerOpenRef = shallowRef(false);

    return {
      ...params,
      contentId,
      initContentId,
      triggerElement,
      triggerId,
      initTriggerId,
      onTriggerElementChange,
      wasKeyboardTriggerOpenRef
    };
  }
);
