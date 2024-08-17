<script setup lang="ts">
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

const { image } = avatarVariants();
</script>

<template>
  <AvatarImage v-bind="forwarded" :class="cn(image(), props.class)" />
</template>

<style scoped></style>
