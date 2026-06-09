<script setup lang="ts">
import { computed } from 'vue';
import { BottomSheetCompact, provideBottomSheetUi } from '@soybeanjs/headless/bottom-sheet';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { bottomSheetVariants } from '@/styles/bottom-sheet';
import type { BottomSheetProps, BottomSheetEmits, BottomSheetSlots } from './types';

defineOptions({
  name: 'SBottomSheet'
});

const props = withDefaults(defineProps<BottomSheetProps>(), {
  open: undefined,
  modal: true,
  shouldScaleBackground: true,
  setBackgroundColorOnScale: true,
  dismissible: true,
  showClose: true,
  showConfirm: true
});

const emit = defineEmits<BottomSheetEmits>();

const slots = defineSlots<BottomSheetSlots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => bottomSheetVariants({ size: props.size }, props.ui, { popup: props.class }));

provideBottomSheetUi(ui);
</script>

<template>
  <BottomSheetCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </BottomSheetCompact>
</template>
