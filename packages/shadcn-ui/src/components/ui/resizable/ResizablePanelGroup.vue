<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { SplitterGroup, type SplitterGroupEmits, type SplitterGroupProps, useForwardPropsEmits } from 'radix-vue';
import { cn } from '@ui/lib/utils';

const props = defineProps<SplitterGroupProps & { class?: HTMLAttributes['class'] }>();
const emit = defineEmits<SplitterGroupEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <SplitterGroup
    v-bind="forwarded"
    :class="cn('flex h-full w-full data-[panel-group-direction=vertical]:flex-col', props.class)"
  >
    <slot />
  </SplitterGroup>
</template>
