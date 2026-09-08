<script setup lang="ts">
import { SxCodeBlock } from '@soybeanjs/ui-x';

const SCRIPT_TAG = 'script';

const code = `<template>
  <div class="greeting">{{ message }}</div>
</template>

${SCRIPT_TAG} setup lang="ts">
const message = 'Hello, Vue!';
</${SCRIPT_TAG}>;`;
</script>

<template>
  <SxCodeBlock :code="code" language="vue" highlight />
</template>
