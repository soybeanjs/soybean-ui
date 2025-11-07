<script setup lang="ts">
import { SCard, SNavigationMenu } from '@ui';
import type { NavigationMenuOptionData } from '@ui';

const menus: NavigationMenuOptionData[] = [
  {
    value: 'guide',
    label: 'Guide',
    icon: 'lucide:book-open',
    linkProps: {
      href: '/getting-started'
    },
    children: [
      {
        value: 'introduction',
        label: 'Introduction',
        description: 'Fully styled and customizable components for Nuxt.',
        icon: 'lucide:house',
        linkProps: {
          href: '/getting-started/introduction'
        }
      },
      {
        value: 'installation',
        label: 'Installation',
        description: 'Learn how to install and configure Nuxt UI in your application.',
        icon: 'lucide:cloud-download',
        linkProps: {
          href: '/getting-started/installation'
        }
      },
      {
        value: 'icons',
        label: 'Icons',
        icon: 'lucide:smile',
        description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
        linkProps: {
          href: '/getting-started/icons'
        }
      },
      {
        value: 'colors',
        label: 'Colors',
        icon: 'lucide:palette',
        description: 'Choose a primary and a neutral color from your Tailwind CSS theme.',
        linkProps: {
          href: '/getting-started/colors'
        }
      },
      {
        value: 'theme',
        label: 'Theme',
        icon: 'lucide:swatch-book',
        description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.',
        linkProps: {
          href: '/getting-started/theme'
        }
      }
    ]
  },
  {
    value: 'composables',
    label: 'Composables',
    icon: 'lucide:database',
    linkProps: {
      href: '/composables'
    },
    children: [
      {
        value: 'defineShortcuts',
        label: 'defineShortcuts',
        icon: 'lucide:file-text',
        description: 'Define shortcuts for your application.',
        linkProps: {
          href: '/composables/define-shortcuts'
        }
      },
      {
        value: 'useModal',
        label: 'useModal',
        icon: 'lucide:file-text',
        description: 'Display a modal within your application.',
        linkProps: {
          href: '/composables/use-modal'
        }
      },
      {
        value: 'useSlideover',
        label: 'useSlideover',
        icon: 'lucide:file-text',
        description: 'Display a slideover within your application.',
        linkProps: {
          href: '/composables/use-slideover'
        }
      },
      {
        value: 'useToast',
        label: 'useToast',
        icon: 'lucide:file-text',
        description: 'Display a toast within your application.',
        linkProps: {
          href: '/composables/use-toast'
        }
      }
    ]
  },
  {
    value: 'components',
    label: 'Components',
    icon: 'lucide:box',
    linkProps: {
      href: '/components'
    },
    children: [
      {
        value: 'link',
        label: 'Link',
        icon: 'lucide:file-text',
        description: 'Use NuxtLink with superpowers.',
        linkProps: {
          href: '/components/link'
        }
      },
      {
        value: 'modal',
        label: 'Modal',
        icon: 'lucide:file-text',
        description: 'Display a modal within your application.',
        linkProps: {
          href: '/components/modal'
        }
      },
      {
        value: 'navigation-menu',
        label: 'NavigationMenu',
        icon: 'lucide:file-text',
        description: 'Display a list of links.',
        linkProps: {
          href: '/components/navigation-menu'
        }
      },
      {
        value: 'pagination',
        label: 'Pagination',
        icon: 'lucide:file-text',
        description: 'Display a list of pages.',
        linkProps: {
          href: '/components/pagination'
        }
      },
      {
        value: 'popover',
        label: 'Popover',
        icon: 'lucide:file-text',
        description: 'Display a non-modal dialog that floats around a trigger element.',
        linkProps: {
          href: '/components/popover'
        }
      },
      {
        value: 'progress',
        label: 'Progress',
        icon: 'lucide:file-text',
        description: 'Show a horizontal bar to indicate task progression.',
        linkProps: {
          href: '/components/progress'
        }
      }
    ]
  },
  {
    label: 'GitHub',
    value: 'github',
    icon: 'lucide:github',
    linkProps: {
      href: 'https://github.com/nuxt/ui',
      target: '_blank'
    }
  },
  {
    label: 'Help',
    value: 'help',
    icon: 'lucide:circle-help',
    linkProps: {
      href: 'https://github.com/nuxt/ui'
    },
    disabled: true
  }
];
</script>

<template>
  <SCard title="Base" :scrollable="false">
    <SNavigationMenu :items="menus" :ui="{ subLink: 'w-80' }" />
  </SCard>
</template>
