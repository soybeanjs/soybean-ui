import path from 'path';
import * as v from 'valibot';
import { Command } from 'commander';
import { listAllTemplates, scaffoldFromTemplate, getTemplate } from '../templates';
import type { FrameworkType } from '../templates';

export const templateOptionsSchema = v.object({
  name: v.optional(v.string()),
  cwd: v.string(),
  output: v.optional(v.string()),
  list: v.boolean()
});

export const template = new Command()
  .name('template')
  .description('list or scaffold project templates')
  .argument('[name]', 'template name to scaffold (vue-vite, nuxt)')
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
        showTemplateDetails(options.name);
      }

      return;
    }

    // Scaffold mode
    const templateName = name ?? 'vue-vite';
    const projectName: string = options.output ?? templateName;

    console.log();
    console.log(`  Scaffolding project: ${projectName}`);
    console.log(`  Template: ${templateName}`);

    const outputDir = path.join(options.cwd, projectName);

    try {
      await scaffoldFromTemplate(outputDir, templateName, { projectName });

      console.log();
      console.log(`  ✔ Project scaffolded at: ${outputDir}`);
      console.log();

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
 * Show detailed information about a specific template (read from template definitions).
 */
function showTemplateDetails(name: string): void {
  const tpl = getTemplate(name as FrameworkType);
  if (!tpl) return;

  console.log();
  console.log(`  ${tpl.description}`);
  console.log(`  Dependencies: ${Object.keys(tpl.dependencies).join(', ') || 'none'}`);
  console.log(`  Dev Dependencies: ${Object.keys(tpl.devDependencies).join(', ') || 'none'}`);
  console.log(`  Scripts: ${Object.keys(tpl.scripts).join(', ')}`);
  console.log();
}
