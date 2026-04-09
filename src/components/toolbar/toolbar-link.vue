<script setup lang="ts">
import { computed } from 'vue';
import { ToolbarLink } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import { toolbarLinkVariants } from './variants';
import type { ToolbarLinkProps } from './types';

defineOptions({
  name: 'SToolbarLink'
});

const props = defineProps<ToolbarLinkProps>();

const forwardedProps = useOmitProps(props, ['class']);

const cls = computed(() => cn(toolbarLinkVariants(), props.class));
</script>

<template>
  <ToolbarLink v-bind="forwardedProps" :class="cls">
    <slot />
  </ToolbarLink>
</template>
