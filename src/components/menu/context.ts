import { computed, ref, shallowRef, useId } from 'vue';
import { useContext, useDirection, useForwardElement } from '../../composables';
import { getDisclosureState, isPointerInGraceArea } from '../../shared';
import type { AcceptableValue, GraceIntent, HorizontalSide, StringOrNumber } from '../../types';
import type {
  MenuCheckboxGroupContextParams,
  MenuContentContextParams,
  MenuItemIndicatorContextParams,
  MenuRadioGroupContextParams,
  MenuRootContextParams,
  MenuSubContextParams
} from './types';

export const [provideMenuRootContext, useMenuRootContext] = useContext('MenuRoot', (params: MenuRootContextParams) => {
  const [contentElement, setContentElement] = useForwardElement();

  const { open } = params;

  const onOpenChange = (v: boolean) => {
    open.value = v;
  };

  const dataState = computed(() => getDisclosureState(open.value));

  const dir = useDirection(params.dir);

  return {
    ...params,
    dir,
    dataState,
    onOpenChange,
    contentElement,
    setContentElement
  };
});

export const [provideMenuSubContext, useMenuSubContext] = useContext('MenuSub', (params: MenuSubContextParams) => {
  const [subContentElement, setSubContentElement] = useForwardElement();
  const [subTriggerElement, setSubTriggerElement] = useForwardElement();

  const { subOpen } = params;

  const onSubOpenChange = (v: boolean) => {
    subOpen.value = v;
  };

  const dataState = computed(() => getDisclosureState(subOpen.value));

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
    subOpen,
    onSubOpenChange,
    dataState,
    subContentElement,
    setSubContentElement,
    subContentId,
    initSubContentId,
    subTriggerElement,
    setSubTriggerElement,
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

    const onModelValueChange = (v: StringOrNumber[]) => {
      modelValue.value = v;
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

    const onModelValueChange = (v: AcceptableValue) => {
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
