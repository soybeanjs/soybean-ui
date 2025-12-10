<script setup lang="ts">
type PropDef = {
  name: string;
  parameters?: string;
  description: string;
};

interface Props {
  data: PropDef[];
}

defineProps<Props>();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Emit Name</th>
        <th>Parameters</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="prop in data" :key="prop.name">
        <td>{{ prop.name }}</td>
        <td>{{ prop.parameters || '——' }}</td>
        <td>{{ prop.description }}</td>
      </tr>
    </tbody>
  </table>
</template>
