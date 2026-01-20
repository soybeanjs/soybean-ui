<script setup lang="ts">
import { useClipboard } from '@vueuse/core';

interface Props {
  codeBase64: string;
}

const props = defineProps<Props>();

function decodeBase64ToText(base64: string): string {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

const code = decodeBase64ToText(props.codeBase64);

const { copy, copied } = useClipboard({
  source: code,
  copiedDuring: 2000
});
</script>

<template>
  <SButtonIcon
    :icon="copied ? 'lucide:check' : 'lucide:copy'"
    :fit-content="false"
    class="absolute right-1 top-1 z-10"
    @click="copy(code)"
  />
</template>
