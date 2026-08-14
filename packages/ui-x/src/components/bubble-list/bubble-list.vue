<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useBubbleListScroll } from '../../composables';
import { SxBubble } from '../bubble';
import { bubbleListVariants } from '../../styles/bubble-list';
import type { BubbleListProps } from './types';

defineOptions({
  name: 'SxBubbleList'
});

const props = withDefaults(defineProps<BubbleListProps>(), {
  scrollable: true,
  scrollThreshold: 40,
  showBackToBottom: true
});

const variants = bubbleListVariants();

const ui = computed(() => ({
  root: [variants.root, props.scrollable ? 'h-full' : 'h-auto', props.class],
  content: variants.content,
  backToBottom: variants.backToBottom
}));

const { container, atBottom, scrollToBottom } = useBubbleListScroll({ threshold: props.scrollThreshold });

const lastLength = ref(0);

watch(
  () => [props.items.length, container.value] as const,
  ([length, el]) => {
    // When a new message arrives while at the bottom (or the container mounts),
    // pin the list to the bottom.
    if (el && length > lastLength.value && atBottom.value) {
      scrollToBottom();
    }
    lastLength.value = length;
  },
  { flush: 'post' }
);

const scrollableRoot = computed(() => props.scrollable);
</script>

<template>
  <div ref="container" :class="ui.root" :role="scrollableRoot ? 'log' : undefined">
    <div :class="ui.content">
      <slot name="items" :items="items">
        <SxBubble
          v-for="message in items"
          :key="message.id"
          :message="message"
          :placement="message.role === 'user' ? 'end' : 'start'"
        >
          <template #content="{ content }">
            <slot name="content" :message="message" :content="content" />
          </template>
        </SxBubble>
      </slot>
    </div>
    <button
      v-if="showBackToBottom && !atBottom"
      :class="ui.backToBottom"
      type="button"
      aria-label="Back to bottom"
      @click="scrollToBottom"
    >
      <slot name="back-to-bottom-icon">
        <span aria-hidden="true">↓</span>
      </slot>
    </button>
  </div>
</template>
