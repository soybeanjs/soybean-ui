<script setup lang="ts">
interface Props {
  title: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="text-lg font-bold">{{ title }}</h3>
    <slot />
  </div>
</template>
