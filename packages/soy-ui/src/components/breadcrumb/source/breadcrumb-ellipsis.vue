<script setup lang="ts">
import { computed } from 'vue';
import { breadcrumbVariants, cn } from '@soybean-ui/variants';
import { Ellipsis } from 'lucide-vue-next';
import type { BreadcrumbEllipsisProps } from '../types';

defineOptions({
  name: 'SBreadcrumbEllipsis'
});

const { class: cls } = defineProps<BreadcrumbEllipsisProps>();

const { ellipsis } = breadcrumbVariants();

const mergedCls = computed(() => cn(ellipsis(), cls));
</script>

<template>
  <li role="presentation" aria-hidden="true" :class="mergedCls">
    <slot>
      <Ellipsis />
    </slot>
    <span class="sr-only">More</span>
  </li>
</template>
