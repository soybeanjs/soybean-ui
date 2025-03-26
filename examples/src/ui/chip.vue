<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SCard, SChip, SInput, SSwitch } from 'soy-ui';
import type { ChipPosition, ThemeColor } from 'soy-ui';

defineOptions({
  name: 'DemoChip'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const positions: ChipPosition[] = ['top-right', 'bottom-right', 'top-left', 'bottom-left'];

const text = ref('99+');
const slotText = ref('New');
const show = ref(true);
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Color" split>
      <div class="flex gap-3">
        <div v-for="color in colors" :key="color">
          <SChip :color="color">
            <SButton variant="dashed">{{ color }}</SButton>
          </SChip>
        </div>
      </div>
    </SCard>
    <SCard title="Color With Text" split>
      <div class="flex gap-4">
        <div v-for="color in colors" :key="color">
          <SChip :color="color" text="99+">
            <SButton variant="dashed">{{ color }}</SButton>
          </SChip>
        </div>
      </div>
    </SCard>
    <SCard title="Positions" split>
      <div class="flex gap-3">
        <div v-for="position in positions" :key="position">
          <SChip :position="position">
            <SButton variant="dashed" class="w-30">{{ position }}</SButton>
          </SChip>
        </div>
      </div>
    </SCard>
    <SCard title="ModelValue" split>
      <div class="flex gap-3">
        <SInput v-model="text" />
        <SChip :text="text">
          <SButton variant="outline">A</SButton>
        </SChip>
      </div>
    </SCard>
    <SCard title="Slot" split>
      <div class="flex gap-3">
        <SInput v-model="slotText" />
        <SChip :text="slotText">
          <SButton variant="outline">A</SButton>
          <template #content="{ value }">{{ value }}！</template>
        </SChip>
      </div>
    </SCard>
    <SCard title="Show" split>
      <div class="flex gap-3">
        <SSwitch v-model:checked="show" />
        <SChip :show="show">
          <SButton variant="outline">A</SButton>
        </SChip>
      </div>
    </SCard>
  </div>
</template>
