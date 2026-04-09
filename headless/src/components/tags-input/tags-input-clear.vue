<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useTagsInputRootContext, useTagsInputUi } from './context';
import type { TagsInputClearProps } from './types';

defineOptions({
  name: 'TagsInputClear'
});

const props = withDefaults(defineProps<TagsInputClearProps>(), {
  as: 'button'
});

const cls = useTagsInputUi('clear');

const { disabled, onClear } = useTagsInputRootContext('TagsInputClear');

const type = computed(() => (props.as === 'button' ? 'button' : undefined));
</script>

<template>
  <Primitive
    v-bind="props"
    :class="cls"
    :type="type"
    :data-disabled="disabled ? '' : undefined"
    @click="onClear"
  >
    <slot />
  </Primitive>
</template>
