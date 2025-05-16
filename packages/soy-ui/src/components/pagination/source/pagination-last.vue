<script setup lang="ts">
import { PaginationLast, useForwardProps } from '@soybean-ui/primitives';
import { ChevronsRight } from 'lucide-vue-next';
import type { PaginationLastProps } from '../types';
import SPaginationButton from './pagination-button.vue';

defineOptions({
  name: 'SPaginationLast'
});

const props = defineProps<PaginationLastProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <PaginationLast as-child>
    <slot>
      <SPaginationButton v-bind="forwardedProps">
        <ChevronsRight />
      </SPaginationButton>
    </slot>
  </PaginationLast>
</template>
