<script setup lang="ts">
import { PaginationPrev, useForwardProps } from 'reka-ui';
import { ChevronLeft } from 'lucide-vue-next';
import SPaginationButton from './pagination-button.vue';
import type { PaginationPrevProps } from './types';

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
