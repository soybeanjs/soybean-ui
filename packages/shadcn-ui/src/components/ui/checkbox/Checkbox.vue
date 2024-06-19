<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue';
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue';
import { CheckIcon } from '@radix-icons/vue';
import { cn } from '@ui/lib/utils';

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>();
const emit = defineEmits<CheckboxRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="
      cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-maincolor shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-maincolor data-[state=checked]:text-maincolor-foreground',
        props.class
      )
    "
  >
    <CheckboxIndicator class="h-full w-full flex items-center justify-center text-current">
      <slot>
        <CheckIcon class="h-4 w-4" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
