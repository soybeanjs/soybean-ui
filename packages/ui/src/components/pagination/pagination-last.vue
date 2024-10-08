<script setup lang="ts">
import { computed } from 'vue';
import { PaginationLast } from 'radix-vue';
import { ChevronsRight } from 'lucide-vue-next';
import { cn, paginationVariants } from '@soybean-ui/variants';
import { SButton } from '../button';
import type { PaginationLastProps } from './types';

defineOptions({
  name: 'SPaginationLast'
});

const { class: cls, size, variant } = defineProps<PaginationLastProps>();

const { button } = paginationVariants();

const mergedCls = computed(() => cn(button(), cls));
</script>

<template>
  <PaginationLast as-child>
    <slot>
      <SButton :class="mergedCls" :size :variant color="accent" shape="square">
        <ChevronsRight />
      </SButton>
    </slot>
  </PaginationLast>
</template>
