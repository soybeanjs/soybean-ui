<script setup lang="ts">
import { computed } from 'vue';
import { breadcrumbVariants, cn } from '@soybean-ui/variants';
import { ChevronRight } from 'lucide-vue-next';
import type { BreadcrumbSeparatorProps } from '../types';

defineOptions({
  name: 'SBreadcrumbSeparator'
});

const { class: cls } = defineProps<BreadcrumbSeparatorProps>();

const { separator } = breadcrumbVariants();

const mergedCls = computed(() => cn(separator(), cls));
</script>

<template>
  <li role="presentation" aria-hidden="true" :class="mergedCls">
    <slot>
      <ChevronRight />
    </slot>
  </li>
</template>
