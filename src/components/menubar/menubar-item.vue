<script setup lang="ts">
import { computed } from 'vue';
import { MenubarItem } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { menubarVariants } from './variants';
import type { MenubarItemEmits, MenubarItemProps } from './types';

defineOptions({
  name: 'SMenubarItem'
});

const props = withDefaults(defineProps<MenubarItemProps>(), {
  variant: 'default'
});

const emit = defineEmits<MenubarItemEmits>();

const forwardedProps = useOmitProps(props, ['class', 'inset', 'size', 'variant']);
const listeners = useForwardListeners(emit);

const cls = computed(() =>
  cn(
    menubarVariants({
      destructive: props.variant === 'destructive',
      inset: props.inset,
      size: props.size
    }).item(),
    props.class
  )
);
</script>

<template>
  <MenubarItem v-bind="forwardedProps" :class="cls" v-on="listeners">
    <slot />
  </MenubarItem>
</template>
