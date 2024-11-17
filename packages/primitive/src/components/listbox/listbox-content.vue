<script setup lang="ts">
import { refAutoReset } from '@vueuse/shared';
import { useCollection } from '../../composables';
import { Primitive, type PrimitiveProps } from '../primitive';
import { injectListboxRootContext } from './listbox-root.vue';
export interface ListboxContentProps extends PrimitiveProps {}

defineProps<ListboxContentProps>();

const { CollectionSlot } = useCollection();
const rootContext = injectListboxRootContext();

const isClickFocus = refAutoReset(false, 10);
</script>

<template>
  <CollectionSlot>
    <Primitive
      role="listbox"
      :as
      :as-child
      :tabindex="rootContext.focusable.value ? (rootContext.highlightedElement.value ? '-1' : '0') : undefined"
      :aria-orientation="rootContext.orientation.value"
      :aria-multiselectable="!!rootContext.multiple.value"
      :data-orientation="rootContext.orientation.value"
      @mousedown.left="isClickFocus = true"
      @focus="
        ev => {
          if (isClickFocus) return;
          rootContext.onEnter(ev);
        }
      "
      @keydown.down.up.left.right.home.end.prevent="
        event => {
          rootContext.focusable.value ? rootContext.onKeydownNavigation(event) : undefined;
        }
      "
      @keydown.enter="rootContext.onKeydownEnter"
      @keydown="rootContext.onKeydownTypeAhead"
    >
      <slot />
    </Primitive>
  </CollectionSlot>
</template>
