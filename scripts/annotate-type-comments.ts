import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

import ts from 'typescript';

type DeclarationCategory =
  | 'props'
  | 'emits'
  | 'slots'
  | 'slotProps'
  | 'context'
  | 'contextParams'
  | 'ui'
  | 'uiSlot'
  | 'extraUiSlot'
  | 'extendedUi'
  | 'state'
  | 'type'
  | 'modelValue'
  | 'optionData'
  | 'other';

type Insertion = {
  position: number;
  text: string;
};

const rootDir = process.cwd();
const defaultTargets = ['headless/src/components', 'src/components'];
const supportedExtensions = new Set(['.ts']);
const declarationSuffixes = [
  'ContextParams',
  'BaseOptionData',
  'OptionSlotProps',
  'OptionData',
  'ExtendedUi',
  'ExtraUiSlot',
  'ModelValue',
  'SlotProps',
  'UiSlot',
  'Context',
  'Props',
  'Emits',
  'Slots',
  'State',
  'Type',
  'Ui'
] as const;
const booleanPrefixes = ['is', 'has', 'show', 'allow', 'enable', 'disable', 'can', 'should'] as const;
const commonBooleanNames = new Set([
  'active',
  'checked',
  'closable',
  'collapsed',
  'collapsible',
  'disabled',
  'hidden',
  'loading',
  'multiple',
  'open',
  'readonly',
  'required',
  'selected',
  'visible'
]);
const genericMemberDescriptions = new Map<string, string>([
  ['actionMenuProps', 'Properties forwarded to the action menu component.'],
  ['actions', 'Action items rendered by the component.'],
  ['activePaths', 'Active paths tracked by the component context.'],
  ['as', 'Rendered element tag.'],
  ['autoLoading', 'Whether loading state is handled automatically.'],
  ['badge', 'Badge content rendered by the component.'],
  ['badgeProps', 'Properties forwarded to the badge component.'],
  ['buttonProps', 'Properties forwarded to the button element.'],
  ['children', 'Nested child items.'],
  ['class', 'Additional class names applied to the root element.'],
  ['closeProps', 'Properties forwarded to the close element.'],
  ['collapsedWidth', 'Width of the collapsed state.'],
  ['collapsibleProps', 'Properties forwarded to the collapsible element.'],
  ['color', 'Theme color of the component.'],
  ['contentProps', 'Properties forwarded to the content element.'],
  ['description', 'Description text rendered by the component.'],
  ['descriptionProps', 'Properties forwarded to the description element.'],
  ['dir', 'Reading direction of the component.'],
  ['dropdownMenuProps', 'Properties forwarded to the dropdown menu component.'],
  ['fitContent', 'Whether the component should fit its content width.'],
  ['groupLabelProps', 'Properties forwarded to the group label element.'],
  ['groupProps', 'Properties forwarded to the group element.'],
  ['groupRootProps', 'Properties forwarded to the group root element.'],
  ['headerProps', 'Properties forwarded to the header element.'],
  ['icon', 'Icon rendered by the component.'],
  ['iconClass', 'Additional class names applied to the icon element.'],
  ['iconProps', 'Properties forwarded to the icon component.'],
  ['indent', 'Indent width applied to nested items.'],
  ['index', 'Index of the current item.'],
  ['item', 'Current item data.'],
  ['itemProps', 'Properties forwarded to the item element.'],
  ['items', 'Items rendered by the component.'],
  ['label', 'Label text rendered by the component.'],
  ['linkProps', 'Properties forwarded to the link element.'],
  ['loadingDuration', 'Duration of the loading state in milliseconds.'],
  ['loadingIcon', 'Icon rendered for the loading state.'],
  ['loadingIconProps', 'Properties forwarded to the loading icon component.'],
  ['loadingPosition', 'Placement of the loading indicator.'],
  ['loadingText', 'Text rendered during the loading state.'],
  ['modelValue', 'Current model value.'],
  ['onActionSelect', 'Callback invoked when an action is selected.'],
  ['onModelValueChange', 'Handler used to update the model value.'],
  ['open', 'Whether the component is open.'],
  ['openPaths', 'Current expanded paths.'],
  ['orientation', 'Orientation of the component.'],
  ['rootElement', 'Reference to the root element.'],
  ['shadow', 'Shadow style of the component.'],
  ['shape', 'Shape of the component.'],
  ['showGroupIcon', 'Whether to show the group icon.'],
  ['showLinkIcon', 'Whether to show the link icon.'],
  ['side', 'Side placement of the component.'],
  ['size', 'Visual size of the component.'],
  ['subProps', 'Properties forwarded to the sub element.'],
  ['tag', 'Tag content rendered by the component.'],
  ['tagProps', 'Properties forwarded to the tag component.'],
  ['title', 'Title text rendered by the component.'],
  ['titleProps', 'Properties forwarded to the title element.'],
  ['tooltipProps', 'Properties forwarded to the tooltip component.'],
  ['triggerProps', 'Properties forwarded to the trigger element.'],
  ['ui', 'Per-slot class overrides for the component.'],
  ['value', 'Value associated with the current item.'],
  ['variant', 'Visual variant of the component.']
]);

async function main(): Promise<void> {
  const fileArgs = process.argv.slice(2);
  const targetPaths = fileArgs.length ? fileArgs : defaultTargets;
  const resolvedFiles = await resolveTargetFiles(targetPaths);

  for (const filePath of resolvedFiles) {
    await annotateFile(filePath);
  }
}

async function resolveTargetFiles(targets: string[]): Promise<string[]> {
  const files = new Set<string>();

  for (const target of targets) {
    const absolutePath = path.resolve(rootDir, target);
    const stat = await safeStat(absolutePath);

    if (!stat) {
      continue;
    }

    if (stat.isDirectory()) {
      const directoryFiles = await collectTypeFiles(absolutePath);

      for (const filePath of directoryFiles) {
        files.add(filePath);
      }

      continue;
    }

    if (stat.isFile() && path.basename(absolutePath) === 'types.ts') {
      files.add(absolutePath);
    }
  }

  return [...files].sort();
}

async function safeStat(targetPath: string) {
  try {
    return await import('node:fs/promises').then(({ stat }) => stat(targetPath));
  } catch {
    return null;
  }
}

async function collectTypeFiles(directoryPath: string): Promise<string[]> {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async entry => {
      const entryPath = path.join(directoryPath, entry.name);

      if (entry.isDirectory()) {
        return collectTypeFiles(entryPath);
      }

      if (entry.isFile() && entry.name === 'types.ts' && supportedExtensions.has(path.extname(entry.name))) {
        return [entryPath];
      }

      return [];
    })
  );

  return files.flat();
}

async function annotateFile(filePath: string): Promise<void> {
  const content = await readFile(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const componentPhrase = createComponentPhrase(filePath);
  const insertions: Insertion[] = [];

  for (const statement of sourceFile.statements) {
    if (!isExportedDeclaration(statement)) {
      continue;
    }

    annotateDeclaration(statement, sourceFile, content, componentPhrase, insertions);
  }

  const nextContent = normalizeGeneratedComments(applyInsertions(content, insertions));

  if (nextContent !== content) {
    await writeFile(filePath, nextContent, 'utf8');
  }
}

function annotateDeclaration(
  node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration,
  sourceFile: ts.SourceFile,
  content: string,
  componentPhrase: string,
  insertions: Insertion[]
): void {
  const declarationName = node.name.text;
  const category = getDeclarationCategory(declarationName);
  const declarationStart = getLineStart(content, node.getStart(sourceFile));

  if (!hasJsDoc(node)) {
    const comment = buildBlockComment(
      createDeclarationDescription(declarationName, category, componentPhrase),
      getIndent(content, node.getStart(sourceFile))
    );

    insertions.push({ position: declarationStart, text: comment });
  }

  const members = getMembersFromDeclaration(node);

  for (const member of members) {
    if (hasJsDoc(member)) {
      continue;
    }

    const memberName = getMemberName(member, sourceFile);

    if (!memberName) {
      continue;
    }

    const description = createMemberDescription(memberName, category, member, sourceFile);

    if (!description) {
      continue;
    }

    const memberStart = getLineStart(content, member.getStart(sourceFile));

    insertions.push({
      position: memberStart,
      text: buildBlockComment(description, getIndent(content, member.getStart(sourceFile)))
    });
  }
}

function isExportedDeclaration(node: ts.Node): node is ts.InterfaceDeclaration | ts.TypeAliasDeclaration {
  if (!ts.isInterfaceDeclaration(node) && !ts.isTypeAliasDeclaration(node)) {
    return false;
  }

  return node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false;
}

function getDeclarationCategory(name: string): DeclarationCategory {
  if (name.endsWith('ContextParams')) {
    return 'contextParams';
  }

  if (name.endsWith('ExtraUiSlot')) {
    return 'extraUiSlot';
  }

  if (name.endsWith('ExtendedUi')) {
    return 'extendedUi';
  }

  if (name.endsWith('UiSlot')) {
    return 'uiSlot';
  }

  if (name.endsWith('SlotProps') || name.endsWith('OptionSlotProps')) {
    return 'slotProps';
  }

  if (name.endsWith('Props')) {
    return 'props';
  }

  if (name.endsWith('Emits')) {
    return 'emits';
  }

  if (name.endsWith('Slots')) {
    return 'slots';
  }

  if (name.endsWith('Context')) {
    return 'context';
  }

  if (name.endsWith('Ui')) {
    return 'ui';
  }

  if (name.endsWith('State')) {
    return 'state';
  }

  if (name.endsWith('ModelValue')) {
    return 'modelValue';
  }

  if (name.endsWith('OptionData') || name.endsWith('BaseOptionData')) {
    return 'optionData';
  }

  if (name.endsWith('Type')) {
    return 'type';
  }

  return 'other';
}

function createDeclarationDescription(name: string, category: DeclarationCategory, componentPhrase: string): string {
  const subject = getDeclarationSubject(name);

  switch (category) {
    case 'props':
      return `Properties for the ${subject} component.`;
    case 'emits':
      return `Events for the ${subject} component.`;
    case 'slots':
      return `Slots for the ${subject} component.`;
    case 'slotProps':
      return `Slot properties for the ${subject} component.`;
    case 'context':
      return `Context for the ${subject} component.`;
    case 'contextParams':
      return `Parameters used to create the ${subject} context.`;
    case 'uiSlot':
      return `Available UI slots for the ${componentPhrase} component.`;
    case 'extraUiSlot':
      return `Additional UI slots for the ${componentPhrase} component.`;
    case 'ui':
      return `UI class overrides for the ${componentPhrase} component.`;
    case 'extendedUi':
      return `Extended UI class overrides for the ${componentPhrase} component.`;
    case 'state':
      return `State values for the ${componentPhrase} component.`;
    case 'type':
      return `Supported ${subject} values.`;
    case 'modelValue':
      return `Model value type for the ${componentPhrase} component.`;
    case 'optionData':
      return `Option data for the ${subject} component.`;
    default:
      return `Type information for the ${subject || componentPhrase} component.`;
  }
}

function getDeclarationSubject(name: string): string {
  for (const suffix of declarationSuffixes) {
    if (!name.endsWith(suffix)) {
      continue;
    }

    const stem = name.slice(0, -suffix.length);

    return toReadablePhrase(stem || name);
  }

  return toReadablePhrase(name);
}

function getMembersFromDeclaration(node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration): ts.TypeElement[] {
  if (ts.isInterfaceDeclaration(node)) {
    return [...node.members];
  }

  const members: ts.TypeElement[] = [];

  function collectMembers(typeNode: ts.TypeNode): void {
    if (ts.isTypeLiteralNode(typeNode)) {
      members.push(...typeNode.members);
    }

    typeNode.forEachChild(child => {
      if (ts.isTypeNode(child)) {
        collectMembers(child);
      }
    });
  }

  collectMembers(node.type);

  return members;
}

function createMemberDescription(
  memberName: string,
  category: DeclarationCategory,
  member: ts.TypeElement,
  sourceFile: ts.SourceFile
): string | null {
  if (category === 'slots') {
    return memberName === 'default'
      ? 'Custom content for the default slot.'
      : `Custom content for the ${toReadablePhrase(memberName)} slot.`;
  }

  if (category === 'emits') {
    if (memberName.startsWith('update:')) {
      return `Emitted when the ${toReadablePhrase(memberName.replace('update:', ''))} value changes.`;
    }

    return `Emitted when ${toReadablePhrase(memberName)} occurs.`;
  }

  const directDescription = genericMemberDescriptions.get(memberName);

  if (directDescription) {
    return directDescription;
  }

  if (memberName.endsWith('Props')) {
    return `Properties forwarded to the ${toReadablePhrase(memberName.slice(0, -'Props'.length))} element.`;
  }

  if (memberName.endsWith('Class')) {
    return `Class names applied to the ${toReadablePhrase(memberName.slice(0, -'Class'.length))} element.`;
  }

  if (/^on[A-Z]/u.test(memberName)) {
    return `Callback invoked when ${toReadablePhrase(memberName.slice(2))} occurs.`;
  }

  if (isBooleanLikeName(memberName, member, sourceFile)) {
    return createBooleanDescription(memberName);
  }

  if (category === 'context' || category === 'contextParams') {
    return `${capitalizeFirstLetter(toReadablePhrase(memberName))} used by the component context.`;
  }

  if (category === 'slotProps') {
    return `${capitalizeFirstLetter(toReadablePhrase(memberName))} exposed in the slot scope.`;
  }

  return `${capitalizeFirstLetter(toReadablePhrase(memberName))}.`;
}

function isBooleanLikeName(memberName: string, member: ts.TypeElement, sourceFile: ts.SourceFile): boolean {
  if (commonBooleanNames.has(memberName)) {
    return true;
  }

  if (booleanPrefixes.some(prefix => memberName.startsWith(prefix) && memberName.length > prefix.length)) {
    return true;
  }

  if (
    !ts.isPropertySignature(member) &&
    !ts.isMethodSignature(member) &&
    !ts.isCallSignatureDeclaration(member) &&
    !ts.isConstructSignatureDeclaration(member) &&
    !ts.isIndexSignatureDeclaration(member)
  ) {
    return false;
  }

  if (!member.type) {
    return false;
  }

  const typeText = member.type.getText(sourceFile);

  return typeText === 'boolean' || typeText === 'ComputedRef<boolean>' || typeText === 'ShallowRef<boolean>';
}

function createBooleanDescription(memberName: string): string {
  if (memberName === 'disabled') {
    return 'Whether the component is disabled.';
  }

  if (memberName === 'readonly') {
    return 'Whether the component is readonly.';
  }

  if (memberName === 'loading') {
    return 'Whether the component is loading.';
  }

  if (memberName === 'open') {
    return 'Whether the component is open.';
  }

  if (memberName === 'hidden') {
    return 'Whether the item is hidden.';
  }

  if (memberName === 'visible') {
    return 'Whether the component is visible.';
  }

  if (memberName === 'closable') {
    return 'Whether the component can be closed.';
  }

  if (memberName === 'collapsible') {
    return 'Whether the component can be collapsed.';
  }

  if (memberName === 'multiple') {
    return 'Whether multiple values are supported.';
  }

  if (memberName === 'selected') {
    return 'Whether the item is selected.';
  }

  if (memberName === 'checked') {
    return 'Whether the item is checked.';
  }

  if (memberName === 'active') {
    return 'Whether the item is active.';
  }

  if (memberName === 'collapsed') {
    return 'Whether the component is collapsed.';
  }

  if (memberName === 'required') {
    return 'Whether the value is required.';
  }

  if (memberName.startsWith('is')) {
    return `Whether ${withArticle(toReadablePhrase(memberName.slice(2)))}.`;
  }

  if (memberName.startsWith('has')) {
    return `Whether the component has ${toReadablePhrase(memberName.slice(3))}.`;
  }

  if (memberName.startsWith('show')) {
    return `Whether to show ${withArticle(toReadablePhrase(memberName.slice(4)))}.`;
  }

  if (memberName.startsWith('allow')) {
    return `Whether to allow ${toReadablePhrase(memberName.slice(5))}.`;
  }

  if (memberName.startsWith('enable')) {
    return `Whether to enable ${toReadablePhrase(memberName.slice(6))}.`;
  }

  if (memberName.startsWith('disable')) {
    return `Whether to disable ${toReadablePhrase(memberName.slice(7))}.`;
  }

  if (memberName.startsWith('can')) {
    return `Whether the component can ${toReadablePhrase(memberName.slice(3))}.`;
  }

  if (memberName.startsWith('should')) {
    return `Whether the component should ${toReadablePhrase(memberName.slice(6))}.`;
  }

  return `Whether ${toReadablePhrase(memberName)}.`;
}

function getMemberName(member: ts.TypeElement, sourceFile: ts.SourceFile): string | null {
  if (!('name' in member) || !member.name) {
    return null;
  }

  if (ts.isIdentifier(member.name) || ts.isPrivateIdentifier(member.name)) {
    return member.name.text;
  }

  if (ts.isStringLiteral(member.name) || ts.isNumericLiteral(member.name)) {
    return member.name.text;
  }

  if (ts.isComputedPropertyName(member.name)) {
    return null;
  }

  return member.name.getText(sourceFile).replace(/^['"`]|['"`]$/gu, '');
}

function createComponentPhrase(filePath: string): string {
  const relativePath = path.relative(rootDir, filePath);
  const normalizedPath = relativePath.split(path.sep).join('/');
  const headlessPrefix = 'headless/src/components/';
  const uiPrefix = 'src/components/';
  const strippedPath = normalizedPath.startsWith(headlessPrefix)
    ? normalizedPath.slice(headlessPrefix.length)
    : normalizedPath.startsWith(uiPrefix)
      ? normalizedPath.slice(uiPrefix.length)
      : normalizedPath;
  const componentPath = strippedPath.replace(/\/types\.ts$/u, '').replace(/\/types\.ts$/u, '');
  const componentName = componentPath.replace(/\/types\.ts$/u, '').replace(/\/types\.ts$/u, '');

  return componentName
    .split('/')
    .map(segment => segment.replace(/-/gu, ' '))
    .join(' ')
    .trim();
}

function hasJsDoc(node: ts.Node): boolean {
  return ts.getJSDocCommentsAndTags(node).length > 0;
}

function getIndent(content: string, position: number): string {
  const lineStart = getLineStart(content, position);

  return content.slice(lineStart, position).match(/^\s*/u)?.[0] ?? '';
}

function getLineStart(content: string, position: number): number {
  return content.lastIndexOf('\n', position - 1) + 1;
}

function buildBlockComment(text: string, indent: string): string {
  const wrappedLines = wrapText(text, 100 - indent.length - 3);

  return `${indent}/**\n${wrappedLines.map(line => `${indent} * ${line}`).join('\n')}\n${indent} */\n`;
}

function normalizeGeneratedComments(content: string): string {
  return content
    .replace(/Emitted when the ([a-z ]+?) value changes\./gu, (_, rawTarget: string) => {
      const target = rawTarget.trim();

      if (target.endsWith('value')) {
        return `Emitted when the ${target} changes.`;
      }

      if (['open', 'visible', 'collapsed', 'expanded', 'active', 'selected', 'focused'].includes(target)) {
        return `Emitted when the ${target} state changes.`;
      }

      return `Emitted when the ${target} value changes.`;
    })
    .replace(/Whether default open\./gu, 'Whether the component is open by default.')
    .replace(/Whether modal\./gu, 'Whether the popup is modal.')
    .replace(/Whether an invalid\./gu, 'Whether the current value is invalid.')
    .replace(/Whether an active\./gu, 'Whether the current item is active.')
    .replace(/Whether an expanded\./gu, 'Whether the current item is expanded.')
    .replace(/Whether a sub\./gu, 'Whether the current context is nested.')
    .replace(/Whether a prev button disabled\./gu, 'Whether the previous button is disabled.')
    .replace(/Whether a next button disabled\./gu, 'Whether the next button is disabled.')
    .replace(/Whether a multiple\./gu, 'Whether multiple values are supported.')
    .replace(/Whether an empty model value\./gu, 'Whether the model value is empty.')
    .replace(/Whether a field array\./gu, 'Whether the field is an array.')
    .replace(/Whether a root\./gu, 'Whether this context is the root.')
    .replace(/Whether a virtual\./gu, 'Whether virtualization is enabled.')
    .replace(/Whether a horizontal\./gu, 'Whether the orientation is horizontal.')
    .replace(/Whether an open delayed\./gu, 'Whether opening is delayed.')
    .replace(/Whether an allowed to drag\./gu, 'Whether dragging is allowed.')
    .replace(/Whether a focused\./gu, 'Whether the item is focused.')
    .replace(/Whether a hovering\./gu, 'Whether the item is hovered.')
    .replace(/Whether a ([a-z ]+) disabled\./gu, 'Whether the $1 is disabled.')
    .replace(/Whether a ([a-z ]+) selected\./gu, 'Whether the $1 is selected.')
    .replace(/Whether a ([a-z ]+) highlighted\./gu, 'Whether the $1 is highlighted.')
    .replace(/Whether a ([a-z ]+) hovered\./gu, 'Whether the $1 is hovered.')
    .replace(/Whether a ([a-z ]+) unavailable\./gu, 'Whether the $1 is unavailable.')
    .replace(/Whether a ([a-z ]+) focusable\./gu, 'Whether the $1 is focusable.')
    .replace(/Whether a ([a-z ]+) dragging\./gu, 'Whether the $1 is dragging.')
    .replace(/Whether a ([a-z ]+) submitting\./gu, 'Whether the $1 is submitting.')
    .replace(/Whether a ([a-z ]+) validating\./gu, 'Whether the $1 is validating.')
    .replace(/Callback invoked when ([a-z ]+) change occurs\./gu, 'Callback invoked when the $1 changes.')
    .replace(/Callback invoked when ([a-z ]+) toggle occurs\./gu, 'Callback invoked when the $1 toggles.')
    .replace(/Callback invoked when ([a-z ]+) occurs\./gu, 'Callback invoked when the $1 event fires.');
}

function wrapText(text: string, maxLength: number): string[] {
  const words = text.split(/\s+/u).filter(Boolean);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (nextLine.length <= maxLength || !currentLine) {
      currentLine = nextLine;
      continue;
    }

    lines.push(currentLine);
    currentLine = word;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function applyInsertions(content: string, insertions: Insertion[]): string {
  return [...insertions]
    .sort((left, right) => right.position - left.position)
    .reduce((result, insertion) => {
      return `${result.slice(0, insertion.position)}${insertion.text}${result.slice(insertion.position)}`;
    }, content);
}

function toReadablePhrase(value: string): string {
  return value
    .replace(/([a-z0-9])([A-Z])/gu, '$1 $2')
    .replace(/[_-]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()
    .toLowerCase();
}

function capitalizeFirstLetter(value: string): string {
  if (!value) {
    return value;
  }

  return `${value[0].toUpperCase()}${value.slice(1)}`;
}

function withArticle(value: string): string {
  if (!value) {
    return 'it';
  }

  return /^(a|e|i|o|u)/u.test(value) ? `an ${value}` : `a ${value}`;
}

void main();
