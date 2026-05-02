<script setup lang="ts">
interface Props {
  codeBase64: string;
}

const props = defineProps<Props>();

const { locale } = useI18n();

const wrapper = useTemplateRef('wrapper');
const renderError = shallowRef(false);
const svg = shallowRef('');
const isDark = shallowRef(false);

let themeObserver: MutationObserver | null = null;

const errorMessage = computed(() => {
  return locale.value === 'zh-CN'
    ? 'Mermaid 图表渲染失败，请检查语法。'
    : 'Mermaid diagram failed to render. Please check the syntax.';
});

const decodedCode = computed(() => decodeBase64Utf8(props.codeBase64));

function decodeBase64Utf8(base64: string) {
  if (typeof atob !== 'function') {
    return '';
  }

  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function syncTheme() {
  isDark.value = document.documentElement.classList.contains('dark');
}

async function renderDiagram() {
  const container = wrapper.value;

  if (!container) {
    return;
  }

  const source = decodedCode.value.trim();

  if (!source) {
    container.innerHTML = '';
    svg.value = '';
    renderError.value = false;
    return;
  }

  try {
    const mermaidModule = await import('mermaid');
    const mermaid = mermaidModule.default;

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: isDark.value ? 'dark' : 'default'
    });

    const id = `mermaid-${Math.random().toString(36).slice(2, 10)}`;
    const rendered = await mermaid.render(id, source);

    svg.value = rendered.svg;
    container.innerHTML = rendered.svg;
    renderError.value = false;
  } catch {
    svg.value = '';
    container.innerHTML = '';
    renderError.value = true;
  }
}

onMounted(() => {
  syncTheme();

  themeObserver = new MutationObserver(() => {
    const nextIsDark = document.documentElement.classList.contains('dark');

    if (nextIsDark === isDark.value) {
      return;
    }

    isDark.value = nextIsDark;
    void renderDiagram();
  });

  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });

  void renderDiagram();
});

onBeforeUnmount(() => {
  themeObserver?.disconnect();
});

watch(
  () => props.codeBase64,
  () => {
    void renderDiagram();
  }
);
</script>

<template>
  <div class="glass-panel my-8 overflow-hidden">
    <div class="flex items-center justify-between border-b border-border/60 px-5 py-4">
      <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Diagram</div>
      <div class="code-btn-outline">Mermaid</div>
    </div>

    <div v-if="renderError" class="space-y-4 p-5">
      <SAlert color="destructive" variant="soft" icon="lucide:triangle-alert" :title="errorMessage" />
      <pre
        class="docs-code-fallback overflow-x-auto rounded-4 border p-4 text-[13px] leading-6 text-foreground"
      ><code>{{ decodedCode }}</code></pre>
    </div>

    <div
      v-else
      ref="wrapper"
      class="overflow-x-auto px-4 py-6 sm:px-6 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
    />
  </div>
</template>
