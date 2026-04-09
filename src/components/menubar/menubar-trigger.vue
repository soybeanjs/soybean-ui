<script setup lang="ts">
import { computed } from 'vue';
import { MenubarTrigger } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { menubarVariants } from './variants';
import type { MenubarTriggerProps } from './types';

defineOptions({
  name: 'SMenubarTrigger'
});

const props = defineProps<MenubarTriggerProps>();
const forwardedProps = useOmitProps(props, ['class', 'size']);

const cls = computed(() => cn(menubarVariants({ size: props.size }).trigger(), props.class));
</script>

<template>
  <MenubarTrigger v-bind="forwardedProps" :class="cls">
    <slot />
  </MenubarTrigger>
</template>
