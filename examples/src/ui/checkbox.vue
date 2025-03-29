<script setup lang="ts">
import { computed, ref } from 'vue';
import { SCard, SCheckbox, SCheckboxGroup } from 'soy-ui';
import type { CheckboxGroupItem, CheckedState, ThemeColor, ThemeSize } from 'soy-ui';

defineOptions({
  name: 'DemoCheckbox'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];

const sizeChecked = ref<CheckedState>('indeterminate');

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

const checks = ref<string[]>(['1']);
const items = createCheckboxItems();

const checks2 = ref<string[]>(['1']);
const items2 = createCheckboxItems();

const checks3 = ref<string[]>([]);
const items3 = createCheckboxItems();
const checked = computed<CheckedState>({
  get() {
    if (checks3.value.length === 0) return false;

    if (checks3.value.length === items3.length) return true;

    return 'indeterminate';
  },
  set(value) {
    checks3.value = value === true ? items3.map(item => item.value) : [];
  }
});

function createCheckboxItems() {
  return [
    { label: 'A', value: '1' },
    { label: 'B', value: '2' },
    { label: 'C', value: '3' }
  ] satisfies CheckboxGroupItem[];
}
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Color" split>
      <div class="flex flex-wrap gap-12px">
        <SCheckbox v-for="color in colors" :key="color" :color="color" :label="color" />
      </div>
    </SCard>
    <SCard title="Size" split>
      <div class="flex flex-wrap gap-12px">
        <SCheckbox v-for="size in sizes" :key="size" v-model="sizeChecked" :size="size" :label="size" />
      </div>
    </SCard>
    <SCard title="Group" split>
      <SCheckboxGroup v-model="checks" :items="items" />
    </SCard>
    <SCard title="Orientation: Vertical" split>
      <SCheckboxGroup v-model="checks2" orientation="vertical" :items="items2" />
    </SCard>
    <SCard title="Indeterminate" split>
      <SCheckbox v-model="checked" label="Check All" />
      <SCheckboxGroup v-model="checks3" :items="items3" class="mt-3" />
    </SCard>
    <SCard title="Disabled" split>
      <SCheckboxGroup :default-value="['2']" :items="items" disabled />
    </SCard>
  </div>
</template>
