<script setup lang="ts">
import { SBreadcrumb, SBreadcrumbEllipsis, SCard, SDropdownMenu, SIcon } from '@soybeanjs/ui';
import type { BreadcrumbOptionData } from '@soybeanjs/ui';

const items = [
  {
    label: 'Home',
    value: 'home',
    icon: 'lucide:home'
  },
  {
    label: 'Components',
    value: 'components',
    icon: 'lucide:component'
  },
  {
    label: 'Breadcrumb',
    value: 'breadcrumb',
    icon: 'lucide:folder'
  },
  {
    label: 'Components2',
    value: 'components2',
    icon: 'lucide:component'
  },
  {
    label: 'Breadcrumb2',
    value: 'breadcrumb2',
    icon: 'lucide:dock'
  }
] satisfies BreadcrumbOptionData[];
</script>

<template>
  <SCard title="Ellipsis Dropdown">
    <SBreadcrumb :items="items" ellipsis>
      <template #ellipsis="{ ellipsisItems }">
        <SDropdownMenu :items="ellipsisItems" :modal="false" trigger="hover">
          <template #trigger>
            <SBreadcrumbEllipsis class="cursor-pointer">
              <SIcon icon="lucide:ellipsis" />
            </SBreadcrumbEllipsis>
          </template>
        </SDropdownMenu>
      </template>
    </SBreadcrumb>
  </SCard>
</template>
