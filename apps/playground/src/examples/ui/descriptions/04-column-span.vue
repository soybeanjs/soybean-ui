<script setup lang="ts">
import { SDescriptions, SDescriptionsItem } from '@soybeanjs/ui';
</script>

<template>
  <SDescriptions :column="2" bordered class="w-120">
    <SDescriptionsItem label="Name">Soybean</SDescriptionsItem>
    <SDescriptionsItem label="Age">26</SDescriptionsItem>
    <SDescriptionsItem label="Address" :span="2">1234 Example Street, District A, Shanghai, China</SDescriptionsItem>
    <SDescriptionsItem label="Bio" :span="2">
      Headless-first component engineer working on the SoybeanUI design system.
    </SDescriptionsItem>
  </SDescriptions>
</template>
