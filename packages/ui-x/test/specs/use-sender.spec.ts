import { describe, expect, it } from 'vitest';
import { effectScope, nextTick } from 'vue';
import { useSender } from '../../src/composables/use-sender';

describe('useSender', () => {
  it('detects a slash trigger and filters suggestions', async () => {
    const scope = effectScope();
    let sender: ReturnType<typeof useSender>;

    scope.run(() => {
      sender = useSender({
        slashSuggestions: [
          { key: 'summarize', label: '/summarize' },
          { key: 'expand', label: '/expand' }
        ]
      });
    });

    const s = sender!;
    s.setValue('Please /su');
    await nextTick();

    expect(s.activeTrigger.value).toBe('slash');
    expect(s.open.value).toBe(true);
    expect(s.suggestions.value.map(x => x.key)).toEqual(['summarize']);

    scope.stop();
  });

  it('selects a suggestion and closes the popover', () => {
    const scope = effectScope();
    let sender: ReturnType<typeof useSender>;

    scope.run(() => {
      sender = useSender({ slashSuggestions: [{ key: 'expand', label: '/expand' }] });
    });

    const s = sender!;
    s.setValue('/ex');
    s.select({ key: 'expand', label: '/expand' });

    expect(s.value.value).toBe('/expand');
    expect(s.activeTrigger.value).toBeNull();
    expect(s.open.value).toBe(false);

    scope.stop();
  });

  it('does not treat an embedded char as a trigger', () => {
    const scope = effectScope();
    let sender: ReturnType<typeof useSender>;

    scope.run(() => {
      sender = useSender({ slashSuggestions: [] });
    });

    const s = sender!;
    s.setValue('a@b.com');
    expect(s.activeTrigger.value).toBeNull();
    expect(s.open.value).toBe(false);

    scope.stop();
  });
});
