<script setup lang="ts">
import { codeToHtml } from 'shiki';

interface Props {
  code: string;
  lang: string;
}

const props = defineProps<Props>();

const wrapper = useTemplateRef('wrapper');

async function renderCode() {
  const html = await codeToHtml(props.code, {
    lang: props.lang,
    themes: {
      light: 'one-light',
      dark: 'one-dark-pro'
    }
  });

  if (wrapper.value) {
    wrapper.value.innerHTML = html;
  }
}

onMounted(() => {
  renderCode();
});
</script>

<template>
  <div ref="wrapper" class="md-code-block"></div>
</template>
