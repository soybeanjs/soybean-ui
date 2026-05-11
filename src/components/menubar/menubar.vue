<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed } from 'vue';
import { MenubarCompact, provideMenubarUi } from '@soybeanjs/headless/menubar';
import type { DefinedValue } from '@soybeanjs/headless/types';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants } from '@/theme';
import { provideMenuUi } from '../menu/context';
import { menubarVariants } from './variants';
import type { MenubarProps, MenubarEmits, MenubarSlots } from './types';

defineOptions({
  name: 'SMenubar'
});

const props = defineProps<MenubarProps<T>>();

const emit = defineEmits<MenubarEmits<T>>();

const slots = defineSlots<MenubarSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'indicatorPosition']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = menubarVariants({
    size: props.size
  });

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideMenubarUi(ui);
provideMenuUi(() => props);
</script>

<template>
  <MenubarCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </MenubarCompact>
</template>
