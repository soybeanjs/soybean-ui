<script setup lang="ts">
import { codeToHtml } from 'shiki';

interface Props {
  code: string;
}

const props = defineProps<Props>();

const wrapper = useTemplateRef('wrapper');

async function renderCode() {
  const html = await codeToHtml(props.code, {
    lang: 'ts',
    defaultColor: false,
    themes: {
      light: 'one-light',
      dark: 'one-dark-pro'
    }
  });

  if (wrapper.value) {
    wrapper.value.innerHTML = html;
  }
}

watch(
  () => props.code,
  () => {
    renderCode();
  },
  {
    flush: 'post',
    immediate: true
  }
);
</script>

<template>
  <div
    ref="wrapper"
    class="text-xs leading-5 [&_pre]:p-2 [&_pre]:my-0 [&_pre]:rounded-md [&_code]:whitespace-pre-wrap"
  ></div>
</template>
