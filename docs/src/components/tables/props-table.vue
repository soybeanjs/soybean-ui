<script setup lang="ts">
type PropDef = {
  name: string;
  required?: boolean;
  default?: string | boolean;
  type: string;
  typeSimple?: string;
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
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="prop in data" :key="prop.name">
        <td>{{ prop.name }}{{ prop.required ? '*' : null }}</td>
        <td>
          <div>{{ prop.type }}</div>
          <div v-if="prop.typeSimple">
            {{ prop.typeSimple }}
          </div>
        </td>
        <td>{{ prop.default || '——' }}</td>
        <td>{{ prop.description }}</td>
      </tr>
    </tbody>
  </table>
</template>
