<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';
import { useControllableState } from '@soybeanjs/headless/composables';
import { provideEpRootContext, useEpRootContext } from './context';
import type { EpOpenChangeReason, EpRootEmits, EpRootProps, EpRootSlots } from './types';
import { usePopperNesting } from './use-popper-nesting';

defineOptions({
  name: 'EpRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<EpRootProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: undefined,
  disabled: false
});

const emit = defineEmits<EpRootEmits>();

defineSlots<EpRootSlots>();

const parent = useEpRootContext() ?? undefined;
const reason = shallowRef<EpOpenChangeReason>('imperative');

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

function commitOpenChange(value: boolean, nextReason: EpOpenChangeReason) {
  reason.value = nextReason;
  open.value = value;
}

const context = provideEpRootContext({
  open,
  reason,
  dir,
  modal,
  disabled,
  parent,
  onOpenChange: commitOpenChange
});

usePopperNesting(context);

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
