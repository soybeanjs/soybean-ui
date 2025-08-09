<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import type { CSSProperties } from 'vue';
import { useForwardElement, useForwardListeners, useOmitProps, usePresence } from '../../composables';
import type { FocusOutsideEvent } from '../../types';
import { popperCssVars } from '../popper/shared';
import { useMenuContext, useMenuRootContext, useMenuThemeContext } from './context';
import MenuContentImpl from './menu-content-impl.vue';
import { menuContentCssVars } from './shared';
import type { MenuContentEmits, MenuContentPrivateProps } from './types';

defineOptions({
  name: 'MenuContent'
});

const props = defineProps<MenuContentPrivateProps>();

const emit = defineEmits<MenuContentEmits>();

const forwardedProps = useOmitProps(props, ['forceMount', 'elRef']);

const listeners = useForwardListeners(emit);

const themeContext = useMenuThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.content, props.class]);

const style: CSSProperties = {
  [menuContentCssVars.transformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [menuContentCssVars.availableWidth]: `var(${popperCssVars.availableWidth})`,
  [menuContentCssVars.availableHeight]: `var(${popperCssVars.availableHeight})`,
  [menuContentCssVars.triggerWidth]: `var(${popperCssVars.anchorWidth})`,
  [menuContentCssVars.triggerHeight]: `var(${popperCssVars.anchorHeight})`
};

const { open } = useMenuContext('MenuContent');
const { modal } = useMenuRootContext('MenuContent');

const [contentElement, setContentElement] = useForwardElement(props.elRef);

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, open);

const trapFocus = computed(() => modal.value && open.value);

const focusOutside = (event: FocusOutsideEvent) => {
  if (modal.value) {
    event.preventDefault();
  }
};
</script>

<template>
  <MenuContentImpl
    v-if="isPresent"
    v-bind="forwardedProps"
    :ref="setContentElement"
    :class="cls"
    :style="style"
    :trap-focus="trapFocus"
    :disable-outside-pointer-events="trapFocus"
    v-on="listeners"
    @focus-outside="focusOutside"
  >
    <slot />
  </MenuContentImpl>
</template>
