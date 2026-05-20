import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { camelCase } from '@soybeanjs/utils';
import ts from 'typescript';
import { runCliModule } from './_shared';

type ComponentGroup = {
  key: string;
  exports: string[];
};

const rootDir = process.cwd();
const uiSrcDir = path.join(rootDir, 'src');
const uiIndexPath = path.join(uiSrcDir, 'index.ts');
const componentsDir = path.join(uiSrcDir, 'components');
const componentsOutputPath = path.join(uiSrcDir, 'constants/components.ts');

function getStringModuleSpecifier(moduleSpecifier: ts.Expression | undefined): string | null {
  if (!moduleSpecifier || !ts.isStringLiteral(moduleSpecifier)) {
    return null;
  }

  return moduleSpecifier.text;
}

function createSourceFile(filePath: string, sourceText: string): ts.SourceFile {
  return ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

async function readSourceFile(filePath: string): Promise<ts.SourceFile> {
  const sourceText = await readFile(filePath, 'utf8');

  return createSourceFile(filePath, sourceText);
}

function getComponentDirectories(sourceFile: ts.SourceFile): string[] {
  return sourceFile.statements.flatMap(statement => {
    if (!ts.isExportDeclaration(statement) || statement.isTypeOnly) {
      return [];
    }

    const moduleSpecifier = getStringModuleSpecifier(statement.moduleSpecifier);
    const match = moduleSpecifier?.match(/^\.\/components\/([^/]+)$/);
    const componentDir = match?.[1];

    return componentDir && !componentDir.startsWith('_') ? [componentDir] : [];
  });
}

function isPascalIdentifier(name: string): boolean {
  return /^[A-Z][A-Za-z0-9]*$/.test(name) && !/^[A-Z0-9_]+$/.test(name);
}

function getComponentExportNames(sourceFile: ts.SourceFile): string[] {
  const exportNames = sourceFile.statements.flatMap(statement => {
    if (!ts.isExportDeclaration(statement) || statement.isTypeOnly || !statement.exportClause) {
      return [];
    }

    if (!ts.isNamedExports(statement.exportClause)) {
      return [];
    }

    return statement.exportClause.elements
      .map(element => element.name.text)
      .filter(name => isPascalIdentifier(name) && name.startsWith('S'));
  });

  return [...new Set(exportNames)];
}

async function collectComponentGroups(): Promise<ComponentGroup[]> {
  const uiIndex = await readSourceFile(uiIndexPath);
  const componentDirs = getComponentDirectories(uiIndex);
  const groups: ComponentGroup[] = [];

  for (const componentDir of componentDirs) {
    const indexPath = path.join(componentsDir, componentDir, 'index.ts');
    const sourceFile = await readSourceFile(indexPath);
    const exports = getComponentExportNames(sourceFile);

    if (exports.length) {
      groups.push({ key: camelCase(componentDir), exports });
    }
  }

  return groups;
}

function formatStringArray(values: string[]): string {
  if (values.length === 1) {
    return `['${values[0]}']`;
  }

  return `[\n${values.map(value => `    '${value}'`).join(',\n')}\n  ]`;
}

function generateComponentsFile(groups: ComponentGroup[]): string {
  const sorted = [...groups].sort((a, b) => a.key.localeCompare(b.key));
  const entries = sorted.map(group => `  ${group.key}: ${formatStringArray(group.exports)}`);

  return `export const components = {\n${entries.join(',\n')}\n};\n`;
}

export async function generateUiMetadata(): Promise<void> {
  const groups = await collectComponentGroups();

  await mkdir(path.dirname(componentsOutputPath), { recursive: true });
  await writeFile(componentsOutputPath, generateComponentsFile(groups), 'utf8');
}

runCliModule(import.meta.url, generateUiMetadata);
