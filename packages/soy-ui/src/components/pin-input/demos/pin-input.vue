<script setup lang="ts">
import { ref } from 'vue';
import { SCard, SPinInput, SonnerToaster, toast } from 'soy-ui';

defineOptions({
  name: 'DemoPinInput'
});

const numberValue = ref<string[]>([]);

const handleComplete = (value: string[]) => {
  toast.info(`the input value is ${value.join('')}`);
};

const upperCaseValue = ref<string[]>([]);

function handleChange(value: string[]) {
  upperCaseValue.value = value.join('').toUpperCase().split('');
}
</script>

<template>
  <SonnerToaster position="top-center" />
  <div class="demo-pin-input flex-c gap-4">
    <SCard title="Default" split>
      <SPinInput v-model="numberValue" type="number" placeholder="○" @complete="handleComplete" />
    </SCard>
    <SCard title="Custom Input Count" split>
      <SPinInput :input-count="8" placeholder="○" />
    </SCard>
    <SCard title="UpperCase" split>
      <SPinInput :model-value="upperCaseValue" placeholder="○" @update:model-value="handleChange" />
    </SCard>
    <SCard title="Disabled" split>
      <SPinInput placeholder="○" disabled />
    </SCard>
    <SCard title="Separator" split>
      <SPinInput separate />
    </SCard>
    <SCard title="Custom separator" split>
      <SPinInput>
        <template #separator>-</template>
      </SPinInput>
    </SCard>
    <SCard title="Password" split>
      <SPinInput placeholder="○" type="text" mask />
    </SCard>
  </div>
</template>

<style scoped></style>
