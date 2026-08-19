<script setup lang="ts">
import { SDescriptions, SDescriptionsItem } from '@soybeanjs/ui';
</script>

<template>
  <div class="w-120 flex flex-col gap-6">
    <SDescriptions title="Label align end" label-align="end">
      <SDescriptionsItem label="Username">soybean</SDescriptionsItem>
      <SDescriptionsItem label="Role">Admin</SDescriptionsItem>
      <SDescriptionsItem label="Status">Active</SDescriptionsItem>
    </SDescriptions>
    <SDescriptions title="Label align center" label-align="center" bordered>
      <SDescriptionsItem label="Username">soybean</SDescriptionsItem>
      <SDescriptionsItem label="Role">Admin</SDescriptionsItem>
      <SDescriptionsItem label="Status">Active</SDescriptionsItem>
    </SDescriptions>
  </div>
</template>
