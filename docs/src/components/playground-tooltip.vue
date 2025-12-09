<script setup lang="ts">
import { STooltip } from '@soybeanjs/ui';

interface Props {
  content: string;
  triggerContent?: string;
}

const { content, triggerContent = '?' } = defineProps<Props>();
</script>

<template>
  <STooltip :content-props="{ placement: 'top' }">
    <template #trigger>
      <SButton variant="pure" size="xs">{{ triggerContent }}</SButton>
    </template>
    <STag variant="soft" size="xl">{{ content }}</STag>
  </STooltip>
</template>
