<script setup lang="ts">
import { computed } from 'vue';
import { Primitive, useForwardProps } from '@soybean-ui/primitives';
import { breadcrumbVariants, cn } from '@soybean-ui/variants';
import type { BreadcrumbLinkProps } from './types';

defineOptions({
  name: 'SBreadcrumbLink'
});

const { class: cls, ...delegatedProps } = defineProps<BreadcrumbLinkProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { link } = breadcrumbVariants();

const mergedCls = computed(() => cn(link(), cls));
</script>

<template>
  <Primitive as="a" v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </Primitive>
</template>
