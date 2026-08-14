<script setup lang="ts">
import { SxBubble } from '@soybeanjs/ui-x';
</script>

<template>
  <div class="flex flex-col gap-3">
    <SxBubble placement="start" role="ai" content="Hello! How can I help you today?" />
    <SxBubble placement="end" role="user" content="I need help building a Vue component." />
  </div>
</template>
