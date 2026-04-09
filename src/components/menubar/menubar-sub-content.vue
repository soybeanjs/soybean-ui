<script setup lang="ts">
import { computed } from 'vue';
import { MenubarSubContent } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { menubarVariants } from './variants';
import type { MenubarSubContentProps } from './types';

defineOptions({
  name: 'SMenubarSubContent'
});

const props = withDefaults(defineProps<MenubarSubContentProps>(), {
  sideOffset: 8,
  alignOffset: -4
});

const forwardedProps = useOmitProps(props, ['class', 'size']);

const cls = computed(() => cn(menubarVariants({ size: props.size }).subContent(), props.class));
</script>

<template>
  <MenubarSubContent v-bind="forwardedProps" :class="cls">
    <slot />
  </MenubarSubContent>
</template>
