<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { mermaidVariants } from '../../styles/mermaid';
import type { MermaidProps } from './types';

defineOptions({
  name: 'SxMermaid'
});

const props = withDefaults(defineProps<MermaidProps>(), {
  mode: 'image',
  showToggle: true
});

const mode = ref<'image' | 'code'>(props.mode);
const rendered = ref('');
const error = ref(false);

const variants = mermaidVariants();

const ui = computed(() => ({
  root: [variants.root, props.class],
  toolbar: variants.toolbar,
  toggle: variants.toggle,
  diagram: variants.diagram,
  code: variants.code,
  fallback: variants.fallback
}));

async function render(): Promise<void> {
  if (mode.value !== 'image') return;
  error.value = false;
  try {
    const { default: mermaid } = await import('mermaid');
    mermaid.initialize({ startOnLoad: false });
    const { svg } = await mermaid.render(`mermaid-${Date.now()}`, props.code);
    rendered.value = svg;
  } catch {
    error.value = true;
  }
}

watch(
  () => props.code,
  () => render()
);

watch(
  () => mode.value,
  () => render()
);

onMounted(render);
</script>

<template>
  <div :class="ui.root">
    <div v-if="showToggle" :class="ui.toolbar">
      <button type="button" :class="ui.toggle" :aria-pressed="mode === 'image'" @click="mode = 'image'">Diagram</button>
      <button type="button" :class="ui.toggle" :aria-pressed="mode === 'code'" @click="mode = 'code'">Code</button>
    </div>

    <div v-if="mode === 'image'" :class="ui.diagram" data-mode="diagram">
      <div v-if="rendered" v-html="rendered"></div>
      <div v-else-if="error" :class="ui.fallback">
        Failed to render diagram. Install the optional `mermaid` peer dependency.
      </div>
      <div v-else :class="ui.fallback">Rendering…</div>
    </div>

    <pre v-else :class="ui.code"><code>{{ code }}</code></pre>
  </div>
</template>
