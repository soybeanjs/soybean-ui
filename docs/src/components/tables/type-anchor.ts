export function toTypeAnchorId(typeName: string) {
  const normalized = typeName
    .trim()
    .replace(/[^A-Za-z0-9_]+/g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  return `type-${normalized}`;
}
