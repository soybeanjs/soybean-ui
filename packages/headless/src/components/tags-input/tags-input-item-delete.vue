<script setup lang="ts">
import { computed } from 'vue';
import Icon from '../_icon/icon.vue';
import Button from '../button/button.vue';
import { useTagsInputItemContext, useTagsInputUi } from './context.js';
import type { TagsInputItemDeleteProps } from './types.js';

defineOptions({
  name: 'TagsInputItemDelete'
});

const props = defineProps<TagsInputItemDeleteProps>();

const cls = useTagsInputUi('itemDelete');

const { disabled, isSelected, textId, onDelete } = useTagsInputItemContext('TagsInputItemDelete');

const isDisabled = computed(() => props.disabled || disabled.value);
</script>

<template>
  <Button
    v-bind="props"
    :class="cls"
    data-soybean-tags-input-item-delete
    tabindex="-1"
    :disabled="isDisabled"
    :aria-labelledby="textId || undefined"
    :aria-current="isSelected ? 'true' : undefined"
    :data-state="isSelected ? 'active' : 'inactive'"
    @click="onDelete"
  >
    <slot>
      <Icon icon="lucide:x" :aria-hidden="true" />
    </slot>
  </Button>
</template>
