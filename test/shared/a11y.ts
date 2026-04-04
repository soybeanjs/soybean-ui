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
      'image-alt': { enabled: false },
      // Requires axe to inject itself into iframes via fetch; our components have no iframes
      // and this rule causes DOMException [AbortError] when happy-dom tears down the environment
      'frame-tested': { enabled: false }
    },
    // Disable preloading of CSS/images — axe uses window.fetch to load these, which happy-dom
    // tracks as async tasks. When vitest tears down the environment after the last test in a file,
    // happy-dom aborts those in-flight fetches, producing DOMException [AbortError] noise.
    preload: false,
    // Don't try to scan nested iframes; we have none in component tests and this would
    // also trigger additional async message-passing operations in happy-dom.
    iframes: false,
    ...options
  });

  return results.violations;
}
