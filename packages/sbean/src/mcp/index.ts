import { BUILTIN_REGISTRIES } from '../registry/constants';
import { getConfig } from '../utils/get-config';
import { fetchRegistryCatalog, fetchRegistryItem } from '../registry/fetcher';

type JsonRpcId = string | number | null;

type JsonRpcRequest = {
  jsonrpc?: string;
  id?: JsonRpcId;
  method: string;
  params?: Record<string, unknown>;
};

type TextContent = {
  type: 'text';
  text: string;
};

type ToolResult = {
  content: TextContent[];
  isError?: boolean;
};

type ToolDefinition = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
};

function createTextResult(text: string, isError = false) {
  return {
    content: [{ type: 'text', text } satisfies TextContent],
    ...(isError ? { isError: true } : {})
  };
}

export const TOOLS: ToolDefinition[] = [
  {
    name: 'get_project_registries',
    description: 'List configured registry namespaces from sbean.json.',
    inputSchema: { type: 'object', properties: {} }
  },
  {
    name: 'list_items_in_registries',
    description: 'List registry items from all or selected registries.',
    inputSchema: {
      type: 'object',
      properties: {
        registries: {
          type: 'array',
          items: { type: 'string' }
        },
        limit: { type: 'number' },
        offset: { type: 'number' }
      }
    }
  },
  {
    name: 'search_items_in_registries',
    description: 'Search registry items by name, description, or category.',
    inputSchema: {
      type: 'object',
      required: ['query'],
      properties: {
        query: { type: 'string' },
        registries: {
          type: 'array',
          items: { type: 'string' }
        },
        limit: { type: 'number' },
        offset: { type: 'number' }
      }
    }
  },
  {
    name: 'view_items_in_registries',
    description: 'View full registry item metadata and file contents.',
    inputSchema: {
      type: 'object',
      required: ['items'],
      properties: {
        items: {
          type: 'array',
          items: { type: 'string' }
        }
      }
    }
  },
  {
    name: 'get_item_examples_from_registries',
    description: 'Return implementation code for items matching an example-style query.',
    inputSchema: {
      type: 'object',
      required: ['query'],
      properties: {
        query: { type: 'string' },
        registries: {
          type: 'array',
          items: { type: 'string' }
        }
      }
    }
  },
  {
    name: 'get_add_command_for_items',
    description: 'Return the sbean add command for the given items.',
    inputSchema: {
      type: 'object',
      required: ['items'],
      properties: {
        items: {
          type: 'array',
          items: { type: 'string' }
        }
      }
    }
  },
  {
    name: 'get_audit_checklist',
    description: 'Return a short post-generation checklist for SBean projects.',
    inputSchema: { type: 'object', properties: {} }
  }
];

function getItemRegistry(item: Awaited<ReturnType<typeof fetchRegistryCatalog>>[number]): string {
  const namespace = item.meta?.registryNamespace;

  return typeof namespace === 'string' ? namespace : '@soybean';
}

function sliceResults<T>(items: T[], limit?: number, offset?: number): T[] {
  const start = Math.max(offset ?? 0, 0);

  if (limit === 0) {
    return items.slice(start);
  }

  const end = start + Math.max(limit ?? 100, 0);
  return items.slice(start, end);
}

function parseStringArray(value: unknown): string[] | null {
  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value) || value.some(item => typeof item !== 'string')) {
    return null;
  }

  return value;
}

function parseNumber(value: unknown, fallback: number): number | null {
  if (value === undefined) {
    return fallback;
  }

  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

async function resolveConfig() {
  return getConfig(process.cwd());
}

async function getCatalog(registries?: string[]) {
  const config = await resolveConfig();
  const catalog = await fetchRegistryCatalog(config);

  if (!registries?.length) {
    return catalog;
  }

  return catalog.filter(item => registries.includes(getItemRegistry(item)));
}
export async function handleToolCall(name: string, args: Record<string, unknown>): Promise<ToolResult> {
  switch (name) {
    case 'get_project_registries': {
      const config = await resolveConfig();
      const registries = {
        ...BUILTIN_REGISTRIES,
        ...config?.registries
      };

      return createTextResult(Object.keys(registries).join('\n') || '@soybean');
    }

    case 'list_items_in_registries': {
      const registries = parseStringArray(args.registries);
      const limit = parseNumber(args.limit, 100);
      const offset = parseNumber(args.offset, 0);

      if (!registries || limit === null || offset === null) {
        return createTextResult('Invalid arguments for list_items_in_registries.', true);
      }

      const items = sliceResults(await getCatalog(registries), limit, offset);
      const text = items
        .map(item => `- ${item.name} (${item.type})${item.description ? `: ${item.description}` : ''}`)
        .join('\n');

      return createTextResult(text || 'No items found.');
    }

    case 'search_items_in_registries': {
      const query = typeof args.query === 'string' ? args.query.trim().toLowerCase() : '';
      const registries = parseStringArray(args.registries);
      const limit = parseNumber(args.limit, 20);
      const offset = parseNumber(args.offset, 0);

      if (!query || !registries || limit === null || offset === null) {
        return createTextResult('Invalid arguments for search_items_in_registries.', true);
      }

      const items = (await getCatalog(registries)).filter(item => {
        const haystack = [item.name, item.description ?? '', ...(item.categories ?? [])].join(' ').toLowerCase();
        return haystack.includes(query);
      });

      const text = sliceResults(items, limit, offset)
        .map(item => `- ${item.name} (${item.type})${item.description ? `: ${item.description}` : ''}`)
        .join('\n');

      return createTextResult(text || `No items found for "${query}".`);
    }

    case 'view_items_in_registries': {
      const items = parseStringArray(args.items);

      if (!items?.length) {
        return createTextResult('Invalid arguments for view_items_in_registries.', true);
      }

      const config = await resolveConfig();
      const results: string[] = [];

      for (const itemName of items) {
        const item = await fetchRegistryItem(itemName, config);

        if (!item) {
          results.push(`## ${itemName}\nNot found.`);
          continue;
        }

        const files = item.files?.map(file => `### ${file.path}\n\n${file.content ?? '(no content)'}`).join('\n\n');

        results.push(
          [`## ${item.name}`, item.description ?? '', `Type: ${item.type}`, files ?? ''].filter(Boolean).join('\n\n')
        );
      }

      return createTextResult(results.join('\n\n---\n\n'));
    }

    case 'get_item_examples_from_registries': {
      const query = typeof args.query === 'string' ? args.query.trim().toLowerCase() : '';
      const registries = parseStringArray(args.registries);

      if (!query || !registries) {
        return createTextResult('Invalid arguments for get_item_examples_from_registries.', true);
      }

      const catalog = await getCatalog(registries);
      const matched = catalog.filter(
        item => item.name.toLowerCase().includes(query.replace(/\s+/g, '-')) || item.name.toLowerCase().includes(query)
      );
      const config = await resolveConfig();
      const items = await Promise.all(matched.slice(0, 5).map(item => fetchRegistryItem(item.name, config)));
      const text = items
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .map(item => {
          const files = item.files?.map(file => `### ${file.path}\n\n${file.content ?? '(no content)'}`).join('\n\n');

          return [`## ${item.name}`, item.description ?? '', files ?? ''].filter(Boolean).join('\n\n');
        })
        .join('\n\n---\n\n');

      return createTextResult(text || `No examples found for "${query}".`);
    }

    case 'get_add_command_for_items': {
      const items = parseStringArray(args.items);

      if (!items?.length) {
        return createTextResult('Invalid arguments for get_add_command_for_items.', true);
      }

      return createTextResult(`npx sbean@latest add ${items.join(' ')}`);
    }

    case 'get_audit_checklist': {
      return createTextResult(
        [
          '- Run sbean info --json to confirm aliases and registries.',
          '- Run sbean search or sbean view on the added items to verify registry resolution.',
          '- Run your project typecheck/build to confirm copied files compile.',
          '- If you changed theme settings, review sbean.json and uno.config.ts together.'
        ].join('\n')
      );
    }

    default:
      return createTextResult(`Unknown tool: ${name}`, true);
  }
}

function writeMessage(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);
  const header = `Content-Length: ${Buffer.byteLength(body, 'utf8')}\r\n\r\n`;
  process.stdout.write(header);
  process.stdout.write(body);
}

function writeResponse(id: JsonRpcId, result: Record<string, unknown>) {
  writeMessage({
    jsonrpc: '2.0',
    id,
    result
  });
}

function writeError(id: JsonRpcId, code: number, message: string) {
  writeMessage({
    jsonrpc: '2.0',
    id,
    error: {
      code,
      message
    }
  });
}

async function dispatchRequest(request: JsonRpcRequest) {
  const { id = null, method, params = {} } = request;

  try {
    if (method === 'initialize') {
      writeResponse(id, {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {}
        },
        serverInfo: {
          name: 'sbean',
          version: '1.0.0'
        }
      });
      return;
    }

    if (method === 'notifications/initialized') {
      return;
    }

    if (method === 'tools/list') {
      writeResponse(id, { tools: TOOLS as unknown as Record<string, unknown>[] });
      return;
    }

    if (method === 'tools/call') {
      const name = typeof params.name === 'string' ? params.name : '';
      const args =
        typeof params.arguments === 'object' && params.arguments ? (params.arguments as Record<string, unknown>) : {};
      const result = await handleToolCall(name, args);
      writeResponse(id, result as unknown as Record<string, unknown>);
      return;
    }

    if (id !== null) {
      writeError(id, -32601, `Method not found: ${method}`);
    }
  } catch (error) {
    writeError(id, -32000, error instanceof Error ? error.message : 'Unknown error');
  }
}

export async function startMcpServer(): Promise<void> {
  let buffer = Buffer.alloc(0);

  process.stdin.on('data', async chunk => {
    const nextChunk = typeof chunk === 'string' ? Buffer.from(chunk) : chunk;
    buffer = Buffer.concat([buffer, nextChunk]);

    while (true) {
      const headerEnd = buffer.indexOf('\r\n\r\n');

      if (headerEnd === -1) {
        break;
      }

      const header = buffer.slice(0, headerEnd).toString('utf8');
      const lengthMatch = header.match(/Content-Length:\s*(\d+)/i);

      if (!lengthMatch) {
        buffer = buffer.slice(headerEnd + 4);
        continue;
      }

      const contentLength = Number(lengthMatch[1]);
      const messageStart = headerEnd + 4;
      const messageEnd = messageStart + contentLength;

      if (buffer.length < messageEnd) {
        break;
      }

      const body = buffer.slice(messageStart, messageEnd).toString('utf8');
      buffer = buffer.slice(messageEnd);

      const request = JSON.parse(body) as JsonRpcRequest;
      await dispatchRequest(request);
    }
  });

  process.stdin.resume();
}
