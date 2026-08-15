<script setup lang="ts">
import { computed } from 'vue';
import { attachmentsVariants } from '../../styles/attachments';
import type { Attachment } from '../../types';
import { SxFileCard } from '../file-card';
import type { AttachmentsProps } from './types';

defineOptions({
  name: 'SxAttachments'
});

const props = withDefaults(defineProps<AttachmentsProps>(), {
  showIcons: true
});

const emit = defineEmits<{
  remove: [attachment: Attachment];
  select: [attachment: Attachment];
}>();

const variants = attachmentsVariants();

const ui = computed(() => ({
  root: [variants.root, props.class],
  item: variants.item
}));
</script>

<template>
  <div :class="ui.root">
    <div v-if="$slots.prepend">
      <slot name="prepend" />
    </div>
    <div v-for="attachment in attachments" :key="attachment.id" :class="ui.item">
      <slot name="item" :attachment="attachment">
        <SxFileCard :attachment="attachment" @click="emit('select', attachment)">
          <template #actions>
            <slot name="actions" :attachment="attachment">
              <button
                type="button"
                aria-label="Remove attachment"
                class="text-muted-foreground transition-colors hover:text-foreground"
                @click.stop="emit('remove', attachment)"
              >
                <slot name="remove-icon">
                  <span aria-hidden="true">✕</span>
                </slot>
              </button>
            </slot>
          </template>
        </SxFileCard>
      </slot>
    </div>
  </div>
</template>
