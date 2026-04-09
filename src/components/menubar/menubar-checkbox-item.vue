<script setup lang="ts">
import { computed } from 'vue';
import { MenubarCheckboxItem, MenubarItemIndicator } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import Icon from '../icon/icon.vue';
import { menubarVariants } from './variants';
import type { MenubarCheckboxItemEmits, MenubarCheckboxItemProps } from './types';

defineOptions({
  name: 'SMenubarCheckboxItem'
});

const props = defineProps<MenubarCheckboxItemProps>();

const emit = defineEmits<MenubarCheckboxItemEmits>();

const forwardedProps = useOmitProps(props, ['class']);
const listeners = useForwardListeners(emit);
const ui = menubarVariants();

const cls = computed(() => cn(ui.checkboxItem(), props.class));
</script>

<template>
  <MenubarCheckboxItem v-bind="forwardedProps" :class="cls" v-on="listeners">
    <span :class="ui.itemIndicator()">
      <MenubarItemIndicator>
        <slot name="indicator-icon">
          <Icon class="size-4" icon="lucide:check" />
        </slot>
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarCheckboxItem>
</template>
