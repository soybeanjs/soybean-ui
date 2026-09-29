<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import {
  SBreadcrumb,
  SButtonIcon,
  SDropdownMenu,
  SIcon,
  SLayout,
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
  LayoutCollapsible,
  LayoutSide,
  LayoutVariant,
  LayoutScrollBehavior,
  MenuOptionData,
  SelectOptionData,
  ThemeSize
} from '@soybeanjs/ui';
import { themeSizeOptions } from '~/constants/theme';
import { treeMenuItems } from '../tree-menu/data';

/**
 * Opt in to the gallery's out-of-frame region: these controls configure the demo,
 * they are not part of the viewport being simulated. Left inside the frame they
 * wrap into twice as many rows on the mobile device and crowd out the layout
 * itself.
 */
interface Props {
  playgroundRegion?: string;
}

defineProps<Props>();

const { t } = useI18n();

/** 默认形态：`reset` 回到这份快照，所以它是常量而不是状态。 */
const DEFAULTS = {
  orientation: 'horizontal' as DataOrientation,
  side: 'left' as LayoutSide,
  size: 'md' as ThemeSize,
  scrollBehavior: 'wrapper' as LayoutScrollBehavior,
  fixedTop: true,
  fixedFooter: false,
  stretchFooter: true,
  framework: 'soybean-unify',
  variant: 'sidebar' as LayoutVariant,
  collapsible: 'icon' as LayoutCollapsible,
  fullContent: false
};

// `isMobile` is left unset on purpose: the layout follows the viewport, so the
// demo narrows into the drawer without any media-query wiring of its own.
const orientation = shallowRef<DataOrientation>(DEFAULTS.orientation);

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

const side = shallowRef<LayoutSide>(DEFAULTS.side);

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

const size = shallowRef<ThemeSize>(DEFAULTS.size);

const scrollBehavior = shallowRef<LayoutScrollBehavior>(DEFAULTS.scrollBehavior);

const scrollBehaviors: SelectOptionData<LayoutScrollBehavior>[] = [
  {
    label: 'content',
    value: 'content'
  },
  {
    label: 'wrapper',
    value: 'wrapper'
  }
];

const fixedTop = shallowRef(DEFAULTS.fixedTop);

const fixedFooter = shallowRef(DEFAULTS.fixedFooter);

const stretchFooter = shallowRef(DEFAULTS.stretchFooter);

const framework = shallowRef(DEFAULTS.framework);

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

const variant = shallowRef<LayoutVariant>(DEFAULTS.variant);

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

const collapsible = shallowRef<LayoutCollapsible>(DEFAULTS.collapsible);

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

const fullContent = shallowRef(DEFAULTS.fullContent);

const reset = (): void => {
  orientation.value = DEFAULTS.orientation;
  side.value = DEFAULTS.side;
  size.value = DEFAULTS.size;
  scrollBehavior.value = DEFAULTS.scrollBehavior;
  fixedTop.value = DEFAULTS.fixedTop;
  fixedFooter.value = DEFAULTS.fixedFooter;
  stretchFooter.value = DEFAULTS.stretchFooter;
  framework.value = DEFAULTS.framework;
  variant.value = DEFAULTS.variant;
  collapsible.value = DEFAULTS.collapsible;
  fullContent.value = DEFAULTS.fullContent;
};
</script>

<template>
  <div class="space-y-4">
    <!-- `to` needs a string even when unhosted: a missing target makes the server renderer drop the teleport instead of rendering it inline. -->
    <Teleport defer :to="playgroundRegion ?? 'body'" :disabled="!playgroundRegion">
      <div class="flex flex-wrap gap-4">
        <FieldItem label="orientation">
          <SSelect
            v-model="orientation"
            :items="orientations"
            :trigger-props="{ 'aria-label': 'Orientation' }"
            class="w-30"
          />
        </FieldItem>
        <FieldItem label="side">
          <SSelect v-model="side" :items="sides" :trigger-props="{ 'aria-label': 'Side' }" class="w-30" />
        </FieldItem>
        <FieldItem label="variant">
          <SSelect v-model="variant" :items="variants" :trigger-props="{ 'aria-label': 'Variant' }" class="w-30" />
        </FieldItem>
        <FieldItem label="collapsible">
          <SSelect
            v-model="collapsible"
            :items="collapsibleOptions"
            :trigger-props="{ 'aria-label': 'Collapsible' }"
            class="w-30"
          />
        </FieldItem>
        <FieldItem label="size">
          <SSelect v-model="size" :items="themeSizeOptions" :trigger-props="{ 'aria-label': 'Size' }" class="w-30" />
        </FieldItem>
        <FieldItem label="scrollBehavior">
          <SSelect
            v-model="scrollBehavior"
            :items="scrollBehaviors"
            :trigger-props="{ 'aria-label': 'Scroll behavior' }"
            class="w-30"
          />
        </FieldItem>
        <FieldItem label="fixedTop">
          <div class="h-8 flex items-center">
            <SSwitch v-model="fixedTop" :control-props="{ 'aria-label': 'Fixed top' }" />
          </div>
        </FieldItem>
        <FieldItem label="fixedFooter">
          <div class="h-8 flex items-center">
            <SSwitch v-model="fixedFooter" :control-props="{ 'aria-label': 'Fixed footer' }" />
          </div>
        </FieldItem>
        <FieldItem label="stretchFooter">
          <div class="h-8 flex items-center">
            <SSwitch v-model="stretchFooter" :control-props="{ 'aria-label': 'Stretch footer' }" />
          </div>
        </FieldItem>
        <FieldItem :label="t('playground.reset')" class="ml-auto">
          <SButtonIcon icon="lucide:rotate-cw" color="destructive" variant="soft" aria-label="Reset" @click="reset" />
        </FieldItem>
      </div>
    </Teleport>
    <div class="h-120 w-full border border-border border-solid rounded-md">
      <SLayout
        :default-open="true"
        :size="size"
        :orientation="orientation"
        :side="side"
        :variant="variant"
        :collapsible="collapsible"
        :full-content="fullContent"
        :scroll-behavior="scrollBehavior"
        :fixed-top="fixedTop"
        :fixed-footer="fixedFooter"
        :stretch-footer="stretchFooter"
        :ui="{
          header: 'border-b border-border',
          tab: 'border-b border-border',
          content: 'px-[--sl-spacing]',
          footer: 'border-t border-border'
        }"
      >
        <template #sidebar="{ collapsed, collapsedSidebarWidth }">
          <STreeMenu
            :size="size"
            :side="side"
            :collapsed="collapsed"
            :items="treeMenuItems"
            :collapsed-width="collapsedSidebarWidth"
          >
            <template v-if="orientation === 'horizontal'" #top>
              <SDropdownMenu
                :size="size"
                :side="collapsed ? 'right' : 'bottom'"
                :items="frameworks"
                :ui="{ popup: 'w-[var(--soybean-popper-anchor-width)]' }"
                @select="setActiveFramework"
              >
                <template #trigger>
                  <STreeMenuStyledItem>
                    <SIcon :icon="activeFramework.icon" class="text-primary" />
                    <span class="truncate font-medium">{{ activeFramework.label }}</span>
                    <SIcon icon="lucide:chevrons-up-down" class="ms-auto" />
                  </STreeMenuStyledItem>
                </template>
              </SDropdownMenu>
            </template>
          </STreeMenu>
        </template>
        <template #header>
          <div class="w-full flex items-center gap-2">
            <SDropdownMenu
              v-if="orientation === 'vertical'"
              :size="size"
              side="bottom"
              :items="frameworks"
              @select="setActiveFramework"
            >
              <template #trigger>
                <div class="flex-y-center gap-3 w-[--soybean-sidebar-width] px-[--sl-spacing] cursor-pointer">
                  <SIcon :icon="activeFramework.icon" class="text-primary" />
                  <span class="truncate font-medium">{{ activeFramework.label }}</span>
                  <SIcon icon="lucide:chevrons-up-down" class="ms-auto" />
                </div>
              </template>
            </SDropdownMenu>
            <SLayoutTrigger v-if="side === 'left'" class="ml-4" />
            <SSeparator orientation="vertical" class="h-4" />
            <SBreadcrumb :items="breadcrumbItems" :size="size" :ui="{ list: 'gap-2' }" />
            <SLayoutTrigger v-if="side === 'right'" class="ms-auto" />
          </div>
        </template>
        <template #tab>
          <div class="flex-y-center justify-between h-full px-[--sl-spacing]">
            <span>This is Tab</span>
            <SButtonIcon :icon="fullContent ? 'lucide:shrink' : 'lucide:expand'" @click="fullContent = !fullContent" />
          </div>
        </template>
        <div>
          <p v-for="i in 100" :key="i">This is Content {{ i }}</p>
        </div>
        <template #footer>
          <div class="flex-y-center h-full px-[--sl-spacing]">This is Footer</div>
        </template>
      </SLayout>
    </div>
  </div>
</template>
