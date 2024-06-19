<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import type { LabelProps } from 'radix-vue';
import { cn } from '@ui/lib/utils';
import { Label } from '@ui/components/ui/label';
import { useFormField } from './useFormField';

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>();

const { error, formItemId } = useFormField();
</script>

<template>
  <Label :class="cn(error && 'text-destructive', props.class)" :for="formItemId">
    <slot />
  </Label>
</template>
