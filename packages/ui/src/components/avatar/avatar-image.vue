<script setup lang="ts">
import { computed } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { AvatarImage, useForwardPropsEmits } from 'radix-vue';
import type { AvatarImageEmits } from 'radix-vue';
import { avatarVariants, cn } from '@soybean-unify/ui-variants';
import type { AvatarImageProps } from './types';

defineOptions({
  name: 'SAvatarImage'
});

const props = defineProps<AvatarImageProps>();

const delegatedProps = reactiveOmit(props, ['class']);

const emit = defineEmits<AvatarImageEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const cls = computed(() => {
  const { image } = avatarVariants();

  return cn(image(), props.class);
});
</script>

<template>
  <AvatarImage v-bind="forwarded" :class="cls" />
</template>

<style scoped></style>
