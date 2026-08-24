import { computed, shallowReactive, shallowRef, useId } from 'vue';
import type { ComputedRef, ShallowRef } from 'vue';
import { getDisclosureState } from '../../shared';
import { useContext, useUiContext } from '../../composables';
import type { Direction } from '../../types';
import type {
  PopperV2OpenChangeReason,
  PopperV2PositionerContextParams,
  PopperV2ReferenceElement,
  PopperV2RootContext,
  PopperV2TriggerConfiguration,
  PopperV2TriggerType,
  PopperV2UiSlot
} from './types';

interface PopperV2RootContextParams {
  open: ShallowRef<boolean>;
  reason: ShallowRef<PopperV2OpenChangeReason>;
  dir: ComputedRef<Direction>;
  modal: ComputedRef<boolean | undefined>;
  disabled: ComputedRef<boolean>;
  parent: PopperV2RootContext | undefined;
  onOpenChange: (value: boolean, reason: PopperV2OpenChangeReason) => void;
}

const defaultTriggerConfiguration: PopperV2TriggerConfiguration = {
  type: 'click',
  openDelay: 0,
  closeDelay: 0,
  skipDelayDuration: 300,
  pressOpenDelay: 700,
  openOnFocus: false,
  disabled: false
};

export const [providePopperV2RootContext, usePopperV2RootContext] = useContext(
  'PopperV2Root',
  (params: PopperV2RootContextParams): PopperV2RootContext => {
    const triggerConfiguration = shallowReactive({ ...defaultTriggerConfiguration });
    const triggerType = shallowRef<PopperV2TriggerType>('click');

    const disabled = computed(() => params.disabled.value || triggerConfiguration.disabled);
    const modal = computed(() => params.modal.value ?? triggerType.value !== 'hover');
    const dataState = computed(() => getDisclosureState(params.open.value));

    const triggerElement = shallowRef<HTMLElement>();
    const positionerElement = shallowRef<HTMLElement>();
    const popupElement = shallowRef<HTMLElement>();
    const anchorElement = shallowRef<PopperV2ReferenceElement>();
    const positionerUpdate = shallowRef<(() => void) | undefined>();
    const triggerId = shallowRef(`soybean-popper-v2-trigger-${useId()}`);
    const popupId = shallowRef(`soybean-popper-v2-popup-${useId()}`);

    const customAnchorCount = shallowRef(0);
    const hasCustomAnchor = computed(() => customAnchorCount.value > 0);

    const children = shallowRef<readonly PopperV2RootContext[]>([]);
    const isSub = computed(() => Boolean(params.parent));
    const nestingLevel = computed(() => (params.parent?.nestingLevel.value ?? -1) + 1);

    const isTriggerPointerInside = shallowRef(false);
    const isPopupPointerInside = shallowRef(false);
    const isPointerInTransit = shallowRef(false);
    const isPointerInTree = computed(
      () =>
        isTriggerPointerInside.value ||
        isPopupPointerInside.value ||
        isPointerInTransit.value ||
        children.value.some(child => child.isPointerInTree.value)
    );

    const isOpenDelayed = shallowRef(true);

    let openTimer: ReturnType<typeof setTimeout> | undefined;
    let closeTimer: ReturnType<typeof setTimeout> | undefined;
    let skipDelayTimer: ReturnType<typeof setTimeout> | undefined;

    function clearOpenTimer() {
      if (openTimer === undefined) return;
      clearTimeout(openTimer);
      openTimer = undefined;
    }

    function clearCloseTimer() {
      if (closeTimer === undefined) return;
      clearTimeout(closeTimer);
      closeTimer = undefined;
    }

    function clearSkipDelayTimer() {
      if (skipDelayTimer === undefined) return;
      clearTimeout(skipDelayTimer);
      skipDelayTimer = undefined;
    }

    function clearTimers() {
      clearOpenTimer();
      clearCloseTimer();
      clearSkipDelayTimer();
    }

    function closeDescendants() {
      for (const child of children.value) {
        child.onOpenChange(false, 'parent-close');
      }
    }

    function onOpenChange(value: boolean, reason: PopperV2OpenChangeReason = 'imperative') {
      if (value && disabled.value) return;

      if (!value) {
        clearOpenTimer();
        clearCloseTimer();
        closeDescendants();
      }

      if (params.open.value === value) return;
      params.onOpenChange(value, reason);
    }

    function onOpenToggle(reason: PopperV2OpenChangeReason) {
      onOpenChange(!params.open.value, reason);
    }

    function startSkipDelayTimer() {
      clearSkipDelayTimer();
      skipDelayTimer = setTimeout(() => {
        isOpenDelayed.value = true;
        skipDelayTimer = undefined;
      }, triggerConfiguration.skipDelayDuration);
    }

    function commitHoverOpen(reason: Extract<PopperV2OpenChangeReason, 'trigger-hover' | 'trigger-focus'>) {
      clearOpenTimer();
      clearCloseTimer();
      clearSkipDelayTimer();
      isOpenDelayed.value = false;
      onOpenChange(true, reason);
    }

    function onHoverOpen(
      reason: Extract<PopperV2OpenChangeReason, 'trigger-hover' | 'trigger-focus'> = 'trigger-hover'
    ) {
      if (disabled.value) return;

      clearOpenTimer();
      clearCloseTimer();

      const delay = isOpenDelayed.value ? triggerConfiguration.openDelay : 0;
      if (delay <= 0) {
        commitHoverOpen(reason);
        return;
      }

      openTimer = setTimeout(() => {
        commitHoverOpen(reason);
        openTimer = undefined;
      }, delay);
    }

    function onHoverClose(
      reason: Extract<PopperV2OpenChangeReason, 'trigger-hover' | 'trigger-focus'> = 'trigger-hover'
    ) {
      clearOpenTimer();
      clearCloseTimer();

      closeTimer = setTimeout(() => {
        closeTimer = undefined;
        if (isPointerInTree.value) return;

        onOpenChange(false, reason);
        startSkipDelayTimer();

        if (params.parent?.triggerType.value === 'hover') {
          params.parent.onHoverClose('trigger-hover');
        }
      }, triggerConfiguration.closeDelay);
    }

    function cancelHoverClose() {
      clearCloseTimer();
    }

    function configureTrigger(configuration: PopperV2TriggerConfiguration) {
      Object.assign(triggerConfiguration, configuration);
      triggerType.value = configuration.type;

      if (disabled.value) {
        onOpenChange(false, 'imperative');
      }
    }

    function onTriggerElementChange(element: HTMLElement | undefined) {
      triggerElement.value = element;
    }

    function onPositionerElementChange(element: HTMLElement | undefined) {
      positionerElement.value = element;
    }

    function onPopupElementChange(element: HTMLElement | undefined) {
      popupElement.value = element;
    }

    function onAnchorElementChange(element: PopperV2ReferenceElement | undefined) {
      anchorElement.value = element;
    }

    function onPositionerUpdateChange(update: (() => void) | undefined) {
      positionerUpdate.value = update;
    }

    function requestPositionerUpdate() {
      positionerUpdate.value?.();
    }

    function onTriggerPointerInsideChange(value: boolean) {
      isTriggerPointerInside.value = value;
    }

    function onPopupPointerInsideChange(value: boolean) {
      isPopupPointerInside.value = value;
    }

    function registerCustomAnchor() {
      customAnchorCount.value += 1;

      return () => {
        customAnchorCount.value = Math.max(0, customAnchorCount.value - 1);
      };
    }

    function registerChild(child: PopperV2RootContext) {
      children.value = [...children.value, child];

      return () => {
        children.value = children.value.filter(item => item !== child);
      };
    }

    return {
      open: params.open,
      reason: params.reason,
      dir: params.dir,
      modal,
      disabled,
      dataState,
      triggerType,
      triggerElement,
      positionerElement,
      popupElement,
      anchorElement,
      triggerId,
      popupId,
      hasCustomAnchor,
      parent: params.parent,
      children,
      isSub,
      nestingLevel,
      isPointerInTransit,
      isPointerInTree,
      configureTrigger,
      onOpenChange,
      onOpenToggle,
      onHoverOpen,
      onHoverClose,
      cancelHoverClose,
      onTriggerElementChange,
      onPositionerElementChange,
      onPopupElementChange,
      onAnchorElementChange,
      onPositionerUpdateChange,
      requestPositionerUpdate,
      onTriggerPointerInsideChange,
      onPopupPointerInsideChange,
      registerCustomAnchor,
      registerChild,
      closeDescendants,
      clearTimers
    };
  }
);

export const [providePopperV2Ui, usePopperV2Ui] = useUiContext<PopperV2UiSlot>('PopperV2Ui');

export const [providePopperV2PositionerContext, usePopperV2PositionerContext] = useContext(
  'PopperV2Positioner',
  (params: PopperV2PositionerContextParams) => {
    const arrowElement = shallowRef<HTMLElement | null>(null);

    const onArrowElementChange = (element: HTMLElement | null | undefined) => {
      arrowElement.value = element ?? null;
    };

    return {
      ...params,
      arrowElement,
      onArrowElementChange
    };
  }
);
