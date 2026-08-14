<script setup lang="ts">
import { ref } from 'vue';
import type { ConversationItem } from '@soybeanjs/ui-x/types';
import { SxConversations } from '@soybeanjs/ui-x';

const active = ref<string | null>('2');

const items: ConversationItem[] = [
  { id: '1', title: 'Refactor auth module', group: 'Today', updatedAt: Date.now() - 1000 * 60 * 30 },
  { id: '2', title: 'Design system tokens', group: 'Today', updatedAt: Date.now() - 1000 * 60 * 10 },
  { id: '3', title: 'Migrate to UnoCSS', group: 'Yesterday', updatedAt: Date.now() - 1000 * 60 * 60 * 24 },
  { id: '4', title: 'Add dark mode support', group: 'Yesterday', updatedAt: Date.now() - 1000 * 60 * 60 * 26 },
  { id: '5', title: 'Setup CI pipeline', group: 'Last Week', updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 7 }
];
</script>

<template>
  <SxConversations :items="items" :active="active" class="w-64" @change="active = $event.id" />
</template>
