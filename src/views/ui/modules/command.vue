<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMagicKeys } from '@vueuse/core';
import { SCommand, SCommandDialog, SKeyboardKey } from '@soybean-ui/vue';
import type { CommandItemOption, CommandItemSingleOption, SelectEvent } from '@soybean-ui/vue';
import { Calendar, Mail, Rocket, Settings, Smile, User } from 'lucide-vue-next';

defineOptions({
  name: 'UiCommand'
});

const keys = useMagicKeys();

const items: CommandItemOption[] = [
  {
    groupId: 'suggestions',
    label: 'Suggestions',
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
    ],
    separator: true
  },
  {
    groupId: 'settings',
    label: 'Settings',
    items: [
      {
        label: 'Profile',
        value: 'profile',
        icon: User,
        shortcut: '⌘P'
      },
      {
        label: 'Mail',
        value: 'mail',
        icon: Mail,
        shortcut: '⌘M'
      },
      {
        label: 'Settings',
        value: 'settings',
        icon: Settings,
        shortcut: '⌘S'
      }
    ]
  }
];

function handleSelect(item: CommandItemSingleOption, event: SelectEvent) {
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
  <SCommand
    :items="items"
    :input-props="{ placeholder: 'Type a command or search...' }"
    class="max-w-[450px] border rounded-lg shadow-md"
    @select="handleSelect"
  />
  <div>Dialog Command</div>
  <SKeyboardKey :value="['command', 'j']" />
  <SCommandDialog v-model:open="open">
    <SCommand
      :items="items"
      :input-props="{ placeholder: 'Type a command or search...' }"
      empty-label="No option found"
      @select="handleSelect"
    />
  </SCommandDialog>
</template>

<style scoped></style>
