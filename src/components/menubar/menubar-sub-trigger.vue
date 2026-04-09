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

const forwardedProps = useOmitProps(props, ['class', 'inset']);
const ui = menubarVariants({ inset: props.inset });

const cls = computed(() => cn(ui.subTrigger(), props.class));
</script>

<template>
  <MenubarSubTrigger v-bind="forwardedProps" :class="cls">
    <slot />
    <slot name="icon">
      <Icon :class="ui.subTriggerIcon()" icon="lucide:chevron-right" />
    </slot>
  </MenubarSubTrigger>
</template>
