<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@soybeanjs/headless';
import { cn } from '@/theme';
import { linkVariants } from './variants';
import type { LinkProps } from './types';

defineOptions({
  name: 'SLink'
});

const props = withDefaults(defineProps<LinkProps>(), {
  disabled: undefined,
  external: undefined,
  noRel: undefined,
  prefetch: undefined,
  noPrefetch: undefined,
  custom: undefined,
  viewTransition: undefined,
  replace: undefined
});

const variants = linkVariants();

const cls = computed(() => cn(variants, props.class));
</script>

<template>
  <Link v-slot="slotProps" v-bind="props" :class="cls">
    <slot v-bind="slotProps" />
  </Link>
</template>
