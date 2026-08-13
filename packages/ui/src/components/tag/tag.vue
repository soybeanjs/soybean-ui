<script setup lang="ts">
import { computed } from 'vue';
import { useLocaleMessages } from '@soybeanjs/headless';
import { Tag } from '@soybeanjs/headless/tag';
import { tagVariants } from '@/styles/tag';
import Icon from '../icon/icon.vue';
import type { TagProps, TagEmits } from './types';

defineOptions({
  name: 'STag'
});

const props = withDefaults(defineProps<TagProps>(), {
  open: undefined
});

const emit = defineEmits<TagEmits>();

const messages = useLocaleMessages();

const closeLabel = computed(() =>
  props.content
    ? messages.value.tag.remove.replace('{label}', props.content)
    : messages.value.tag.remove.replace(' {label}', '')
);

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
      <button
        type="button"
        class="shrink-0 cursor-pointer border-0 bg-transparent p-0 text-inherit"
        :aria-label="closeLabel"
        @click="close"
      >
        <Icon icon="lucide:x" />
      </button>
    </slot>
  </Tag>
</template>
