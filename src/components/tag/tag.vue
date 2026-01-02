<script setup lang="ts">
import { computed } from 'vue';
import { Tag } from '@soybeanjs/headless';
import { cn } from '@/theme';
import { tagVariants } from '@/variants/tag';
import Icon from '../icon/icon.vue';
import type { TagEmits, TagProps } from './types';

defineOptions({
  name: 'STag'
});

const props = withDefaults(defineProps<TagProps>(), {
  open: undefined
});

const emit = defineEmits<TagEmits>();

const cls = computed(() => {
  const variants = tagVariants({
    color: props.color,
    size: props.size,
    variant: props.variant,
    shape: props.shape
  });

  return cn(variants, props.class);
});
</script>

<template>
  <Tag v-slot="{ close }" :open="open" :class="cls" @update:open="emit('update:open', $event)">
    <slot name="leading" />
    <slot>{{ content }}</slot>
    <slot name="trailing" />
    <slot v-if="closable" name="close" :close="close">
      <Icon icon="lucide:x" style="flex-shrink: 0; cursor: pointer" @click="close" />
    </slot>
  </Tag>
</template>
