<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { useVModel } from '@vueuse/core';
import { useDirection, useIsUsingKeyboard } from '../../composables';
import { PopperRoot } from '../popper';
import { provideMenuContext, provideMenuRootContext } from './context';
import type { MenuRootEmits, MenuRootProps } from './types';

defineOptions({
  name: 'MenuRoot'
});

const props = withDefaults(defineProps<MenuRootProps>(), {
  open: false,
  modal: true
});

const emit = defineEmits<MenuRootEmits>();

const open = useVModel(props, 'open', emit, { defaultValue: props.defaultOpen });

const isUsingKeyboardRef = useIsUsingKeyboard();

const { modal, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);

const content = ref<HTMLElement>();

provideMenuContext({
  open,
  onOpenChange: value => {
    open.value = value;
  },
  content,
  onContentChange: element => {
    content.value = element;
  }
});

provideMenuRootContext({
  onClose: () => {
    open.value = false;
  },
  isUsingKeyboardRef,
  dir,
  modal
});
</script>

<template>
  <PopperRoot>
    <slot />
  </PopperRoot>
</template>
