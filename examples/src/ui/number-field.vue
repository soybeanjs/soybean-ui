<script setup lang="ts">
import { SCard, SNumberField } from 'soy-ui';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

defineOptions({
  name: 'DemoNumberField'
});
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Number Field" split>
      <div class="w-320px flex-c gap-2 lt-sm:w-auto">
        <SNumberField />
      </div>
    </SCard>
    <SCard title="Center" split>
      <div class="w-320px flex-c gap-2 lt-sm:w-auto">
        <SNumberField center />
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
