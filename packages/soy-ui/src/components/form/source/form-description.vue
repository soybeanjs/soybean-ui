<script setup lang="ts">
import { computed } from 'vue';
import { cn, formVariants } from '@soybean-ui/variants';
import { useFormField } from '../hooks';
import type { FormDescriptionProps } from '../types';

defineOptions({
  name: 'SFormDescription'
});

const { class: cls } = defineProps<FormDescriptionProps>();

const { formDescriptionId } = useFormField();

const { description } = formVariants();

const mergedCls = computed(() => cn(description(), cls));
</script>

<template>
  <p :id="formDescriptionId" :class="mergedCls">
    <slot />
  </p>
</template>
