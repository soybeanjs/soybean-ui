<script setup lang="ts">
import { computed } from 'vue';
import { Slot, SplitterResizeHandle, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, resizableVariants } from '@soybean-ui/variants';
import { GripVertical } from 'lucide-vue-next';
import type { ResizableHandleEmits, ResizableHandleProps } from '../types';

defineOptions({
  name: 'SResizableHandle'
});

const { class: cls, size, ui, ...delegatedProps } = defineProps<ResizableHandleProps>();

const emit = defineEmits<ResizableHandleEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { handle, handleIcon, handleIconRoot } = resizableVariants({ size });

  return {
    handle: cn(handle(), cls),
    handleIconRoot: cn(handleIconRoot(), ui?.handleIconRoot),
    handleIcon: cn(handleIcon(), ui?.handleIcon)
  };
});
</script>

<template>
  <SplitterResizeHandle v-bind="forwarded" :class="mergedCls.handle">
    <div v-if="withHandle" :class="mergedCls.handleIconRoot">
      <Slot :class="mergedCls.handleIcon">
        <slot>
          <GripVertical />
        </slot>
      </Slot>
    </div>
  </SplitterResizeHandle>
</template>
