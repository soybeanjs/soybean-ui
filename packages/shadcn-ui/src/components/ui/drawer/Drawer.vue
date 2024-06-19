<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from 'vaul-vue';
import { DrawerRoot } from 'vaul-vue';
import { useForwardPropsEmits } from 'radix-vue';

const props = withDefaults(defineProps<DrawerRootProps>(), {
  shouldScaleBackground: true
});

const emit = defineEmits<DrawerRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <DrawerRoot v-bind="forwarded">
    <slot />
  </DrawerRoot>
</template>
