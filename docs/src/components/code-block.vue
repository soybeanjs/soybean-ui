<script setup lang="ts">
import { codeToHtml } from 'shiki';
import { encodeBase64Utf8 } from '@/modules/markdown';

interface Props {
  code: string;
  lang: string;
}

const props = defineProps<Props>();

const wrapper = useTemplateRef('wrapper');

async function renderCode() {
  const html = await codeToHtml(props.code, {
    lang: props.lang,
    defaultColor: false,
    themes: {
      light: 'one-light',
      dark: 'one-dark-pro'
    }
  });

  if (wrapper.value) {
    wrapper.value.innerHTML = html;
  }
  console.log('html: ', html);
}

onMounted(() => {
  renderCode();
});
</script>

<template>
  <div class="relative">
    <div ref="wrapper" class="md-code-block"></div>
    <CopyButton :code-base64="encodeBase64Utf8(props.code)" />
  </div>
</template>
