<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useTyping } from '../../composables';
import { bubbleVariants } from '../../styles/bubble';
import type { BubbleProps } from './types';

defineOptions({
  name: 'SxBubble'
});

const props = withDefaults(defineProps<BubbleProps>(), {
  placement: 'start',
  variant: 'filled',
  avatarSize: 'md',
  loading: false,
  typing: false
});

const text = computed(() => props.message?.content ?? props.content ?? '');

const typing = useTyping({ effect: 'typing', step: 2, interval: 16 });
const showTyping = ref(false);

watch(
  () => [text.value, props.typing] as const,
  ([value, enabled]) => {
    if (enabled) {
      showTyping.value = true;
      typing.start(value);
    } else {
      showTyping.value = false;
      typing.cancel();
    }
  },
  { immediate: true }
);

const display = computed(() => (showTyping.value ? typing.display.value : text.value));

const variants = computed(() => bubbleVariants({ placement: props.placement, variant: props.variant }));

const ui = computed(() => ({
  root: [variants.value.root, props.class],
  content: variants.value.content,
  header: variants.value.header,
  footer: variants.value.footer
}));
</script>

<template>
  <div :class="ui.root">
    <div v-if="$slots.header" :class="ui.header">
      <slot name="header" />
    </div>
    <div :class="ui.content">
      <slot name="content" :content="display">
        <span v-if="showTyping">{{ display }}</span>
        <span v-else-if="loading" class="text-muted-foreground">Thinking…</span>
        <span v-else>{{ display }}</span>
      </slot>
    </div>
    <div v-if="$slots.footer" :class="ui.footer">
      <slot name="footer" />
    </div>
  </div>
</template>
