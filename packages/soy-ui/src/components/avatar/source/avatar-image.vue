<script setup lang="ts">
import { computed } from 'vue';
import { AvatarImage } from '@soybean-ui/primitives';
import { avatarVariants, cn } from '@soybean-ui/variants';
import type { AvatarImageEmits, AvatarImageProps } from '../types';

defineOptions({
  name: 'SAvatarImage'
});

const { class: cls, src, alt } = defineProps<AvatarImageProps>();

const emit = defineEmits<AvatarImageEmits>();

const { image } = avatarVariants();

const mergedCls = computed(() => cn(image(), cls));
</script>

<template>
  <AvatarImage :src="src" :alt="alt" :class="mergedCls" @loading-status-change="emit('loadingStatusChange', $event)" />
</template>
