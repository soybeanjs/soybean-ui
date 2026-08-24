export { default as PopperV2Root } from './popper-v2-root.vue';
export { default as PopperV2Trigger } from './popper-v2-trigger.vue';
export { default as PopperV2Anchor } from './popper-v2-anchor.vue';
export { default as PopperV2SubTrigger } from './popper-v2-sub-trigger.vue';
export { default as PopperV2Portal } from './popper-v2-portal.vue';
export { default as PopperV2Positioner } from './popper-v2-positioner.vue';
export { default as PopperV2PositionerImpl } from './popper-v2-positioner-impl.vue';
export { default as PopperV2Popup } from './popper-v2-popup.vue';
export { default as PopperV2Arrow } from './popper-v2-arrow.vue';
export { default as PopperV2Sub } from './popper-v2-sub.vue';
export { default as PopperV2Compact } from './popper-v2-compact.vue';

export { providePopperV2Ui } from './context';

export { getNestedPopupSide } from './shared';

export { useVirtualPointReference } from './use-virtual-point-reference';

export type {
  PopperV2TriggerType,
  PopperV2ReferenceElement,
  PopperV2OpenChangeReason,
  PopperV2RootProps,
  PopperV2RootEmits,
  PopperV2RootSlots,
  PopperV2TriggerProps,
  PopperV2AnchorProps,
  PopperV2PortalProps,
  PopperV2PositionerProps,
  PopperV2PositionerEmits,
  PopperV2PopupProps,
  PopperV2ArrowProps,
  PopperV2SubProps,
  PopperV2SubEmits,
  PopperV2SubSlots,
  PopperV2SubTriggerProps,
  PopperV2CompactProps,
  PopperV2CompactEmits,
  PopperV2CompactSlots,
  PopperV2UiSlot,
  PopperV2Ui
} from './types';
