<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { DialogCompact, provideDialogUi } from '@soybeanjs/headless/dialog';
import { keysOf } from '@soybeanjs/headless/shared';
import { sheetVariants } from '@/styles/sheet';
import type { SheetProps, SheetEmits, SheetSlots } from './types';

defineOptions({
  name: 'SSheet'
});

const props = withDefaults(defineProps<SheetProps>(), {
  open: undefined,
  modal: true,
  showClose: true
});

const emit = defineEmits<SheetEmits>();

const slots = defineSlots<SheetSlots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => sheetVariants({ size: props.size, side: props.side }, props.ui, { popup: props.class }));

provideDialogUi(ui);
</script>

<template>
  <DialogCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </DialogCompact>
</template>
