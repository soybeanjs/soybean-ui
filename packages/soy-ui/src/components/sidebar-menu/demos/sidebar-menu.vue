<script setup lang="ts">
import { computed, ref } from 'vue';
import { useToggle } from '@vueuse/core';
import { SButtonIcon, SCard, SSelect, SSidebarMenu } from 'soy-ui';
import type { SelectOptionData, SidebarMenuOptionData, ThemeSize } from 'soy-ui';
import {
  BookOpen,
  Bot,
  CreditCard,
  Frame,
  History,
  Map,
  PanelLeft,
  Pencil,
  PieChart,
  Route,
  Settings2,
  SquareTerminal,
  Star,
  Trash,
  Users
} from 'lucide-vue-next';

defineOptions({
  name: 'DemoSidebarMenu'
});

const [collapsed, toggleCollapsible] = useToggle(false);

const items: SidebarMenuOptionData<string>[] = [
  {
    label: 'Platform',
    value: 'platform',
    isGroupLabel: true,
    children: [
      {
        label: 'Playground',
        value: 'playground',
        icon: SquareTerminal,
        children: [
          {
            label: 'History',
            value: 'history',
            icon: History
          },
          {
            label: 'Starred',
            value: 'starred',
            icon: Star
          },
          {
            label: 'Settings',
            value: 'settings',
            icon: Settings2
          }
        ]
      },
      {
        label: 'Models',
        value: 'models',
        icon: Bot,
        children: [
          {
            label: 'DeepSeek',
            value: 'deepseek',
            icon: Bot,
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
            icon: Bot,
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
            icon: Bot,
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
            icon: Bot,
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
        icon: BookOpen,
        children: [
          {
            label: 'Introduction',
            value: 'introduction',
            icon: BookOpen
          },
          {
            label: 'Get Started',
            value: 'get-started',
            icon: BookOpen
          },
          {
            label: 'Tutorials',
            value: 'tutorials',
            icon: BookOpen
          },
          {
            label: 'Changelog',
            value: 'changelog',
            icon: BookOpen
          }
        ]
      },
      {
        label: 'Settings',
        value: 'settings',
        icon: Settings2,
        children: [
          {
            label: 'General',
            value: 'general',
            icon: Settings2
          },
          {
            label: 'Team',
            value: 'team',
            icon: Users
          },
          {
            label: 'Billing',
            value: 'billing',
            icon: CreditCard
          },
          {
            label: 'Limits',
            value: 'limits',
            icon: CreditCard
          }
        ]
      }
    ]
  },
  {
    label: 'Projects',
    value: 'projects',
    isGroupLabel: true,
    children: [
      {
        label: 'Design Engineering',
        value: 'design-engineering',
        icon: Frame,
        actions: [
          {
            label: 'Edit',
            value: 'edit',
            icon: Pencil
          },
          {
            label: 'Delete',
            value: 'delete',
            icon: Trash
          }
        ]
      },
      {
        label: 'Sales & Marketing',
        value: 'sales-marketing',
        icon: PieChart,
        badge: 'new'
      },
      {
        label: 'Travel',
        value: 'travel',
        icon: Map,
        chip: 'hot'
      }
    ]
  },
  {
    label: 'Links',
    value: 'links',
    isGroupLabel: true,
    children: [
      {
        label: 'Soybean UI',
        value: 'soybean-ui',
        icon: BookOpen,
        linkProps: {
          href: 'https://soybean-ui.com'
        }
      },
      {
        label: 'Route Demo',
        value: 'route-demo',
        icon: Route,
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

const themeSizeMap: Record<ThemeSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24
};

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
  <SCard title="Sidebar Menu">
    <template #extra>
      <SSelect v-model="size" :items="sizes" class="w-25" />
    </template>
    <div class="relative h-100" :style="{ width: menuWidth }">
      <SButtonIcon :size="size" class="absolute right-2 top-2" @click="() => toggleCollapsible()">
        <PanelLeft />
      </SButtonIcon>
      <SSidebarMenu :size="size" :items="items" :collapsed="collapsed" class="bg-sidebar-background" />
    </div>
  </SCard>
</template>
