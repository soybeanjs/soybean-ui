<script setup lang="ts">
import { computed } from 'vue';
import { AvatarImage } from 'reka-ui';
import { avatarVariants, cn } from '@soybean-ui/variants';
import type { AvatarImageEmits, AvatarImageProps } from './types';

defineOptions({
  name: 'SAvatarImage'
});

const { class: cls, src, alt } = defineProps<AvatarImageProps>();

const emit = defineEmits<AvatarImageEmits>();

const { image } = avatarVariants();

const mergedCls = computed(() => cn(image(), cls));
</script>

<template>
  <AvatarImage :src :alt :class="mergedCls" @loading-status-change="emit('loadingStatusChange', $event)" />
</template>

<style scoped></style>
