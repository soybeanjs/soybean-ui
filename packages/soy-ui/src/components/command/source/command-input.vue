<script setup lang="ts">
import { computed } from 'vue';
import { ListboxFilter, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, commandVariants } from '@soybean-ui/variants';
import { Search } from 'lucide-vue-next';
import type { CommandInputEmits, CommandInputProps } from '../types';

defineOptions({
  name: 'SCommandInput',
  inheritAttrs: false
});

const { class: cls, size, wrapperClass, iconClass, autoFocus: _, ...delegatedProps } = defineProps<CommandInputProps>();

const emit = defineEmits<CommandInputEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { input, inputWrapper, inputIcon } = commandVariants({ size });

  return {
    cls: cn(input(), cls),
    wrapper: cn(inputWrapper(), wrapperClass),
    icon: cn(inputIcon(), iconClass)
  };
});
</script>

<template>
  <div :class="mergedCls.wrapper">
    <slot name="leading">
      <Search :class="mergedCls.icon" />
    </slot>
    <ListboxFilter v-bind="forwarded" :class="mergedCls.cls" auto-focus />
    <slot name="trailing" />
  </div>
</template>
