/**
 * SBean project templates.
 *
 * Vite + Nuxt 3 — ready for sbean components.
 *
 * Template file content may contain `{{variable}}` placeholders that are
 * resolved at scaffold time by {@link scaffoldFromTemplate}.
 *
 * Supported placeholders:
 *   - `{{projectName}}`    — the project name
 *   - `{{uiDir}}`          — the component output directory (e.g. "src/ui")
 *   - `{{resolverPath}}`   — relative import path for the SBean resolver
 */

export type FrameworkType = 'vue-vite' | 'nuxt';

export interface ProjectTemplate {
  name: string;
  description: string;
  framework: FrameworkType;
  /** File path → content (may contain `{{variable}}` placeholders). */
  files: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
}

/** Variables that can be interpolated into template file content. */
export interface TemplateVariables {
  projectName: string;
  uiDir: string;
  resolverPath: string;
}

// ---------------------------------------------------------------------------
// Shared snippet: uno.config.ts (used by both templates)
// ---------------------------------------------------------------------------

const UNO_CONFIG_CONTENT = `import { defineConfig } from 'unocss'
import { presetSbean } from '@soybeanjs/unocss-shadcn'

export default defineConfig({
  presets: [presetSbean()]
})
`;

// ---------------------------------------------------------------------------
// Shared snippet: sbean.json (used by both templates)
// ---------------------------------------------------------------------------

const SBEAN_JSON_CONTENT = `{
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
`;

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
import SbeanResolver from '{{resolverPath}}'

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
    'uno.config.ts': UNO_CONFIG_CONTENT,
    'tsconfig.json': `{
  "compilerOptions": {
    "target": "ESNext",
    "jsx": "preserve",
    "jsxImportSource": "vue",
    "lib": ["DOM", "ESNext"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "paths": {
      "#ui/*": ["./{{uiDir}}/*"]
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
    'sbean.json': SBEAN_JSON_CONTENT,
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
    <title>{{projectName}}</title>
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
    '@iconify/vue': 'latest',
    '@soybeanjs/cva': 'latest',
    '@soybeanjs/headless': 'latest',
    '@soybeanjs/hooks': 'latest',
    '@soybeanjs/shadcn-theme': 'latest',
    '@soybeanjs/utils': 'latest',
    vue: 'latest'
  },
  devDependencies: {
    '@soybeanjs/unocss-shadcn': 'latest',
    '@vitejs/plugin-vue': 'latest',
    typescript: 'latest',
    unocss: 'latest',
    'unplugin-vue-components': 'latest',
    'vite-plus': 'latest',
    'vue-tsc': 'latest'
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
    'nuxt.config.ts': `import UiModule from './{{uiDir}}/nuxt'

export default defineNuxtConfig({
  modules: ['@unocss/nuxt', UiModule],
  compatibilityDate: '2026-01-01',
  alias: {
    '#ui': './{{uiDir}}'
  }
})
`,
    'uno.config.ts': UNO_CONFIG_CONTENT,
    'tsconfig.json': `{
  "extends": "./.nuxt/tsconfig.json",
  "compilerOptions": {
    "paths": {
      "#ui/*": ["./{{uiDir}}/*"]
    }
  }
}
`,
    'sbean.json': SBEAN_JSON_CONTENT,
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
    '@iconify/vue': 'latest',
    '@soybeanjs/cva': 'latest',
    '@soybeanjs/headless': 'latest',
    '@soybeanjs/hooks': 'latest',
    '@soybeanjs/shadcn-theme': 'latest',
    '@soybeanjs/utils': 'latest',
    nuxt: 'latest'
  },
  devDependencies: {
    '@unocss/nuxt': 'latest',
    unocss: 'latest'
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
