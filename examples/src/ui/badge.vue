<script setup lang="ts">
import { ref } from 'vue';
import { SBadge, SButton, SCard, SInput, SSwitch } from 'soy-ui';
import type { BadgePosition, ThemeColor } from 'soy-ui';

defineOptions({
  name: 'DemoBadge'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const positions: BadgePosition[] = ['top-right', 'bottom-right', 'top-left', 'bottom-left'];

const text = ref('99+');
const slotText = ref('New');
const show = ref(true);
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Color" split>
      <div class="flex gap-3">
        <div v-for="color in colors" :key="color">
          <SBadge :color="color">
            <SButton variant="dashed">{{ color }}</SButton>
          </SBadge>
        </div>
      </div>
    </SCard>
    <SCard title="Color With Text" split>
      <div class="flex gap-4">
        <div v-for="color in colors" :key="color">
          <SBadge :color="color" text="99+">
            <SButton variant="dashed">{{ color }}</SButton>
          </SBadge>
        </div>
      </div>
    </SCard>
    <SCard title="Positions" split>
      <div class="flex gap-3">
        <div v-for="position in positions" :key="position">
          <SBadge :position="position">
            <SButton variant="dashed" class="w-30">{{ position }}</SButton>
          </SBadge>
        </div>
      </div>
    </SCard>
    <SCard title="ModelValue" split>
      <div class="flex gap-3">
        <SInput v-model="text" />
        <SBadge :text="text">
          <SButton variant="outline">A</SButton>
        </SBadge>
      </div>
    </SCard>
    <SCard title="Slot" split>
      <div class="flex gap-3">
        <SInput v-model="slotText" />
        <SBadge :text="slotText">
          <SButton variant="outline">A</SButton>
          <template #content="{ value }">{{ value }}！</template>
        </SBadge>
      </div>
    </SCard>
    <SCard title="Show" split>
      <div class="flex gap-3">
        <SSwitch v-model:checked="show" />
        <SBadge :show="show">
          <SButton variant="outline">A</SButton>
        </SBadge>
      </div>
    </SCard>
  </div>
</template>
