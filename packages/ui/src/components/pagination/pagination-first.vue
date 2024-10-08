<script setup lang="ts">
import { computed } from 'vue';
import { PaginationFirst } from 'radix-vue';
import { ChevronsLeft } from 'lucide-vue-next';
import { cn, paginationVariants } from '@soybean-ui/variants';
import { SButton } from '../button';
import type { PaginationFirstProps } from './types';

defineOptions({
  name: 'SPaginationFirst'
});

const { class: cls, size, variant } = defineProps<PaginationFirstProps>();

const { button } = paginationVariants();

const mergedCls = computed(() => cn(button(), cls));
</script>

<template>
  <PaginationFirst as-child>
    <slot>
      <SButton :class="mergedCls" :size :variant color="accent" shape="square">
        <ChevronsLeft />
      </SButton>
    </slot>
  </PaginationFirst>
</template>
