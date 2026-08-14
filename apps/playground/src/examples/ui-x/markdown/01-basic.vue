<script setup lang="ts">
import { SxMarkdown } from '@soybeanjs/ui-x';

const content = `# Markdown Heading

This is a paragraph with **bold** text, *italic* text, and \`inline code\`.

## Subheading

- First list item
- Second list item
- Third list item

### Code Block

\`\`\`ts
interface User {
  id: string;
  name: string;
}

function greet(user: User): string {
  return \`Hello, \${user.name}!\`;
}
\`\`\`

### Table

| Name | Type | Description |
| --- | --- | --- |
| id | string | Unique identifier |
| name | string | Display name |
`;
</script>

<template>
  <SxMarkdown :content="content" />
</template>
