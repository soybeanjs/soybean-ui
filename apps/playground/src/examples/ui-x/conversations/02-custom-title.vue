<script setup lang="ts">
import { ref } from 'vue';
import type { ConversationItem } from '@soybeanjs/ui-x/types';
import { SxConversations } from '@soybeanjs/ui-x';

const active = ref<string | null>(null);

const items: ConversationItem[] = [
  { id: '1', title: 'Refactor auth module', group: 'Today', updatedAt: Date.now() - 1000 * 60 * 30 },
  { id: '2', title: 'Design system tokens', group: 'Today', updatedAt: Date.now() - 1000 * 60 * 10 },
  { id: '3', title: 'Migrate to UnoCSS', group: 'Yesterday', updatedAt: Date.now() - 1000 * 60 * 60 * 24 }
];
</script>

<template>
  <SxConversations class="w-64" :items="items" :active="active" @change="active = $event.id">
    <template #groupTitle="{ group }">📂 {{ group }}</template>
  </SxConversations>
</template>
