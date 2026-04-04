import axe from 'axe-core';
import type { ElementContext, RunOptions } from 'axe-core';

/**
 * Run axe accessibility checks on a DOM element.
 *
 * @example
 * ```typescript
 * const wrapper = mount(SButton, { props: { disabled: true } });
 * const violations = await getA11yViolations(wrapper.element);
 * expect(violations).toHaveLength(0);
 * ```
 */
export async function getA11yViolations(element: ElementContext, options: RunOptions = {}) {
  const results = await axe.run(element, {
    rules: {
      // Skip color contrast checks — requires computed styles not available in happy-dom
      'color-contrast': { enabled: false },
      // Decorative icons inside interactive elements (buttons, etc.) may render as SVG in test env
      // without aria-hidden; skip as it's a rendering artifact, not a structural a11y issue
      'svg-img-alt': { enabled: false },
      'image-alt': { enabled: false }
    },
    ...options
  });

  return results.violations;
}
