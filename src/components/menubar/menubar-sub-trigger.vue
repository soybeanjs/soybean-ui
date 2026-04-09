<script setup lang="ts">
import { computed } from 'vue';
import { MenubarSubTrigger } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import Icon from '../icon/icon.vue';
import { menubarVariants } from './variants';
import type { MenubarSubTriggerProps } from './types';

defineOptions({
  name: 'SMenubarSubTrigger'
});

const props = defineProps<MenubarSubTriggerProps>();

const forwardedProps = useOmitProps(props, ['class', 'inset', 'size']);
const ui = computed(() => menubarVariants({ inset: props.inset, size: props.size }));

const cls = computed(() => cn(ui.value.subTrigger(), props.class));
const iconCls = computed(() => ui.value.subTriggerIcon());
</script>

<template>
  <MenubarSubTrigger v-bind="forwardedProps" :class="cls">
    <slot />
    <slot name="icon">
      <Icon :class="iconCls" icon="lucide:chevron-right" />
    </slot>
  </MenubarSubTrigger>
</template>
