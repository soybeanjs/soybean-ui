import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import ts from 'typescript';

type ComponentGroup = {
  key: string;
  name: string;
  exports: string[];
};

const rootDir = process.cwd();
const headlessSrcDir = path.join(rootDir, 'headless/src');
const headlessIndexPath = path.join(headlessSrcDir, 'index.ts');
const componentsDir = path.join(headlessSrcDir, 'components');
const componentsOutputPath = path.join(headlessSrcDir, 'constants/components.ts');
const namespacedOutputPath = path.join(headlessSrcDir, 'namespaced/index.ts');

function toPascalCase(value: string): string {
  return value
    .split('-')
    .filter(Boolean)
    .map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');
}

function toCamelCase(value: string): string {
  const pascalName = toPascalCase(value);

  return `${pascalName.charAt(0).toLowerCase()}${pascalName.slice(1)}`;
}

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

function isComponentExportName(exportName: string, groupName: string): boolean {
  return isPascalIdentifier(exportName) && (exportName === groupName || exportName.startsWith(groupName));
}

function getComponentExportNames(sourceFile: ts.SourceFile, groupName: string): string[] {
  const exportNames = sourceFile.statements.flatMap(statement => {
    if (!ts.isExportDeclaration(statement) || statement.isTypeOnly || !statement.exportClause) {
      return [];
    }

    if (!ts.isNamedExports(statement.exportClause)) {
      return [];
    }

    return statement.exportClause.elements
      .map(element => element.name.text)
      .filter(exportName => isComponentExportName(exportName, groupName));
  });

  return [...new Set(exportNames)];
}

async function collectComponentGroups(): Promise<ComponentGroup[]> {
  const headlessIndex = await readSourceFile(headlessIndexPath);
  const componentDirs = getComponentDirectories(headlessIndex);
  const groups: ComponentGroup[] = [];

  for (const componentDir of componentDirs) {
    const groupName = toPascalCase(componentDir);
    const indexPath = path.join(componentsDir, componentDir, 'index.ts');
    const sourceFile = await readSourceFile(indexPath);
    const exports = getComponentExportNames(sourceFile, groupName);

    if (exports.length) {
      groups.push({
        key: toCamelCase(componentDir),
        name: groupName,
        exports
      });
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
  const entries = groups.map(group => `  ${group.key}: ${formatStringArray(group.exports)}`);

  return `export const components = {\n${entries.join(',\n')}\n};\n`;
}

function getNamespaceMemberName(groupName: string, componentName: string): string {
  if (componentName === groupName) {
    return 'Root';
  }

  const suffix = componentName.startsWith(groupName) ? componentName.slice(groupName.length) : '';

  return suffix && /^[A-Z]/.test(suffix) ? suffix : componentName;
}

function hasNamespaceCollision(group: ComponentGroup): boolean {
  return group.exports.includes(group.name);
}

function generateNamespaceObject(group: ComponentGroup): string {
  const members = group.exports.map(componentName => {
    const memberName = getNamespaceMemberName(group.name, componentName);

    return `  ${memberName}: ${componentName}`;
  });
  const types = group.exports.map(componentName => {
    const memberName = getNamespaceMemberName(group.name, componentName);

    return `  ${memberName}: typeof ${componentName};`;
  });

  return `export const ${group.name} = {\n${members.join(',\n')}\n} as {\n${types.join('\n')}\n};`;
}

function generateNamespacedFile(groups: ComponentGroup[]): string {
  const componentNames = [...new Set(groups.flatMap(group => group.exports))].sort((left, right) =>
    left.localeCompare(right)
  );
  const importBlock = `import {\n${componentNames.map(componentName => `  ${componentName}`).join(',\n')}\n} from '../index';`;
  const exports = groups.map(group => {
    if (group.exports.length === 1 || hasNamespaceCollision(group)) {
      return `export { ${group.exports.join(', ')} };`;
    }

    return generateNamespaceObject(group);
  });

  return `${importBlock}\n\n${exports.join('\n\n')}\n`;
}

async function generateHeadlessFiles(): Promise<void> {
  const groups = await collectComponentGroups();

  await mkdir(path.dirname(componentsOutputPath), { recursive: true });
  await mkdir(path.dirname(namespacedOutputPath), { recursive: true });
  await writeFile(componentsOutputPath, generateComponentsFile(groups), 'utf8');
  await writeFile(namespacedOutputPath, generateNamespacedFile(groups), 'utf8');
}

generateHeadlessFiles().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
