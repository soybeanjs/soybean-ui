<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoAffixBasic from './basic.vue';
import DemoAffixCustomStyling from './custom-styling.vue';
import DemoAffixOffsetBottom from './offset-bottom.vue';
import DemoAffixTarget from './target.vue';
</script>

<template>
  <SCard title="Affix" split>
    <div id="__DEMO_AFFIX_SCROLL" class="flex-c gap-4 h-full overflow-auto">
      <DemoAffixBasic />
      <DemoAffixTarget />
      <DemoAffixOffsetBottom />
      <DemoAffixCustomStyling />
    </div>
  </SCard>
</template>
