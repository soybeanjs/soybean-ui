<script setup lang="ts">
import { BookOpen, Box, CloudDownload, Cog, Database, FileText, House, Smile, SwatchBook } from 'lucide-vue-next';
import { SNavigationMenu } from '@soybean-ui/vue';
import type { NavigationMenuItemOption } from '@soybean-ui/vue';

defineOptions({
  name: 'UiNavigationMenu'
});

const menus: NavigationMenuItemOption[] = [
  {
    label: 'Guide',
    icon: BookOpen,
    href: '/getting-started',
    items: [
      {
        label: 'Introduction',
        description: 'Fully styled and customizable components for Nuxt.',
        icon: House
      },
      {
        label: 'Installation',
        description: 'Learn how to install and configure Nuxt UI in your application.',
        icon: CloudDownload
      },
      {
        label: 'Icons',
        icon: Smile,
        description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
      },
      {
        label: 'Colors',
        icon: SwatchBook,
        description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
      },
      {
        label: 'Theme',
        icon: Cog,
        description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
      }
    ]
  },
  {
    label: 'Composables',
    icon: Database,
    href: '/composables',
    items: [
      {
        label: 'defineShortcuts',
        icon: FileText,
        description: 'Define shortcuts for your application.',
        href: '/composables/define-shortcuts'
      },
      {
        label: 'useModal',
        icon: FileText,
        description: 'Display a modal within your application.',
        href: '/composables/use-modal'
      },
      {
        label: 'useSlideover',
        icon: FileText,
        description: 'Display a slideover within your application.',
        href: '/composables/use-slideover'
      },
      {
        label: 'useToast',
        icon: FileText,
        description: 'Display a toast within your application.',
        href: '/composables/use-toast'
      }
    ]
  },
  {
    label: 'Components',
    icon: Box,
    href: '/components',
    items: [
      {
        label: 'Link',
        icon: FileText,
        description: 'Use NuxtLink with superpowers.',
        href: '/components/link'
      },
      {
        label: 'Modal',
        icon: FileText,
        description: 'Display a modal within your application.',
        href: '/components/modal'
      },
      {
        label: 'NavigationMenu',
        icon: FileText,
        description: 'Display a list of links.',
        href: '/components/navigation-menu'
      },
      {
        label: 'Pagination',
        icon: FileText,
        description: 'Display a list of pages.',
        href: '/components/pagination'
      },
      {
        label: 'Popover',
        icon: FileText,
        description: 'Display a non-modal dialog that floats around a trigger element.',
        href: '/components/popover'
      },
      {
        label: 'Progress',
        icon: FileText,
        description: 'Show a horizontal bar to indicate task progression.',
        href: '/components/progress'
      }
    ]
  }
];
</script>

<template>
  <SNavigationMenu :items="menus" show-arrow child-link-class="w-80" />
</template>
