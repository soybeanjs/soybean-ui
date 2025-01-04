<script setup lang="ts">
import { ref } from 'vue';
import { EditIcon, FileIcon, HelpCircle, UserIcon, ViewIcon } from 'lucide-vue-next';
import { SMenubar } from '@soybean-ui/vue';
import type { MenuOptionData } from '@soybean-ui/vue';

defineOptions({
  name: 'UiMenubar'
});

const options: MenuOptionData[] = [
  {
    label: 'File',
    value: 'file',
    icon: FileIcon,
    children: [
      {
        label: 'New Tab',
        value: 'new-tab',
        shortcut: ['command', 't']
      },
      {
        label: 'New Window',
        value: 'new-window',
        shortcut: ['command', 'n']
      },
      {
        label: 'New Incognito Window',
        value: 'new-window-incognito',
        disabled: true,
        separator: true
      },
      {
        label: 'Share',
        value: 'share',
        children: [
          {
            label: 'Email link',
            value: 'share-to-email'
          },
          {
            label: 'Messages',
            value: 'share-to-messages'
          },
          {
            label: 'Notes',
            value: 'share-to-notes'
          }
        ],
        separator: true
      },
      {
        label: 'Print...',
        value: 'print',
        shortcut: ['command', 'p']
      }
    ]
  },
  {
    label: 'Edit',
    value: 'edit',
    icon: EditIcon,
    children: [
      {
        label: 'Undo',
        value: 'undo',
        shortcut: ['command', 'z']
      },
      {
        label: 'Redo',
        value: 'redo',
        shortcut: ['command', 'shift', 'z'],
        separator: true
      },
      {
        label: 'Find',
        value: 'find',
        children: [
          {
            label: 'Search the web',
            value: 'find-web'
          },
          {
            label: 'Find...',
            value: 'find-input'
          },
          {
            label: 'Find Next',
            value: 'find-next'
          },
          {
            label: 'Find Previous',
            value: 'find-previous'
          }
        ]
      },
      {
        label: 'Cut',
        value: 'cut',
        shortcut: ['command', 'x']
      },
      {
        label: 'Copy',
        value: 'copy',
        shortcut: ['command', 'c']
      },
      {
        label: 'Paste',
        value: 'paste',
        shortcut: ['command', 'v']
      }
    ]
  },
  {
    label: 'View',
    value: 'view',
    icon: ViewIcon,
    children: [
      {
        label: 'Always Show Bookmarks Bar',
        value: 'always-show-bookmarks-bar'
      },
      {
        label: 'Always Show Full URLs',
        value: 'always-show-full-urls',
        separator: true
      },
      {
        label: 'Reload',
        value: 'reload',
        shortcut: ['command', 'r']
      },
      {
        label: 'Force Reload',
        value: 'force-reload',
        shortcut: ['command', 'shift', 'r'],
        separator: true
      },
      {
        label: 'Toggle Fullscreen',
        value: 'toggle-fullscreen',
        separator: true
      },
      {
        label: 'Hide Sidebar',
        value: 'hide-sidebar'
      }
    ]
  },
  {
    label: 'Profiles',
    value: 'profiles',
    icon: UserIcon,
    children: [
      {
        label: 'Andy',
        value: 'andy'
      },
      {
        label: 'Benoit',
        value: 'benoit'
      },
      {
        label: 'Luis',
        value: 'luis',
        separator: true
      },
      {
        label: 'Edit...',
        value: 'edit',
        separator: true
      },
      {
        label: 'Add Profile...',
        value: 'add-profile'
      }
    ]
  },
  {
    label: 'More',
    value: 'more',
    icon: HelpCircle,
    linkProps: {
      href: 'https://soybeanjs.cn'
    }
  }
];

const currentMenu = ref('');
</script>

<template>
  <SMenubar v-model="currentMenu" :items="options" />
</template>
