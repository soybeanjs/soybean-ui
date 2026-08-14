<script setup lang="ts">
import { SxMermaid } from '@soybeanjs/ui-x';

const code = `sequenceDiagram
  participant U as User
  participant A as Assistant
  U->>A: Ask a question
  A-->>U: Provide an answer`;
</script>

<template>
  <SxMermaid :code="code" mode="code" />
</template>
