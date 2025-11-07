import { computed, ref, shallowRef, useId } from 'vue';
import { useContext, useDirection } from '../../composables';
import { getDisclosureState, isPointerInGraceArea } from '../../shared';
import type { AcceptableBooleanValue, DefinedValue, GraceIntent, HorizontalSide } from '../../types';
import { provideArrowThemeContext } from '../arrow/context';
import { provideDividerThemeContext } from '../divider/context';
import type {
  MenuCheckboxGroupContextParams,
  MenuContentContextParams,
  MenuContextParams,
  MenuItemIndicatorContextParams,
  MenuRadioGroupContextParams,
  MenuRootContextParams,
  MenuThemeContextParams
} from './types';

export const [provideMenuContext, useMenuContext] = useContext('Menu', (params: MenuContextParams) => {
  const { open } = params;

  const contentElement = shallowRef<HTMLElement>();
  const onContentElementChange = (el: HTMLElement) => {
    contentElement.value = el;
  };

  const onOpenChange = (v: boolean) => {
    open.value = v;
  };

  const dataState = computed(() => getDisclosureState(open.value));

  return {
    open,
    onOpenChange,
    dataState,
    contentElement,
    onContentElementChange
  };
});

export const [provideMenuRootContext, useMenuRootContext] = useContext('MenuRoot', (params: MenuRootContextParams) => {
  const dir = useDirection(params.dir);

  return {
    ...params,
    dir
  };
});

export const [provideMenuSubContext, useMenuSubContext] = useContext('MenuSub', () => {
  const subTriggerElement = shallowRef<HTMLElement>();

  const onSubTriggerElementChange = (el: HTMLElement) => {
    subTriggerElement.value = el;
  };

  const subTriggerId = shallowRef('');
  const initSubTriggerId = () => {
    if (subTriggerId.value) return;
    subTriggerId.value = `soybean-menu-sub-trigger-${useId()}`;
  };

  const subContentId = shallowRef('');
  const initSubContentId = () => {
    if (subContentId.value) return;
    subContentId.value = `soybean-menu-sub-content-${useId()}`;
  };

  return {
    subContentId,
    initSubContentId,
    subTriggerElement,
    onSubTriggerElementChange,
    subTriggerId,
    initSubTriggerId
  };
});

export const [provideMenuContentContext, useMenuContentContext] = useContext(
  'MenuContent',
  (params: MenuContentContextParams) => {
    const { contentElement } = params;

    const searchRef = shallowRef('');
    const currentItemId = ref<string | null>(null);
    const pointerGraceTimer = shallowRef(0);
    const pointerSide = shallowRef<HorizontalSide>('right');

    const pointerGraceIntent = ref<GraceIntent | null>(null);
    const onPointerGraceIntentChange = (intent: GraceIntent | null) => {
      pointerGraceIntent.value = intent;
    };
    const resetPointerGraceIntent = () => {
      pointerGraceIntent.value = null;
    };

    const isPointerMovingToSubmenu = (event: PointerEvent) => {
      const isMovingTowards = pointerSide.value === pointerGraceIntent.value?.side;

      return isMovingTowards && isPointerInGraceArea(event, pointerGraceIntent.value?.area);
    };

    const onItemLeave = (event: PointerEvent) => {
      if (isPointerMovingToSubmenu(event)) return;
      contentElement.value?.focus();
      currentItemId.value = null;
    };

    return {
      searchRef,
      currentItemId,
      contentElement,
      pointerSide,
      pointerGraceTimer,
      pointerGraceIntent,
      onPointerGraceIntentChange,
      resetPointerGraceIntent,
      onItemEnter: isPointerMovingToSubmenu,
      onItemLeave,
      onTriggerLeave: isPointerMovingToSubmenu
    };
  }
);

export const [provideMenuCheckboxGroupContext, useMenuCheckboxGroupContext] = useContext(
  'MenuCheckboxGroup',
  (params: MenuCheckboxGroupContextParams) => {
    const { modelValue } = params;

    const onModelValueChange = (v: DefinedValue) => {
      if (!modelValue.value) {
        modelValue.value = [];
      }

      if (modelValue.value.includes(v)) {
        modelValue.value = modelValue.value.filter(item => item !== v);
      } else {
        modelValue.value.push(v);
      }
    };

    return {
      ...params,
      onModelValueChange
    };
  }
);

export const [provideMenuRadioGroupContext, useMenuRadioGroupContext] = useContext(
  'MenuRadioGroup',
  (params: MenuRadioGroupContextParams) => {
    const { modelValue } = params;

    const onModelValueChange = (v: NonNullable<AcceptableBooleanValue>) => {
      modelValue.value = v;
    };

    return {
      ...params,
      onModelValueChange
    };
  }
);

export const [provideMenuItemIndicatorContext, useMenuItemIndicatorContext] = useContext(
  'MenuItemIndicator',
  (params: MenuItemIndicatorContextParams) => params
);

export const [provideMenuThemeContext, useMenuThemeContext] = useContext(
  'MenuTheme',
  (params: MenuThemeContextParams) => {
    const arrowCls = computed(() => params.ui.value.arrow);
    const separatorUi = computed(() => ({ root: params.ui.value.separator, label: null }));

    provideArrowThemeContext(arrowCls);
    provideDividerThemeContext({
      ui: separatorUi
    });

    return params;
  }
);
