<script setup lang="ts">
import { provide, useId } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cn, formVariants } from '@soybean-ui/variants';
import { FORM_ITEM_INJECTION_KEY } from './hooks';
import type { FormItemProps } from './types';

defineOptions({
  name: 'SFormItem'
});

const { class: cls } = defineProps<FormItemProps>();

const id = useId();
provide(FORM_ITEM_INJECTION_KEY, id);

const { item } = formVariants();

const mergedCls = cn(item(), cls);
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>
