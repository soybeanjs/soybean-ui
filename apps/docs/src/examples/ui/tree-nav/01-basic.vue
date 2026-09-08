<script setup lang="ts">
import { STreeNav } from '@soybeanjs/ui';
import type { TreeNavOptionData } from '@soybeanjs/ui';

const items: TreeNavOptionData[] = [
  {
    value: 'docs',
    label: 'Docs',
    icon: 'lucide:book',
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
      { value: 'themes', label: 'Themes', icon: 'lucide:palette', disabled: true }
    ]
  },
  {
    value: 'blog',
    label: 'Blog',
    icon: 'lucide:newspaper',
    children: [
      { value: 'announcements', label: 'Announcements' },
      { value: 'changelog', label: 'Changelog', shortcut: '⌘K' }
    ]
  },
  { value: 'pricing', label: 'Pricing', icon: 'lucide:credit-card' },
  { value: 'github', label: 'GitHub', icon: 'lucide:github', href: 'https://github.com/soybeanjs/soybean-ui' }
];
</script>

<template>
  <STreeNav :items="items" default-value="getting-started" />
</template>
