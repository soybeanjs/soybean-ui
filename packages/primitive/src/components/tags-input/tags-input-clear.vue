<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectTagsInputRootContext } from './context';
import type { TagsInputClearPropsWithPrimitive } from './types';

defineOptions({
  name: 'TagsInputClear'
});

const props = withDefaults(defineProps<TagsInputClearPropsWithPrimitive>(), {
  as: 'button'
});

const { disabled, modelValue } = injectTagsInputRootContext();

const dataDisabled = computed(() => (disabled.value ? '' : undefined));

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

function handleCancel() {
  if (disabled.value) return;
  modelValue.value = [];
}

useForwardExpose();
</script>

<template>
  <Primitive v-bind="props" :data-disabled="dataDisabled" :type="tag" @click="handleCancel">
    <slot />
  </Primitive>
</template>
