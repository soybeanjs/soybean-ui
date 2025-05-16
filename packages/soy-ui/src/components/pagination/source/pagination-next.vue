<script setup lang="ts">
import { PaginationNext, useForwardProps } from '@soybean-ui/primitives';
import { ChevronRight } from 'lucide-vue-next';
import type { PaginationNextProps } from '../types';
import SPaginationButton from './pagination-button.vue';

defineOptions({
  name: 'SPaginationNext'
});

const props = defineProps<PaginationNextProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <PaginationNext as-child>
    <slot>
      <SPaginationButton v-bind="forwardedProps">
        <ChevronRight />
      </SPaginationButton>
    </slot>
  </PaginationNext>
</template>
