<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { Link } from '@soybeanjs/headless';
import { cn } from '@/theme';
import { linkVariants } from '@/variants/link';
import type { LinkProps } from './types';

defineOptions({
  name: 'SLink'
});

const props = withDefaults(defineProps<LinkProps>(), {
  external: undefined,
  prefetch: undefined,
  noPrefetch: undefined,
  noRel: undefined,
  viewTransition: undefined,
  replace: undefined,
  disabled: undefined
});

const attrs = useAttrs() as Record<string, any>;

const variants = linkVariants();

const cls = computed(() => cn(variants, attrs.class));
</script>

<template>
  <Link v-slot="{ isHref }" v-bind="props" :class="cls">
    <slot :is-href="isHref" />
  </Link>
</template>
