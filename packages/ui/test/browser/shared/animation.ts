/**
 * Animation helpers for browser e2e specs.
 *
 * Keyframe-driven motion is the one contract the happy-dom tier cannot observe:
 * there is no style engine there, so a class-driven `animation-name` never
 * resolves to a running animation and every collapse looks instantaneous. These
 * helpers let a spec assert on the keyframes a real browser actually starts,
 * without racing the animation's duration.
 */

/**
 * Record the keyframes the browser starts on `element`.
 *
 * `animationstart` is captured the moment the keyframe begins, so polling the
 * returned array afterwards stays correct even when the test process is slow —
 * unlike `getAnimations()`, which only lists what happens to be running when it
 * is read and therefore races the animation's duration.
 */
export function recordAnimationStarts(element: Element): string[] {
  const names: string[] = [];

  element.addEventListener('animationstart', event => {
    if (event.target === element) {
      names.push((event as AnimationEvent).animationName);
    }
  });

  return names;
}

/**
 * Record the properties `element` starts transitioning.
 *
 * The transition counterpart of `recordAnimationStarts`: `transitionstart` fires
 * when the property actually begins to move, so a later poll can still assert on
 * it. `transitionend` would race the duration, and geometry snapshots race the
 * frame scheduler.
 */
export function recordTransitionStarts(element: Element): string[] {
  const properties: string[] = [];

  element.addEventListener('transitionstart', event => {
    if (event.target === element) {
      properties.push((event as TransitionEvent).propertyName);
    }
  });

  return properties;
}

/**
 * Wait out a component's mount-animation window.
 *
 * `CollapsibleContent` freezes its enter keyframe for the frame after mount
 * (`isMountAnimationPrevented`) and releases that freeze on the next state
 * change. A synthetic click lands inside the very same frame — far faster than
 * any real pointer — so a toggle issued immediately after mount would measure the
 * mount window instead of the behavior under test.
 */
export async function waitForMountWindow(frames = 2): Promise<void> {
  for (let frame = 0; frame < frames; frame += 1) {
    await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
  }
}
