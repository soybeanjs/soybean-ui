<script setup lang="ts">
import { computed } from 'vue';
import { PaginationPrev } from 'radix-vue';
import { ChevronLeft } from 'lucide-vue-next';
import { cn, paginationVariants } from '@soybean-ui/variants';
import { SButton } from '../button';
import type { PaginationPrevProps } from './types';

defineOptions({
  name: 'SPaginationPrev'
});

const { class: cls, size, variant } = defineProps<PaginationPrevProps>();

const { button } = paginationVariants();

const mergedCls = computed(() => cn(button(), cls));
</script>

<template>
  <PaginationPrev as-child>
    <slot>
      <SButton :class="mergedCls" :size :variant color="accent" shape="square">
        <ChevronLeft />
      </SButton>
    </slot>
  </PaginationPrev>
</template>
