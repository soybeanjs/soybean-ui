<script setup lang="ts">
import { PaginationListItem, useForwardProps } from '@soybean-ui/primitives';
import type { PaginationListItemProps } from '../types';
import SPaginationButton from './pagination-button.vue';

defineOptions({
  name: 'SPaginationListItem'
});

const props = defineProps<PaginationListItemProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <PaginationListItem as-child :value="value">
    <slot>
      <SPaginationButton v-bind="forwardedProps">
        {{ value }}
      </SPaginationButton>
    </slot>
  </PaginationListItem>
</template>
