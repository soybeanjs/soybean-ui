<script setup lang="ts">
import { PaginationNext, useForwardProps } from 'reka-ui';
import { ChevronRight } from 'lucide-vue-next';
import SPaginationButton from './pagination-button.vue';
import type { PaginationNextProps } from './types';

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
