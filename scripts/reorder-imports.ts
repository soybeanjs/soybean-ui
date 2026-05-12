import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

type CliOptions = {
  checkOnly: boolean;
  targets: string[];
};

const rootDir = process.cwd();
const defaultTargets = ['.'];
const ignoredDirectories = new Set(['.git', '.output', '.turbo', '.vercel', 'coverage', 'dist', 'node_modules']);
const importRegex = /import\s+type\s*\{([\s\S]*?)\}\s*from\s*(['"][^'"]+['"])(;?)/g;

function parseCliOptions(): CliOptions {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');
  const targets = args.filter(arg => arg !== '--check');

  return {
    checkOnly,
    targets: targets.length ? targets : defaultTargets
  };
}

async function safeStat(targetPath: string) {
  try {
    return await stat(targetPath);
  } catch {
    return null;
  }
}

async function collectVueFiles(targetPath: string): Promise<string[]> {
  const targetStat = await safeStat(targetPath);

  if (!targetStat) {
    return [];
  }

  if (targetStat.isFile()) {
    return path.extname(targetPath) === '.vue' ? [targetPath] : [];
  }

  if (!targetStat.isDirectory()) {
    return [];
  }

  const entries = await readdir(targetPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async entry => {
      if (ignoredDirectories.has(entry.name)) {
        return [];
      }

      const entryPath = path.join(targetPath, entry.name);

      if (entry.isDirectory()) {
        return collectVueFiles(entryPath);
      }

      return entry.isFile() && path.extname(entry.name) === '.vue' ? [entryPath] : [];
    })
  );

  return files.flat();
}

async function resolveVueFiles(targets: string[]): Promise<string[]> {
  const files = await Promise.all(targets.map(async target => collectVueFiles(path.resolve(rootDir, target))));

  return [...new Set(files.flat())].sort();
}

function getImportedName(specifier: string): string {
  return specifier.split(/\s+as\s+/i)[0]?.trim() ?? specifier.trim();
}

function isPropsSpecifier(specifier: string): boolean {
  return getImportedName(specifier).endsWith('Props');
}

function isEmitsSpecifier(specifier: string): boolean {
  return getImportedName(specifier).endsWith('Emits');
}

function shouldReorderSpecifiers(specifiers: string[]): boolean {
  const hasProps = specifiers.some(isPropsSpecifier);
  const hasEmits = specifiers.some(isEmitsSpecifier);

  if (!hasProps || !hasEmits) {
    return false;
  }

  return specifiers.some((specifier, index) => {
    if (!isEmitsSpecifier(specifier)) {
      return false;
    }

    return specifiers.slice(index + 1).some(isPropsSpecifier);
  });
}

function formatSpecifierBlock(sourceBlock: string, orderedSpecifiers: string[]): string {
  const leadingWhitespace = sourceBlock.match(/^\s*/)?.[0] ?? '';
  const trailingWhitespace = sourceBlock.match(/\s*$/)?.[0] ?? '';

  if (!sourceBlock.includes('\n') && !sourceBlock.includes('\r')) {
    return `${leadingWhitespace || ' '}${orderedSpecifiers.join(', ')}${trailingWhitespace || ' '}`;
  }

  const lineBreak = sourceBlock.includes('\r\n') ? '\r\n' : '\n';
  const indent = leadingWhitespace.split(/\r?\n/).at(-1) ?? '  ';
  const hasTrailingComma = /,\s*$/.test(sourceBlock.trim());

  return `${leadingWhitespace || `${lineBreak}${indent}`}${orderedSpecifiers.join(`,${lineBreak}${indent}`)}${hasTrailingComma ? ',' : ''}${trailingWhitespace || lineBreak}`;
}

function reorderSpecifierBlock(sourceBlock: string): string | null {
  const specifiers = sourceBlock
    .split(',')
    .map(specifier => specifier.trim())
    .filter(Boolean);

  if (!shouldReorderSpecifiers(specifiers)) {
    return null;
  }

  const orderedSpecifiers = [
    ...specifiers.filter(isPropsSpecifier),
    ...specifiers.filter(specifier => !isPropsSpecifier(specifier))
  ];

  return formatSpecifierBlock(sourceBlock, orderedSpecifiers);
}

function reorderImports(sourceText: string): { changed: boolean; content: string } {
  let changed = false;

  const content = sourceText.replace(
    importRegex,
    (fullMatch, specifierBlock: string, moduleSpecifier: string, semicolon: string) => {
      const reorderedBlock = reorderSpecifierBlock(specifierBlock);

      if (!reorderedBlock) {
        return fullMatch;
      }

      changed = true;

      return `import type {${reorderedBlock}} from ${moduleSpecifier}${semicolon}`;
    }
  );

  return {
    changed,
    content
  };
}

async function main(): Promise<void> {
  const { checkOnly, targets } = parseCliOptions();
  const files = await resolveVueFiles(targets);
  let changedFileCount = 0;

  for (const filePath of files) {
    const sourceText = await readFile(filePath, 'utf8');
    const result = reorderImports(sourceText);

    if (!result.changed) {
      continue;
    }

    changedFileCount += 1;
    console.log(`${checkOnly ? 'would update' : 'updated'} ${path.relative(rootDir, filePath)}`);

    if (!checkOnly) {
      await writeFile(filePath, result.content, 'utf8');
    }
  }

  console.log(
    `${checkOnly ? 'checked' : 'processed'} ${files.length} vue files, ${checkOnly ? `${changedFileCount} would be updated` : `${changedFileCount} updated`}`
  );

  if (checkOnly && changedFileCount > 0) {
    process.exitCode = 1;
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
