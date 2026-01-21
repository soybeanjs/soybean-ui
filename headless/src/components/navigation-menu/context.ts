import { computed, shallowRef } from 'vue';
import { refAutoReset, useDebounceFn } from '@vueuse/core';
import { useCollection, useContext, useForwardElement, useUiContext } from '../../composables';
import { getDisclosureState } from '../../shared';
import { useDirection } from '../config-provider/context';
import type { NavigationMenuItemContextParams, NavigationMenuRootContextParams, NavigationMenuUiSlot } from './types';

export const [provideNavigationMenuRootContext, useNavigationMenuRootContext] = useContext(
  'NavigationMenuRoot',
  (params: NavigationMenuRootContextParams) => {
    const { modelValue, skipDelayDuration, delayDuration, disablePointerLeaveClose } = params;

    const dir = useDirection(params.dir);

    const rootElement = shallowRef<HTMLElement>();
    const onRootElementChange = (node: HTMLElement) => {
      rootElement.value = node;
    };

    const [viewportElement, setViewportElement] = useForwardElement();
    const [indicatorTrackElement, setIndicatorTrackElement] = useForwardElement();

    const activeTriggerElement = shallowRef<HTMLElement>();
    const onActiveTriggerElementChange = (node: HTMLElement) => {
      activeTriggerElement.value = node;
    };

    const values = shallowRef(new Set<string>());

    const addValue = (val: string) => {
      values.value.add(val);
    };
    const removeValue = (val: string) => {
      values.value.delete(val);
    };

    const open = computed(() => values.value.has(modelValue.value));

    const previousValue = shallowRef<string | undefined>('');

    const isDelaySkipped = refAutoReset(false, skipDelayDuration.value);
    const computedDelay = computed(() => {
      const isOpen = modelValue.value !== '';
      if (isOpen || isDelaySkipped.value) {
        // 150ms for user to switch trigger or move into content view
        return 150;
      }
      return delayDuration.value;
    });

    const debouncedFn = useDebounceFn((val?: string) => {
      // passing `undefined` meant to reset the debounce timer
      if (typeof val === 'string') {
        previousValue.value = modelValue.value;
        modelValue.value = val;
      }
    }, computedDelay);

    const onTriggerEnter = (val: string) => {
      debouncedFn(val);
    };

    const onTriggerLeave = () => {
      isDelaySkipped.value = true;
      debouncedFn('');
    };

    const onContentEnter = (val: string) => {
      debouncedFn(val);
    };

    const onContentLeave = () => {
      if (!disablePointerLeaveClose.value) {
        debouncedFn('');
      }
    };

    const onItemSelect = (val: string) => {
      // When selecting item we trigger update immediately
      previousValue.value = modelValue.value;
      modelValue.value = val;
    };

    const onItemDismiss = () => {
      previousValue.value = modelValue.value;
      modelValue.value = '';
    };

    return {
      ...params,
      dir,
      baseId: 'soybean-navigation-menu',
      rootElement,
      onRootElementChange,
      viewportElement,
      setViewportElement,
      indicatorTrackElement,
      setIndicatorTrackElement,
      activeTriggerElement,
      values,
      addValue,
      removeValue,
      open,
      previousValue,
      onActiveTriggerElementChange,
      onTriggerEnter,
      onTriggerLeave,
      onContentEnter,
      onContentLeave,
      onItemSelect,
      onItemDismiss
    };
  }
);

export const { provideCollectionContext, useCollectionContext, useCollectionItem } = useCollection('NavigationMenu');

export const [provideNavigationMenuItemContext, useNavigationMenuItemContext] = useContext(
  'NavigationMenuItem',
  (params: NavigationMenuItemContextParams) => {
    const [focusProxyElement, setFocusProxyElement] = useForwardElement();

    const { modelValue, value } = params;

    const triggerElement = shallowRef<HTMLElement>();
    const onTriggerElementChange = (node: HTMLElement) => {
      triggerElement.value = node;
    };

    const wasEscapeCloseRef = shallowRef(false);

    const open = computed(() => modelValue.value === value);

    const dataState = computed(() => getDisclosureState(open.value));

    return {
      ...params,
      triggerElement,
      onTriggerElementChange,
      focusProxyElement,
      setFocusProxyElement,
      wasEscapeCloseRef,
      open,
      dataState
    };
  }
);

export const [provideNavigationMenuUi, useNavigationMenuUi] = useUiContext<NavigationMenuUiSlot>('NavigationMenuUi');
