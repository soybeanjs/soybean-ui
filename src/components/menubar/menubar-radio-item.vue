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

const forwardedProps = useOmitProps(props, ['class']);
const listeners = useForwardListeners(emit);
const ui = menubarVariants();

const cls = computed(() => cn(ui.radioItem(), props.class));
</script>

<template>
  <MenubarRadioItem v-bind="forwardedProps" :class="cls" v-on="listeners">
    <span :class="ui.itemIndicator()">
      <MenubarItemIndicator>
        <slot name="indicator-icon">
          <Icon class="size-2 fill-current" icon="lucide:circle" />
        </slot>
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarRadioItem>
</template>
