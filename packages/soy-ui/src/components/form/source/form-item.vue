<script setup lang="ts">
import { computed, provide, useId } from 'vue';
import { cn, formVariants } from '@soybean-ui/variants';
import { FORM_ITEM_INJECTION_KEY } from '../hooks';
import type { FormItemProps } from '../types';

defineOptions({
  name: 'SFormItem'
});

const { class: cls, size } = defineProps<FormItemProps>();

const id = useId();
provide(FORM_ITEM_INJECTION_KEY, id);

const mergedCls = computed(() => {
  const { item } = formVariants({ size });

  return cn(item(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
