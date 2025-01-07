<script setup lang="ts">
import { onMounted } from 'vue';
import { useForwardExpose, useId } from '../../composables';
import { PopperAnchor } from '../popper';
import { Primitive } from '../primitive';
import { injectPopoverRootContext } from './context';
import type { PopoverTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'PopoverTrigger'
});

const props = withDefaults(defineProps<PopoverTriggerPropsWithPrimitive>(), {
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
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :type="as === 'button' ? 'button' : undefined"
      aria-haspopup="dialog"
      :aria-expanded="rootContext.open.value"
      :aria-controls="rootContext.contentId"
      :data-state="rootContext.open.value ? 'open' : 'closed'"
      @click="rootContext.onOpenToggle"
    >
      <slot />
    </Primitive>
  </component>
</template>
