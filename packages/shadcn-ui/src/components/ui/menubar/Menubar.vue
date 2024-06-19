<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue';
import { MenubarRoot, type MenubarRootEmits, type MenubarRootProps, useForwardPropsEmits } from 'radix-vue';
import { cn } from '@ui/lib/utils';

const props = defineProps<MenubarRootProps & { class?: HTMLAttributes['class'] }>();
const emit = defineEmits<MenubarRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <MenubarRoot
    v-bind="forwarded"
    :class="cn('flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm', props.class)"
  >
    <slot />
  </MenubarRoot>
</template>
