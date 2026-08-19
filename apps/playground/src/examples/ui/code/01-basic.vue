<script setup lang="ts">
import { SCode } from '@soybeanjs/ui';

const code = `const greeting = 'Hello, SoybeanUI!';

export function sayHello(name: string) {
  return greeting.replace('SoybeanUI', name);
}`;
</script>

<template>
  <SCode class="w-100" :code="code" language="ts" />
</template>
