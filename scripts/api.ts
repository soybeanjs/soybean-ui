import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import { Application, ReflectionKind } from 'typedoc';
import type { Comment, DeclarationReflection, ProjectReflection, Reflection, SignatureReflection } from 'typedoc';
import ts from 'typescript';

import { components as headlessComponents } from '../headless/src/constants/components';

type ApiSectionKind = 'props' | 'emits' | 'slots' | 'slotProps';

type ApiMember = {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default: string | null;
  inheritedFrom: string | null;
  sourcePath: string | null;
  referencedTypes: ApiTypeReference[];
};

type ApiCallable = {
  name: string;
  type: string;
  parameters: string | null;
  required: boolean;
  description: string;
  sourcePath: string | null;
  referencedTypes: ApiTypeReference[];
};

type ApiTypeReference = {
  name: string;
  kind: 'interface' | 'typeAlias' | 'typeLiteral' | 'unknown';
  type: string;
  resolvedType: string | null;
  description: string;
  sourcePath: string | null;
  typeParameters: string[];
  external: boolean;
  members: ApiMember[];
  callables: ApiCallable[];
};

type ApiSection = {
  kind: ApiSectionKind;
  name: string;
  type: string;
  resolvedType: string | null;
  description: string;
  sourcePath: string | null;
  typeParameters: string[];
  members: ApiMember[];
  callables: ApiCallable[];
  referencedTypes: ApiTypeReference[];
};

type ComponentSymbolApi = Partial<Record<ApiSectionKind, ApiSection>>;

type ComponentApi = {
  component: string;
  symbols: Record<string, ComponentSymbolApi>;
};

type ComponentApiIndexEntry = {
  component: string;
  file: string;
  symbols: string[];
};

type ComponentApiIndex = {
  generatedAt: string;
  schemaVersion: 3;
  components: Record<string, ComponentApiIndexEntry>;
};

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'docs/src/generated/api');
const legacyOutputDir = path.join(rootDir, 'docs/src/generated/component-api');
const typedocTsconfig = path.join(rootDir, 'tsconfig.typedoc.json');
const emptyIgnoredIndexes = Object.freeze([]) satisfies readonly number[];
const tsTypeFormatFlags =
  ts.TypeFormatFlags.NoTruncation |
  ts.TypeFormatFlags.UseSingleQuotesForStringLiteralType |
  ts.TypeFormatFlags.InTypeAlias;
const builtInTypeNames = new Set([
  'Array',
  'Awaited',
  'Boolean',
  'Date',
  'Error',
  'Exclude',
  'Extract',
  'Function',
  'Generator',
  'InstanceType',
  'Iterator',
  'Lowercase',
  'Map',
  'NonNullable',
  'Number',
  'Object',
  'Omit',
  'Parameters',
  'Partial',
  'Pick',
  'Promise',
  'PropertyKey',
  'Readonly',
  'ReadonlyArray',
  'ReadonlyMap',
  'ReadonlySet',
  'Record',
  'RegExp',
  'Required',
  'ReturnType',
  'Set',
  'String',
  'Symbol',
  'ThisType',
  'Uint8Array',
  'Uncapitalize',
  'Uppercase',
  'WeakMap',
  'WeakSet'
]);

type TsDeclaration = ts.InterfaceDeclaration | ts.TypeAliasDeclaration;

type TsTypeContext = {
  declaration: TsDeclaration;
  type: ts.Type;
  checker: ts.TypeChecker;
  memberReflections: Map<string, DeclarationReflection>;
  ignoredPropertyNames: Set<string>;
  ignoredSourcePaths: Set<string>;
};

type TsProgramContext = {
  checker: ts.TypeChecker;
  program: ts.Program;
};

const declarationCache = new Map<string, Map<string, TsDeclaration>>();

let tsProgramContext: TsProgramContext | null = null;

const reflectionSuffixes = [
  { suffix: 'SlotProps', kind: 'slotProps' },
  { suffix: 'Slots', kind: 'slots' },
  { suffix: 'Emits', kind: 'emits' },
  { suffix: 'Props', kind: 'props' }
] satisfies Array<{ suffix: string; kind: ApiSectionKind }>;
const apiSectionSuffixes = {
  props: 'Props',
  emits: 'Emits',
  slots: 'Slots',
  slotProps: 'SlotProps'
} satisfies Record<ApiSectionKind, string>;
const componentSymbolsByKey = Object.fromEntries(
  Object.entries(headlessComponents).map(([componentKey, symbols]) => [toKebabCase(componentKey), symbols])
) as Record<string, string[]>;

function toPosixPath(filePath: string): string {
  return filePath.split(path.sep).join('/');
}

function toKebabCase(value: string): string {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function toRelativePath(filePath: string): string {
  return toPosixPath(path.relative(rootDir, filePath));
}

function toSourcePath(filePath: string): string {
  const relativePath = toRelativePath(filePath);

  return relativePath.startsWith('..') ? toPosixPath(filePath) : relativePath;
}

function getCommentText(comment?: Comment): string {
  if (!comment) {
    return '';
  }

  return comment.summary
    .map(part => part.text)
    .join('')
    .trim();
}

function getTypeParameters(reflection: DeclarationReflection | SignatureReflection): string[] {
  return reflection.typeParameters?.map(typeParameter => typeParameter.toString()) ?? [];
}

function getSourcePath(reflection: Reflection): string | null {
  if (!reflection.isDeclaration()) {
    return null;
  }

  const source = reflection.sources?.[0]?.fullFileName;

  if (!source) {
    return null;
  }

  return toSourcePath(source);
}

function getComponentKeyFromPath(sourcePath: string | null): string | null {
  if (!sourcePath) {
    return null;
  }

  const match = sourcePath.match(/(?:^|\/)(?:src|headless\/src)\/components\/([^/]+)\//);

  return match?.[1] ?? null;
}

function getSectionMeta(reflectionName: string): { sectionName: string; kind: ApiSectionKind } | null {
  for (const item of reflectionSuffixes) {
    if (reflectionName.endsWith(item.suffix)) {
      return {
        sectionName: reflectionName.slice(0, -item.suffix.length),
        kind: item.kind
      };
    }
  }

  return null;
}

function getLeadingNodeText(sourceText: string, sourceFile: ts.SourceFile, node: ts.Node): string {
  return sourceText.slice(node.getFullStart(), node.getStart(sourceFile));
}

function hasVueIgnoreComment(sourceText: string, sourceFile: ts.SourceFile, node: ts.Node): boolean {
  return getLeadingNodeText(sourceText, sourceFile, node).includes('@vue-ignore');
}

function getTsProgramContext(): TsProgramContext {
  if (tsProgramContext) {
    return tsProgramContext;
  }

  const config = ts.readConfigFile(typedocTsconfig, ts.sys.readFile);

  if (config.error) {
    throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'));
  }

  const parsedConfig = ts.parseJsonConfigFileContent(config.config, ts.sys, rootDir, undefined, typedocTsconfig);
  const program = ts.createProgram({
    rootNames: parsedConfig.fileNames,
    options: parsedConfig.options
  });

  tsProgramContext = {
    checker: program.getTypeChecker(),
    program
  };

  return tsProgramContext;
}

function getDeclarationSourcePath(declaration: ts.Node | undefined): string | null {
  if (!declaration) {
    return null;
  }

  return toSourcePath(declaration.getSourceFile().fileName);
}

function isDependencySourcePath(sourcePath: string | null): boolean {
  return sourcePath !== null && sourcePath.includes('/node_modules/');
}

function getTsDeclarationsForFile(filePath: string): Map<string, TsDeclaration> {
  const cached = declarationCache.get(filePath);

  if (cached) {
    return cached;
  }

  const { program } = getTsProgramContext();
  const sourceFile = program.getSourceFile(filePath);
  const declarations = new Map<string, TsDeclaration>();

  if (!sourceFile) {
    declarationCache.set(filePath, declarations);
    return declarations;
  }

  function visit(node: ts.Node): void {
    if ((ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) && node.name) {
      declarations.set(node.name.text, node);
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  declarationCache.set(filePath, declarations);

  return declarations;
}

function getTsDeclaration(filePath: string, name: string): TsDeclaration | null {
  return getTsDeclarationsForFile(filePath).get(name) ?? null;
}

function getIgnoredInterfaceExtendsTypes(
  sourceText: string,
  sourceFile: ts.SourceFile,
  declaration: ts.InterfaceDeclaration
): readonly ts.ExpressionWithTypeArguments[] {
  const extendsClause = declaration.heritageClauses?.find(clause => clause.token === ts.SyntaxKind.ExtendsKeyword);

  if (!extendsClause) {
    return emptyIgnoredIndexes as readonly ts.ExpressionWithTypeArguments[];
  }

  const ignoredTypes = extendsClause.types.filter(typeNode => hasVueIgnoreComment(sourceText, sourceFile, typeNode));

  return ignoredTypes.length ? ignoredTypes : (emptyIgnoredIndexes as readonly ts.ExpressionWithTypeArguments[]);
}

function getIgnoredIntersectionTypes(
  sourceText: string,
  sourceFile: ts.SourceFile,
  declaration: ts.TypeAliasDeclaration
): readonly ts.TypeNode[] {
  if (!ts.isIntersectionTypeNode(declaration.type)) {
    return emptyIgnoredIndexes as readonly ts.TypeNode[];
  }

  const ignoredTypes = declaration.type.types.filter(typeNode => hasVueIgnoreComment(sourceText, sourceFile, typeNode));

  return ignoredTypes.length ? ignoredTypes : (emptyIgnoredIndexes as readonly ts.TypeNode[]);
}

function getIgnoredTypeNodes(declaration: TsDeclaration): readonly ts.TypeNode[] {
  const sourceFile = declaration.getSourceFile();
  const sourceText = sourceFile.text;

  if (ts.isInterfaceDeclaration(declaration)) {
    return getIgnoredInterfaceExtendsTypes(sourceText, sourceFile, declaration);
  }

  if (ts.isTypeAliasDeclaration(declaration)) {
    return getIgnoredIntersectionTypes(sourceText, sourceFile, declaration);
  }

  return emptyIgnoredIndexes as readonly ts.TypeNode[];
}

function getSymbolDeclaration(symbol: ts.Symbol): ts.Declaration | undefined {
  return symbol.valueDeclaration ?? symbol.declarations?.[0];
}

function getTypeDeclaration(symbol: ts.Symbol | undefined): ts.Declaration | undefined {
  return symbol?.declarations?.find(
    declaration =>
      ts.isInterfaceDeclaration(declaration) ||
      ts.isTypeAliasDeclaration(declaration) ||
      ts.isTypeLiteralNode(declaration)
  );
}

function getResolvedSymbol(symbol: ts.Symbol, checker: ts.TypeChecker): ts.Symbol {
  return symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
}

function getTypedocMemberReflections(reflection: DeclarationReflection): Map<string, DeclarationReflection> {
  const memberReflections = new Map<string, DeclarationReflection>();

  for (const child of reflection.children ?? []) {
    if (child.isDeclaration() && child.kindOf(ReflectionKind.Property)) {
      memberReflections.set(child.name, child);
    }
  }

  return memberReflections;
}

function getIgnoredPropertyMetadata(
  declaration: TsDeclaration,
  checker: ts.TypeChecker
): {
  ignoredPropertyNames: Set<string>;
  ignoredSourcePaths: Set<string>;
} {
  const ignoredPropertyNames = new Set<string>();
  const ignoredSourcePaths = new Set<string>();

  for (const ignoredTypeNode of getIgnoredTypeNodes(declaration)) {
    const ignoredType = checker.getTypeFromTypeNode(ignoredTypeNode);

    for (const symbol of checker.getApparentType(ignoredType).getProperties()) {
      ignoredPropertyNames.add(symbol.name);

      const symbolDeclaration = getSymbolDeclaration(symbol);
      const sourcePath = getDeclarationSourcePath(symbolDeclaration);

      if (sourcePath) {
        ignoredSourcePaths.add(sourcePath);
      }
    }
  }

  return {
    ignoredPropertyNames,
    ignoredSourcePaths
  };
}

function getTsTypeContext(reflection: DeclarationReflection): TsTypeContext | null {
  const sourceFilePath = reflection.sources?.[0]?.fullFileName;

  if (!sourceFilePath) {
    return null;
  }

  const { checker } = getTsProgramContext();
  const declaration = getTsDeclaration(sourceFilePath, reflection.name);

  if (!declaration) {
    return null;
  }

  const type = checker.getTypeAtLocation(declaration.name);
  const { ignoredPropertyNames, ignoredSourcePaths } = getIgnoredPropertyMetadata(declaration, checker);

  return {
    declaration,
    type,
    checker,
    memberReflections: getTypedocMemberReflections(reflection),
    ignoredPropertyNames,
    ignoredSourcePaths
  };
}

function createNestedTsTypeContext(declaration: TsDeclaration, checker: ts.TypeChecker): TsTypeContext {
  const { ignoredPropertyNames, ignoredSourcePaths } = getIgnoredPropertyMetadata(declaration, checker);

  return {
    declaration,
    type: checker.getTypeAtLocation(declaration.name),
    checker,
    memberReflections: new Map<string, DeclarationReflection>(),
    ignoredPropertyNames,
    ignoredSourcePaths
  };
}

function isOptionalSymbol(symbol: ts.Symbol, declaration: ts.Declaration | undefined): boolean {
  if (symbol.flags & ts.SymbolFlags.Optional) {
    return true;
  }

  return Boolean(declaration && 'questionToken' in declaration && declaration.questionToken);
}

function stripUndefinedFromOptionalType(typeText: string): string {
  return typeText
    .replace(/\s*\|\s*undefined/g, '')
    .replace(/undefined\s*\|\s*/g, '')
    .trim();
}

function getTsTypeText(
  type: ts.Type,
  checker: ts.TypeChecker,
  contextNode: ts.Node,
  optional: boolean = false
): string {
  const typeText = checker.typeToString(type, contextNode, tsTypeFormatFlags);

  return optional ? stripUndefinedFromOptionalType(typeText) : typeText;
}

function formatApiPropertyName(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : JSON.stringify(name);
}

function getTsDeclarationKind(declaration: ts.Declaration): ApiTypeReference['kind'] {
  if (ts.isInterfaceDeclaration(declaration)) {
    return 'interface';
  }

  if (ts.isTypeAliasDeclaration(declaration)) {
    return 'typeAlias';
  }

  if (ts.isTypeLiteralNode(declaration)) {
    return 'typeLiteral';
  }

  return 'unknown';
}

function getTsDeclarationTypeParameters(declaration: ts.Declaration): string[] {
  if (!('typeParameters' in declaration) || !declaration.typeParameters) {
    return [];
  }

  // @ts-expect-error
  return declaration.typeParameters.map(typeParameter => typeParameter.getText());
}

function getSymbolDescription(
  symbol: ts.Symbol,
  checker: ts.TypeChecker,
  fallbackReflection?: DeclarationReflection
): string {
  if (fallbackReflection) {
    return getCommentText(fallbackReflection.comment);
  }

  return ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim();
}

function getSymbolDefaultValue(symbol: ts.Symbol, fallbackReflection?: DeclarationReflection): string | null {
  if (fallbackReflection?.defaultValue) {
    return fallbackReflection.defaultValue;
  }

  const defaultTag = symbol.getJsDocTags().find(tag => tag.name === 'default' || tag.name === 'defaultValue');

  if (!defaultTag?.text?.length) {
    return null;
  }

  return (
    defaultTag.text
      .map(part => part.text)
      .join('')
      .trim() || null
  );
}

function shouldSkipPropertySymbol(symbol: ts.Symbol, context: TsTypeContext): boolean {
  const declaration = getSymbolDeclaration(symbol);
  const sourcePath = getDeclarationSourcePath(declaration);

  if (isDependencySourcePath(sourcePath)) {
    return true;
  }

  return context.ignoredPropertyNames.has(symbol.name) && context.ignoredSourcePaths.has(sourcePath ?? '');
}

function getSectionPropertySymbols(context: TsTypeContext): ts.Symbol[] {
  return context.checker
    .getApparentType(context.type)
    .getProperties()
    .filter(symbol => !shouldSkipPropertySymbol(symbol, context));
}

function getSignatureParameters(signature: ts.Signature, checker: ts.TypeChecker, contextNode: ts.Node): string | null {
  if (!signature.parameters.length) {
    return null;
  }

  return signature.parameters
    .map(parameter => {
      const declaration = getSymbolDeclaration(parameter);
      const optionalMark = isOptionalSymbol(parameter, declaration) ? '?' : '';
      const parameterType = checker.getTypeOfSymbolAtLocation(parameter, declaration ?? contextNode);

      return `${parameter.name}${optionalMark}: ${getTsTypeText(parameterType, checker, declaration ?? contextNode)}`;
    })
    .join(', ');
}

function getCallableParameters(type: ts.Type, checker: ts.TypeChecker, contextNode: ts.Node): string | null {
  const signatures = type.getCallSignatures();

  if (signatures.length) {
    return (
      signatures
        .map(signature => getSignatureParameters(signature, checker, contextNode))
        .filter(Boolean)
        .join(' | ') || null
    );
  }

  const typeText = getTsTypeText(type, checker, contextNode);

  if (typeText === '[]') {
    return null;
  }

  if (typeText.startsWith('[') && typeText.endsWith(']')) {
    return typeText.slice(1, -1) || null;
  }

  return typeText.includes('=>') ? typeText : null;
}

function isPrimitiveLikeType(type: ts.Type): boolean {
  return Boolean(
    type.flags &
    (ts.TypeFlags.Any |
      ts.TypeFlags.Unknown |
      ts.TypeFlags.Never |
      ts.TypeFlags.Void |
      ts.TypeFlags.Undefined |
      ts.TypeFlags.Null |
      ts.TypeFlags.Boolean |
      ts.TypeFlags.BooleanLiteral |
      ts.TypeFlags.Number |
      ts.TypeFlags.NumberLiteral |
      ts.TypeFlags.BigInt |
      ts.TypeFlags.BigIntLiteral |
      ts.TypeFlags.String |
      ts.TypeFlags.StringLiteral |
      ts.TypeFlags.ESSymbol |
      ts.TypeFlags.UniqueESSymbol |
      ts.TypeFlags.TypeParameter)
  );
}

function createTypeKey(typeName: string, sourcePath: string | null): string {
  return `${sourcePath ?? 'unknown'}:${typeName}`;
}

function createApiTypeReference(
  symbol: ts.Symbol,
  declaration: ts.Declaration,
  type: ts.Type,
  checker: ts.TypeChecker,
  contextNode: ts.Node,
  typeText: string = getTsTypeText(type, checker, contextNode),
  name: string = symbol.name
): ApiTypeReference {
  const sourcePath = getDeclarationSourcePath(declaration);

  return {
    name,
    kind: getTsDeclarationKind(declaration),
    type: typeText,
    resolvedType: null,
    description: getSymbolDescription(symbol, checker),
    sourcePath,
    typeParameters: getTsDeclarationTypeParameters(declaration),
    external: isDependencySourcePath(sourcePath),
    members: [],
    callables: []
  };
}

function mergeReferencedTypes(...referencedTypeGroups: ApiTypeReference[][]): ApiTypeReference[] {
  const merged = new Map<string, ApiTypeReference>();

  for (const referencedTypes of referencedTypeGroups) {
    for (const referencedType of referencedTypes) {
      merged.set(createTypeKey(referencedType.name, referencedType.sourcePath), referencedType);
    }
  }

  return Array.from(merged.values()).sort((left, right) => left.name.localeCompare(right.name));
}

function getReferenceTypeName(typeName: ts.EntityName): string {
  if (ts.isIdentifier(typeName)) {
    return typeName.text;
  }

  return typeName.right.text;
}

function collectDirectDependencyReferencedTypes(
  typeNode: ts.TypeNode,
  checker: ts.TypeChecker,
  seen: Set<string>
): ApiTypeReference[] {
  const collected = new Map<string, ApiTypeReference>();

  function addDirectReference(currentTypeNode: ts.TypeReferenceNode): void {
    const symbol = checker.getSymbolAtLocation(currentTypeNode.typeName);

    if (!symbol) {
      return;
    }

    const resolvedSymbol = getResolvedSymbol(symbol, checker);
    const declaration = getTypeDeclaration(resolvedSymbol);
    const sourcePath = getDeclarationSourcePath(declaration);
    const referenceName = getReferenceTypeName(currentTypeNode.typeName);
    const key = createTypeKey(referenceName, sourcePath);

    if (
      !declaration ||
      !isDependencySourcePath(sourcePath) ||
      seen.has(key) ||
      builtInTypeNames.has(referenceName) ||
      referenceName.startsWith('__')
    ) {
      return;
    }

    seen.add(key);
    collected.set(
      key,
      createApiTypeReference(
        resolvedSymbol,
        declaration,
        checker.getTypeAtLocation(currentTypeNode),
        checker,
        currentTypeNode,
        currentTypeNode.getText(),
        referenceName
      )
    );
  }

  function visit(node: ts.Node): void {
    if (ts.isTypeReferenceNode(node)) {
      addDirectReference(node);
    }

    ts.forEachChild(node, visit);
  }

  visit(typeNode);

  return Array.from(collected.values()).sort((left, right) => left.name.localeCompare(right.name));
}

function collectReferencedTypes(
  type: ts.Type,
  checker: ts.TypeChecker,
  contextNode: ts.Node,
  seen: Set<string>,
  depth: number = 0
): ApiTypeReference[] {
  const collected = new Map<string, ApiTypeReference>();

  function addType(currentType: ts.Type, currentDepth: number): void {
    if (isPrimitiveLikeType(currentType)) {
      return;
    }

    if (currentType.aliasTypeArguments?.length) {
      for (const typeArgument of currentType.aliasTypeArguments) {
        addType(typeArgument, currentDepth + 1);
      }
    }

    const symbol = currentType.aliasSymbol ?? currentType.getSymbol();
    const declaration = getTypeDeclaration(symbol);

    if (symbol && declaration) {
      const sourcePath = getDeclarationSourcePath(declaration);
      const external = isDependencySourcePath(sourcePath);

      if (symbol.name.startsWith('__') && external) {
        return;
      }

      if (sourcePath?.includes('/typescript/lib/')) {
        return;
      }

      if (external) {
        return;
      }

      const key = createTypeKey(symbol.name, sourcePath);

      if (!seen.has(key) && !builtInTypeNames.has(symbol.name)) {
        seen.add(key);

        const detail = createApiTypeReference(symbol, declaration, currentType, checker, contextNode);

        if (currentDepth < 1 && (ts.isInterfaceDeclaration(declaration) || ts.isTypeAliasDeclaration(declaration))) {
          const nestedContext = createNestedTsTypeContext(declaration, checker);
          const symbols = getSectionPropertySymbols(nestedContext);

          detail.resolvedType = buildResolvedType(nestedContext);
          detail.members = symbols
            .filter(
              symbolItem =>
                getCallableParameters(
                  checker.getTypeOfSymbolAtLocation(
                    symbolItem,
                    getSymbolDeclaration(symbolItem) ?? nestedContext.declaration
                  ),
                  checker,
                  getSymbolDeclaration(symbolItem) ?? nestedContext.declaration
                ) === null
            )
            .map(symbolItem => toApiMember(symbolItem, nestedContext, false, seen));
          detail.callables = symbols
            .filter(
              symbolItem =>
                getCallableParameters(
                  checker.getTypeOfSymbolAtLocation(
                    symbolItem,
                    getSymbolDeclaration(symbolItem) ?? nestedContext.declaration
                  ),
                  checker,
                  getSymbolDeclaration(symbolItem) ?? nestedContext.declaration
                ) !== null
            )
            .map(symbolItem => toApiCallable(symbolItem, nestedContext, false, seen));
        }

        collected.set(key, detail);
      }

      return;
    }

    if (currentType.isUnionOrIntersection()) {
      for (const childType of currentType.types) {
        addType(childType, currentDepth);
      }

      return;
    }

    if (currentDepth >= 2) {
      return;
    }

    for (const property of currentType.getProperties()) {
      const declarationNode = getSymbolDeclaration(property);
      const propertyType = checker.getTypeOfSymbolAtLocation(property, declarationNode ?? contextNode);

      addType(propertyType, currentDepth + 1);
    }

    for (const signature of currentType.getCallSignatures()) {
      for (const parameter of signature.parameters) {
        const parameterDeclaration = getSymbolDeclaration(parameter);
        const parameterType = checker.getTypeOfSymbolAtLocation(parameter, parameterDeclaration ?? contextNode);

        addType(parameterType, currentDepth + 1);
      }

      addType(signature.getReturnType(), currentDepth + 1);
    }
  }

  addType(type, depth);

  return Array.from(collected.values()).sort((left, right) => left.name.localeCompare(right.name));
}

function buildResolvedType(context: TsTypeContext): string | null {
  const propertySymbols = getSectionPropertySymbols(context);

  if (propertySymbols.length) {
    const parts = propertySymbols.map(symbol => {
      const declaration = getSymbolDeclaration(symbol);
      const optional = isOptionalSymbol(symbol, declaration);
      const type = context.checker.getTypeOfSymbolAtLocation(symbol, declaration ?? context.declaration);

      return `${formatApiPropertyName(symbol.name)}${optional ? '?' : ''}: ${getTsTypeText(type, context.checker, declaration ?? context.declaration, optional)}`;
    });

    return `{ ${parts.join('; ')} }`;
  }

  const signatures = context.type.getCallSignatures();

  if (signatures.length) {
    return signatures
      .map(signature => {
        const parameters = getSignatureParameters(signature, context.checker, context.declaration) ?? '';
        const returnType = getTsTypeText(signature.getReturnType(), context.checker, context.declaration);

        return `(${parameters}) => ${returnType}`;
      })
      .join(' | ');
  }

  const typeText = getTsTypeText(context.type, context.checker, context.declaration);

  return typeText === context.declaration.name.text ? null : typeText;
}

function getDeclarationTypeNode(declaration: ts.Declaration | undefined): ts.TypeNode | undefined {
  if (!declaration || !('type' in declaration)) {
    return undefined;
  }

  return declaration.type as ts.TypeNode;
}

function collectDeclarationReferencedTypes(
  declaration: ts.Declaration | undefined,
  checker: ts.TypeChecker,
  seen: Set<string>
): ApiTypeReference[] {
  const typeNode = getDeclarationTypeNode(declaration);

  if (!typeNode) {
    return [];
  }

  return mergeReferencedTypes(
    collectDirectDependencyReferencedTypes(typeNode, checker, new Set(seen)),
    collectReferencedTypes(checker.getTypeAtLocation(typeNode), checker, typeNode, new Set(seen))
  );
}

function toApiMember(
  symbol: ts.Symbol,
  context: TsTypeContext,
  includeReferencedTypes: boolean,
  seen: Set<string>
): ApiMember {
  const declaration = getSymbolDeclaration(symbol);
  const type = context.checker.getTypeOfSymbolAtLocation(symbol, declaration ?? context.declaration);
  const optional = isOptionalSymbol(symbol, declaration);
  const reflection = context.memberReflections.get(symbol.name);

  return {
    name: symbol.name,
    type: getTsTypeText(type, context.checker, declaration ?? context.declaration, optional),
    required: !optional,
    description: getSymbolDescription(symbol, context.checker, reflection),
    default: getSymbolDefaultValue(symbol, reflection),
    inheritedFrom: reflection?.inheritedFrom?.toString() ?? null,
    sourcePath: reflection ? getSourcePath(reflection) : getDeclarationSourcePath(declaration),
    referencedTypes: includeReferencedTypes
      ? mergeReferencedTypes(
          collectReferencedTypes(type, context.checker, declaration ?? context.declaration, new Set(seen)),
          collectDeclarationReferencedTypes(declaration, context.checker, seen)
        )
      : []
  };
}

function toApiCallable(
  symbol: ts.Symbol,
  context: TsTypeContext,
  includeReferencedTypes: boolean,
  seen: Set<string>
): ApiCallable {
  const declaration = getSymbolDeclaration(symbol);
  const type = context.checker.getTypeOfSymbolAtLocation(symbol, declaration ?? context.declaration);
  const reflection = context.memberReflections.get(symbol.name);

  return {
    name: symbol.name,
    type: getTsTypeText(type, context.checker, declaration ?? context.declaration),
    parameters: getCallableParameters(type, context.checker, declaration ?? context.declaration),
    required: !isOptionalSymbol(symbol, declaration),
    description: getSymbolDescription(symbol, context.checker, reflection),
    sourcePath: reflection ? getSourcePath(reflection) : getDeclarationSourcePath(declaration),
    referencedTypes: includeReferencedTypes
      ? mergeReferencedTypes(
          collectReferencedTypes(type, context.checker, declaration ?? context.declaration, new Set(seen)),
          collectDeclarationReferencedTypes(declaration, context.checker, seen)
        )
      : []
  };
}

function buildSection(kind: ApiSectionKind, reflection: DeclarationReflection): ApiSection {
  const typeContext = getTsTypeContext(reflection);
  const symbols = typeContext ? getSectionPropertySymbols(typeContext) : [];
  const seenTypeKeys = new Set<string>([createTypeKey(reflection.name, getSourcePath(reflection))]);
  const sectionType = typeContext?.type;

  return {
    kind,
    name: reflection.name,
    type: reflection.toString(),
    resolvedType: typeContext ? buildResolvedType(typeContext) : null,
    description: getCommentText(reflection.comment),
    sourcePath: getSourcePath(reflection),
    typeParameters: getTypeParameters(reflection),
    members:
      (kind === 'props' || kind === 'slotProps') && typeContext
        ? symbols.map(symbol => toApiMember(symbol, typeContext, true, seenTypeKeys))
        : [],
    callables:
      (kind === 'emits' || kind === 'slots') && typeContext
        ? symbols.map(symbol => toApiCallable(symbol, typeContext, true, seenTypeKeys))
        : [],
    referencedTypes:
      typeContext && sectionType
        ? collectReferencedTypes(sectionType, typeContext.checker, typeContext.declaration, new Set(seenTypeKeys))
        : []
  };
}

function getDeclarationCommentText(declaration: TsDeclaration, checker: ts.TypeChecker): string {
  const symbol = checker.getSymbolAtLocation(declaration.name);

  if (!symbol) {
    return '';
  }

  return getSymbolDescription(symbol, checker);
}

function getDeclarationDisplayText(declaration: TsDeclaration): string {
  const declarationKind = ts.isInterfaceDeclaration(declaration) ? 'Interface' : 'TypeAlias';
  const typeParameters = declaration.typeParameters?.length
    ? `<${declaration.typeParameters.map(typeParameter => typeParameter.name.text).join(', ')}>`
    : '';

  return `${declarationKind} ${declaration.name.text}${typeParameters}`;
}

function buildSectionFromDeclaration(kind: ApiSectionKind, declaration: TsDeclaration): ApiSection {
  const { checker } = getTsProgramContext();
  const typeContext = createNestedTsTypeContext(declaration, checker);
  const symbols = getSectionPropertySymbols(typeContext);
  const sourcePath = getDeclarationSourcePath(declaration);
  const seenTypeKeys = new Set<string>([createTypeKey(declaration.name.text, sourcePath)]);

  return {
    kind,
    name: declaration.name.text,
    type: getDeclarationDisplayText(declaration),
    resolvedType: buildResolvedType(typeContext),
    description: getDeclarationCommentText(declaration, checker),
    sourcePath,
    typeParameters: getTsDeclarationTypeParameters(declaration),
    members:
      kind === 'props' || kind === 'slotProps'
        ? symbols.map(symbol => toApiMember(symbol, typeContext, true, seenTypeKeys))
        : [],
    callables:
      kind === 'emits' || kind === 'slots'
        ? symbols.map(symbol => toApiCallable(symbol, typeContext, true, seenTypeKeys))
        : [],
    referencedTypes: collectReferencedTypes(typeContext.type, checker, declaration, new Set(seenTypeKeys))
  };
}

function sortEntries<T>(record: Record<string, T>): Record<string, T> {
  return Object.fromEntries(Object.entries(record).sort(([left], [right]) => left.localeCompare(right)));
}

function getComponentTypeFilePaths(componentKey: string): string[] {
  return [
    path.join(rootDir, 'src/components', componentKey, 'types.ts'),
    path.join(rootDir, 'headless/src/components', componentKey, 'types.ts')
  ];
}

function getComponentSymbolDeclaration(
  componentKey: string,
  symbolName: string,
  kind: ApiSectionKind
): TsDeclaration | null {
  const declarationName = `${symbolName}${apiSectionSuffixes[kind]}`;

  for (const filePath of getComponentTypeFilePaths(componentKey)) {
    const declaration = getTsDeclaration(filePath, declarationName);

    if (declaration) {
      return declaration;
    }
  }

  return null;
}

function completeSymbolApi(
  componentKey: string,
  symbolName: string,
  symbolApi: ComponentSymbolApi
): ComponentSymbolApi {
  const completedSymbolApi: ComponentSymbolApi = { ...symbolApi };

  for (const kind of ['props', 'emits', 'slots', 'slotProps'] as ApiSectionKind[]) {
    if (completedSymbolApi[kind]) {
      continue;
    }

    const declaration = getComponentSymbolDeclaration(componentKey, symbolName, kind);

    if (!declaration) {
      continue;
    }

    completedSymbolApi[kind] = buildSectionFromDeclaration(kind, declaration);
  }

  return completedSymbolApi;
}

function completeComponentSymbols(componentKey: string, componentApi: ComponentApi): ComponentApi {
  const symbolNames = new Set([...Object.keys(componentApi.symbols), ...(componentSymbolsByKey[componentKey] ?? [])]);

  return {
    ...componentApi,
    symbols: sortEntries(
      Object.fromEntries(
        Array.from(symbolNames).map(symbolName => [
          symbolName,
          completeSymbolApi(componentKey, symbolName, componentApi.symbols[symbolName] ?? {})
        ])
      )
    )
  };
}

function collectComponentApis(project: ProjectReflection): Record<string, ComponentApi> {
  const reflections = project
    .getReflectionsByKind(ReflectionKind.Interface | ReflectionKind.TypeAlias)
    .filter(reflection => reflection.isDeclaration());

  const components: Record<string, ComponentApi> = {};

  for (const reflection of reflections) {
    const sectionMeta = getSectionMeta(reflection.name);

    if (!sectionMeta) {
      continue;
    }

    const sourcePath = getSourcePath(reflection);
    const componentKey = getComponentKeyFromPath(sourcePath);

    if (!componentKey) {
      continue;
    }

    components[componentKey] ??= {
      component: componentKey,
      symbols: {}
    };

    components[componentKey].symbols[sectionMeta.sectionName] ??= {};
    components[componentKey].symbols[sectionMeta.sectionName][sectionMeta.kind] = buildSection(
      sectionMeta.kind,
      reflection
    );
  }

  return Object.fromEntries(
    Object.entries(components)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([componentKey, componentApi]) => [componentKey, completeComponentSymbols(componentKey, componentApi)])
  );
}

function createComponentApiIndex(generatedAt: string, components: Record<string, ComponentApi>): ComponentApiIndex {
  return {
    generatedAt,
    schemaVersion: 3,
    components: Object.fromEntries(
      Object.entries(components).map(([componentKey, componentApi]) => [
        componentKey,
        {
          component: componentApi.component,
          file: `${componentKey}.json`,
          symbols: Object.keys(componentApi.symbols)
        }
      ])
    )
  };
}

async function writeOutputs(generatedAt: string, components: Record<string, ComponentApi>): Promise<void> {
  await rm(legacyOutputDir, { force: true, recursive: true });
  await rm(outputDir, { force: true, recursive: true });
  await mkdir(outputDir, { recursive: true });

  const index = createComponentApiIndex(generatedAt, components);

  await writeFile(path.join(outputDir, 'index.json'), `${JSON.stringify(index, null, 2)}\n`, 'utf8');

  await Promise.all(
    Object.entries(components).map(async ([componentKey, componentApi]) => {
      const filePath = path.join(outputDir, `${componentKey}.json`);
      await writeFile(filePath, `${JSON.stringify(componentApi, null, 2)}\n`, 'utf8');
    })
  );
}

async function generateComponentApi(): Promise<void> {
  const app = await Application.bootstrap({
    entryPoints: [path.join(rootDir, 'src/index.ts')],
    tsconfig: typedocTsconfig,
    logLevel: 'Warn'
  });

  const project = await app.convert();

  if (!project) {
    throw new Error('TypeDoc failed to create a project reflection.');
  }

  const components = collectComponentApis(project);
  const generatedAt = new Date().toISOString();

  await writeOutputs(generatedAt, components);
}

generateComponentApi().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
