<script setup lang="ts">
import { useData, useRoute } from 'vitepress';
import { ref, toRefs, watch } from 'vue';
import { createReusableTemplate } from '@vueuse/core';
import { SButtonIcon, SDropdownMenu, SLabel, SPopover, SSeparator } from 'soy-ui';
import { Icon } from '@iconify/vue';
import type { CustomThemeConfig, NavItem as NavItemType } from '../../../types';
import ThemeToggle from './theme-toggle.vue';

defineOptions({
  name: 'Navbar'
});

const { path } = toRefs(useRoute());
const { theme } = useData<CustomThemeConfig>();

interface NavItemProps {
  label: string;
  link?: string;
}

const [DefineNavItem, NavItem] = createReusableTemplate<NavItemProps>();
const [DefineNavMenuItem, NavMenuItem] = createReusableTemplate<NavItemProps>();

const isPopoverOpen = ref(false);

function handleSelect(_event: Event, nav: NavItemType) {
  if (!nav.linkProps) return;

  openLink(nav.linkProps.href!);
}

function openLink(link: string) {
  const target = link.startsWith('http') ? '_blank' : '_self';

  window.open(link, target);
}

watch(path, () => {
  isPopoverOpen.value = false;
});
</script>

<template>
  <nav class="hidden items-center lg:flex">
    <DefineNavItem v-slot="{ $slots, label, link }">
      <component
        :is="link ? 'a' : 'div'"
        :href="link"
        class="mx-3 h-full inline-flex items-center py-2 text-sm text-muted-foreground font-semibold hover:text-foreground"
        :class="{ '!text-primary': link && path.includes(label.toLowerCase()) }"
      >
        <component :is="$slots.default" v-if="$slots.default" />
        <template v-else>{{ label }}</template>
      </component>
    </DefineNavItem>
    <template v-for="(nav, index) in theme.nav" :key="index">
      <NavItem v-if="nav.linkProps" :label="nav.label" :link="nav.linkProps.href" />
      <SDropdownMenu v-else :label="nav.label" :items="nav.children" content-class="min-w-20" @select="handleSelect">
        <template #trigger>
          <NavItem :label="nav.label">
            <span class="whitespace-nowrap">{{ nav.label }}</span>
            <Icon icon="akar-icons:chevron-down" class="ml-2 text-sm" />
          </NavItem>
        </template>
        <template #item="item">
          <span>{{ item.label }}</span>
          <Icon v-if="item.linkProps" icon="lucide:arrow-up-right" class="ml-2 text-sm" />
        </template>
      </SDropdownMenu>
    </template>
    <SSeparator class="mx-4 h-4" decorative orientation="vertical" />
    <ThemeToggle />
    <SSeparator class="mx-4 h-4" decorative orientation="vertical" />
    <SButtonIcon v-for="link in theme.socialLinks" :key="link.link" @click="openLink(link.link)">
      <Icon :icon="`simple-icons:${link.icon}`" />
    </SButtonIcon>
  </nav>

  <div class="lg:hidden">
    <DefineNavMenuItem v-slot="{ $slots, label, link }">
      <component
        :is="link ? 'a' : 'div'"
        :href="link"
        class="h-full i-flex-y-center rounded-md p-2 text-sm text-muted-foreground font-semibold"
        :class="{
          '!text-primary': path.includes(label.toLowerCase()),
          'hover:(bg-primary/10 text-primary)': Boolean(link)
        }"
      >
        <component :is="$slots.default" v-if="$slots.default" />
        <template v-else>{{ label }}</template>
      </component>
    </DefineNavMenuItem>
    <SPopover v-model:open="isPopoverOpen" side="bottom" align="end" content-class="z-15 p-2">
      <template #trigger>
        <SButtonIcon>
          <Icon icon="lucide:ellipsis" />
        </SButtonIcon>
      </template>
      <nav class="relative z-10 flex-c">
        <template v-for="(nav, index) in theme.nav" :key="index">
          <NavMenuItem v-if="nav.linkProps" :label="nav.label" :link="nav.linkProps.href" />
          <SDropdownMenu
            v-else
            :label="nav.label"
            :items="nav.children"
            align="end"
            content-class="min-w-20"
            @select="handleSelect"
          >
            <template #trigger>
              <NavMenuItem :label="nav.label">
                <span class="whitespace-nowrap">{{ nav.label }}</span>
                <Icon icon="akar-icons:chevron-down" class="ml-2 text-sm" />
              </NavMenuItem>
            </template>
            <template #item="item">
              <span>{{ item.label }}</span>
              <Icon v-if="item.linkProps" icon="lucide:arrow-up-right" class="ml-2 text-sm" />
            </template>
          </SDropdownMenu>
        </template>

        <SSeparator decorative class="my-2" />
        <div class="flex items-center justify-between px-2 text-sm space-x-2">
          <SLabel for="theme-toggle">Appearance</SLabel>
          <ThemeToggle />
        </div>
        <SSeparator class="my-2" decorative />
        <div class="flex items-center gap-2 px-4">
          <SButtonIcon v-for="link in theme.socialLinks" :key="link.link" @click="openLink(link.link)">
            <Icon :icon="`simple-icons:${link.icon}`" />
          </SButtonIcon>
        </div>
      </nav>
    </SPopover>
  </div>
</template>
