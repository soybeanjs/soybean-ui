export function isTriggerLink(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  return el.hasAttribute('href');
}
