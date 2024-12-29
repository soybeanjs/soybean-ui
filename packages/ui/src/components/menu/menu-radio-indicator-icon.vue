<script setup lang="ts">
import { dropdownMenuVariants } from '@soybean-ui/variants';

defineOptions({
  name: 'SMenuRadioIndicatorIcon'
});

const { radioIndicatorIconRoot, radioIndicatorIcon } = dropdownMenuVariants();
</script>

<template>
  <div :class="radioIndicatorIconRoot()">
    <div :class="radioIndicatorIcon()"></div>
  </div>
</template>
