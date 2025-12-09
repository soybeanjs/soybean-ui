<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue';
import { useMagicKeys } from '@vueuse/core';
import { SCommand, SDialogPure, SKbd } from '@soybeanjs/ui';
import type { CommandOptionData } from '@soybeanjs/ui';

const keys = useMagicKeys();

const items: CommandOptionData[] = [
  {
    label: 'Suggestions',
    separator: true,
    items: [
      {
        label: 'Calendar',
        value: 'calendar',
        icon: 'lucide:calendar'
      },
      {
        label: 'Search Emoji',
        value: 'search-emoji',
        icon: 'lucide:smile'
      },
      {
        label: 'Launch',
        value: 'launch',
        icon: 'lucide:rocket'
      }
    ]
  },
  {
    label: 'Settings',
    separator: true,
    items: [
      {
        label: 'Profile',
        value: 'profile',
        icon: 'lucide:user',
        shortcut: ['command', 'p']
      },
      {
        label: 'Mail',
        value: 'mail',
        icon: 'lucide:mail',
        shortcut: ['command', 'm']
      },
      {
        label: 'Settings',
        value: 'settings',
        icon: 'lucide:settings',
        shortcut: ['command', 's']
      }
    ]
  },
  {
    label: 'Help',
    value: 'help',
    icon: 'lucide:help-circle',
    shortcut: ['command', 'h']
  }
];

const open = shallowRef(false);

const CmdJ = computed(() => keys['Cmd+J']?.value);

function handleOpenChange() {
  open.value = !open.value;
}

watch(CmdJ, v => {
  if (v) {
    handleOpenChange();
  }
});
</script>

<template>
  <div>
    <h3 class="playground-title">Dialog</h3>
    <SKbd :value="['command', 'j']" />
    <SDialogPure v-model:open="open">
      <SCommand
        class="border rounded-lg shadow-md"
        :items="items"
        :input-props="{ placeholder: 'Type a command or search...' }"
        empty-label="No command founded, please try again"
      />
    </SDialogPure>
  </div>
</template>
