<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import {
  SBreadcrumb,
  SButton,
  SButtonIcon,
  SButtonGroup,
  SDropdownMenu,
  SIcon,
  SLayoutClassic,
  SLayoutTrigger,
  SSelect,
  SSwitch,
  SSeparator,
  STreeMenu,
  STreeMenuStyledItem
} from '@soybeanjs/ui';
import type {
  DataOrientation,
  BreadcrumbOptionData,
  LayoutSide,
  LayoutClassicScrollBehavior,
  MenuOptionData,
  SelectOptionData,
  ThemeSize
} from '@soybeanjs/ui';
import { themeSizeOptions } from '../../constants/theme';
import { treeMenuItems } from '../tree-menu/data';

const isMobile = useMediaQuery('(max-width: 768px)');

const orientation = shallowRef<DataOrientation>('horizontal');

const orientations: SelectOptionData<DataOrientation>[] = [
  {
    label: 'horizontal',
    value: 'horizontal'
  },
  {
    label: 'vertical',
    value: 'vertical'
  }
];

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

const scrollBehavior = shallowRef<LayoutClassicScrollBehavior>('wrapper');

const scrollBehaviors: SelectOptionData<LayoutClassicScrollBehavior>[] = [
  {
    label: 'content',
    value: 'content'
  },
  {
    label: 'wrapper',
    value: 'wrapper'
  }
];

const fixedTop = shallowRef(true);

const fixedFooter = shallowRef(false);

const stretchFooter = shallowRef(true);

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

const fullContent = shallowRef(false);
</script>

<template>
  <div class="space-y-4">
    <h3 class="playground-title">Classic Layout</h3>
    <div class="flex-y-center flex-wrap justify-end gap-4">
      <SButtonGroup>
        <SButton variant="pure" class="cursor-default">orientation</SButton>
        <SSelect
          v-model="orientation"
          :items="orientations"
          placeholder="Select orientation"
          :ui="{ trigger: 'w-30' }"
        />
      </SButtonGroup>
      <SButtonGroup>
        <SButton variant="pure" class="cursor-default">side</SButton>
        <SSelect v-model="side" :items="sides" placeholder="Select side" :ui="{ trigger: 'w-30' }" />
      </SButtonGroup>
      <SButtonGroup>
        <SButton variant="pure" class="cursor-default">size</SButton>
        <SSelect v-model="size" :items="themeSizeOptions" placeholder="Select size" :ui="{ trigger: 'w-30' }" />
      </SButtonGroup>
      <SButtonGroup>
        <SButton variant="pure" class="cursor-default">scrollBehavior</SButton>
        <SSelect
          v-model="scrollBehavior"
          :items="scrollBehaviors"
          placeholder="Select scroll behavior"
          :ui="{ trigger: 'w-30' }"
        />
      </SButtonGroup>
      <div class="flex-y-center gap-2">
        <span>fixedTop:</span>
        <SSwitch v-model="fixedTop" class="items-center" />
      </div>
      <div class="flex-y-center gap-2">
        <span>fixedFooter:</span>
        <SSwitch v-model="fixedFooter" class="items-center" />
      </div>
      <div class="flex-y-center gap-2">
        <span>stretchFooter:</span>
        <SSwitch v-model="stretchFooter" class="items-center" />
      </div>
    </div>
    <div class="h-120 w-full border border-border border-solid rounded-md">
      <SLayoutClassic
        :default-open="true"
        :size="size"
        :orientation="orientation"
        :side="side"
        :full-content="fullContent"
        :is-mobile="isMobile"
        :scroll-behavior="scrollBehavior"
        :fixed-top="fixedTop"
        :fixed-footer="fixedFooter"
        :stretch-footer="stretchFooter"
        :ui="{
          header: 'bg-background border-b border-border',
          tab: 'bg-background border-b border-border',
          content: 'px-[--soybean-layout-spacing] bg-background',
          footer: 'bg-background border-t border-border'
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
            <template v-if="orientation === 'horizontal'" #top>
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
          <div class="w-full flex items-center gap-2 px-[--soybean-layout-spacing]">
            <SDropdownMenu
              v-if="orientation === 'vertical'"
              :size="size"
              side="bottom"
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
            <SLayoutTrigger v-if="side === 'left'" />
            <SSeparator orientation="vertical" class="h-4" />
            <SBreadcrumb :items="breadcrumbItems" :size="size" :ui="{ list: 'gap-2' }" />
            <SLayoutTrigger v-if="side === 'right'" class="ms-auto" />
          </div>
        </template>
        <template #tab>
          <div class="flex-y-center justify-between h-full px-[--soybean-layout-spacing]">
            <span>This is Tab</span>
            <SButtonIcon :icon="fullContent ? 'lucide:shrink' : 'lucide:expand'" @click="fullContent = !fullContent" />
          </div>
        </template>
        <div>
          <p v-for="i in 100" :key="i">This is Content {{ i }}</p>
        </div>
        <template #footer>
          <div class="flex-y-center h-full px-[--soybean-layout-spacing]">This is Footer</div>
        </template>
      </SLayoutClassic>
    </div>
  </div>
</template>
