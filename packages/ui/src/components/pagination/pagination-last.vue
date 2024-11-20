<script setup lang="ts">
import { PaginationLast, useForwardProps } from '@soybean-ui/primitive';
import { ChevronsRight } from 'lucide-vue-next';
import SPaginationButton from './pagination-button.vue';
import type { PaginationLastProps } from './types';

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
