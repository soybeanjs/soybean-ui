<script setup lang="ts">
import { nextTick, ref } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useCollection, useForwardExpose } from '../../composables';
import { injectMenuContentContext } from './menu-content-impl.vue';
import { isMouseEvent } from './utils';

export interface MenuItemImplProps extends PrimitiveProps {
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
  /**
   * Optional text used for typeahead purposes. By default the typeahead behavior will use the `.textContent` of the
   * item. <br> Use this when the content is complex, or you have non-textual content inside.
   */
  textValue?: string;
}

defineOptions({
  inheritAttrs: false
});

const props = defineProps<MenuItemImplProps>();

const contentContext = injectMenuContentContext();
const { forwardRef } = useForwardExpose();
const { CollectionItem } = useCollection();

const isFocused = ref(false);

async function handlePointerMove(event: PointerEvent) {
  if (event.defaultPrevented) return;
  if (!isMouseEvent(event)) return;

  if (props.disabled) {
    contentContext.onItemLeave(event);
  } else {
    const defaultPrevented = contentContext.onItemEnter(event);
    if (!defaultPrevented) {
      const item = event.currentTarget;
      (item as HTMLElement)?.focus({ preventScroll: true });
    }
  }
}

async function handlePointerLeave(event: PointerEvent) {
  await nextTick();
  if (event.defaultPrevented) return;
  if (!isMouseEvent(event)) return;

  contentContext.onItemLeave(event);
}
</script>

<template>
  <CollectionItem>
    <Primitive
      :ref="forwardRef"
      role="menuitem"
      tabindex="-1"
      v-bind="$attrs"
      :as
      :as-child
      data-soybean-collection-item
      :aria-disabled="disabled || undefined"
      :data-disabled="disabled ? '' : undefined"
      :data-highlighted="isFocused ? '' : undefined"
      @pointermove="handlePointerMove"
      @pointerleave="handlePointerLeave"
      @focus="
        async event => {
          await nextTick();
          if (event.defaultPrevented || disabled) return;
          isFocused = true;
        }
      "
      @blur="
        async event => {
          await nextTick();
          if (event.defaultPrevented) return;
          isFocused = false;
        }
      "
    >
      <slot />
    </Primitive>
  </CollectionItem>
</template>
