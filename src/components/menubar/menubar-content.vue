<script setup lang="ts">
import { computed } from 'vue';
import { MenubarContent, MenubarPortal } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { menubarVariants } from './variants';
import type { MenubarContentProps } from './types';

defineOptions({
  name: 'SMenubarContent'
});

const props = withDefaults(defineProps<MenubarContentProps>(), {
  align: 'start',
  alignOffset: -4,
  sideOffset: 8
});

const forwardedProps = useOmitProps(props, ['class', 'portalProps']);

const cls = computed(() => cn(menubarVariants().content(), props.class));
</script>

<template>
  <MenubarPortal v-bind="portalProps">
    <MenubarContent v-bind="forwardedProps" :class="cls">
      <slot />
    </MenubarContent>
  </MenubarPortal>
</template>
