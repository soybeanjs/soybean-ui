/**
 * SBean project templates system.
 *
 * Provides scaffolding templates for different project types:
 * - Vue 3 + Vite
 */

export type FrameworkType = 'vue-vite';

export interface ProjectTemplate {
  name: string;
  description: string;
  framework: FrameworkType;
  files: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
}

/**
 * Vue 3 + Vite template.
 */
export const vueViteTemplate: ProjectTemplate = {
  name: 'vue-vite',
  description: 'Vue 3 with Vite',
  framework: 'vue-vite',
  files: {
    'vite.config.ts': `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
`,
    'tsconfig.json': `{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["ESNext", "DOM"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
`,
    'src/main.ts': `import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
`,
    'src/App.vue': `<script setup lang="ts">
</script>

<template>
  <div id="app">
    <h1>Welcome to SoybeanUI</h1>
    <p>Run "sbean add &lt;component&gt;" to add components.</p>
  </div>
</template>

<style scoped>
</style>
`,
    'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SoybeanUI</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`
  },
  dependencies: {
    vue: '^3.5.0'
  },
  devDependencies: {
    '@vitejs/plugin-vue': '^5.0.0',
    typescript: '^5.8.0',
    vite: '^6.0.0',
    'vue-tsc': '^2.1.0'
  },
  scripts: {
    dev: 'vite',
    build: 'vue-tsc --noEmit && vite build',
    preview: 'vite preview'
  }
};

/**
 * Template registry.
 */
export const TEMPLATES: Record<FrameworkType, ProjectTemplate> = {
  'vue-vite': vueViteTemplate
};

/**
 * Get template by name.
 */
export function getTemplate(name: FrameworkType): ProjectTemplate | null {
  return TEMPLATES[name] ?? null;
}

/**
 * List all available templates.
 */
export function listTemplates(): Array<{ name: string; description: string; framework: FrameworkType }> {
  return Object.values(TEMPLATES).map(t => ({
    name: t.name,
    description: t.description,
    framework: t.framework
  }));
}
