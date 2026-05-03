<script setup lang="ts">
import { allPlaygroundComponents } from '../constants/globs';

interface Props {
  component: string;
  file?: string;
}

const props = withDefaults(defineProps<Props>(), {
  file: 'basic'
});

const code = computed(() => allPlaygroundComponents[props.component]?.[props.file]?.code);
const missingTitle = computed(() => `${props.component}/${props.file} not found`);
</script>

<template>
  <CodeBlock v-if="code" :code="code" lang="vue" />
  <SAlert v-else color="destructive" :title="missingTitle" icon="lucide:alert-circle" />
</template>
