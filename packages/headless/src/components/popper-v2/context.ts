import { computed, onScopeDispose, shallowReactive, shallowRef, useId, watch } from 'vue';
import type { ComputedRef, ShallowRef } from 'vue';
import { getDisclosureState } from '../../shared';
import { useContext, useUiContext } from '../../composables';
import type { Direction } from '../../types';
import type {
  PopperV2DelayGroupContext,
  PopperV2DelayGroupParams,
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
  focusOpenDelay: 0,
  closeDelay: 0,
  skipDelayDuration: 300,
  pressOpenDelay: 700,
  openOnFocus: false,
  disabled: false
};

export const [providePopperV2RootContext, usePopperV2RootContext] = useContext(
  'PopperV2Root',
  (params: PopperV2RootContextParams): PopperV2RootContext => {
    // Shared delay group (FloatingDelayGroup pattern). Nested roots never join — opening a
    // submenu or an inner popup must not reset the sibling delay window of the outer group.
    const delayGroup = params.parent === undefined ? (usePopperV2DelayGroup() ?? undefined) : undefined;

    const triggerConfiguration = shallowReactive({ ...defaultTriggerConfiguration });
    const triggerType = shallowRef<PopperV2TriggerType>('click');

    const disabled = computed(() => params.disabled.value || triggerConfiguration.disabled);
    const modal = computed(() => params.modal.value ?? triggerType.value !== 'hover');
    const dataState = computed(() => getDisclosureState(params.open.value));

    const triggerElement = shallowRef<HTMLElement>();
    const graceTriggerElement = shallowRef<HTMLElement | undefined>();
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
    const wasOpenDelayed = shallowRef(false);

    let openTimer: ReturnType<typeof setTimeout> | undefined;
    let closeTimer: ReturnType<typeof setTimeout> | undefined;
    let skipDelayTimer: ReturnType<typeof setTimeout> | undefined;
    let hoverCloseGuard: (() => boolean) | undefined;

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

    function commitHoverOpen(
      reason: Extract<PopperV2OpenChangeReason, 'trigger-hover' | 'trigger-focus'>,
      delayed: boolean
    ) {
      clearOpenTimer();
      clearCloseTimer();
      clearSkipDelayTimer();
      // In a delay group the window state is group-owned and reset through the member-open
      // report below; the local machine is only authoritative for group-less roots.
      if (!delayGroup) isOpenDelayed.value = false;
      wasOpenDelayed.value = delayed;
      onOpenChange(true, reason);
    }

    function onHoverOpen(
      reason: Extract<PopperV2OpenChangeReason, 'trigger-hover' | 'trigger-focus'> = 'trigger-hover'
    ) {
      if (disabled.value) return;

      clearOpenTimer();
      clearCloseTimer();

      const openIsDelayed = delayGroup ? delayGroup.isOpenDelayed.value : isOpenDelayed.value;
      const delay = openIsDelayed
        ? reason === 'trigger-focus'
          ? triggerConfiguration.focusOpenDelay
          : triggerConfiguration.openDelay
        : 0;
      if (delay <= 0) {
        commitHoverOpen(reason, false);
        return;
      }

      openTimer = setTimeout(() => {
        commitHoverOpen(reason, true);
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

        // A domain layer (e.g. HoverCard text selection) may veto the delayed close; the guard
        // runs at fire time so late-changing state (selection made during the delay) is honored.
        if (hoverCloseGuard?.()) return;

        onOpenChange(false, reason);
        if (!delayGroup) startSkipDelayTimer();

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

    function onGraceTriggerElementChange(element: HTMLElement | undefined) {
      graceTriggerElement.value = element;
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

    function registerHoverCloseGuard(guard?: () => boolean) {
      hoverCloseGuard = guard;
    }

    function registerChild(child: PopperV2RootContext) {
      children.value = [...children.value, child];

      return () => {
        children.value = children.value.filter(item => item !== child);
      };
    }

    const context: PopperV2RootContext = {
      open: params.open,
      reason: params.reason,
      dir: params.dir,
      modal,
      disabled,
      dataState,
      triggerType,
      triggerElement,
      graceTriggerElement,
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
      isOpenDelayed,
      wasOpenDelayed,
      configureTrigger,
      onOpenChange,
      onOpenToggle,
      onHoverOpen,
      onHoverClose,
      cancelHoverClose,
      onTriggerElementChange,
      onGraceTriggerElementChange,
      onPositionerElementChange,
      onPopupElementChange,
      onAnchorElementChange,
      onPositionerUpdateChange,
      requestPositionerUpdate,
      onTriggerPointerInsideChange,
      onPopupPointerInsideChange,
      registerCustomAnchor,
      registerHoverCloseGuard,
      registerChild,
      closeDescendants,
      clearTimers
    };

    // Report open changes to the delay group from the settled open state so every open path
    // (hover, focus, imperative, controlled prop flips) resets the shared skip-delay window.
    if (delayGroup) {
      const group = delayGroup;
      watch(
        params.open,
        isOpen => {
          if (isOpen) group.onMemberOpen(context);
          else group.onMemberClose(context);
        },
        { immediate: true }
      );
      // A member unmounting while open must not keep the group window from starting.
      onScopeDispose(() => group.onMemberClose(context));
    }

    return context;
  }
);

export const [providePopperV2DelayGroup, usePopperV2DelayGroup] = useContext(
  'PopperV2DelayGroup',
  (params: PopperV2DelayGroupParams): PopperV2DelayGroupContext => {
    const isOpenDelayed = shallowRef(true);
    const openMembers = new Set<PopperV2RootContext>();

    let skipDelayTimer: ReturnType<typeof setTimeout> | undefined;

    function clearSkipDelayTimer() {
      if (skipDelayTimer === undefined) return;
      clearTimeout(skipDelayTimer);
      skipDelayTimer = undefined;
    }

    function onMemberOpen(member: PopperV2RootContext) {
      clearSkipDelayTimer();
      isOpenDelayed.value = false;
      openMembers.add(member);
    }

    // The skip-delay window only starts once the last open member closes; while any member
    // stays open the next sibling open must stay instant.
    function onMemberClose(member: PopperV2RootContext) {
      if (!openMembers.delete(member)) return;

      if (openMembers.size === 0) {
        clearSkipDelayTimer();
        skipDelayTimer = setTimeout(() => {
          isOpenDelayed.value = true;
          skipDelayTimer = undefined;
        }, params.skipDelayDuration.value);
      }
    }

    return {
      isOpenDelayed,
      onMemberOpen,
      onMemberClose
    };
  }
);

export const [providePopperV2Ui, usePopperV2Ui] = useUiContext<PopperV2UiSlot>('PopperV2Ui');

interface PopperV2PositioningRootContextParams {
  dir: ComputedRef<Direction>;
  /**
   * Optional shared members: the interactive shell's `PopperV2Root` dual-provides this
   * context with its own refs (same objects, so both contexts stay in sync) so shared
   * leaves (`PopperV2Anchor` / `PopperV2Arrow`) work under both trees. Positioning-only
   * roots leave them unset and fresh refs are created here.
   */
  anchorElement?: ShallowRef<PopperV2ReferenceElement | undefined>;
  onAnchorElementChange?: (element: PopperV2ReferenceElement | undefined) => void;
  popupElement?: ShallowRef<HTMLElement | undefined>;
  onPopupElementChange?: (element: HTMLElement | undefined) => void;
  /** Custom-anchor registration; no-op for positioning-only trees (they have no trigger). */
  registerCustomAnchor?: () => () => void;
}

export const [providePopperV2PositioningRootContext, usePopperV2PositioningRootContext] = useContext(
  'PopperV2PositioningRoot',
  (params: PopperV2PositioningRootContextParams) => {
    const popupElement = params.popupElement ?? shallowRef<HTMLElement>();
    const onPopupElementChange =
      params.onPopupElementChange ??
      ((element: HTMLElement | undefined) => {
        popupElement.value = element;
      });

    const anchorElement = params.anchorElement ?? shallowRef<PopperV2ReferenceElement>();
    const onAnchorElementChange =
      params.onAnchorElementChange ??
      ((element: PopperV2ReferenceElement | undefined) => {
        anchorElement.value = element;
      });

    return {
      ...params,
      popupElement,
      onPopupElementChange,
      anchorElement,
      onAnchorElementChange,
      registerCustomAnchor: params.registerCustomAnchor ?? (() => () => {})
    };
  }
);

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
