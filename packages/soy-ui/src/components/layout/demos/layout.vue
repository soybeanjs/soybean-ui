<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  SBreadcrumb,
  SButton,
  SButtonGroup,
  SCard,
  SDropdownMenu,
  SLayout,
  SLayoutTrigger,
  SSelect,
  SSeparator,
  SSidebarMenu,
  SSidebarMenuItem
} from 'soy-ui';
import type {
  BreadcrumbItem,
  LayoutCollapsible,
  LayoutSide,
  LayoutVariant,
  MenuOptionData,
  SelectOptionData,
  SidebarMenuOptionData,
  ThemeSize
} from 'soy-ui';
import {
  Activity,
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronsUpDown,
  Command,
  Component,
  CreditCard,
  Dock,
  Frame,
  History,
  Home,
  Map,
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
  name: 'DemoLayout'
});

const side = ref<LayoutSide>('left');

const sides: SelectOptionData<LayoutSide>[] = [
  {
    label: 'left',
    value: 'left'
  },
  {
    label: 'right',
    value: 'right'
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

const framework = ref<string>('soybean-unify');

const frameworks: MenuOptionData<string>[] = [
  {
    label: 'Soybean Unify',
    value: 'soybean-unify',
    icon: Activity
  },
  {
    label: 'Soybean Admin',
    value: 'soybean-admin',
    icon: AudioWaveform
  },
  {
    label: 'Soybean Studio',
    value: 'soybean-studio',
    icon: Command
  }
];

const activeFramework = computed(() => frameworks.find(item => item.value === framework.value)!);

function setActiveFramework(_event: Event, item: MenuOptionData<string>) {
  framework.value = item.value;
}

const variant = ref<LayoutVariant>('sidebar');

const variants: SelectOptionData<LayoutVariant>[] = [
  {
    label: 'sidebar',
    value: 'sidebar'
  },
  {
    label: 'inset',
    value: 'inset'
  },
  {
    label: 'floating',
    value: 'floating'
  }
];

const collapsible = ref<LayoutCollapsible>('icon');

const collapsibleOptions: SelectOptionData<LayoutCollapsible>[] = [
  {
    label: 'icon',
    value: 'icon'
  },
  {
    label: 'offcanvas',
    value: 'offcanvas'
  }
];

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

const breadcrumbItems: BreadcrumbItem[] = [
  {
    label: 'Home',
    value: 'home',
    icon: Home
  },
  {
    label: 'Components',
    value: 'components',
    icon: Component
  },
  {
    label: 'Breadcrumb',
    value: 'breadcrumb',
    icon: Dock
  }
];
</script>

<template>
  <SCard title="Layout">
    <template #extra>
      <div class="flex-y-center justify-end gap-2">
        <SButtonGroup>
          <SButton variant="pure" class="cursor-default">side</SButton>
          <SSelect v-model="side" :items="sides" placeholder="Select side" class="w-30" />
        </SButtonGroup>
        <SButtonGroup>
          <SButton variant="pure" class="cursor-default">variant</SButton>
          <SSelect v-model="variant" :items="variants" placeholder="Select variant" class="w-30" />
        </SButtonGroup>
        <SButtonGroup>
          <SButton variant="pure" class="cursor-default">collapsible</SButton>
          <SSelect v-model="collapsible" :items="collapsibleOptions" placeholder="Select collapsible" class="w-30" />
        </SButtonGroup>
        <SButtonGroup>
          <SButton variant="pure" class="cursor-default">size</SButton>
          <SSelect v-model="size" :items="sizes" placeholder="Select size" class="w-30" />
        </SButtonGroup>
      </div>
    </template>
    <div class="h-120 w-full border border-border border-solid">
      <SLayout
        :default-open="true"
        :size="size"
        :side="side"
        :variant="variant"
        :collapsible="collapsible"
        :ui="{ header: 'h-12' }"
      >
        <template #sidebar="{ open, ...slotProps }">
          <div class="group p-2">
            <SDropdownMenu
              :size="size"
              :side="open ? 'bottom' : 'right'"
              :items="frameworks"
              :ui="{ content: 'w-[var(--soybean-popper-anchor-width)]' }"
              @select="setActiveFramework"
            >
              <template #trigger>
                <SSidebarMenuItem
                  :size="size"
                  :ui="{ itemIcon: 'text-primary', label: 'font-semibold' }"
                  :value="activeFramework.value"
                  :label="activeFramework.label"
                  :icon="activeFramework.icon"
                >
                  <template #trailing>
                    <ChevronsUpDown class="ml-auto" />
                  </template>
                </SSidebarMenuItem>
              </template>
            </SDropdownMenu>
          </div>
          <SSidebarMenu :items="items" v-bind="slotProps" />
        </template>
        <template #header>
          <div class="w-full flex items-center gap-2 px-4">
            <SLayoutTrigger v-if="side === 'left'" :size="size" />
            <SSeparator orientation="vertical" class="h-4" />
            <SBreadcrumb :items="breadcrumbItems" />
            <SLayoutTrigger v-if="side === 'right'" :size="size" class="ml-auto" />
          </div>
        </template>
      </SLayout>
    </div>
  </SCard>
</template>
