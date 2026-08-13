import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { nextTick, defineComponent, h, shallowRef } from 'vue';
import { mount } from '@vue/test-utils';
import type { VueWrapper } from '@vue/test-utils';
import { useDismissableLayer } from '../../../../headless/src/composables/use-dismissable-layer';

// Minimal layer that wires the composable to a real element. `present` controls whether the
// layer element is rendered (mirroring how popup impls are gated by `v-if="isPresent"`).
const TestLayer = defineComponent({
  props: {
    disable: { type: Boolean, default: false },
    present: { type: Boolean, default: true }
  },
  setup(props) {
    const layerElement = shallowRef<HTMLElement | undefined>();

    useDismissableLayer(layerElement, {
      disableOutsidePointerEvents: () => props.disable
    });

    return () => (props.present ? h('div', { ref: layerElement, 'data-dismissable-layer': '' }) : null);
  }
});

let wrappers: VueWrapper[] = [];

async function mountLayer(disable = true, present = true): Promise<VueWrapper> {
  const wrapper = mount(TestLayer, {
    props: { disable, present },
    attachTo: document.body
  });
  wrappers.push(wrapper);
  // Let the element ref settle and the layer watcher run.
  await nextTick();
  await nextTick();
  return wrapper;
}

const flush = () => Promise.resolve().then(() => nextTick());

describe('useDismissableLayer body pointer-events', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.body.style.pointerEvents = '';
  });

  afterEach(() => {
    // Unmounting every mounted layer drains the module-level layer registry, restoring the
    // body's pointer-events and leaving a clean slate for the next test.
    wrappers.forEach(wrapper => wrapper.unmount());
    wrappers = [];
    document.body.style.pointerEvents = '';
  });

  it('locks body pointer-events while a disabling layer is present and restores on close', async () => {
    const wrapper = await mountLayer(true, true);
    expect(document.body.style.pointerEvents).toBe('none');

    await wrapper.setProps({ present: false });
    await flush();
    expect(document.body.style.pointerEvents).toBe('');
  });

  it('keeps body pointer-events locked when a nested layer closes while an outer layer stays open', async () => {
    const outer = await mountLayer(true, true);
    expect(document.body.style.pointerEvents).toBe('none');

    // Open a nested disabling layer on top.
    const inner = await mountLayer(true, true);
    expect(document.body.style.pointerEvents).toBe('none');

    // Close the inner layer while the outer is still open (#2674).
    await inner.setProps({ present: false });
    await flush();
    expect(document.body.style.pointerEvents).toBe('none');

    // Closing the outer layer restores the body.
    await outer.setProps({ present: false });
    await flush();
    expect(document.body.style.pointerEvents).toBe('');
  });

  it('restores and re-locks the body when a single mounted layer toggles disableOutsidePointerEvents', async () => {
    const wrapper = await mountLayer(true, true);
    expect(document.body.style.pointerEvents).toBe('none');

    // Toggle the prop off without unmounting (e.g. a modal Menu closing while mounted).
    await wrapper.setProps({ disable: false });
    await flush();
    expect(document.body.style.pointerEvents).toBe('');

    // Toggling back on locks the body again (a stale entry would keep `size === 0` false).
    await wrapper.setProps({ disable: true });
    await flush();
    expect(document.body.style.pointerEvents).toBe('none');
  });
});
