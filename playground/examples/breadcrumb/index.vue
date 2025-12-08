<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import BreadcrumbBase from './base.vue';
import BreadcrumbSeparator from './separator.vue';
import BreadcrumbLink from './link.vue';
import BreadcrumbItemDropdown from './item-dropdown.vue';
import BreadcrumbEllipsis from './ellipsis-dropdown.vue';
</script>

<template>
  <SCard title="Breadcrumb" :ui="{ content: 'flex-c gap-3' }">
    <BreadcrumbBase />
    <BreadcrumbSeparator />
    <BreadcrumbLink />
    <BreadcrumbItemDropdown />
    <BreadcrumbEllipsis />
  </SCard>
</template>
