<script setup lang="ts">
import { SCard } from '@soybeanjs/ui';
import DemoAffixBasic from './basic.vue';
import DemoAffixCustomStyling from './custom-styling.vue';
import DemoAffixOffsetBottom from './offset-bottom.vue';
import DemoAffixTarget from './target.vue';
</script>

<template>
  <SCard title="Affix" split :ui="{ content: 'flex-c gap-4' }">
    <DemoAffixBasic />
    <DemoAffixTarget />
    <DemoAffixOffsetBottom />
    <DemoAffixCustomStyling />
  </SCard>
</template>
