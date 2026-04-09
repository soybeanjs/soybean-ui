<script setup lang="ts">
import { computed } from 'vue';
import { MenubarItemIndicator, MenubarRadioItem } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { cn } from '@/theme';
import Icon from '../icon/icon.vue';
import { menubarVariants } from './variants';
import type { MenubarRadioItemEmits, MenubarRadioItemProps } from './types';

defineOptions({
  name: 'SMenubarRadioItem'
});

const props = defineProps<MenubarRadioItemProps>();

const emit = defineEmits<MenubarRadioItemEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size']);
const listeners = useForwardListeners(emit);
const ui = computed(() => menubarVariants({ size: props.size }));

const cls = computed(() => cn(ui.value.radioItem(), props.class));
const indicatorCls = computed(() => ui.value.itemIndicator());
const indicatorIconCls = computed(() => ui.value.indicatorIcon());
</script>

<template>
  <MenubarRadioItem v-bind="forwardedProps" :class="cls" v-on="listeners">
    <span :class="indicatorCls">
      <MenubarItemIndicator>
        <slot name="indicator-icon">
          <Icon :class="cn(indicatorIconCls, 'fill-current')" icon="lucide:circle" />
        </slot>
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarRadioItem>
</template>
