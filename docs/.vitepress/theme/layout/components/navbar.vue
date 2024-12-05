<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import { useData, useRoute } from 'vitepress';
import { createReusableTemplate } from '@vueuse/core';
import { Icon } from '@iconify/vue';
import { SButtonIcon, SDropdownMenu, SLabel, SPopover, SSeparator } from '@soybean-ui/vue';
import { isNavItemWithLink } from '../../../shared';
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

function handleSelect(nav: NavItemType) {
  if (!nav.link) return;

  openLink(nav.link);
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
      <NavItem v-if="isNavItemWithLink(nav)" :label="nav.label" :link="nav.link" />
      <SDropdownMenu v-else :label="nav.label" :items="nav.items" @select="handleSelect">
        <template #trigger>
          <NavItem :label="nav.label">
            <span>{{ nav.label }}</span>
            <Icon icon="akar-icons:chevron-down" class="ml-2 text-sm" />
          </NavItem>
        </template>
        <template #item="item">
          <span>{{ item.label }}</span>
          <Icon v-if="isNavItemWithLink(item)" icon="lucide:arrow-up-right" class="ml-2 text-sm" />
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
    <SPopover v-model:open="isPopoverOpen" side="bottom" align="end" content-class="p-2">
      <template #trigger>
        <SButtonIcon>
          <Icon icon="lucide:ellipsis" />
        </SButtonIcon>
      </template>
      <nav class="flex flex-col">
        <template v-for="(nav, index) in theme.nav" :key="index">
          <NavMenuItem v-if="isNavItemWithLink(nav)" :label="nav.label" :link="nav.link" />
          <SDropdownMenu v-else :label="nav.label" :items="nav.items" align="end" @select="handleSelect">
            <template #trigger>
              <NavMenuItem :label="nav.label">
                <span>{{ nav.label }}</span>
                <Icon icon="akar-icons:chevron-down" class="ml-2 text-sm" />
              </NavMenuItem>
            </template>
            <template #item="item">
              <span>{{ item.label }}</span>
              <Icon v-if="isNavItemWithLink(item)" icon="lucide:arrow-up-right" class="ml-2 text-sm" />
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

<style scoped></style>
