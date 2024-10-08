<script setup lang="ts">
import { computed } from 'vue';
import { PaginationNext } from 'radix-vue';
import { ChevronRight } from 'lucide-vue-next';
import { cn, paginationVariants } from '@soybean-ui/variants';
import { SButton } from '../button';
import type { PaginationNextProps } from './types';

defineOptions({
  name: 'SPaginationNext'
});

const { class: cls, size, variant } = defineProps<PaginationNextProps>();

const { button } = paginationVariants();

const mergedCls = computed(() => cn(button(), cls));
</script>

<template>
  <PaginationNext as-child>
    <slot>
      <SButton :class="mergedCls" :size :variant color="accent" shape="square">
        <ChevronRight />
      </SButton>
    </slot>
  </PaginationNext>
</template>
