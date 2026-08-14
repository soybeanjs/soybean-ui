# Quick Start

Once installed, UI-X components are used just like `@soybeanjs/ui` components: import the stylesheet, then render `Sx*` components.

## Requirements

- Vue >= 3.3
- `@soybeanjs/ui` installed and styled — see [Installation](/ui-x/installation)

## Basic usage

```vue
<script setup lang="ts">
import { SxBubble, SxSender } from '@soybeanjs/ui-x';
</script>

<template>
  <div class="space-y-3">
    <SxBubble role="ai" placement="start" content="Hello! How can I help you today?" />
    <SxBubble role="user" placement="end" content="I need help building a component." />
    <SxSender placeholder="Type a message..." />
  </div>
</template>
```

## Auto import (recommended)

Use `unplugin-vue-components` with the UI-X resolver so `Sx*` components are imported automatically:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import uiXResolver from '@soybeanjs/ui-x/resolver';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [uiXResolver()]
    })
  ]
});
```

Then use components directly in templates without manual imports:

```vue
<template>
  <SxBubble role="ai" content="Auto-imported." />
</template>
```

## Composing a chat UI

`SxBubbleList` renders a scrollable message list and `SxSender` produces new messages — together they form a minimal chat interface:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SxBubbleList, SxSender } from '@soybeanjs/ui-x';

const messages = ref<Array<{ id: string; role: 'user' | 'ai'; content: string }>>([]);

function send(text: string) {
  messages.value.push({ id: `msg-${Date.now()}`, role: 'user', content: text });
  messages.value.push({ id: `msg-${Date.now() + 1}`, role: 'ai', content: 'This is a placeholder reply.' });
}
</script>

<template>
  <div class="flex h-96 w-full flex-col gap-3">
    <SxBubbleList class="flex-1" :items="messages" />
    <SxSender @submit="send" />
  </div>
</template>
```

## Next steps

- [Component catalog](/ui-x) — browse all 20 components and their demos
- [Internationalization](/ui-x/i18n) — locale-aware labels and ARIA text
- [Theming](/ui-x/theming) — dark mode and slot-level customization
