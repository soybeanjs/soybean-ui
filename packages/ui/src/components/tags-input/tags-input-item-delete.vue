<script setup lang="ts">
import { computed } from 'vue';
import { Slot, TagsInputItemDelete } from '@soybean-ui/primitives';
import { cn, tagsInputVariants } from '@soybean-ui/variants';
import { X } from 'lucide-vue-next';
import type { TagsInputItemDeleteProps } from './types';

defineOptions({
  name: 'STagsInputItemDelete'
});

const { class: cls, size, iconClass } = defineProps<TagsInputItemDeleteProps>();

const mergedCls = computed(() => {
  const { itemDelete, itemDeleteIcon } = tagsInputVariants({ size });

  return {
    cls: cn(itemDelete(), cls),
    icon: cn(itemDeleteIcon(), iconClass)
  };
});
</script>

<template>
  <TagsInputItemDelete :class="mergedCls.cls">
    <Slot :class="mergedCls.icon">
      <slot>
        <X />
      </slot>
    </Slot>
  </TagsInputItemDelete>
</template>
