<script setup lang="ts">
import { SCard } from '@ui';
import DemoButtonColor from './color.vue';
import DemoButtonVariant from './variant.vue';
import DemoButtonSize from './size.vue';
import DemoButtonShape from './shape.vue';
import DemoButtonShadow from './shadow.vue';
import DemoButtonSlot from './slot.vue';
import DemoButtonDisabled from './disabled.vue';
import DemoButtonLoading from './loading.vue';
import DemoButtonIcon from './icon.vue';
import DemoButtonLink from './link.vue';
import DemoButtonGroup from './group.vue';
</script>

<template>
  <SCard title="Button" split :ui="{ content: 'flex-c gap-3' }">
    <DemoButtonColor />
    <DemoButtonVariant />
    <DemoButtonSize />
    <DemoButtonShape />
    <DemoButtonShadow />
    <DemoButtonSlot />
    <DemoButtonDisabled />
    <DemoButtonLoading />
    <DemoButtonIcon />
    <DemoButtonLink />
    <DemoButtonGroup />
  </SCard>
</template>
