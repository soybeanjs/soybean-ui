<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import {
  SBreadcrumb,
  SButton,
  SButtonGroup,
  SDropdownMenu,
  SIcon,
  SLayout,
  SLayoutTrigger,
  SSelect,
  SSeparator,
  STreeMenu,
  STreeMenuStyledItem
} from '@soybeanjs/ui';
import type {
  BreadcrumbOptionData,
  LayoutCollapsible,
  LayoutSide,
  LayoutVariant,
  MenuOptionData,
  SelectOptionData,
  ThemeSize
} from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
import { treeMenuItems } from '../tree-menu/data';

const side = shallowRef<LayoutSide>('left');

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

const size = shallowRef<ThemeSize>('md');

const framework = shallowRef('soybean-unify');

const frameworks = [
  {
    label: 'Soybean Unify',
    value: 'soybean-unify',
    icon: 'lucide:activity'
  },
  {
    label: 'Soybean Admin',
    value: 'soybean-admin',
    icon: 'lucide:audio-waveform'
  },
  {
    label: 'Soybean Studio',
    value: 'soybean-studio',
    icon: 'lucide:command'
  }
] satisfies MenuOptionData<string>[];

const activeFramework = computed(() => frameworks.find(item => item.value === framework.value)!);

function setActiveFramework(item: MenuOptionData<string>) {
  framework.value = item.value;
}

const variant = shallowRef<LayoutVariant>('sidebar');

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

const collapsible = shallowRef<LayoutCollapsible>('icon');

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

const breadcrumbItems: BreadcrumbOptionData[] = [
  {
    label: 'Components',
    value: 'components',
    icon: 'lucide:component'
  },
  {
    label: 'Breadcrumb',
    value: 'breadcrumb',
    icon: 'lucide:dock'
  }
];
</script>

<template>
  <div class="space-y-4">
    <div class="flex-y-center flex-wrap justify-end gap-2">
      <SButtonGroup>
        <SButton variant="pure" class="cursor-default">side</SButton>
        <SSelect v-model="side" :items="sides" placeholder="Select side" :ui="{ trigger: 'w-30' }" />
      </SButtonGroup>
      <SButtonGroup>
        <SButton variant="pure" class="cursor-default">variant</SButton>
        <SSelect v-model="variant" :items="variants" placeholder="Select variant" :ui="{ trigger: 'w-30' }" />
      </SButtonGroup>
      <SButtonGroup>
        <SButton variant="pure" class="cursor-default">collapsible</SButton>
        <SSelect
          v-model="collapsible"
          :items="collapsibleOptions"
          placeholder="Select collapsible"
          :ui="{ trigger: 'w-30' }"
        />
      </SButtonGroup>
      <SButtonGroup>
        <SButton variant="pure" class="cursor-default">size</SButton>
        <SSelect v-model="size" :items="themeSizeOptions" placeholder="Select size" :ui="{ trigger: 'w-30' }" />
      </SButtonGroup>
    </div>
    <div class="h-120 w-full border border-border border-solid rounded-md">
      <SLayout
        :default-open="true"
        :size="size"
        :side="side"
        :variant="variant"
        :collapsible="collapsible"
        :ui="{
          main: 'gap-[--soybean-layout-spacing] px-[--soybean-layout-spacing] pb-[--soybean-layout-spacing]',
          header: 'h-[calc(var(--soybean-layout-spacing)*3)]',
          tab: 'h-[calc(var(--soybean-layout-spacing)*3)]',
          footer: 'h-[calc(var(--soybean-layout-spacing)*3)]'
        }"
      >
        <template #sidebar="{ open, collapsedSidebarWidth }">
          <STreeMenu
            :size="size"
            :side="side"
            :collapsed="!open"
            :items="treeMenuItems"
            :collapsed-width="collapsedSidebarWidth"
          >
            <template #top>
              <SDropdownMenu
                :size="size"
                :side="open ? 'bottom' : 'right'"
                :items="frameworks"
                :ui="{ popup: 'w-[var(--soybean-popper-anchor-width)]' }"
                @select="setActiveFramework"
              >
                <template #trigger>
                  <STreeMenuStyledItem>
                    <SIcon :icon="activeFramework.icon" class="text-primary" />
                    <span class="truncate font-medium">{{ activeFramework.label }}</span>
                    <SIcon icon="lucide:chevrons-up-down" class="ml-auto" />
                  </STreeMenuStyledItem>
                </template>
              </SDropdownMenu>
            </template>
          </STreeMenu>
        </template>
        <template #header>
          <div class="w-full flex items-center gap-2">
            <SLayoutTrigger v-if="side === 'left'" :size="size" />
            <SSeparator orientation="vertical" class="h-4" />
            <SBreadcrumb :items="breadcrumbItems" :size="size" :ui="{ list: 'gap-2' }" />
            <SLayoutTrigger v-if="side === 'right'" :size="size" class="ml-auto" />
          </div>
        </template>
        <template #tab>
          <div class="flex-y-center h-full px-[--soybean-layout-spacing] border border-border rounded-md">
            This is Tab
          </div>
        </template>
        <div class="grow px-[--soybean-layout-spacing] border border-border rounded-md overflow-y-auto">
          <p v-for="i in 100" :key="i">This is Content {{ i }}</p>
        </div>
        <template #footer>
          <div class="flex-y-center h-full px-[--soybean-layout-spacing] border border-border rounded-md">
            This is Footer
          </div>
        </template>
      </SLayout>
    </div>
  </div>
</template>
