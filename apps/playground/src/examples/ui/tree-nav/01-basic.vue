<script setup lang="ts">
import { STreeNav } from '@soybeanjs/ui';
import type { MenuOptionData } from '@soybeanjs/ui';

const items: MenuOptionData<string>[] = [
  {
    value: 'docs',
    label: 'Docs',
    children: [
      { value: 'getting-started', label: 'Getting Started', icon: 'lucide:rocket' },
      {
        value: 'components',
        label: 'Components',
        icon: 'lucide:blocks',
        children: [
          { value: 'button', label: 'Button' },
          { value: 'input', label: 'Input' }
        ]
      },
      { value: 'themes', label: 'Themes', disabled: true }
    ]
  },
  {
    value: 'blog',
    label: 'Blog',
    children: [
      { value: 'announcements', label: 'Announcements' },
      { value: 'changelog', label: 'Changelog', shortcut: '⌘K' }
    ]
  },
  { value: 'pricing', label: 'Pricing' },
  { value: 'github', label: 'GitHub', href: 'https://github.com/soybeanjs/soybean-ui' }
];
</script>

<template>
  <STreeNav :items="items" default-value="getting-started" />
</template>
