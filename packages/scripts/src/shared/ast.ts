import { readFile } from 'node:fs/promises';
import ts from 'typescript';

export function createSourceFile(filePath: string, sourceText: string): ts.SourceFile {
  return ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
}

export async function readSourceFile(filePath: string): Promise<ts.SourceFile> {
  const sourceText = await readFile(filePath, 'utf8');

  return createSourceFile(filePath, sourceText);
}

/** Module specifier of an `export ... from '...'` declaration, ignoring type-only re-exports. */
export function getExportModuleSpecifier(statement: ts.Statement): string | null {
  if (!ts.isExportDeclaration(statement) || statement.isTypeOnly || !statement.moduleSpecifier) {
    return null;
  }

  const { moduleSpecifier } = statement;

  return ts.isStringLiteral(moduleSpecifier) ? moduleSpecifier.text : null;
}

/** Names re-exported through named export clauses (`export { A, B } from ...`). */
export function getNamedExportNames(sourceFile: ts.SourceFile): string[] {
  const names = sourceFile.statements.flatMap(statement => {
    if (!ts.isExportDeclaration(statement) || statement.isTypeOnly || !statement.exportClause) {
      return [];
    }

    return ts.isNamedExports(statement.exportClause)
      ? statement.exportClause.elements.map(element => element.name.text)
      : [];
  });

  return [...new Set(names)];
}
