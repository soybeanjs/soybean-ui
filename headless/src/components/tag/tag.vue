<script setup lang="ts">
import { useControllableState } from '../../composables';
import type { TagProps, TagEmits } from './types';

defineOptions({
  name: 'STag'
});

const props = withDefaults(defineProps<TagProps>(), {
  open: undefined
});

const emit = defineEmits<TagEmits>();

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value);
  },
  true
);

const close = () => {
  open.value = false;
};
</script>

<template>
  <div v-if="open" data-soybean-tag :data-open="open ? '' : undefined">
    <slot :open="open" :close="close" />
  </div>
</template>
