<script setup lang="ts">
import { useBreadcrumbUi } from './context';
import { useLocaleMessages } from '../../locale';
import type { BreadcrumbRootProps } from './types';

defineOptions({
  name: 'BreadcrumbRoot'
});

defineProps<BreadcrumbRootProps>();

const cls = useBreadcrumbUi('root');
const messages = useLocaleMessages();
</script>

<template>
  <nav data-soybean-breadcrumb-root :class="cls" :aria-label="messages.breadcrumb.nav">
    <slot />
  </nav>
</template>
