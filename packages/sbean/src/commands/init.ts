import { existsSync } from 'fs';
import fs from 'fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'path';
import * as v from 'valibot';
import { Command } from 'commander';
import prompts from 'prompts';
import {
  PRESET_STYLES,
  PRESET_BASE_COLORS,
  PRESET_PRIMARY_COLORS,
  PRESET_RADII,
  PRESET_ICON_LIBRARIES,
  PRESET_FEEDBACK_COLORS,
  PRESET_SIZES,
  PRESET_FONTS
} from '../registry/config';
import { UI_SOURCE_PATH } from '../registry/constants';
import { createDefaultConfig, detectMonorepo, getConfig, writeConfig } from '../utils/get-config';
import { getProjectInfo } from '../utils/get-project-info';
import { decodePreset, isPresetCode } from '../registry/preset';

// ---------------------------------------------------------------------------
// Options schema
// ---------------------------------------------------------------------------

export const initOptionsSchema = v.object({
  cwd: v.string(),
  monorepo: v.optional(v.boolean()),
  uiDir: v.optional(v.string()),
  style: v.optional(v.picklist(PRESET_STYLES)),
  size: v.optional(v.picklist(PRESET_SIZES)),
  base: v.optional(v.picklist(PRESET_BASE_COLORS)),
  primary: v.optional(v.picklist(PRESET_PRIMARY_COLORS)),
  feedback: v.optional(v.picklist(PRESET_FEEDBACK_COLORS)),
  radius: v.optional(v.picklist(PRESET_RADII)),
  iconLibrary: v.optional(v.picklist(PRESET_ICON_LIBRARIES)),
  fontSans: v.optional(v.picklist(PRESET_FONTS)),
  fontHeading: v.optional(v.picklist(['inherit' as const, ...PRESET_FONTS])),
  yes: v.optional(v.boolean(), false),
  defaults: v.optional(v.boolean(), false),
  force: v.optional(v.boolean(), false),
  silent: v.optional(v.boolean(), false)
});

export type InitOptions = v.InferOutput<typeof initOptionsSchema>;

// ---------------------------------------------------------------------------
// uno.config.ts template
// ---------------------------------------------------------------------------

function generateUnoConfigContent(): string {
  return `${[
    `import { defineConfig } from 'unocss'`,
    `import { presetSbean } from '@soybeanjs/unocss-shadcn'`,
    ``,
    `export default defineConfig({`,
    `  presets: [presetSbean()],`,
    `})`
  ].join('\n')}\n`;
}

function generateTsConfigContent(uiDir: string): string {
  return `${[
    '{',
    '  "compilerOptions": {',
    '    "target": "ESNext",',
    '    "jsx": "preserve",',
    '    "jsxImportSource": "vue",',
    '    "lib": ["DOM", "ESNext"],',
    '    "module": "ESNext",',
    '    "moduleResolution": "bundler",',
    '    "paths": {',
    `      "#ui/*": ["./${uiDir}/*"]`,
    '    },',
    '    "types": ["node", "vite/client"],',
    '    "resolveJsonModule": true,',
    '    "strict": true,',
    '    "strictNullChecks": true,',
    '    "noUnusedLocals": true,',
    '    "allowSyntheticDefaultImports": true,',
    '    "esModuleInterop": true,',
    '    "forceConsistentCasingInFileNames": true,',
    '    "isolatedModules": true',
    '   },',
    '  "include": ["./**/*.ts", "./**/*.d.ts", "./**/*.tsx", "./**/*.vue"],',
    '  "exclude": ["node_modules", "dist"]',
    '}'
  ].join('\n')}\n`;
}

// ---------------------------------------------------------------------------
// Command definition
// ---------------------------------------------------------------------------

export const init = new Command()
  .name('init')
  .alias('create')
  .description('initialize your project and install dependencies')
  .option('-c, --cwd <cwd>', 'the working directory', process.cwd())
  .option('-m, --monorepo', 'use monorepo (pnpm workspaces) structure', false)
  .option('--ui-dir <path>', 'component output directory (default: src/ui or packages/ui)')
  .option('--style <style>', `style preset: ${PRESET_STYLES.join('/')}`)
  .option('--size <size>', `component size: ${PRESET_SIZES.join('/')}`)
  .option('-b, --base <base>', `base color: ${PRESET_BASE_COLORS.join('/')}`)
  .option('--primary <primary>', `primary color: ${PRESET_PRIMARY_COLORS.join('/')}`)
  .option('--feedback <feedback>', `feedback colors: ${PRESET_FEEDBACK_COLORS.join('/')}`)
  .option('--radius <radius>', `border radius: ${PRESET_RADII.join('/')}`)
  .option('-p, --preset <code>', 'preset code (base62 encoded config)')
  .option('--icon-library <library>', `icon library: ${PRESET_ICON_LIBRARIES.join('/')}`)
  .option('--font-sans <font>', `sans-serif font: ${PRESET_FONTS.join('/')}`)
  .option('--font-heading <font>', `heading font: inherit/${PRESET_FONTS.join('/')}`)
  .option('-y, --yes', 'skip confirmation prompt', false)
  .option('-d, --defaults', 'use default configuration', false)
  .option('-f, --force', 'force overwrite of existing configuration', false)
  .option('-n, --name <name>', 'project name (for new projects)')
  .option('-s, --silent', 'mute output', false)
  .action(async opts => {
    await runInit(opts);
  });

type InitActionOptions = {
  cwd: string;
  monorepo?: boolean;
  uiDir?: string;
  style?: string;
  size?: string;
  base?: string;
  primary?: string;
  feedback?: string;
  radius?: string;
  iconLibrary?: string;
  fontSans?: string;
  fontHeading?: string;
  yes: boolean;
  defaults: boolean;
  force: boolean;
  silent: boolean;
  preset?: string;
  name?: string;
};

export async function runInit(opts: InitActionOptions) {
  const cwd = path.resolve(opts.cwd);

  // Check existing config
  const existingConfig = await getConfig(cwd);
  if (existingConfig && !opts.force) {
    console.log('⚠ sbean.json already exists. Use --force to overwrite.');
    return;
  }

  // Detect project info
  const projectInfo = await getProjectInfo(cwd);

  // Detect monorepo status (from CLI flag, then auto-detect, then prompt)
  const autoMonorepo = await detectMonorepo(cwd);
  let isMonorepo = opts.monorepo ?? autoMonorepo;

  // Determine config values
  // Handle preset code (overrides defaults, but CLI flags take precedence)
  if (opts.preset) {
    if (!isPresetCode(opts.preset)) {
      console.error(`Invalid preset code: ${opts.preset}`);
      console.log('Generate one at https://ui.soybeanjs.cn/create (coming soon)');
      process.exit(1);
    }
    const preset = decodePreset(opts.preset);
    if (!preset) {
      console.error(`Failed to decode preset: ${opts.preset}`);
      process.exit(1);
    }
    opts.style = opts.style || preset.style;
    opts.base = opts.base || preset.base;
    opts.primary = opts.primary || preset.primary;
    opts.feedback = opts.feedback || preset.feedback;
    opts.radius = opts.radius || preset.radius;
    opts.iconLibrary = opts.iconLibrary || preset.iconLibrary;
    opts.fontSans = opts.fontSans || preset.fontSans;
    opts.fontHeading = opts.fontHeading || preset.fontHeading;
  }
  const style = opts.style || 'soybean';
  const base = opts.base || 'zinc';
  const primary = opts.primary || 'indigo';
  const feedback = opts.feedback || 'classic';
  const size = opts.size || 'md';
  const radius = opts.radius || 'md';
  const iconLibrary = opts.iconLibrary || 'lucide';

  const recommended = {
    style: 'soybean',
    base: 'zinc',
    primary: 'indigo',
    feedback: 'classic'
  } as const;

  // Prompt if not using defaults/yes
  if (!opts.defaults && !opts.yes) {
    const answers = await prompts([
      {
        type: 'select',
        name: 'monorepo',
        message: 'Project structure?',
        choices: [
          { title: `Monorepo (${autoMonorepo ? 'detected' : 'pnpm workspaces — recommended'})`, value: 'monorepo' },
          { title: 'Single package', value: 'single' }
        ],
        initial: 0
      },
      {
        type: 'text',
        name: 'uiDir',
        message: 'Component output directory?',
        initial: isMonorepo ? 'packages/ui' : 'src/ui'
      },
      {
        type: 'select',
        name: 'style',
        message: 'Which style would you like to use?',
        choices: PRESET_STYLES.map(s => ({
          title: s === 'soybean' ? `${s} (recommended)` : s,
          value: s
        })),
        initial: 0
      },
      {
        type: 'select',
        name: 'size',
        message: 'Which component size / density?',
        choices: [
          { title: 'md (recommended — 16px base)', value: 'md' },
          { title: 'xs — extra small (12px)', value: 'xs' },
          { title: 'sm — small (14px)', value: 'sm' },
          { title: 'lg — large (18px)', value: 'lg' },
          { title: 'xl — extra large (20px)', value: 'xl' },
          { title: '2xl — huge (24px)', value: '2xl' }
        ],
        initial: 0
      },
      {
        type: 'select',
        name: 'base',
        message: 'Which base color?',
        choices: [recommended.base, ...PRESET_BASE_COLORS.filter(b => b !== recommended.base)].map(b => ({
          title: b === recommended.base ? `${b} (recommended)` : b,
          value: b
        })),
        initial: 0
      },
      {
        type: 'select',
        name: 'primary',
        message: 'Which primary color?',
        choices: [recommended.primary, ...PRESET_PRIMARY_COLORS.filter(p => p !== recommended.primary)].map(p => ({
          title: p === recommended.primary ? `${p} (recommended)` : p,
          value: p
        })),
        initial: 0
      },
      {
        type: 'select',
        name: 'feedback',
        message: 'Which feedback color preset?',
        choices: [recommended.feedback, ...PRESET_FEEDBACK_COLORS.filter(f => f !== recommended.feedback)].map(f => ({
          title: f === recommended.feedback ? `${f} (recommended)` : f,
          value: f
        })),
        initial: 0
      },
      {
        type: 'select',
        name: 'fontSans',
        message: 'Which sans-serif font? (skip for system default)',
        choices: [
          { title: 'inter (recommended)', value: 'inter' },
          { title: 'none (system default)', value: '' },
          ...PRESET_FONTS.filter(f => f !== 'inter').map(f => ({
            title: f,
            value: f
          }))
        ],
        initial: 0
      },
      {
        type: (prev: string) => (prev ? 'select' : (null as any)),
        name: 'fontHeading',
        message: 'Which heading font? (or inherit from sans)',
        choices: [
          { title: 'inherit (recommended)', value: 'inherit' },
          ...PRESET_FONTS.map(f => ({
            title: f,
            value: f
          }))
        ],
        initial: 0
      }
    ]);

    if (answers.monorepo) {
      isMonorepo = answers.monorepo === 'monorepo';
    }
    if (answers.uiDir !== undefined && answers.uiDir !== '') {
      opts.uiDir = answers.uiDir;
    }
    if (answers.style) opts.style = answers.style as (typeof PRESET_STYLES)[number];
    if (answers.size) opts.size = answers.size as (typeof PRESET_SIZES)[number];
    if (answers.base) opts.base = answers.base as (typeof PRESET_BASE_COLORS)[number];
    if (answers.primary) opts.primary = answers.primary as (typeof PRESET_PRIMARY_COLORS)[number];
    if (answers.feedback) opts.feedback = answers.feedback as (typeof PRESET_FEEDBACK_COLORS)[number];
    if (answers.fontSans !== undefined && answers.fontSans !== '') {
      opts.fontSans = answers.fontSans as (typeof PRESET_FONTS)[number];
    }
    if (answers.fontHeading !== undefined) {
      opts.fontHeading = answers.fontHeading as 'inherit' | (typeof PRESET_FONTS)[number];
    }
  }

  // Scaffold new project if no package.json exists
  if (!projectInfo) {
    console.log('No package.json found. Creating a new Vue + Vite project...');
    const uiDirForScaffold = opts.uiDir ?? (isMonorepo ? 'packages/ui' : 'src/ui');
    await scaffoldProject(cwd, opts.name, uiDirForScaffold);
  }

  // Build font config for sbean.json
  const fontOverrides: {
    sans?: (typeof PRESET_FONTS)[number];
    heading?: 'inherit' | (typeof PRESET_FONTS)[number];
  } = {};

  if (opts.fontSans && PRESET_FONTS.includes(opts.fontSans as (typeof PRESET_FONTS)[number])) {
    fontOverrides.sans = opts.fontSans as (typeof PRESET_FONTS)[number];
  }
  if (opts.fontHeading) {
    const heading = opts.fontHeading;
    if (heading === 'inherit') {
      fontOverrides.heading = 'inherit';
    } else if (PRESET_FONTS.includes(heading as (typeof PRESET_FONTS)[number])) {
      fontOverrides.heading = heading as (typeof PRESET_FONTS)[number];
    }
  }

  // Write sbean.json
  const config = await createDefaultConfig(cwd, {
    isMonorepo,
    uiDir: opts.uiDir,
    style: (opts.style as (typeof PRESET_STYLES)[number]) || style,
    iconLibrary: (opts.iconLibrary as (typeof PRESET_ICON_LIBRARIES)[number]) || iconLibrary,
    uno: {
      base: (opts.base || base) as (typeof PRESET_BASE_COLORS)[number],
      primary: (opts.primary || primary) as (typeof PRESET_PRIMARY_COLORS)[number],
      feedback: (opts.feedback || feedback) as (typeof PRESET_FEEDBACK_COLORS)[number],
      size: (opts.size || size) as (typeof PRESET_SIZES)[number],
      radius: (opts.radius || radius) as (typeof PRESET_RADII)[number]
    },
    font: fontOverrides
  });
  await writeConfig(cwd, config);

  if (!opts.silent) {
    console.log('✔ Created sbean.json');
  }

  // Generate pnpm-workspace.yaml (always needed for pnpm projects)
  await ensurePnpmWorkspace(cwd, isMonorepo);

  const unoConfigPath = path.join(cwd, 'uno.config.ts');
  const unoExists = await fs
    .stat(unoConfigPath)
    .then(() => true)
    .catch(() => false);

  if (!unoExists) {
    const content = generateUnoConfigContent();
    await fs.writeFile(unoConfigPath, content, 'utf-8');
    console.log('✔ Created uno.config.ts');
  } else if (!opts.silent) {
    console.log('⚠ uno.config.ts already exists. Please add presetSbean() to it manually.');
    console.log("  import { presetSbean } from '@soybeanjs/unocss-shadcn';");
    console.log('  presets: [presetSbean()]');
  }

  await ensureTypeScriptConfig(cwd, config.uiDir ?? 'src/ui');

  // Generate resolver, nuxt module, and constants from source
  await generatePackModules(cwd, config.uiDir ?? 'src/ui');

  console.log('\nDone! Run "sbean add <component>" to add components.');
}

// ---------------------------------------------------------------------------
// Project scaffolding (minimal Vue + Vite)
// ---------------------------------------------------------------------------

async function scaffoldProject(cwd: string, name?: string, uiDir = 'src/ui') {
  const projectName = name || path.basename(cwd);

  await fs.mkdir(cwd, { recursive: true });
  await fs.mkdir(path.join(cwd, uiDir), { recursive: true });

  const pkg = {
    name: projectName,
    private: true,
    version: '0.0.0',
    type: 'module',
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
      '@vitejs/plugin-vue': 'latest',
      typescript: 'latest',
      unocss: 'latest',
      'unplugin-vue-components': 'latest',
      'vite-plus': 'latest'
    }
  };

  await fs.writeFile(path.join(cwd, 'package.json'), JSON.stringify(pkg, null, 2), 'utf-8');

  const resolverPath = `./${uiDir}/resolver`;

  // Basic vite.config.ts
  await fs.writeFile(
    path.join(cwd, 'vite.config.ts'),
    [
      `import { URL, fileURLToPath } from 'node:url';`,
      `import { defineConfig } from 'vite-plus';`,
      `import Vue from '@vitejs/plugin-vue';`,
      `import UnoCSS from 'unocss/vite';`,
      `import Components from 'unplugin-vue-components/vite';`,
      `import UiResolver from '${resolverPath}';`,
      ``,
      `export default defineConfig({`,
      `  resolve: {`,
      `    tsconfigPaths: true`,
      `  },`,
      `  plugins: [`,
      `    Vue(),`,
      `    UnoCSS(),`,
      `    Components({`,
      `      dts: fileURLToPath(new URL('./src/typings/components.d.ts', import.meta.url)),`,
      `      resolvers: [UiResolver()]`,
      `    })`,
      `  ]`,
      `})`
    ].join('\n'),
    'utf-8'
  );

  // Basic App.vue
  await fs.writeFile(
    path.join(cwd, uiDir, 'App.vue'),
    [
      `<script setup lang="ts">`,
      `</script>`,
      ``,
      `<template>`,
      `  <div>Hello from ${projectName} + SBean!</div>`,
      `</template>`
    ].join('\n'),
    'utf-8'
  );

  console.log(`✔ Scaffolded Vue + Vite project: ${projectName}`);
}

async function ensurePnpmWorkspace(cwd: string, isMonorepo: boolean) {
  const workspacePath = path.join(cwd, 'pnpm-workspace.yaml');

  if (await fileExists(workspacePath)) {
    return;
  }

  const content = isMonorepo
    ? `packages:
  - 'packages/**'
shamefullyHoist: true
strictDepBuilds: false
`
    : `packages:
  - '.'
`;

  await fs.writeFile(workspacePath, content, 'utf-8');
  console.log('✔ Created pnpm-workspace.yaml');
}

async function ensureTypeScriptConfig(cwd: string, uiDir: string) {
  const tsconfigPath = path.join(cwd, 'tsconfig.json');

  const tsconfigExists = await fileExists(tsconfigPath);
  if (!tsconfigExists) {
    await fs.writeFile(tsconfigPath, generateTsConfigContent(uiDir), 'utf-8');
    console.log('✔ Created tsconfig.json');
  }
}

async function generatePackModules(cwd: string, uiDir: string) {
  const sourceRoot = findSourceRoot();
  if (!sourceRoot) return;

  const files: Record<string, string> = {
    'resolver/index.ts': `${UI_SOURCE_PATH}/resolver/index.ts`,
    'nuxt/index.ts': `${UI_SOURCE_PATH}/nuxt/index.ts`,
    'constants/components.ts': `${UI_SOURCE_PATH}/constants/components.ts`
  };

  for (const [relPath, srcPath] of Object.entries(files)) {
    const src = path.join(sourceRoot, srcPath);
    if (!existsSync(src)) continue;

    const dest = path.join(cwd, uiDir, relPath);
    if (existsSync(dest)) continue;

    let content = await fs.readFile(src, 'utf-8');
    content = content.replace(/@soybeanjs\/ui/g, '#ui');

    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, content, 'utf-8');
    console.log(`✔ Created ${uiDir}/${relPath}`);
  }
}

function findSourceRoot(): string | null {
  let dir = path.dirname(fileURLToPath(import.meta.url));
  while (true) {
    if (existsSync(path.join(dir, UI_SOURCE_PATH))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
