<script setup lang="ts">
interface Props {
  content: string;
  triggerContent?: string;
}

const { content, triggerContent = '?' } = defineProps<Props>();
</script>

<template>
  <STooltip placement="top">
    <template #trigger>
      <SButton variant="pure" size="xs">{{ triggerContent }}</SButton>
    </template>
    <STag variant="soft" size="xl">{{ content }}</STag>
  </STooltip>
</template>
