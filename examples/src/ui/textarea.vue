<script setup lang="ts">
import { ref } from 'vue';
import { SCard, STextarea } from 'soy-ui';
import GraphemeSplitter from 'grapheme-splitter';

defineOptions({
  name: 'DemoTextarea'
});

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
  <div class="flex-c gap-4">
    <SCard title="word count" split>
      <STextarea v-model="wordCount" show-count />
    </SCard>
    <SCard title="word count with maxlength" split>
      <STextarea v-model="maxlengthWord" show-count maxlength="6" />
    </SCard>
    <SCard title="Count graphemes" split>
      <STextarea v-model="countGraphemesWord" :count-graphemes="countGraphemes" show-count />
    </SCard>
    <SCard title="count slot" split>
      <STextarea v-model="wordCount2" show-count :ui="{ count: 'text-xl text-red right-6' }" />
    </SCard>
    <SCard title="count slot" split>
      <STextarea v-model="wordCount3" show-count>
        <template #count="{ count }">
          <span>count is {{ count }}</span>
        </template>
      </STextarea>
    </SCard>
    <SCard title="Rows" split>
      <div class="flex-c-stretch gap-3">
        <STextarea
          v-for="row in rows"
          :key="row"
          :default-value="`rows: ${row}`"
          :rows="row"
          placeholder="Please Input Textarea"
        />
      </div>
    </SCard>
    <SCard title="Default value" split>
      <STextarea default-value="defaultModelValue" placeholder="Please Input Textarea" />
    </SCard>
    <SCard :title="`v-model : ${modelValue}`" split>
      <STextarea v-model="modelValue" placeholder="Please Input Textarea" />
    </SCard>
    <SCard title="Disabled" split>
      <STextarea model-value="the Textarea is disabled" disabled placeholder="Please Input Textarea" />
    </SCard>
    <SCard title="Resize" split>
      <div class="flex flex-c gap-6">
        <STextarea model-value="Resize None" :resize="false" />
        <STextarea model-value="Resize Vertical" resize="vertical" />
        <STextarea model-value="Resize Horizontal" resize="horizontal" />
        <STextarea model-value="Resize Both" resize />
      </div>
    </SCard>
  </div>
</template>
