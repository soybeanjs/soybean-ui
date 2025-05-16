<script setup lang="ts">
import { ref } from 'vue';
import { SButton, SCard, SSelect, SonnerToaster, toast } from 'soy-ui';
import type { SelectOptionData, SonnerProps } from 'soy-ui';

defineOptions({
  name: 'DemoSonner'
});

function openDefaultToast() {
  toast('Event has been created');
}

function openInfoToast() {
  toast.info('Event has been created');
}

function openSuccessToast() {
  toast.success('Event has been created');
}

function openWarningToast() {
  toast.warning('Event has been created');
}

function openErrorToast() {
  toast.error('Event has been created');
}

function openToastWithDescription() {
  toast('Event has been created', {
    description: 'You can now view the event details'
  });
}

function openLoadingToast() {
  const id = toast.loading('Event has been created');

  setTimeout(() => {
    toast.dismiss(id);
  }, 2000);
}

function openToastWithAction() {
  toast('Event has been created', {
    action: {
      label: 'Confirm',
      onClick: () => {
        console.log('View event');
      }
    },
    cancel: {
      label: 'Cancel',
      onClick: () => {
        console.log('Cancel');
      }
    }
  });
}

const position = ref<SonnerProps['position']>('top-right');

const positionOptions: SelectOptionData[] = [
  { label: 'Top Left', value: 'top-left' },
  { label: 'Top Center', value: 'top-center' },
  { label: 'Top Right', value: 'top-right' },
  { label: 'Bottom Left', value: 'bottom-left' },
  { label: 'Bottom Center', value: 'bottom-center' },
  { label: 'Bottom Right', value: 'bottom-right' }
];
</script>

<template>
  <div class="flex-c gap-4">
    <SonnerToaster :position="position" close-button />
    <SCard title="Type" split>
      <div class="flex gap-12px">
        <SButton variant="outline" @click="openDefaultToast">Default</SButton>
        <SButton variant="outline" @click="openInfoToast">Info</SButton>
        <SButton variant="outline" @click="openSuccessToast">Success</SButton>
        <SButton variant="outline" @click="openWarningToast">Warning</SButton>
        <SButton variant="outline" @click="openErrorToast">Error</SButton>
        <SButton variant="outline" @click="openLoadingToast">Loading</SButton>
      </div>
    </SCard>
    <SCard title="With Description" split>
      <SButton variant="outline" @click="openToastWithDescription">open</SButton>
    </SCard>
    <SCard title="With Action" split>
      <SButton variant="outline" @click="openToastWithAction">open</SButton>
    </SCard>
    <SCard title="Position" split>
      <div class="w-160px">
        <SSelect v-model="position" :items="positionOptions" />
      </div>
    </SCard>
  </div>
</template>
