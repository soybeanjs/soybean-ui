<script setup lang="ts">
import { useForwardPropsEmits } from '../../composables';
import { injectDrawerRootContext } from './context';
import DrawerRoot from './drawer-root.vue';
import type { DrawerRootEmits, DrawerRootProps } from './types';

defineOptions({
  name: 'DrawerRootNested'
});

const props = defineProps<DrawerRootProps>();

const emit = defineEmits<DrawerRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);

const { onNestedDrag, onNestedOpenChange, onNestedRelease } = injectDrawerRootContext();

function onClose() {
  onNestedOpenChange(false);
}

function onDrag(p: number) {
  onNestedDrag(p);
}

function onOpenChange(o: boolean) {
  if (o) onNestedOpenChange(o);

  emit('update:open', o);
}
</script>

<template>
  <DrawerRoot
    v-bind="forwarded"
    nested
    @close="onClose"
    @drag="onDrag"
    @release="onNestedRelease"
    @update:open="onOpenChange"
  >
    <slot />
  </DrawerRoot>
</template>
