<script setup lang="ts">
import { SxMermaid } from '@soybeanjs/ui-x';

const code = `flowchart LR
  A[Start] --> B{Is it?}
  B -- Yes --> C[Process]
  C --> D[Result]
  B -- No --> E[End]`;
</script>

<template>
  <SxMermaid :code="code" :show-toggle="true" />
</template>
