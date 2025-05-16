<script setup lang="ts">
import { computed } from 'vue';
import { SelectIcon } from '@soybean-ui/primitives';
import { cn, selectVariants } from '@soybean-ui/variants';
import { ChevronsUpDown } from 'lucide-vue-next';
import type { SelectIconProps } from '../types';

defineOptions({
  name: 'SSelectIcon'
});

const { class: cls } = defineProps<SelectIconProps>();

const { triggerIcon } = selectVariants();

const mergedCls = computed(() => cn(triggerIcon(), cls));
</script>

<template>
  <SelectIcon :class="mergedCls">
    <slot>
      <ChevronsUpDown />
    </slot>
  </SelectIcon>
</template>
