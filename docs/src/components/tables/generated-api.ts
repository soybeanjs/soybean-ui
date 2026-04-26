import generatedApiIndex from '@/generated/api/index.json';

export interface GeneratedApiReferencedType {
  name: string;
  kind: string;
  type: string;
  resolvedType: string | null;
  description: string;
  sourcePath: string;
  typeParameters: string[];
  external: boolean;
  members: GeneratedApiMember[];
  callables: GeneratedApiCallable[];
}

export interface GeneratedApiMember {
  name: string;
  type: string;
  required: boolean;
  description: string;
  default: string | boolean | number | null;
  inheritedFrom: string | null;
  sourcePath: string;
  referencedTypes: GeneratedApiReferencedType[];
}

export interface GeneratedApiCallable {
  name: string;
  type: string;
  parameters: string;
  required: boolean;
  description: string;
  sourcePath: string;
  referencedTypes: GeneratedApiReferencedType[];
}

export interface GeneratedApiEntity {
  kind: 'props' | 'emits' | 'slots';
  name: string;
  type: string;
  resolvedType: string | null;
  description: string;
  sourcePath: string;
  typeParameters: string[];
  members: GeneratedApiMember[];
  callables: GeneratedApiCallable[];
  referencedTypes: GeneratedApiReferencedType[];
}

export interface GeneratedApiSymbol {
  props?: GeneratedApiEntity;
  emits?: GeneratedApiEntity;
  slots?: GeneratedApiEntity;
}

export interface GeneratedApiDocument {
  component: string;
  symbols: Record<string, GeneratedApiSymbol>;
}

export interface GeneratedApiRow {
  name: string;
  required?: boolean;
  default?: string;
  type?: string;
  parameters?: string;
  description: string;
}

export interface GeneratedApiTypeField {
  name: string;
  required?: boolean;
  type: string;
  description?: string;
}

export interface GeneratedApiTypeTable {
  name: string;
  description?: string;
  fields: GeneratedApiTypeField[];
}

export interface GeneratedApiUnionType {
  name: string;
  description?: string;
  type: string;
}

export interface GeneratedApiSymbolSection {
  key: string;
  name: string;
  displayName: string;
  propsRows: GeneratedApiRow[];
  emitsRows: GeneratedApiRow[];
  slotsRows: GeneratedApiRow[];
}

export interface GeneratedApiLayerSection {
  key: 'ui' | 'headless';
  symbols: GeneratedApiSymbolSection[];
}

interface GeneratedApiIndexEntry {
  component: string;
  file: string;
  symbols: string[];
}

interface GeneratedApiIndex {
  generatedAt: string;
  schemaVersion: number;
  components: Record<string, GeneratedApiIndexEntry>;
}

const generatedApiModules = import.meta.glob<GeneratedApiDocument>('../../generated/api/*.json', {
  eager: true,
  import: 'default'
});

const componentApiDocuments = Object.fromEntries(
  Object.entries(generatedApiModules)
    .filter(([path]) => !path.endsWith('/index.json'))
    .map(([, document]) => [document.component, document])
) as Record<string, GeneratedApiDocument>;

const apiIndex = generatedApiIndex as GeneratedApiIndex;

const commonTypeRegistry = buildCommonTypeRegistry();

function buildCommonTypeRegistry() {
  const usage = new Map<string, { type: GeneratedApiReferencedType; components: Set<string> }>();

  for (const [component, document] of Object.entries(componentApiDocuments)) {
    const componentTypes = new Map<string, GeneratedApiReferencedType>();

    for (const symbol of Object.values(document.symbols)) {
      for (const type of collectSymbolTypes(symbol)) {
        componentTypes.set(type.name, type);
      }
    }

    for (const type of componentTypes.values()) {
      if (type.external) {
        continue;
      }

      const existing = usage.get(type.name);

      if (existing) {
        existing.components.add(component);
        continue;
      }

      usage.set(type.name, {
        type,
        components: new Set([component])
      });
    }
  }

  return new Map(
    Array.from(usage.entries())
      .filter(([, entry]) => entry.components.size > 1)
      .map(([name, entry]) => [name, entry.type])
  );
}

function collectSymbolTypes(symbol: GeneratedApiSymbol) {
  const entries = [symbol.props, symbol.emits, symbol.slots].filter(Boolean) as GeneratedApiEntity[];
  const collected = new Map<string, GeneratedApiReferencedType>();

  for (const entry of entries) {
    for (const type of collectEntityTypes(entry)) {
      collected.set(type.name, type);
    }
  }

  return Array.from(collected.values());
}

function collectEntityTypes(entity: GeneratedApiEntity) {
  const collected = new Map<string, GeneratedApiReferencedType>();

  const visit = (type: GeneratedApiReferencedType) => {
    if (type.external || collected.has(type.name)) {
      return;
    }

    collected.set(type.name, type);

    for (const member of type.members) {
      member.referencedTypes.forEach(visit);
    }

    for (const callable of type.callables) {
      callable.referencedTypes.forEach(visit);
    }
  };

  entity.referencedTypes.forEach(visit);
  entity.members.flatMap(member => member.referencedTypes).forEach(visit);
  entity.callables.flatMap(callable => callable.referencedTypes).forEach(visit);

  return Array.from(collected.values());
}

function createEntityRows(entity: GeneratedApiEntity | undefined): GeneratedApiRow[] {
  if (!entity) {
    return [];
  }

  if (entity.kind === 'props') {
    return entity.members.map(member => ({
      name: member.name,
      required: member.required,
      default: formatDefaultValue(member.default),
      type: member.type,
      description: member.description || '—'
    }));
  }

  return entity.callables.map(callable => ({
    name: callable.name,
    required: callable.required,
    parameters: formatCallableParameters(entity.kind, callable.parameters),
    description: callable.description || '—'
  }));
}

function formatCallableParameters(kind: GeneratedApiEntity['kind'], parameters: string) {
  if (!parameters) {
    return '—';
  }

  if (kind === 'emits') {
    const match = parameters.match(/^[^:]+:\s*(.+)$/);

    return match?.[1] ?? parameters;
  }

  const slotMatch = parameters.match(/^\(\(props:\s*(.+?)\)\s*=>\s*any\)\s*\|\s*undefined$/);

  if (slotMatch) {
    return slotMatch[1];
  }

  if (parameters === '(() => any) | undefined') {
    return '—';
  }

  return parameters.replace(/\s*\|\s*undefined$/, '');
}

function formatDefaultValue(value: GeneratedApiMember['default']) {
  if (value === null || value === undefined) {
    return '—';
  }

  return String(value);
}

function isUiSymbol(symbol: GeneratedApiSymbol) {
  return [symbol.props, symbol.emits, symbol.slots].filter(Boolean).some(entry => entry?.sourcePath.startsWith('src/'));
}

function toUiDisplayName(symbolName: string) {
  return symbolName.startsWith('S') ? symbolName : `S${symbolName}`;
}

function toTypeTable(type: GeneratedApiReferencedType): GeneratedApiTypeTable | null {
  if (!type.members.length) {
    return null;
  }

  return {
    name: type.name,
    description: type.description,
    fields: type.members.map(member => ({
      name: member.name,
      required: member.required,
      type: member.type,
      description: member.description
    }))
  };
}

function toUnionType(type: GeneratedApiReferencedType): GeneratedApiUnionType | null {
  const resolvedType = type.resolvedType ?? type.type;

  if (!resolvedType || resolvedType === type.name) {
    return null;
  }

  return {
    name: type.name,
    description: type.description,
    type: resolvedType
  };
}

function sortTypes<T extends { name: string }>(types: T[]) {
  return [...types].sort((left, right) => left.name.localeCompare(right.name));
}

export function getGeneratedApiDocument(component: string) {
  return componentApiDocuments[component];
}

export function getComponentApiSections(component: string): GeneratedApiLayerSection[] {
  const document = getGeneratedApiDocument(component);

  if (!document) {
    return [];
  }

  const orderedSymbols = apiIndex.components[component]?.symbols ?? Object.keys(document.symbols);
  const uiSymbols: GeneratedApiSymbolSection[] = [];
  const headlessSymbols: GeneratedApiSymbolSection[] = [];

  for (const symbolName of orderedSymbols) {
    const symbol = document.symbols[symbolName];

    if (!symbol) {
      continue;
    }

    const symbolSection: GeneratedApiSymbolSection = {
      key: symbolName,
      name: symbolName,
      displayName: isUiSymbol(symbol) ? toUiDisplayName(symbolName) : symbolName,
      propsRows: createEntityRows(symbol.props),
      emitsRows: createEntityRows(symbol.emits),
      slotsRows: createEntityRows(symbol.slots)
    };

    if (isUiSymbol(symbol)) {
      uiSymbols.push(symbolSection);
    } else {
      headlessSymbols.push(symbolSection);
    }
  }

  const layers: GeneratedApiLayerSection[] = [
    {
      key: 'ui',
      symbols: uiSymbols
    },
    {
      key: 'headless',
      symbols: headlessSymbols
    }
  ];

  return layers.filter(layer => layer.symbols.length);
}

export function getComponentLocalTypes(component: string) {
  const document = getGeneratedApiDocument(component);

  if (!document) {
    return {
      tables: [] as GeneratedApiTypeTable[],
      unions: [] as GeneratedApiUnionType[],
      commonTypeNames: [] as string[]
    };
  }

  const allTypes = new Map<string, GeneratedApiReferencedType>();

  for (const symbol of Object.values(document.symbols)) {
    for (const type of collectSymbolTypes(symbol)) {
      allTypes.set(type.name, type);
    }
  }

  const localTypes = Array.from(allTypes.values()).filter(type => !commonTypeRegistry.has(type.name));
  const commonTypeNames = Array.from(allTypes.keys()).filter(name => commonTypeRegistry.has(name));

  const tables = sortTypes(localTypes.map(toTypeTable).filter(Boolean) as GeneratedApiTypeTable[]);
  const unions = sortTypes(localTypes.map(toUnionType).filter(Boolean) as GeneratedApiUnionType[]).filter(
    union => !tables.some(table => table.name === union.name)
  );

  return {
    tables,
    unions,
    commonTypeNames: commonTypeNames.sort((left, right) => left.localeCompare(right))
  };
}

export function getCommonTypes() {
  const commonTypes = Array.from(commonTypeRegistry.values());
  const tables = sortTypes(commonTypes.map(toTypeTable).filter(Boolean) as GeneratedApiTypeTable[]);
  const unions = sortTypes(commonTypes.map(toUnionType).filter(Boolean) as GeneratedApiUnionType[]).filter(
    union => !tables.some(table => table.name === union.name)
  );

  return {
    tables,
    unions
  };
}

export function isCommonTypeName(typeName: string) {
  return commonTypeRegistry.has(typeName);
}
