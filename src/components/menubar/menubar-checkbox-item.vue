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

const forwardedProps = useOmitProps(props, ['class', 'size']);
const listeners = useForwardListeners(emit);
const ui = computed(() => menubarVariants({ size: props.size }));

const cls = computed(() => cn(ui.value.checkboxItem(), props.class));
const indicatorCls = computed(() => ui.value.itemIndicator());
const indicatorIconCls = computed(() => ui.value.indicatorIcon());
</script>

<template>
  <MenubarCheckboxItem v-bind="forwardedProps" :class="cls" v-on="listeners">
    <span :class="indicatorCls">
      <MenubarItemIndicator>
        <slot name="indicator-icon">
          <Icon :class="indicatorIconCls" icon="lucide:check" />
        </slot>
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarCheckboxItem>
</template>
