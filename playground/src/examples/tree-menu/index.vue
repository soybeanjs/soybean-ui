<script setup lang="ts">
import { computed, ref } from 'vue';
import { useToggle } from '@vueuse/core';
import { SButtonIcon, SCard, SSelect, STreeMenu } from '@ui';
import type { SelectOptionData, ThemeSize, TreeMenuOptionData } from '@ui';
import { themeSizeMap } from '@theme';

const [collapsed, toggleCollapsible] = useToggle(false);

const items: TreeMenuOptionData[] = [
  {
    label: 'Platform',
    value: 'platform',
    isGroup: true,
    children: [
      {
        label: 'Playground',
        value: 'playground',
        icon: 'lucide:square-terminal',
        children: [
          {
            label: 'Starred',
            value: 'starred',
            icon: 'lucide:star'
          },
          {
            label: 'History',
            value: 'history',
            icon: 'lucide:history'
          },
          {
            label: 'Trending',
            value: 'trending',
            icon: 'lucide:trending-up'
          }
        ]
      },
      {
        label: 'Models',
        value: 'models',
        icon: 'lucide:bot',
        children: [
          {
            label: 'DeepSeek',
            value: 'deepseek',
            icon: 'lucide:bot',
            children: [
              {
                label: 'DeepSeek Coder',
                value: 'deepseek-coder'
              },
              {
                label: 'DeepSeek Coder Plus',
                value: 'deepseek-coder-plus'
              }
            ]
          },
          {
            label: 'ChatGPT',
            value: 'chatgpt',
            icon: 'lucide:bot',
            children: [
              {
                label: 'ChatGPT 3.5',
                value: 'chatgpt-3.5'
              },
              {
                label: 'ChatGPT 4',
                value: 'chatgpt-4'
              }
            ]
          },
          {
            label: 'Claude',
            value: 'claude',
            icon: 'lucide:bot',
            children: [
              {
                label: 'Claude 3.5',
                value: 'claude-3.5'
              },
              {
                label: 'Claude 3.5 Sonnet',
                value: 'claude-3.5-sonnet'
              }
            ]
          },
          {
            label: 'Gemini',
            value: 'gemini',
            icon: 'lucide:bot',
            children: [
              {
                label: 'Gemini 1.5',
                value: 'gemini-1.5'
              },
              {
                label: 'Gemini 1.5 Pro',
                value: 'gemini-1.5-pro'
              }
            ]
          }
        ]
      },
      {
        label: 'Documentation',
        value: 'documentation',
        icon: 'lucide:book-open',
        children: [
          {
            label: 'Introduction',
            value: 'introduction',
            icon: 'lucide:book-open'
          },
          {
            label: 'Get Started',
            value: 'get-started',
            icon: 'lucide:book-open'
          },
          {
            label: 'Tutorials',
            value: 'tutorials',
            icon: 'lucide:book-open'
          },
          {
            label: 'Changelog',
            value: 'changelog',
            icon: 'lucide:book-open'
          }
        ]
      },
      {
        label: 'Settings',
        value: 'settings',
        icon: 'lucide:settings',
        children: [
          {
            label: 'General',
            value: 'general',
            icon: 'lucide:settings'
          },
          {
            label: 'Team',
            value: 'team',
            icon: 'lucide:users'
          },
          {
            label: 'Billing',
            value: 'billing',
            icon: 'lucide:credit-card'
          },
          {
            label: 'Limits',
            value: 'limits',
            icon: 'lucide:credit-card'
          }
        ]
      }
    ]
  },
  {
    label: 'Projects',
    value: 'projects',
    isGroup: true,
    children: [
      {
        label: 'Design Engineering',
        value: 'design-engineering',
        icon: 'lucide:frame',
        actions: [
          {
            label: 'Edit',
            value: 'edit',
            icon: 'lucide:pencil'
          },
          {
            label: 'Delete',
            value: 'delete',
            icon: 'lucide:trash'
          }
        ]
      },
      {
        label: 'Sales & Marketing',
        value: 'sales-marketing',
        icon: 'lucide:pie-chart',
        tag: 'New'
      },
      {
        label: 'Travel',
        value: 'travel',
        icon: 'lucide:map',
        badge: 'Hot'
      }
    ]
  },
  {
    label: 'Links',
    value: 'links',
    isGroup: true,
    children: [
      {
        label: 'Soybean UI',
        value: 'soybean-ui',
        icon: 'lucide:book-open',
        linkProps: {
          href: 'https://soybean-ui.com'
        }
      },
      {
        label: 'Route Demo',
        value: 'route-demo',
        icon: 'lucide:route',
        linkProps: {
          // vitepress 不支持 router-link 在 ssr 下使用
          // to: '/demo',
          href: '/demo',
          target: '_self'
        }
      }
    ]
  }
];

const size = ref<ThemeSize>('md');

const sizes: SelectOptionData<ThemeSize>[] = [
  {
    label: 'xs',
    value: 'xs'
  },
  {
    label: 'sm',
    value: 'sm'
  },
  {
    label: 'md',
    value: 'md'
  },
  {
    label: 'lg',
    value: 'lg'
  },
  {
    label: 'xl',
    value: 'xl'
  },
  {
    label: '2xl',
    value: '2xl'
  }
];

const BASE_WIDTH = 240;

const menuWidth = computed(() => `${(BASE_WIDTH * themeSizeMap[size.value]) / themeSizeMap.md / 16}rem`);
</script>

<template>
  <SCard title="Tree Menu">
    <template #extra>
      <SSelect v-model="size" :items="sizes" :ui="{ trigger: 'w-25' }" />
    </template>
    <div class="relative h-120" :style="{ width: menuWidth }">
      <SButtonIcon
        icon="lucide:panel-left"
        :size="size"
        class="absolute right-2 top-2 z-2"
        @click="() => toggleCollapsible()"
      />
      <STreeMenu
        v-model:collapsed="collapsed"
        :size="size"
        toggle-behavior="single"
        :items="items"
        class="bg-sidebar-background"
      />
    </div>
  </SCard>
</template>
