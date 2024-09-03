<script setup lang="ts">
import {
  // SelectArrow,
  // SelectContent,
  SelectGroup,
  // SelectIcon,
  // SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  // SelectSeparator,
  // SelectTrigger,
  SelectValue
  // SelectViewport
} from 'radix-vue';
import { ref } from 'vue';
import SSelectContent from './select-content.vue';
import SSelectTrigger from './select-trigger.vue';
import SSelectViewport from './select-viewport.vue';
import SSelectItem from './select-item.vue';
import SSelectIcon from './select-icon.vue';
import SSelectSeparator from './select-separator.vue';

defineOptions({
  name: 'SSelect'
});

const fruit = ref('');

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek'];
</script>

<template>
  <SelectRoot v-model="fruit">
    <SSelectTrigger>
      <SelectValue placeholder="Select a fruit..." />
      <SSelectIcon>
        <slot name="triggerIcon"></slot>
      </SSelectIcon>
    </SSelectTrigger>

    <SelectPortal>
      <SSelectContent>
        <SelectScrollUpButton />
        <SSelectViewport>
          <SSelectItem v-for="(option, index) in options" :key="index" :value="option">
            <SelectItemText>{{ option }}</SelectItemText>
            <SelectItemIndicator />
          </SSelectItem>
          <SSelectSeparator />
          <SelectLabel>Vegetables</SelectLabel>
          <SSelectSeparator />
          <SelectGroup>
            <SSelectItem
              v-for="(option, index) in vegetables"
              :key="index"
              :value="option"
              :disabled="option === 'Courgette'"
            >
              <SelectItemText>{{ option }}</SelectItemText>
              <SelectItemIndicator />
            </SSelectItem>
          </SelectGroup>
        </SSelectViewport>
        <SelectScrollDownButton />
        <!-- <SelectArrow /> -->
      </SSelectContent>
    </SelectPortal>
  </SelectRoot>
</template>

<style scoped></style>
