import path from 'path';
import * as v from 'valibot';
import { Command } from 'commander';
import { listAllTemplates, scaffoldFromTemplate, getTemplateConfig } from '../templates';

export const templateOptionsSchema = v.object({
  name: v.optional(v.string()),
  cwd: v.string(),
  output: v.optional(v.string()),
  list: v.boolean()
});

export const template = new Command()
  .name('template')
  .description('list or scaffold project templates')
  .argument('[name]', 'template name to scaffold (vue-vite, nuxt, vue-bare, library)')
  .option('-l, --list', 'list available templates', false)
  .option('-o, --output <dir>', 'output directory for scaffolded project')
  .option('-c, --cwd <cwd>', 'the working directory. defaults to the current directory.', process.cwd())
  .action(async (name: string | undefined, opts) => {
    const options = v.parse(templateOptionsSchema, {
      name,
      cwd: path.resolve(opts.cwd),
      output: opts.output,
      list: opts.list
    });

    // List mode
    if (options.list || !options.name) {
      const templates = listAllTemplates();

      console.log();
      console.log('  Available project templates:');
      console.log();
      console.log('  Name          Framework         Description');
      console.log('  ────          ─────────         ───────────');

      for (const tpl of templates) {
        console.log(`  ${tpl.name.padEnd(14)} ${tpl.framework.padEnd(17)} ${tpl.description}`);
      }

      console.log();
      console.log('  Usage: sbean template <name> [--output <dir>]');
      console.log();

      if (options.name) {
        const detailName: string = options.name;
        showTemplateDetails(detailName);
      }

      return;
    }

    // Scaffold mode
    // name is guaranteed non-null here (handled by list mode above)
    const templateName = name ?? 'vue-vite';
    const projectName: string = options.output ?? templateName;

    console.log();
    console.log(`  Scaffolding project: ${projectName}`);
    console.log(`  Template: ${templateName}`);

    const outputDir = path.join(options.cwd, projectName);

    try {
      await scaffoldFromTemplate(outputDir, templateName, projectName);

      console.log();
      console.log(`  ✔ Project scaffolded at: ${outputDir}`);
      console.log();

      // Show recommended config
      const config = getTemplateConfig(templateName);
      if (Object.keys(config).length > 0) {
        console.log('  Recommended sbean.json config:');
        for (const [key, value] of Object.entries(config)) {
          console.log(`    "${key}": "${value}"`);
        }
        console.log();
      }

      // Show next steps
      console.log('  Next steps:');
      console.log(`    cd ${projectName}`);
      console.log('    pnpm install');
      console.log('    sbean init');
      console.log('    sbean add <component>');
      console.log();
    } catch (error) {
      console.error(`  ✖ Failed to scaffold project: ${(error as Error).message}`);
      process.exit(1);
    }
  });

/**
 * Show detailed information about a specific template.
 */
function showTemplateDetails(name: string): void {
  const details: Record<string, { description: string; deps: string[]; devDeps: string[]; scripts: string[] }> = {
    'vue-vite': {
      description: 'Vue 3 + Vite + UnoCSS — copy-paste components',
      deps: ['vue', '@soybeanjs/headless', '@soybeanjs/cva', '@soybeanjs/unocss-shadcn'],
      devDeps: ['@vitejs/plugin-vue', 'typescript', 'unocss', 'vite', 'vue-tsc'],
      scripts: ['dev', 'build', 'preview']
    },
    nuxt: {
      description: 'Nuxt 3 + UnoCSS — copy-paste components',
      deps: ['nuxt', 'vue', '@soybeanjs/headless', '@soybeanjs/cva', '@soybeanjs/unocss-shadcn'],
      devDeps: ['unocss', '@unocss/nuxt'],
      scripts: ['dev', 'build', 'generate', 'preview']
    }
  };

  const detail = details[name];
  if (!detail) return;

  console.log();
  console.log(`  ${detail.description}`);
  console.log(`  Dependencies: ${detail.deps.join(', ') || 'none'}`);
  console.log(`  Dev Dependencies: ${detail.devDeps.join(', ') || 'none'}`);
  console.log(`  Scripts: ${detail.scripts.join(', ')}`);
  console.log();
}
