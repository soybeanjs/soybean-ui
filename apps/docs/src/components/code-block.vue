<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from 'vue';
import { encodeBase64Utf8 } from '~/shared/encode';
import { highlightToHtml } from '~/shared/highlight';

interface Props {
  code: string;
  lang: string;
}

const props = defineProps<Props>();

const wrapper = useTemplateRef('wrapper');

async function renderCode() {
  const html = await highlightToHtml(props.code, props.lang);

  if (wrapper.value) {
    wrapper.value.innerHTML = html;
  }
}

const result = computed(() => encodeBase64Utf8(props.code));

onMounted(() => {
  renderCode();
});
</script>

<template>
  <div class="relative">
    <div ref="wrapper" class="md-code-block" :data-lang="lang" />
    <CopyButton :code-base64="result" />
  </div>
</template>
