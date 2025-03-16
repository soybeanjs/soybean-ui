<script setup lang="ts">
import { onMounted } from 'vue';
import { useForwardExpose } from '../../composables';
import { getActiveElement } from '../../shared';
import { DismissableLayer } from '../dismissable-layer';
import { FocusScope } from '../focus-scope';
import { getOpenState } from '../menu/shared';
import { injectDialogRootContext } from './context';
import { useWarning } from './shared';
import type { DialogContentImplEmits, DialogContentImplPropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogContentImpl',
  inheritAttrs: false
});

const props = defineProps<DialogContentImplPropsWithPrimitive>();

const emit = defineEmits<DialogContentImplEmits>();

const {
  initTitleId,
  initDescriptionId,
  setContentElement,
  triggerElement,
  contentId,
  titleId,
  descriptionId,
  open,
  onOpenChange
} = injectDialogRootContext();

initTitleId();
initDescriptionId();

const { forwardRef, currentElement: contentElement } = useForwardExpose();

onMounted(() => {
  setContentElement(contentElement);

  // Preserve the `DialogTrigger` element in case it was triggered programmatically
  if (getActiveElement() !== document.body) {
    triggerElement.value = getActiveElement() as HTMLElement;
  }
});

if (process.env.NODE_ENV !== 'production') {
  useWarning({
    titleName: 'DialogTitle',
    contentName: 'DialogContent',
    componentLink: 'dialog.html#title',
    titleId: titleId.value,
    descriptionId: descriptionId.value,
    contentElement
  });
}
</script>

<template>
  <FocusScope
    as-child
    loop
    :trapped="trapFocus"
    @mount-auto-focus="emit('openAutoFocus', $event)"
    @unmount-auto-focus="emit('closeAutoFocus', $event)"
  >
    <DismissableLayer
      :id="contentId"
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      role="dialog"
      :aria-describedby="descriptionId"
      :aria-labelledby="titleId"
      :data-state="getOpenState(open)"
      v-bind="$attrs"
      @dismiss="onOpenChange(false)"
      @escape-key-down="emit('escapeKeyDown', $event)"
      @focus-outside="emit('focusOutside', $event)"
      @interact-outside="emit('interactOutside', $event)"
      @pointer-down-outside="emit('pointerDownOutside', $event)"
    >
      <slot />
    </DismissableLayer>
  </FocusScope>
</template>
