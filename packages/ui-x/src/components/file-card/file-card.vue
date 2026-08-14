<script setup lang="ts">
import { computed } from 'vue';
import type { AttachmentKind } from '../../types';
import { fileCardVariants } from '../../styles/file-card';
import type { FileCardProps } from './types';

defineOptions({
  name: 'SxFileCard'
});

const props = withDefaults(defineProps<FileCardProps>(), {
  onClick: undefined
});

const variants = fileCardVariants();

const ui = computed(() => ({
  root: [variants.root, props.class],
  icon: variants.icon,
  body: variants.body,
  name: variants.name,
  meta: variants.meta
}));

const iconLabel: Record<AttachmentKind, string> = {
  file: '📄',
  image: '🖼',
  video: '🎬',
  audio: '🎵',
  link: '🔗',
  database: '🗄',
  unknown: '❔'
};

const icon = computed(() => iconLabel[props.attachment.kind ?? 'file']);

const meta = computed(() => {
  const parts: string[] = [];
  if (props.attachment.mimeType) parts.push(props.attachment.mimeType);
  if (props.attachment.size) parts.push(props.attachment.size);
  return parts.join(' · ');
});
</script>

<template>
  <div :class="ui.root" :role="onClick ? 'button' : undefined" :tabindex="onClick ? 0 : undefined" @click="onClick">
    <div :class="ui.icon" aria-hidden="true">
      <slot name="icon" :kind="attachment.kind ?? 'file'">
        <span>{{ icon }}</span>
      </slot>
    </div>
    <div :class="ui.body">
      <div :class="ui.name">
        <slot name="name" :attachment="attachment">{{ attachment.name }}</slot>
      </div>
      <div v-if="meta" :class="ui.meta">
        <slot name="meta" :meta="meta">{{ meta }}</slot>
      </div>
    </div>
    <slot name="actions" :attachment="attachment" />
  </div>
</template>
