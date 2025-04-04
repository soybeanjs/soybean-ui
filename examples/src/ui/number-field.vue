<script setup lang="ts">
import { SCard, SNumberField } from 'soy-ui';
import type { ThemeSize } from 'soy-ui';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

defineOptions({
  name: 'DemoNumberField'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Size" split>
      <div class="w-320px flex-c gap-2 lt-sm:w-auto">
        <div v-for="size in sizes" :key="size" class="flex-c">
          <div>{{ size }}</div>
          <SNumberField :size="size" />
        </div>
      </div>
    </SCard>
    <SCard title="Center" split>
      <div class="w-320px flex-c gap-2 lt-sm:w-auto">
        <div v-for="size in sizes" :key="size" class="flex-c">
          <div>{{ size }}</div>
          <SNumberField :size="size" center />
        </div>
      </div>
    </SCard>
    <SCard title="Disabled" split>
      <div class="w-320px lt-sm:w-auto">
        <SNumberField :default-value="10" disabled />
      </div>
    </SCard>
    <SCard title="Custom Icon" split>
      <div class="w-320px lt-sm:w-auto">
        <SNumberField :default-value="10">
          <template #decrement-icon>
            <ChevronDown />
          </template>
          <template #increment-icon>
            <ChevronUp />
          </template>
        </SNumberField>
      </div>
    </SCard>
  </div>
</template>
