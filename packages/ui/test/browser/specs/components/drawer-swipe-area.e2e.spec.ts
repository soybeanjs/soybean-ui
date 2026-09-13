import { describe, expect, it } from 'vitest';
import { h } from 'vue';
import { page } from 'vitest/browser';
import SDrawer from '@/components/drawer/drawer.vue';
import type { DrawerProps } from '@/components/drawer/types';
import { getPopups, getSwipeArea, renderControlledDrawer, sleep, timedSwipe } from '../../shared/drawer';
import { renderComponent } from '../../shared/render';

/**
 * Swipe-to-open contracts for the DrawerSwipeArea primitive (exposed by
 * `SDrawer` via the `swipeable` prop), ported from Base UI's SwipeArea
 * coverage in `DrawerRoot.test.tsx` / `DrawerViewport.test.tsx`.
 */
describe('SDrawer swipe area (e2e)', () => {
  const BODY = { default: () => h('div', { style: 'height:240px' }, 'Drawer body') };

  async function renderSwipeDrawer(props: Partial<DrawerProps> = {}, open = false) {
    const handles = await renderControlledDrawer(
      { swipeable: true, title: 'Swipe Open', ...props },
      { open, slots: BODY }
    );

    await sleep(300);

    return handles;
  }

  /** Drag origin on the fixed bottom edge band (h-4): horizontally centered. */
  function swipeAreaPoint() {
    const area = getSwipeArea();

    if (!area) throw new Error('swipe area not rendered');

    const rect = area.getBoundingClientRect();

    return { x: Math.round(rect.left + rect.width / 2), y: Math.round(rect.top + rect.height / 2) };
  }

  it('opens the drawer mid-gesture and keeps it open past half travel', async () => {
    const { openChanges, unmount } = await renderSwipeDrawer();

    const from = swipeAreaPoint();

    await timedSwipe([
      { type: 'down', x: from.x, y: from.y, time: 1000 },
      { type: 'move', x: from.x, y: from.y - 10, time: 1010 },
      { type: 'move', x: from.x, y: from.y - 300, time: 1100 },
      { type: 'up', x: from.x, y: from.y - 300, time: 1120 }
    ]);

    expect(openChanges).toContain(true);

    await expect.element(page.getByRole('dialog')).toBeVisible();

    // The release click must not immediately re-close the freshly opened drawer.
    await sleep(600);
    expect(getPopups()).toHaveLength(1);

    unmount();
  });

  it('settles a short slow edge drag back to closed', async () => {
    const { openChanges, unmount } = await renderSwipeDrawer();

    const from = swipeAreaPoint();

    await timedSwipe([
      { type: 'down', x: from.x, y: from.y, time: 1000 },
      { type: 'move', x: from.x, y: from.y - 10, time: 1100 },
      { type: 'move', x: from.x, y: from.y - 60, time: 1500 },
      { type: 'up', x: from.x, y: from.y - 60, time: 2000 }
    ]);
    await sleep(700);

    expect(openChanges).toContain(true);
    expect(openChanges).toContain(false);
    expect(getPopups()).toHaveLength(0);

    unmount();
  });

  it('opens on a fast short edge flick below the distance threshold', async () => {
    const { unmount } = await renderSwipeDrawer();

    const from = swipeAreaPoint();

    // 100px travel (below the 50% threshold) but ~2.5px/ms release velocity.
    await timedSwipe([
      { type: 'down', x: from.x, y: from.y, time: 1000 },
      { type: 'move', x: from.x, y: from.y - 10, time: 1010 },
      { type: 'move', x: from.x, y: from.y - 60, time: 1020 },
      { type: 'up', x: from.x, y: from.y - 100, time: 1035 }
    ]);
    await sleep(700);

    expect(getPopups()).toHaveLength(1);

    unmount();
  });

  it('ignores the edge gesture when the swipe area is disabled', async () => {
    const { unmount } = await renderSwipeDrawer({ swipeAreaProps: { disabled: true } });

    const from = swipeAreaPoint();

    await timedSwipe([
      { type: 'down', x: from.x, y: from.y, time: 1000 },
      { type: 'move', x: from.x, y: from.y - 10, time: 1010 },
      { type: 'move', x: from.x, y: from.y - 300, time: 1100 },
      { type: 'up', x: from.x, y: from.y - 300, time: 1120 }
    ]);
    await sleep(700);

    expect(getPopups()).toHaveLength(0);

    unmount();
  });

  it('opens an uncontrolled drawer from the edge without a v-model', async () => {
    const { unmount } = await renderComponent(SDrawer, {
      props: { swipeable: true, title: 'Uncontrolled Swipe Open' },
      slots: BODY
    });

    const from = swipeAreaPoint();

    await timedSwipe([
      { type: 'down', x: from.x, y: from.y, time: 1000 },
      { type: 'move', x: from.x, y: from.y - 10, time: 1010 },
      { type: 'move', x: from.x, y: from.y - 300, time: 1100 },
      { type: 'up', x: from.x, y: from.y - 300, time: 1120 }
    ]);
    await sleep(700);

    expect(getPopups()).toHaveLength(1);

    unmount();
  });
});
