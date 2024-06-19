<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority';
import { type HTMLAttributes, computed, inject } from 'vue';
import { ToggleGroupItem, type ToggleGroupItemProps, useForwardProps } from 'radix-vue';
import { toggleVariants } from '@ui/components/ui/toggle';
import { cn } from '@ui/lib/utils';

type ToggleGroupVariants = VariantProps<typeof toggleVariants>;

const props = defineProps<
  ToggleGroupItemProps & {
    class?: HTMLAttributes['class'];
    variant?: ToggleGroupVariants['variant'];
    size?: ToggleGroupVariants['size'];
  }
>();

const context = inject<ToggleGroupVariants>('toggleGroup');

const delegatedProps = computed(() => {
  const { class: _, variant: _v, size: _s, ...delegated } = props;
  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <ToggleGroupItem
    v-bind="forwardedProps"
    :class="
      cn(
        toggleVariants({
          variant: context?.variant || variant,
          size: context?.size || size
        }),
        props.class
      )
    "
  >
    <slot />
  </ToggleGroupItem>
</template>
