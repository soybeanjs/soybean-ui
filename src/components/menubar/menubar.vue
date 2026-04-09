<script setup lang="ts">
import { computed } from 'vue';
import { MenubarRoot } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { menubarVariants } from './variants';
import type { MenubarProps } from './types';

defineOptions({
  name: 'SMenubar'
});

const props = defineProps<MenubarProps>();
const forwardedProps = useOmitProps(props, ['class', 'size']);

const cls = computed(() => cn(menubarVariants({ size: props.size }).root(), props.class));
</script>

<template>
  <MenubarRoot v-bind="forwardedProps" :class="cls">
    <slot />
  </MenubarRoot>
</template>
