<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { breadcrumbVariants, cn } from '@soybean-ui/variants';
import type { BreadcrumbPageProps } from './types';

defineOptions({
  name: 'SBreadcrumbPage'
});

const { class: cls } = defineProps<BreadcrumbPageProps>();

const { page } = breadcrumbVariants();

const mergedCls = computed(() => cn(page(), cls));
</script>

<template>
  <Primitive as="span" role="link" aria-disabled="true" aria-current="page" :class="mergedCls">
    <slot />
  </Primitive>
</template>
