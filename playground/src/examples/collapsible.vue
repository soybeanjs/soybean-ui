<script setup lang="ts">
import { ref } from 'vue';
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from '../../../src';
import SectionWrapper from '../components/section-wrapper.vue';

const open = ref(false);
</script>

<template>
  <SectionWrapper title="Collapsible">
    <CollapsibleRoot v-model:open="open" class="collapsible">
      <CollapsibleTrigger class="trigger">{{ open ? 'Close' : 'Open' }} Content</CollapsibleTrigger>

      <CollapsibleContent
        class="overflow-hidden transition will-change-auto data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down"
      >
        <div>
          <h3>Collapsible Content</h3>
          <p>This is some example content that can be collapsed and expanded.</p>
          <p>You can put any content here, including forms, lists, or other components.</p>
        </div>
      </CollapsibleContent>
    </CollapsibleRoot>
  </SectionWrapper>
</template>

<style scoped>
.collapsible {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
}

.trigger {
  width: 100%;
  padding: 1rem;
  background-color: #f8fafc;
  border: none;
  cursor: pointer;
  font-weight: 500;
  text-align: left;
  transition: background-color 0.2s;
}

.trigger:hover {
  background-color: #f1f5f9;
}
</style>
