<script setup lang="ts">
import { SCard, SNavigationMenu } from 'soy-ui';
import type { NavigationMenuItemOption } from 'soy-ui';
import {
  BookOpen,
  Box,
  CloudDownload,
  Cog,
  Database,
  FileText,
  Github,
  HelpCircle,
  House,
  Smile,
  SwatchBook
} from 'lucide-vue-next';

defineOptions({
  name: 'DemoNavigationMenu'
});

const menus: NavigationMenuItemOption[] = [
  {
    value: 'guide',
    label: 'Guide',
    icon: BookOpen,
    href: '/getting-started',
    items: [
      {
        value: 'introduction',
        label: 'Introduction',
        description: 'Fully styled and customizable components for Nuxt.',
        icon: House
      },
      {
        value: 'installation',
        label: 'Installation',
        description: 'Learn how to install and configure Nuxt UI in your application.',
        icon: CloudDownload
      },
      {
        value: 'icons',
        label: 'Icons',
        icon: Smile,
        description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
      },
      {
        value: 'colors',
        label: 'Colors',
        icon: SwatchBook,
        description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
      },
      {
        value: 'theme',
        label: 'Theme',
        icon: Cog,
        description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
      }
    ]
  },
  {
    value: 'composables',
    label: 'Composables',
    icon: Database,
    href: '/composables',
    items: [
      {
        value: 'defineShortcuts',
        label: 'defineShortcuts',
        icon: FileText,
        description: 'Define shortcuts for your application.',
        href: '/composables/define-shortcuts'
      },
      {
        value: 'useModal',
        label: 'useModal',
        icon: FileText,
        description: 'Display a modal within your application.',
        href: '/composables/use-modal'
      },
      {
        value: 'useSlideover',
        label: 'useSlideover',
        icon: FileText,
        description: 'Display a slideover within your application.',
        href: '/composables/use-slideover'
      },
      {
        value: 'useToast',
        label: 'useToast',
        icon: FileText,
        description: 'Display a toast within your application.',
        href: '/composables/use-toast'
      }
    ]
  },
  {
    value: 'components',
    label: 'Components',
    icon: Box,
    href: '/components',
    items: [
      {
        value: 'link',
        label: 'Link',
        icon: FileText,
        description: 'Use NuxtLink with superpowers.',
        href: '/components/link'
      },
      {
        value: 'modal',
        label: 'Modal',
        icon: FileText,
        description: 'Display a modal within your application.',
        href: '/components/modal'
      },
      {
        value: 'navigation-menu',
        label: 'NavigationMenu',
        icon: FileText,
        description: 'Display a list of links.',
        href: '/components/navigation-menu'
      },
      {
        value: 'pagination',
        label: 'Pagination',
        icon: FileText,
        description: 'Display a list of pages.',
        href: '/components/pagination'
      },
      {
        value: 'popover',
        label: 'Popover',
        icon: FileText,
        description: 'Display a non-modal dialog that floats around a trigger element.',
        href: '/components/popover'
      },
      {
        value: 'progress',
        label: 'Progress',
        icon: FileText,
        description: 'Show a horizontal bar to indicate task progression.',
        href: '/components/progress'
      }
    ]
  },
  {
    label: 'GitHub',
    icon: Github,
    href: 'https://github.com/nuxt/ui',
    target: '_blank'
  },
  {
    label: 'Help',
    icon: HelpCircle,
    href: 'https://github.com/nuxt/ui',
    disabled: true
  }
];
</script>

<template>
  <SCard title="NavigationMenu" split>
    <SNavigationMenu :items="menus" show-arrow :ui="{ childLink: 'w-80' }" />
  </SCard>
</template>
