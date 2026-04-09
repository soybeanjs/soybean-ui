<script setup lang="ts">
import { TagsInputItemDelete } from '@soybeanjs/headless';
import Icon from '../icon/icon.vue';
import type { TagsInputItemDeleteProps } from '@soybeanjs/headless/tags-input';

defineOptions({
  name: 'STagsInputItemDelete'
});

const props = defineProps<TagsInputItemDeleteProps>();
</script>

<template>
  <TagsInputItemDelete v-bind="props">
    <slot>
      <Icon icon="lucide:x" aria-hidden="true" />
    </slot>
  </TagsInputItemDelete>
</template>
