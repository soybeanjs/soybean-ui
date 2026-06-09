<script setup lang="ts">
import { computed } from 'vue';
import { Tag } from '@soybeanjs/headless/tag';
import { tagVariants } from '@/styles/tag';
import Icon from '../icon/icon.vue';
import type { TagProps, TagEmits } from './types.js';

defineOptions({
  name: 'STag'
});

const props = withDefaults(defineProps<TagProps>(), {
  open: undefined
});

const emit = defineEmits<TagEmits>();

const cls = computed(() =>
  tagVariants(
    {
      color: props.color,
      size: props.size,
      variant: props.variant,
      shape: props.shape
    },
    props.class
  )
);
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
