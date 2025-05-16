<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMagicKeys } from '@vueuse/core';
import { SCard, SCommand, SCommandDialog, SKeyboardKey } from 'soy-ui';
import type { CommandGroupOptionData, CommandOptionData, SelectEvent } from 'soy-ui';
import { Calendar, HelpCircle, Mail, Rocket, Settings, Smile, User } from 'lucide-vue-next';

defineOptions({
  name: 'DemoCommand'
});

const keys = useMagicKeys();

const items: (CommandGroupOptionData | CommandOptionData)[] = [
  {
    label: 'Suggestions',
    separator: true,
    items: [
      {
        label: 'Calendar',
        value: 'calendar',
        icon: Calendar
      },
      {
        label: 'Search Emoji',
        value: 'search-emoji',
        icon: Smile
      },
      {
        label: 'Launch',
        value: 'launch',
        icon: Rocket
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
        icon: User,
        shortcut: ['command', 'p']
      },
      {
        label: 'Mail',
        value: 'mail',
        icon: Mail,
        shortcut: ['command', 'm']
      },
      {
        label: 'Settings',
        value: 'settings',
        icon: Settings,
        shortcut: ['command', 's']
      }
    ]
  },
  {
    label: 'Help',
    value: 'help',
    icon: HelpCircle,
    shortcut: ['command', 'h']
  }
];

function handleSelect(item: CommandOptionData, event: SelectEvent) {
  console.log(item, event);
}

const open = ref(false);

const CmdJ = keys['Cmd+J'];

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
  <div class="flex-c gap-4">
    <SCard title="Command" split>
      <SCommand class="border rounded-lg shadow-md" :items="items" />
    </SCard>
    <SCard title="Dialog Command" split>
      <SKeyboardKey :value="['command', 'j']" />
      <SCommandDialog v-model:open="open">
        <SCommand
          :items="items"
          :input-props="{ placeholder: 'Type a command or search...' }"
          empty-label="No option found"
          @select="handleSelect"
        />
      </SCommandDialog>
    </SCard>
  </div>
</template>
