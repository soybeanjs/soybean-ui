<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SInput } from 'soy-ui';

defineOptions({
  name: 'DemoInput'
});

const modelValue = ref<string>('');
</script>

<template>
  <div class="flex-c gap-4">
    <SCard title="Input" split>
      <SInput placeholder="Please input" />
    </SCard>
    <SCard :title="`ModelValue : ${modelValue}`" split>
      <div class="w-320px lt-sm:w-auto">
        <SInput v-model="modelValue" placeholder="Please input" />
      </div>
    </SCard>
    <SCard title="Disabled" split>
      <div class="w-320px lt-sm:w-auto">
        <SInput model-value="the input is disabled" disabled placeholder="Please input" />
      </div>
    </SCard>
    <SCard title="File" split>
      <div class="w-320px lt-sm:w-auto">
        <SInput type="file" />
      </div>
    </SCard>
  </div>
</template>
