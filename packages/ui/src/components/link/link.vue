<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@soybeanjs/headless/link';
import { linkVariants } from '@/styles/link';
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

const cls = computed(() => linkVariants(undefined, props.class));
</script>

<template>
  <Link v-slot="slotProps" v-bind="props" :class="cls">
    <slot v-bind="slotProps" />
  </Link>
</template>
