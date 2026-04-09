<script setup lang="ts">
import { computed } from 'vue';
import { MenubarGroupLabel } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { menubarVariants } from './variants';
import type { MenubarLabelProps } from './types';

defineOptions({
  name: 'SMenubarLabel'
});

const props = defineProps<MenubarLabelProps>();

const forwardedProps = useOmitProps(props, ['class', 'inset', 'size']);

const cls = computed(() => cn(menubarVariants({ inset: props.inset, size: props.size }).label(), props.class));
</script>

<template>
  <MenubarGroupLabel v-bind="forwardedProps" :class="cls">
    <slot />
  </MenubarGroupLabel>
</template>
