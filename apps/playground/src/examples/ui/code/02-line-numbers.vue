<script setup lang="ts">
import { SCode } from '@soybeanjs/ui';

const code = `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

for (let i = 0; i < 10; i++) {
  console.log(fibonacci(i));
}`;
</script>

<template>
  <SCode class="w-100" :code="code" language="ts" line-numbers copyable />
</template>
