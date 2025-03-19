<script setup lang="ts">
import { ref } from 'vue';
import { STextarea } from 'soy-ui';
import type { ThemeSize } from 'soy-ui';
import GraphemeSplitter from 'grapheme-splitter';

defineOptions({
  name: 'UiTextarea'
});

const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

const modelValue = ref<string>('');

const rows: number[] = [1, 2, 3, 4];

const wordCount = ref('soybean-ui');
const wordCount2 = ref('soybean-ui');
const wordCount3 = ref('soybean-ui');
const maxlengthWord = ref('1234');

const splitter = new GraphemeSplitter();
const countGraphemes = (text: string) => splitter.countGraphemes(text);
const countGraphemesWord = ref('🌷🇨🇳');
</script>

<template>
  <div class="demo-textarea w-620px lt-sm:w-auto">
    <div class="py-12px text-18px">word count</div>
    <STextarea v-model="wordCount" show-count />
    <div class="py-12px text-18px">word count with maxlength</div>
    <STextarea v-model="maxlengthWord" show-count maxlength="6" />
    <div class="py-12px text-18px">Count graphemes</div>
    <STextarea v-model="countGraphemesWord" :count-graphemes="countGraphemes" show-count />
    <div class="py-12px text-18px">count slot</div>
    <STextarea v-model="wordCount2" show-count count-class="text-xl text-red right-6" />
    <div class="py-12px text-18px">count slot</div>
    <STextarea v-model="wordCount3" show-count>
      <template #count="{ count }">
        <span>count is {{ count }}</span>
      </template>
    </STextarea>
    <div class="py-12px text-18px">Size</div>
    <div class="flex justify-around gap-6">
      <div class="w-full">
        <div class="py-12px text-18px">Size</div>
        <div class="flex-c-stretch gap-3">
          <STextarea
            v-for="size in sizes"
            :key="size"
            :default-value="`size: ${size}`"
            :size="size"
            placeholder="Please Input Textarea"
          />
        </div>
      </div>
      <div class="w-full">
        <div class="py-12px text-18px">show count with size</div>
        <div class="flex-c-stretch gap-3">
          <STextarea
            v-for="size in sizes"
            :key="size"
            :default-value="`size: ${size}`"
            :size="size"
            show-count
            placeholder="Please Input Textarea"
          />
        </div>
      </div>
    </div>
    <div class="py-12px text-18px">Rows</div>
    <div class="flex-c-stretch gap-3">
      <STextarea
        v-for="row in rows"
        :key="row"
        :default-value="`rows: ${row}`"
        :rows="row"
        placeholder="Please Input Textarea"
      />
    </div>
    <div class="py-12px text-18px">Default value</div>
    <STextarea default-value="defaultModelValue" placeholder="Please Input Textarea" />
    <div class="py-12px text-18px">v-model : {{ modelValue }}</div>
    <STextarea v-model="modelValue" placeholder="Please Input Textarea" />
    <div class="py-12px text-18px">Disabled</div>
    <STextarea model-value="the Textarea is disabled" disabled placeholder="Please Input Textarea" />
    <div class="py-12px text-18px">Resize</div>
    <div class="flex flex-c gap-6">
      <STextarea model-value="Resize None" :resize="false" />
      <STextarea model-value="Resize Vertical" resize="vertical" />
      <STextarea model-value="Resize Horizontal" resize="horizontal" />
      <STextarea model-value="Resize Both" resize />
    </div>
  </div>
</template>

<style scoped>
.demo-textarea :deep(textarea) {
  border: 1px solid hsl(var(--input));
}
</style>
