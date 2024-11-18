<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { PopperRoot } from '../popper';
import { useIsUsingKeyboard } from '../../composables/use-is-using-keyboard';
import { useDirection } from '../../composables';
import { provideMenuContext, provideMenuRootContext } from './context';
import type { MenuRootProps } from './types';

defineOptions({
  name: 'MenuRoot'
});

const props = withDefaults(defineProps<MenuRootProps>(), {
  open: false,
  modal: true
});

const open = defineModel<boolean>('open', { default: false });
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
