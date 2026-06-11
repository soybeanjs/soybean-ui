import fs from 'fs/promises';
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
  PRESET_FONTS
} from '../registry/config';
import { createDefaultConfig, getConfig, writeConfig } from '../utils/get-config';
import { getProjectInfo } from '../utils/get-project-info';
import { decodePreset, isPresetCode } from '../registry/preset';

// ---------------------------------------------------------------------------
// Options schema
// ---------------------------------------------------------------------------

export const initOptionsSchema = v.object({
  cwd: v.string(),
  style: v.optional(v.picklist(PRESET_STYLES)),
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

function generateTsConfigContent(): string {
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
    '      "@/*": ["./src/*"]',
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
    '  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue", "vite.config.ts", "uno.config.ts"],',
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
  .option('--style <style>', `style preset: ${PRESET_STYLES.join('/')}`)
  .option('-b, --base <base>', `base color: ${PRESET_BASE_COLORS.join('/')}`)
  .option('--primary <primary>', `primary color: ${PRESET_PRIMARY_COLORS.join('/')}`)
  .option('--radius <radius>', `border radius: ${PRESET_RADII.join('/')}`)
  .option(
    '--feedback <feedback>',
    `feedback colors: classic/vivid/subtle/warm/cool/nature/modern/vibrant/professional/soft/bold/calm/candy/deep/light`
  )
  .option('-p, --preset <code>', 'preset code (base62 encoded config)')
  .option('--icon-library <library>', `icon library: ${PRESET_ICON_LIBRARIES.join('/')}`)
  .option('--font-sans <font>', `sans-serif font: ${PRESET_FONTS.join('/')}`)
  .option('--font-heading <font>', `heading font: inherit/${PRESET_FONTS.join('/')}`)
  .option('-y, --yes', 'skip confirmation prompt', false)
  .option('-d, --defaults', 'use default configuration', false)
  .option('-f, --force', 'force overwrite of existing configuration', false)
  .option('-c, --cwd <cwd>', 'the working directory', process.cwd())
  .option('-n, --name <name>', 'project name (for new projects)')
  .option('-s, --silent', 'mute output', false)
  .action(async opts => {
    await runInit(opts);
  });

type InitActionOptions = {
  cwd: string;
  style?: string;
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

  if (!projectInfo) {
    console.log('No package.json found. Creating a new Vue + Vite project...');
    await scaffoldProject(cwd, opts.name);
  }

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
  const radius = opts.radius || 'md';
  const iconLibrary = opts.iconLibrary || 'lucide';

  // Prompt if not using defaults/yes
  if (!opts.defaults && !opts.yes) {
    const answers = await prompts([
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
        name: 'base',
        message: 'Which base color?',
        choices: PRESET_BASE_COLORS.map(b => ({
          title: b === 'zinc' ? `${b} (recommended)` : b,
          value: b
        })),
        initial: 0
      },
      {
        type: 'select',
        name: 'primary',
        message: 'Which primary color?',
        choices: PRESET_PRIMARY_COLORS.map(p => ({
          title: p === 'indigo' ? `${p} (recommended)` : p,
          value: p
        })),
        initial: 0
      },
      {
        type: 'select',
        name: 'feedback',
        message: 'Which feedback color preset?',
        choices: [
          { title: 'classic (recommended)', value: 'classic' },
          { title: 'vivid — high saturation, youthful', value: 'vivid' },
          { title: 'subtle — low contrast, elegant', value: 'subtle' },
          { title: 'warm — friendly and cozy', value: 'warm' },
          { title: 'cool — tech and professional', value: 'cool' },
          { title: 'nature — eco and health', value: 'nature' },
          { title: 'modern — minimal, SaaS', value: 'modern' },
          { title: 'vibrant — sports and gaming', value: 'vibrant' },
          { title: 'professional — enterprise, B2B', value: 'professional' },
          { title: 'soft — design tools, creative', value: 'soft' },
          { title: 'bold — high contrast, striking', value: 'bold' },
          { title: 'calm — low saturation, soothing', value: 'calm' },
          { title: 'candy — playful, children', value: 'candy' },
          { title: 'deep — dark and mysterious', value: 'deep' },
          { title: 'light — clean and refreshing', value: 'light' }
        ],
        initial: 0
      },
      {
        type: 'select',
        name: 'fontSans',
        message: 'Which sans-serif font? (skip for system default)',
        choices: [
          { title: 'none (system default)', value: '' },
          ...PRESET_FONTS.map(f => ({
            title: f === 'inter' ? `${f} (recommended)` : f,
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
          { title: 'inherit', value: 'inherit' },
          ...PRESET_FONTS.map(f => ({
            title: f === 'inter' ? `${f} (recommended)` : f,
            value: f
          }))
        ],
        initial: 0
      }
    ]);

    if (answers.style) opts.style = answers.style as (typeof PRESET_STYLES)[number];
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
    style: (opts.style as (typeof PRESET_STYLES)[number]) || style,
    iconLibrary: (opts.iconLibrary as (typeof PRESET_ICON_LIBRARIES)[number]) || iconLibrary,
    uno: {
      base: (opts.base || base) as (typeof PRESET_BASE_COLORS)[number],
      primary: (opts.primary || primary) as (typeof PRESET_PRIMARY_COLORS)[number],
      feedback: (opts.feedback || feedback) as (typeof PRESET_FEEDBACK_COLORS)[number],
      radius: (opts.radius || radius) as (typeof PRESET_RADII)[number]
    },
    font: fontOverrides
  });
  await writeConfig(cwd, config);

  if (!opts.silent) {
    console.log('✔ Created sbean.json');
  }

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

  await ensureTypeScriptConfig(cwd);

  console.log('\nDone! Run "sbean add <component>" to add components.');
}

// ---------------------------------------------------------------------------
// Project scaffolding (minimal Vue + Vite)
// ---------------------------------------------------------------------------

async function scaffoldProject(cwd: string, name?: string) {
  const projectName = name || path.basename(cwd);

  await fs.mkdir(cwd, { recursive: true });
  await fs.mkdir(path.join(cwd, 'src'), { recursive: true });

  const pkg = {
    name: projectName,
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview'
    },
    dependencies: {
      vue: '^3.5.0'
    },
    devDependencies: {
      '@vitejs/plugin-vue': '^5.0.0',
      typescript: '^5.8.0',
      vite: '^6.0.0'
    }
  };

  await fs.writeFile(path.join(cwd, 'package.json'), JSON.stringify(pkg, null, 2), 'utf-8');

  // Basic vite.config.ts
  await fs.writeFile(
    path.join(cwd, 'vite.config.ts'),
    [
      `import { defineConfig } from 'vite'`,
      `import vue from '@vitejs/plugin-vue'`,
      ``,
      `export default defineConfig({`,
      `  plugins: [vue()],`,
      `  resolve: {`,
      `    alias: {`,
      `      '@': '/src',`,
      `    },`,
      `  },`,
      `})`
    ].join('\n'),
    'utf-8'
  );

  // Basic App.vue
  await fs.writeFile(
    path.join(cwd, 'src', 'App.vue'),
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

async function ensureTypeScriptConfig(cwd: string) {
  const tsconfigPath = path.join(cwd, 'tsconfig.json');
  const viteEnvPath = path.join(cwd, 'src', 'vite-env.d.ts');

  const tsconfigExists = await fileExists(tsconfigPath);
  if (!tsconfigExists) {
    await fs.writeFile(tsconfigPath, generateTsConfigContent(), 'utf-8');
    console.log('✔ Created tsconfig.json');
  }

  const viteEnvExists = await fileExists(viteEnvPath);
  if (!viteEnvExists) {
    await fs.writeFile(viteEnvPath, '/// <reference types="vite/client" />\n', 'utf-8');
    console.log('✔ Created src/vite-env.d.ts');
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
