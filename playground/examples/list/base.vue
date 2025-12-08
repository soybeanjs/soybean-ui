<script setup lang="ts">
import { SCard, SIcon, SList, SListItem, SSeparator } from '@soybeanjs/ui';

const listItems = [
  {
    title: 'Notifications',
    description: 'You have 3 unread messages.',
    leading: 'lucide:bell',
    trailing: 'lucide:chevron-right'
  },
  {
    title: 'Messages',
    description: 'You have 5 new messages.',
    leading: 'lucide:message-circle',
    trailing: 'lucide:chevron-right'
  },
  {
    title: 'Settings',
    description: 'Manage your account settings.',
    leading: 'lucide:settings',
    trailing: 'lucide:chevron-right'
  }
];
</script>

<template>
  <SCard title="Base" split>
    <SList class="w-80 lt-sm:w-auto">
      <template v-for="(item, index) in listItems" :key="item.title">
        <SSeparator v-if="index !== 0" />
        <SListItem :title="item.title" :description="item.description">
          <template #leading>
            <SIcon :icon="item.leading" />
          </template>
          <div>This is Content</div>
          <template #trailing>
            <SIcon :icon="item.trailing" />
          </template>
        </SListItem>
      </template>
    </SList>
  </SCard>
</template>
