<script setup lang="ts">
import { PaginationPrev, useForwardProps } from '@soybean-ui/primitives';
import { ChevronLeft } from 'lucide-vue-next';
import type { PaginationPrevProps } from '../types';
import SPaginationButton from './pagination-button.vue';

defineOptions({
  name: 'SPaginationPrev'
});

const props = defineProps<PaginationPrevProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <PaginationPrev as-child>
    <slot>
      <SPaginationButton v-bind="forwardedProps">
        <ChevronLeft />
      </SPaginationButton>
    </slot>
  </PaginationPrev>
</template>
