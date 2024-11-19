<script setup lang="ts">
import { refAutoReset } from '@vueuse/shared';
import { useCollection } from '../../composables';
import { Primitive } from '../primitive';
import { injectListboxRootContext } from './context';
import type { ListboxContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'ListboxContent'
});

const props = defineProps<ListboxContentPropsWithPrimitive>();

const { CollectionSlot } = useCollection();
const rootContext = injectListboxRootContext();

const isClickFocus = refAutoReset(false, 10);

function onFocus(event: FocusEvent) {
  if (isClickFocus.value) return;
  rootContext.onEnter(event);
}

function onKeydownNavigation(event: KeyboardEvent) {
  if (rootContext.focusable.value) {
    rootContext.onKeydownNavigation(event);
  }
}
</script>

<template>
  <CollectionSlot>
    <Primitive
      :class="props.class"
      role="listbox"
      :as
      :as-child
      :tabindex="rootContext.focusable.value ? (rootContext.highlightedElement.value ? '-1' : '0') : undefined"
      :aria-orientation="rootContext.orientation.value"
      :aria-multiselectable="!!rootContext.multiple.value"
      :data-orientation="rootContext.orientation.value"
      @mousedown.left="isClickFocus = true"
      @focus="onFocus"
      @keydown.down.up.left.right.home.end.prevent="onKeydownNavigation"
      @keydown.enter="rootContext.onKeydownEnter"
      @keydown="rootContext.onKeydownTypeAhead"
    >
      <slot />
    </Primitive>
  </CollectionSlot>
</template>
