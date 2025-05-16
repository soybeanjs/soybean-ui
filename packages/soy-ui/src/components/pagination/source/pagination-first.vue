<script setup lang="ts">
import { PaginationFirst, useForwardProps } from '@soybean-ui/primitives';
import { ChevronsLeft } from 'lucide-vue-next';
import type { PaginationFirstProps } from '../types';
import SPaginationButton from './pagination-button.vue';

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
