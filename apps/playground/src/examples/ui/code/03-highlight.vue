<script setup lang="ts">
import { SCode } from '@soybeanjs/ui';

const code = `const token = 'soybean-secret';
const headers = { Authorization: \`Bearer \${token}\` };
fetch('/api/user', { headers });`;

// Minimal keyword highlighting to demonstrate the pluggable highlighter.
function highlight(source: string, language?: string): string {
  const escaped = source.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return escaped.replace(
    /\b(const|function|return|fetch|let|if|for|new|class|import|export|from)\b/g,
    '<span class="text-primary font-semibold">$1</span>'
  );
}
</script>

<template>
  <SCode class="w-100" :code="code" language="js" :highlight="highlight" line-numbers />
</template>
