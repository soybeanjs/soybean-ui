/**
 * SBean project templates.
 *
 * Vite + Nuxt 3 — ready for sbean components.
 */

export type FrameworkType = 'vue-vite' | 'nuxt';

export interface ProjectTemplate {
  name: string;
  description: string;
  framework: FrameworkType;
  files: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
}

// ---------------------------------------------------------------------------
// Vue 3 + Vite
// ---------------------------------------------------------------------------

export const vueViteTemplate: ProjectTemplate = {
  name: 'vue-vite',
  description: 'Vue 3 + Vite + UnoCSS',
  framework: 'vue-vite',
  files: {
    'vite.config.ts': `import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import path from 'path'

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  plugins: [
    Vue(),
    UnoCSS(),
  ],
})
`,
    'uno.config.ts': `import { defineConfig } from 'unocss'
import { presetSbean } from '@soybeanjs/unocss-shadcn'

export default defineConfig({
  presets: [presetSbean()],
})
`,
    'tsconfig.json': `{
  "compilerOptions": {
    "target": "ESNext",
    "jsx": "preserve",
    "jsxImportSource": "vue",
    "lib": ["DOM", "ESNext"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "types": ["node", "vite/client"],
    "paths": {
      "@/*": ["./src/*"]
    },
    "resolveJsonModule": true,
    "strict": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": ["node_modules", "dist"]
}
`,
    'sbean.json': `{
  "style": "soybean",
  "iconLibrary": "lucide",
  "uno": {
    "size": "md",
    "radius": "md",
    "base": "zinc",
    "primary": "indigo",
    "feedback": "classic"
  },
  "font": {},
  "menu": {
    "accent": "subtle",
    "color": "default"
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib"
  }
}
`,
    'src/main.ts': `import { createApp } from 'vue'
import 'uno.css'
import App from './App.vue'

const app = createApp(App)

app.mount('#app')
`,
    'src/App.vue': `<script setup lang="ts">
</script>

<template>
  <div id="app">
    <h1>Welcome to SoybeanUI</h1>
    <p>Run <code>sbean add &lt;component&gt;</code> to add components.</p>
  </div>
</template>
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
  scripts: {
    dev: 'vite',
    build: 'vue-tsc --noEmit && vite build',
    preview: 'vite preview'
  },
  dependencies: {
    vue: '^3.5.0',
    '@soybeanjs/headless': 'latest',
    '@soybeanjs/cva': 'latest',
    '@soybeanjs/unocss-shadcn': 'latest'
  },
  devDependencies: {
    '@vitejs/plugin-vue': '^5.0.0',
    typescript: '^5.8.0',
    unocss: '^66.0.0',
    vite: '^6.0.0',
    'vue-tsc': '^2.1.0'
  }
};

// ---------------------------------------------------------------------------
// Nuxt 3
// ---------------------------------------------------------------------------

export const nuxtTemplate: ProjectTemplate = {
  name: 'nuxt',
  description: 'Nuxt 3 + UnoCSS',
  framework: 'nuxt',
  files: {
    'nuxt.config.ts': `export default defineNuxtConfig({
  modules: ['@unocss/nuxt'],
  compatibilityDate: '2026-01-01'
})
`,
    'uno.config.ts': `import { defineConfig } from 'unocss'
import { presetSbean } from '@soybeanjs/unocss-shadcn'

export default defineConfig({
  presets: [presetSbean()],
})
`,
    'sbean.json': `{
  "style": "soybean",
  "iconLibrary": "lucide",
  "uno": {
    "base": "zinc",
    "primary": "indigo",
    "feedback": "classic",
    "size": "md",
    "radius": "md"
  },
  "font": {},
  "menu": {
    "accent": "subtle",
    "color": "default"
  },
  "aliases": {
    "components": "~/components",
    "utils": "~/lib/utils",
    "ui": "~/components/ui",
    "lib": "~/lib"
  }
}
`,
    'app.vue': `<template>
  <div>
    <NuxtPage />
  </div>
</template>
`,
    'pages/index.vue': `<script setup lang="ts">
</script>

<template>
  <div>
    <h1>Welcome to SoybeanUI + Nuxt</h1>
    <p>Run <code>sbean add &lt;component&gt;</code> to add components.</p>
  </div>
</template>
`
  },
  dependencies: {
    nuxt: '^3.16.0',
    vue: 'latest',
    '@soybeanjs/headless': 'latest',
    '@soybeanjs/cva': 'latest',
    '@soybeanjs/unocss-shadcn': 'latest'
  },
  devDependencies: {
    '@unocss/nuxt': '^66.0.0',
    unocss: '^66.0.0'
  },
  scripts: {
    dev: 'nuxt dev',
    build: 'nuxt build',
    generate: 'nuxt generate',
    preview: 'nuxt preview'
  }
};

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const TEMPLATES: Record<FrameworkType, ProjectTemplate> = {
  'vue-vite': vueViteTemplate,
  nuxt: nuxtTemplate
};

export function getTemplate(name: FrameworkType): ProjectTemplate | null {
  return TEMPLATES[name] ?? null;
}

export function listTemplates(): Array<{ name: string; description: string; framework: FrameworkType }> {
  return Object.values(TEMPLATES).map(t => ({
    name: t.name,
    description: t.description,
    framework: t.framework
  }));
}
