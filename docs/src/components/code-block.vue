<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

interface Props {
  code: string;
  language?: string;
  filename?: string;
  collapsible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  language: 'vue',
  collapsible: true,
  filename: ''
});

const expanded = ref(false);
const copied = ref(false);

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy code:', err);
  }
};

const toggleExpanded = () => {
  expanded.value = !expanded.value;
};
</script>

<template>
  <div class="code-block-wrapper">
    <div v-if="filename" class="code-block-header">
      <span class="filename">{{ filename }}</span>
    </div>

    <div class="code-block-toolbar">
      <button v-if="collapsible" class="toolbar-btn" @click="toggleExpanded">
        <Icon :icon="expanded ? 'lucide:chevron-up' : 'lucide:chevron-down'" class="w-4 h-4" />
        <span>{{ expanded ? '收起' : '展开' }}</span>
      </button>

      <button class="toolbar-btn" @click="copyCode">
        <Icon :icon="copied ? 'lucide:check' : 'lucide:copy'" class="w-4 h-4" />
        <span>{{ copied ? '已复制' : '复制' }}</span>
      </button>
    </div>

    <div v-show="expanded || !collapsible" class="code-content">
      <pre><code :class="`language-${language}`">{{ code }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.code-block-wrapper {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid rgb(15 23 42 / 0.1);
  background: rgb(15 23 42 / 0.05);
}

.code-block-header {
  padding: 0.75rem 1rem;
  background: rgb(15 23 42 / 0.08);
  border-bottom: 1px solid rgb(15 23 42 / 0.1);
}

.filename {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgb(15 23 42 / 0.7);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.code-block-toolbar {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  justify-content: flex-end;
  background: rgb(15 23 42 / 0.03);
  border-bottom: 1px solid rgb(15 23 42 / 0.05);
}

.toolbar-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  color: rgb(15 23 42 / 0.7);
  background: white;
  border: 1px solid rgb(15 23 42 / 0.1);
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.toolbar-btn:hover {
  color: rgb(var(--primary));
  border-color: rgb(var(--primary) / 0.3);
  background: rgb(var(--primary) / 0.05);
}

.dark .toolbar-btn {
  color: rgb(248 250 252 / 0.7);
  background: rgb(15 23 42 / 0.5);
  border-color: rgb(248 250 252 / 0.1);
}

.dark .toolbar-btn:hover {
  color: rgb(var(--primary));
  border-color: rgb(var(--primary) / 0.3);
  background: rgb(var(--primary) / 0.1);
}

.toolbar-btn svg {
  flex-shrink: 0;
}

.code-content {
  position: relative;
}

pre {
  margin: 0;
  padding: 1rem;
  overflow-x: auto;
  background: transparent !important;
}

code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}
</style>
