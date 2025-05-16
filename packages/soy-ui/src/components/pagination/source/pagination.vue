<script setup lang="ts">
import { PaginationRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import type { PaginationEmits, PaginationProps } from '../types';
import SPaginationList from './pagination-list.vue';
import SPaginationListItem from './pagination-list-item.vue';
import SPaginationFirst from './pagination-first.vue';
import SPaginationLast from './pagination-last.vue';
import SPaginationNext from './pagination-next.vue';
import SPaginationPrev from './pagination-prev.vue';
import SPaginationEllipsis from './pagination-ellipsis.vue';

defineOptions({
  name: 'SPagination'
});

const { class: cls, size, variant = 'plain', ui, ...delegatedProps } = defineProps<PaginationProps>();

const emit = defineEmits<PaginationEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <PaginationRoot v-bind="forwarded" :class="cls || ui?.root">
    <SPaginationList v-slot="{ items }" :class="ui?.list" :size="size">
      <SPaginationFirst :class="ui?.button" :size="size" :variant="variant">
        <slot name="first" />
      </SPaginationFirst>
      <SPaginationPrev :class="ui?.button" :size="size" :variant="variant">
        <slot name="prev" />
      </SPaginationPrev>
      <template v-for="(item, index) in items" :key="index">
        <SPaginationListItem
          v-if="item.type === 'page'"
          :class="ui?.button"
          :size="size"
          :variant="variant"
          :value="item.value"
        >
          <slot />
        </SPaginationListItem>
        <SPaginationEllipsis v-else-if="item.type === 'ellipsis'" :class="ui?.ellipsis" :size="size">
          <slot name="ellipsis" />
        </SPaginationEllipsis>
      </template>
      <SPaginationNext :class="ui?.button" :size="size" :variant="variant">
        <slot name="next" />
      </SPaginationNext>
      <SPaginationLast :class="ui?.button" :size="size" :variant="variant">
        <slot name="last" />
      </SPaginationLast>
    </SPaginationList>
  </PaginationRoot>
</template>
