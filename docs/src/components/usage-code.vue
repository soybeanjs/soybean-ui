<script setup lang="ts">
import { getPlaygroundComponentCode } from '../constants/globs';

interface Props {
  component: string;
  file?: string;
}

const props = withDefaults(defineProps<Props>(), {
  file: 'basic'
});

const code = computed(() => getPlaygroundComponentCode(props.component, props.file));
const missingTitle = computed(() => `${props.component}/${props.file} not found`);
</script>

<template>
  <CodeBlock v-if="code" :code="code" lang="vue" />
  <SAlert v-else color="destructive" :title="missingTitle" icon="lucide:alert-circle" />
</template>
