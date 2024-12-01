<script setup lang="ts">
import { computed, toRefs } from 'vue';
import type { CSSProperties } from 'vue';
import { useBodyScrollLock, useForwardExpose, useForwardProps, useHideOthers } from '../../composables';
import type { FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';
import { DismissableLayer } from '../dismissable-layer';
import { ListboxContent } from '../listbox';
import { PopperContent } from '../popper';
import { Primitive } from '../primitive';
import { injectComboboxRootContext, provideComboboxContentContext } from './context';
import type { ComboboxContentImplEmits, ComboboxContentImplPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxContentImpl',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ComboboxContentImplPropsWithPrimitive>(), {
  position: 'inline',
  dismissable: true
});

const emit = defineEmits<ComboboxContentImplEmits>();

const { position } = toRefs(props);
const rootContext = injectComboboxRootContext();

const { forwardRef } = useForwardExpose();

useBodyScrollLock(props.bodyLock);
useHideOthers(rootContext.parentElement);

const pickedProps = computed(() => {
  if (props.position === 'popper') return props;
  return {};
});

const forwardedProps = useForwardProps(pickedProps.value);

const popperStyle: CSSProperties = {
  // Ensure border-box for floating-ui calculations
  boxSizing: 'border-box',
  '--soybean-combobox-content-transform-origin': 'var(--soybean-popper-transform-origin)',
  '--soybean-combobox-content-available-width': 'var(--soybean-popper-available-width)',
  '--soybean-combobox-content-available-height': 'var(--soybean-popper-available-height)',
  '--soybean-combobox-trigger-width': 'var(--soybean-popper-anchor-width)',
  '--soybean-combobox-trigger-height': 'var(--soybean-popper-anchor-height)'
};

function onFocusOutside(ev: FocusOutsideEvent) {
  // if clicking inside the combobox, prevent dismiss
  if (rootContext.parentElement.value?.contains(ev.target as Node)) ev.preventDefault();
  emit('focusOutside', ev);
}

function onPointerDownOutside(ev: PointerDownOutsideEvent) {
  // if clicking inside the combobox, prevent dismiss
  if (rootContext.parentElement.value?.contains(ev.target as Node)) {
    ev.preventDefault();
  }
  emit('pointerDownOutside', ev);
}

provideComboboxContentContext({ position });
</script>

<template>
  <ListboxContent as-child>
    <DismissableLayer
      as-child
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      @dismiss="rootContext.onOpenChange(false)"
      @focus-outside="onFocusOutside"
      @interact-outside="emit('interactOutside', $event)"
      @escape-key-down="emit('escapeKeyDown', $event)"
      @pointer-down-outside="onPointerDownOutside"
    >
      <component
        :is="position === 'popper' ? PopperContent : Primitive"
        v-bind="{ ...$attrs, ...forwardedProps }"
        :id="rootContext.contentId"
        :ref="forwardRef"
        :data-state="rootContext.open.value ? 'open' : 'closed'"
        :style="{
          // flex layout so we can place the scroll buttons properly
          display: 'flex',
          flexDirection: 'column',
          // reset the outline by default as the content MAY get focused
          outline: 'none',
          ...(position === 'popper' ? popperStyle : {})
        }"
      >
        <slot />
      </component>
    </DismissableLayer>
  </ListboxContent>
</template>
