<script setup lang="ts">
import { SCard, STag } from 'soy-ui';
import type { TagShape, TagVariant, ThemeColor, ThemeSize } from 'soy-ui';

defineOptions({
  name: 'DemoTag'
});

const colors: ThemeColor[] = ['primary', 'destructive', 'success', 'warning', 'info', 'carbon', 'secondary', 'accent'];
const variants: TagVariant[] = ['solid', 'pure', 'outline', 'soft', 'ghost'];
const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
const shapes: TagShape[] = ['auto', 'rounded'];
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Color" split>
      <div class="flex flex-wrap gap-12px">
        <STag v-for="color in colors" :key="color" :color="color">{{ color }}</STag>
      </div>
    </SCard>
    <SCard title="Variant" split>
      <div class="flex-c-stretch gap-12px">
        <div v-for="color in colors" :key="color" class="flex flex-wrap gap-12px">
          <STag v-for="variant in variants" :key="variant" :color="color" :variant="variant">{{ variant }}</STag>
        </div>
      </div>
    </SCard>
    <SCard title="Size" split>
      <div class="flex flex-wrap gap-12px">
        <STag v-for="(size, index) in sizes" :key="size" :color="colors[index]" :size="size">
          {{ size }}
        </STag>
      </div>
    </SCard>
    <SCard title="Shape" split>
      <div class="flex flex-wrap gap-12px">
        <STag v-for="shape in shapes" :key="shape" variant="ghost" :shape="shape">{{ shape }}</STag>
      </div>
    </SCard>
  </div>
</template>
