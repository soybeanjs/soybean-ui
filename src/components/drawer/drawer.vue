<script setup lang="ts">
import { computed } from 'vue';
import { DialogCompact, provideDialogUi } from '@soybeanjs/headless/dialog';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { drawerVariants } from '@/styles/drawer';
import type { DrawerProps, DrawerEmits, DrawerSlots } from './types';

defineOptions({
  name: 'SDrawer'
});

const props = withDefaults(defineProps<DrawerProps>(), {
  open: undefined,
  modal: true,
  showClose: true
});

const emit = defineEmits<DrawerEmits>();

const slots = defineSlots<DrawerSlots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => drawerVariants({ size: props.size, side: props.side }, props.ui, { popup: props.class }));

provideDialogUi(ui);
</script>

<template>
  <DialogCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </DialogCompact>
</template>
