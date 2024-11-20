<script setup lang="ts">
import { PaginationRoot, useForwardPropsEmits } from '@soybean-ui/primitive';
import SPaginationList from './pagination-list.vue';
import SPaginationListItem from './pagination-list-item.vue';
import SPaginationFirst from './pagination-first.vue';
import SPaginationLast from './pagination-last.vue';
import SPaginationNext from './pagination-next.vue';
import SPaginationPrev from './pagination-prev.vue';
import SPaginationEllipsis from './pagination-ellipsis.vue';
import type { PaginationEmits, PaginationProps } from './types';

defineOptions({
  name: 'SPagination'
});

const {
  class: listCls,
  size,
  variant = 'plain',
  listItemClass,
  firstClass,
  lastClass,
  nextClass,
  prevClass,
  ellipsisClass,
  ...delegatedProps
} = defineProps<PaginationProps>();

const emit = defineEmits<PaginationEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <PaginationRoot v-bind="forwarded">
    <SPaginationList v-slot="{ items }" :class="listCls" :size>
      <SPaginationFirst :class="firstClass" :size :variant>
        <slot name="first" />
      </SPaginationFirst>
      <SPaginationPrev :class="prevClass" :size :variant>
        <slot name="prev" />
      </SPaginationPrev>
      <template v-for="(item, index) in items" :key="index">
        <SPaginationListItem v-if="item.type === 'page'" :class="listItemClass" :size :variant :value="item.value">
          <slot />
        </SPaginationListItem>
        <SPaginationEllipsis v-else-if="item.type === 'ellipsis'" :class="ellipsisClass" :size>
          <slot name="ellipsis" />
        </SPaginationEllipsis>
      </template>
      <SPaginationNext :class="nextClass" :size :variant>
        <slot name="next" />
      </SPaginationNext>
      <SPaginationLast :class="lastClass" :size :variant>
        <slot name="last" />
      </SPaginationLast>
    </SPaginationList>
  </PaginationRoot>
</template>
