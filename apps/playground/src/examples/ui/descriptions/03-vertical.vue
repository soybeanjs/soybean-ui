<script setup lang="ts">
import { SDescriptions, SDescriptionsItem } from '@soybeanjs/ui';
</script>

<template>
  <SDescriptions title="Server Metrics" layout="vertical" class="w-120">
    <SDescriptionsItem label="CPU">32%</SDescriptionsItem>
    <SDescriptionsItem label="Memory">5.2 GB / 16 GB</SDescriptionsItem>
    <SDescriptionsItem label="Disk">68%</SDescriptionsItem>
    <SDescriptionsItem label="Network">1.2 Gbps</SDescriptionsItem>
  </SDescriptions>
</template>
