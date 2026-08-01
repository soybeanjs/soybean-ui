import axe from 'axe-core';
import type { ElementContext, RunOptions } from 'axe-core';

/**
 * Run axe accessibility checks against a real browser DOM.
 *
 * This is the browser-mode counterpart of `packages/ui/test/shared/a11y.ts`.
 * The critical difference: `color-contrast` is ENABLED here. In happy-dom,
 * computed styles are not available so color-contrast must be skipped; in a
 * real browser, axe reads real computed styles, so color-contrast violations
 * (the most common real-world a11y issue) are detected.
 *
 * The happy-dom version also disables `frame-tested`, `preload`, and `iframes`
 * to avoid happy-dom abort noise. None of those workarounds are needed in a
 * real browser, so this helper stays close to axe's defaults.
 *
 * @example
 * ```ts
 * import { renderComponent } from '../shared/render';
 * import { getA11yViolations } from '../shared/a11y';
 *
 * const { unmount } = renderComponent(SButton, {
 *   slots: { default: 'Submit' },
 *   withTheme: true // injects theme CSS vars so colors are real
 * });
 * const violations = await getA11yViolations();
 * expect(violations).toHaveLength(0);
 * unmount();
 * ```
 */
export async function getA11yViolations(element: ElementContext = document.body, options: RunOptions = {}) {
  const results = await axe.run(element, options);
  return results.violations;
}
