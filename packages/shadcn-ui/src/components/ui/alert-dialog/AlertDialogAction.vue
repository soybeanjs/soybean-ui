<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { AlertDialogAction, type AlertDialogActionProps } from 'radix-vue';
import { cn } from '@ui/lib/utils';
import { buttonVariants } from '@ui/components/ui/button';

const props = defineProps<AlertDialogActionProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AlertDialogAction v-bind="delegatedProps" :class="cn(buttonVariants(), props.class)">
    <slot />
  </AlertDialogAction>
</template>
