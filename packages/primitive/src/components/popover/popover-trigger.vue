<script lang="ts">
import { onMounted } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { PopperAnchor } from '../popper';
import { useForwardExpose, useId } from '../../_shared';
</script>

<script setup lang="ts">
import { injectPopoverRootContext } from './popover-root.vue';

export interface PopoverTriggerProps extends PrimitiveProps {}

const props = withDefaults(defineProps<PopoverTriggerProps>(), {
  as: 'button'
});

const rootContext = injectPopoverRootContext();

const { forwardRef, currentElement: triggerElement } = useForwardExpose();

rootContext.triggerId ||= useId(undefined, 'soybean-popover-trigger');
onMounted(() => {
  rootContext.triggerElement.value = triggerElement.value;
});
</script>

<template>
  <component :is="rootContext.hasCustomAnchor.value ? Primitive : PopperAnchor" as-child>
    <Primitive
      :id="rootContext.triggerId"
      :ref="forwardRef"
      :type="as === 'button' ? 'button' : undefined"
      aria-haspopup="dialog"
      :aria-expanded="rootContext.open.value"
      :aria-controls="rootContext.contentId"
      :data-state="rootContext.open.value ? 'open' : 'closed'"
      :as
      :as-child="props.asChild"
      @click="rootContext.onOpenToggle"
    >
      <slot />
    </Primitive>
  </component>
</template>
