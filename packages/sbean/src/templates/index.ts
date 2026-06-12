/**
 * Template generation and scaffolding system.
 *
 * Generates project files from templates and customizes them based on config.
 */

import fs from 'fs/promises';
import path from 'path';
import { getTemplate, listTemplates } from './templates';
import type { FrameworkType } from './templates';

/**
 * Scaffold a new project from template.
 */
export async function scaffoldFromTemplate(
  projectDir: string,
  templateName: string,
  projectName: string
): Promise<void> {
  const template = getTemplate(templateName as FrameworkType);

  if (!template) {
    throw new Error(`Unknown template: ${templateName}`);
  }

  // Create project directory
  await fs.mkdir(projectDir, { recursive: true });

  // Write template files
  for (const [filePath, content] of Object.entries(template.files)) {
    const fullPath = path.join(projectDir, filePath);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content, 'utf-8');
  }

  // Write package.json
  const packageJson = {
    name: projectName,
    version: '0.0.1',
    type: 'module',
    scripts: template.scripts,
    dependencies: template.dependencies,
    devDependencies: template.devDependencies
  };

  await fs.writeFile(path.join(projectDir, 'package.json'), JSON.stringify(packageJson, null, 2), 'utf-8');

  console.log(`✔ Scaffolded project: ${projectName}`);
  console.log(`  Template: ${template.name}`);
  console.log(`  Location: ${projectDir}`);
}

/**
 * Update existing project with template files (merge mode).
 *
 * Adds template files to an existing project without overwriting.
 */
export async function mergeTemplateFiles(projectDir: string, templateName: string, overwrite = false): Promise<void> {
  const template = getTemplate(templateName as FrameworkType);

  if (!template) {
    throw new Error(`Unknown template: ${templateName}`);
  }

  let addedCount = 0;
  let skippedCount = 0;

  for (const [filePath, content] of Object.entries(template.files)) {
    const fullPath = path.join(projectDir, filePath);
    const exists = await fileExists(fullPath);

    if (exists && !overwrite) {
      skippedCount++;
      continue;
    }

    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content, 'utf-8');
    addedCount++;
  }

  console.log(`✔ Merged template files`);
  console.log(`  Added: ${addedCount}`);
  console.log(`  Skipped: ${skippedCount}`);
}

/**
 * Get recommended config for template.
 */
export function getTemplateConfig(templateName: string): Record<string, any> {
  const configs: Record<string, Record<string, any>> = {
    'vue-vite': {
      componentPath: 'src/components',
      composablePath: 'src/composables',
      stylePath: 'src/styles'
    },
    nuxt: {
      componentPath: 'components',
      composablePath: 'composables',
      stylePath: 'assets/styles'
    }
  };

  return configs[templateName] ?? {};
}

/**
 * List all available templates with descriptions.
 */
export function listAllTemplates(): Array<{ name: string; description: string; framework: string }> {
  return listTemplates();
}

/**
 * Helper to check if file exists.
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
