<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SCard, SChip, SInput, SSwitch } from 'soy-ui';
import type { ChipPosition, ThemeColor, ThemeSize } from 'soy-ui';

defineOptions({
  name: 'DemoChip'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const positions: ChipPosition[] = ['top-right', 'bottom-right', 'top-left', 'bottom-left'];

const text = ref('99+');
const slotText = ref('New');
const open = ref(true);
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
          <SChip :color="color" content="99+">
            <SButton variant="dashed">{{ color }}</SButton>
          </SChip>
        </div>
      </div>
    </SCard>
    <SCard title="Size" split>
      <div class="flex gap-3">
        <div v-for="size in sizes" :key="size">
          <SChip :size="size">
            <SButton variant="soft" :size="size">{{ size }}</SButton>
          </SChip>
        </div>
      </div>
      <div class="mt-6 flex gap-3">
        <div v-for="size in sizes" :key="size">
          <SChip :size="size" content="99+">
            <SButton variant="soft" :size="size">{{ size }}</SButton>
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
        <SChip :content="text">
          <SButton variant="outline">A</SButton>
        </SChip>
      </div>
    </SCard>
    <SCard title="Slot" split>
      <div class="flex gap-3">
        <SInput v-model="slotText" />
        <SChip>
          <SButton variant="outline">A</SButton>
          <template #content>{{ slotText }}！</template>
        </SChip>
      </div>
    </SCard>
    <SCard title="Show" split>
      <div class="flex gap-3">
        <SSwitch v-model="open" />
        <SChip :open="open">
          <SButton variant="outline">A</SButton>
        </SChip>
      </div>
    </SCard>
  </div>
</template>
