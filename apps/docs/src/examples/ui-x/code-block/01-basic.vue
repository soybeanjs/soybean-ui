<script setup lang="ts">
import { SxCodeBlock } from '@soybeanjs/ui-x';

const code = `interface User {
  id: string;
  name: string;
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const admin: User = { id: '1', name: 'Admin' };
console.log(greet(admin));`;
</script>

<template>
  <SxCodeBlock :code="code" language="ts" show-header />
</template>
