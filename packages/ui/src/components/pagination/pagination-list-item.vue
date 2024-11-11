<script setup lang="ts">
import { PaginationListItem, useForwardProps } from 'reka-ui';
import SPaginationButton from './pagination-button.vue';
import type { PaginationListItemProps } from './types';

defineOptions({
  name: 'SPaginationListItem'
});

const props = defineProps<PaginationListItemProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <PaginationListItem as-child :value>
    <slot>
      <SPaginationButton v-bind="forwardedProps">
        {{ value }}
      </SPaginationButton>
    </slot>
  </PaginationListItem>
</template>
