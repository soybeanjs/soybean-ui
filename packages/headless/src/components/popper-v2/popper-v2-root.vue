<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';
import { useControllableState } from '../../composables';
import { providePopperV2PositioningRootContext, providePopperV2RootContext, usePopperV2RootContext } from './context';
import type { PopperV2OpenChangeReason, PopperV2RootEmits, PopperV2RootProps, PopperV2RootSlots } from './types';
import { usePopperV2Nesting } from './use-popper-v2-nesting';

defineOptions({
  name: 'PopperV2Root',
  inheritAttrs: false
});

const props = withDefaults(defineProps<PopperV2RootProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: undefined,
  disabled: false
});

const emit = defineEmits<PopperV2RootEmits>();

defineSlots<PopperV2RootSlots>();

const parent = usePopperV2RootContext() ?? undefined;
const reason = shallowRef<PopperV2OpenChangeReason>('imperative');

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value, reason.value);
  },
  props.defaultOpen
);

const popperDir = computed(() => props.dir ?? parent?.dir.value);
const dir = computed(() => popperDir.value ?? 'ltr');
const modal = computed(() => props.modal);
const disabled = computed(() => props.disabled);

function commitOpenChange(value: boolean, nextReason: PopperV2OpenChangeReason) {
  reason.value = nextReason;
  open.value = value;
}

const context = providePopperV2RootContext({
  open,
  reason,
  dir,
  modal,
  disabled,
  parent,
  onOpenChange: commitOpenChange
});

// Dual-provide the positioning context with the same refs so shared leaves
// (`PopperV2Anchor` / `PopperV2Arrow`) work under the interactive shell too.
providePopperV2PositioningRootContext({
  dir,
  anchorElement: context.anchorElement,
  onAnchorElementChange: context.onAnchorElementChange,
  popupElement: context.popupElement,
  onPopupElementChange: context.onPopupElementChange,
  registerCustomAnchor: context.registerCustomAnchor
});

usePopperV2Nesting(context);

function close() {
  context.onOpenChange(false, 'imperative');
}

watch(disabled, value => {
  if (value) {
    context.onOpenChange(false, 'imperative');
  }
});
</script>

<template>
  <slot :open="open" :reason="reason" :close="close" :dir="dir" />
</template>
