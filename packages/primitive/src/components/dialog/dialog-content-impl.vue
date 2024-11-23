<script setup lang="ts">
import { onMounted } from 'vue';
import { FocusScope } from '../focus-scope';
import { DismissableLayer } from '../dismissable-layer';
import { useForwardExpose } from '../../composables';
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

const rootContext = injectDialogRootContext();
rootContext.initTitleId();
rootContext.initDescriptionId();

const { forwardRef, currentElement: contentElement } = useForwardExpose();

onMounted(() => {
  rootContext.contentElement = contentElement;

  // Preserve the `DialogTrigger` element in case it was triggered programmatically
  if (document.activeElement !== document.body) {
    rootContext.triggerElement.value = document.activeElement as HTMLElement;
  }
});

if (process.env.NODE_ENV !== 'production') {
  useWarning({
    titleName: 'DialogTitle',
    contentName: 'DialogContent',
    componentLink: 'dialog.html#title',
    titleId: rootContext.titleId.value,
    descriptionId: rootContext.descriptionId.value,
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
      :id="rootContext.contentId"
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      role="dialog"
      :aria-describedby="rootContext.descriptionId"
      :aria-labelledby="rootContext.titleId"
      :data-state="getOpenState(rootContext.open.value)"
      v-bind="$attrs"
      @dismiss="rootContext.onOpenChange(false)"
      @escape-key-down="emit('escapeKeyDown', $event)"
      @focus-outside="emit('focusOutside', $event)"
      @interact-outside="emit('interactOutside', $event)"
      @pointer-down-outside="emit('pointerDownOutside', $event)"
    >
      <slot />
    </DismissableLayer>
  </FocusScope>
</template>
