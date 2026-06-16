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
    'vite.config.ts': `import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import SbeanResolver from './src/ui/resolver'

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  plugins: [
    Vue(),
    UnoCSS(),
    Components({
      dts: fileURLToPath(new URL('./src/typings/components.d.ts', import.meta.url)),
      resolvers: [SbeanResolver()]
    })
  ]
})
`,
    'uno.config.ts': `import { defineConfig } from 'unocss'
import { presetSbean } from '@soybeanjs/unocss-shadcn'

export default defineConfig({
  presets: [presetSbean()]
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
    "paths": {
      "#ui/*": ["./src/ui/*"]
    },
    "types": ["node", "vite/client"],
    "resolveJsonModule": true,
    "strict": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true
  },
  "include": ["./**/*.ts", "./**/*.d.ts", "./**/*.tsx", "./**/*.vue"],
  "exclude": ["node_modules", "dist", "src/typings"]
}
`,
    'sbean.json': `{
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
    dev: 'vp dev',
    build: 'vp build',
    preview: 'vp preview'
  },
  dependencies: {
    '@iconify/vue': '^5.0.1',
    '@soybeanjs/cva': '^0.0.9',
    '@soybeanjs/headless': '^0.29.0-beta.6',
    '@soybeanjs/hooks': '^0.3.0',
    '@soybeanjs/shadcn-theme': '^0.29.0-beta.6',
    '@soybeanjs/utils': '^0.1.1',
    vue: '^3.5.0'
  },
  devDependencies: {
    '@soybeanjs/unocss-shadcn': '^0.29.0-beta.6',
    '@vitejs/plugin-vue': '^5.0.0',
    typescript: '^6.0.3',
    unocss: '^66.7.0',
    'unplugin-vue-components': '^31.1.0',
    'vite-plus': '^0.1.24',
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
    'nuxt.config.ts': `import UiModule from './ui/nuxt'

export default defineNuxtConfig({
  modules: ['@unocss/nuxt', UiModule],
  compatibilityDate: '2026-01-01',
  alias: {
    '#ui': './ui'
  }
})
`,
    'uno.config.ts': `import { defineConfig } from 'unocss'
import { presetSbean } from '@soybeanjs/unocss-shadcn'

export default defineConfig({
  presets: [presetSbean()]
})
`,
    'tsconfig.json': `{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "paths": {
      "#ui/*": ["./ui/*"]
    }
  }
}
`,
    'sbean.json': `{
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
    '@iconify/vue': '^5.0.1',
    '@soybeanjs/cva': '^0.0.9',
    '@soybeanjs/headless': '^0.29.0-beta.6',
    '@soybeanjs/hooks': '^0.3.0',
    '@soybeanjs/shadcn-theme': '^0.29.0-beta.6',
    '@soybeanjs/utils': '^0.1.1',
    nuxt: '^4.4.8'
  },
  devDependencies: {
    '@unocss/nuxt': '^66.7.0',
    unocss: '^66.7.0'
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
