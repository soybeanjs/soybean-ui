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
 * Before scanning, it waits for in-flight CSS animations/transitions to settle:
 * `color-contrast` composites element opacity into the sampled colors, so a
 * scan mid fade-in (e.g. a menu popup near opacity 0) yields phantom
 * low-contrast violations that vanish a frame later. Infinite animations are
 * skipped and a 500ms timeout bounds the wait.
 *
 * @example
 * ```ts
 * import { renderComponent } from '../shared/render';
 * import { getA11yViolations } from '../shared/a11y';
 *
 * const { unmount } = await renderComponent(SButton, {
 *   slots: { default: 'Submit' },
 *   withTheme: true // injects theme CSS vars so colors are real
 * });
 * const violations = await getA11yViolations();
 * expect(violations).toHaveLength(0);
 * unmount();
 * ```
 */
async function waitForAnimationsToSettle(): Promise<void> {
  const finite = document
    .getAnimations()
    .filter(
      animation => animation.playState === 'running' && animation.effect?.getComputedTiming().iterations !== Infinity
    );

  const settled = Promise.allSettled(finite.map(animation => animation.finished));
  const timeout = new Promise<void>(resolve => setTimeout(resolve, 500));

  await Promise.race([settled, timeout]);
}

export async function getA11yViolations(element: ElementContext = document.body, options: RunOptions = {}) {
  await waitForAnimationsToSettle();
  const results = await axe.run(element, options);
  return results.violations;
}
