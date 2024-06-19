<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import type { ComboboxContentEmits, ComboboxContentProps } from 'radix-vue';
import { ComboboxContent, useForwardPropsEmits } from 'radix-vue';
import { cn } from '@ui/lib/utils';

const props = withDefaults(defineProps<ComboboxContentProps & { class?: HTMLAttributes['class'] }>(), {
  dismissable: false
});
const emit = defineEmits<ComboboxContentEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <ComboboxContent v-bind="forwarded" :class="cn('max-h-[300px] overflow-y-auto overflow-x-hidden', props.class)">
    <div role="presentation">
      <slot />
    </div>
  </ComboboxContent>
</template>
