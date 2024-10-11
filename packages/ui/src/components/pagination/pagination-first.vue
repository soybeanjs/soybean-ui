<script setup lang="ts">
import { PaginationFirst, useForwardProps } from 'radix-vue';
import { ChevronsLeft } from 'lucide-vue-next';
import SPaginationButton from './pagination-button.vue';
import type { PaginationFirstProps } from './types';

defineOptions({
  name: 'SPaginationFirst'
});

const props = defineProps<PaginationFirstProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <PaginationFirst as-child>
    <slot>
      <SPaginationButton v-bind="forwardedProps">
        <ChevronsLeft />
      </SPaginationButton>
    </slot>
  </PaginationFirst>
</template>
