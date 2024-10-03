<script
  setup
  lang="ts"
  generic="V extends string | string[] = string | string[], E extends SingleOrMultipleType = SingleOrMultipleType"
>
import { computed } from 'vue';
import { ToggleGroupRoot, useForwardPropsEmits } from 'radix-vue';
import { cn, toggleVariants } from '@soybean-ui/variants';
import type { SingleOrMultipleType } from '../../types';
import type { ToggleGroupRootEmits, ToggleGroupRootProps } from './types';

defineOptions({
  name: 'SToggleGroupRoot'
});

const { class: cls, size, ...delegatedProps } = defineProps<ToggleGroupRootProps<V, E>>();

const emit = defineEmits<ToggleGroupRootEmits<V>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { groupRoot } = toggleVariants({ size });

  return cn(groupRoot(), cls);
});
</script>

<template>
  <ToggleGroupRoot v-bind="forwarded" :class="mergedCls">
    <slot />
  </ToggleGroupRoot>
</template>

<style scoped></style>
