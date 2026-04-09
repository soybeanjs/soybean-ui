<script setup lang="ts">
import { computed } from 'vue';
import { MenubarSeparator } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { menubarVariants } from './variants';
import type { MenubarSeparatorProps } from './types';

defineOptions({
  name: 'SMenubarSeparator'
});

const props = defineProps<MenubarSeparatorProps>();
const forwardedProps = useOmitProps(props, ['class', 'size']);

const cls = computed(() => cn(menubarVariants({ size: props.size }).separator(), props.class));
</script>

<template>
  <MenubarSeparator v-bind="forwardedProps" :class="cls" />
</template>
