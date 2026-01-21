import { computed, ref } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import { useConfigProvider, useDirection } from '../../../headless/src/components/config-provider/context';

// Mock the config provider context
vi.mock('../../../headless/src/components/config-provider/context', () => ({
  useConfigProvider: vi.fn()
}));

const mockedUseConfigProvider = vi.mocked(useConfigProvider);

describe('useDirection', () => {
  it('should return ltr as default direction', () => {
    mockedUseConfigProvider.mockReturnValue(null);

    const direction = useDirection();
    expect(direction.value).toBe('ltr');
  });

  it('should use provided direction', () => {
    mockedUseConfigProvider.mockReturnValue(null);

    const direction = useDirection('rtl');
    expect(direction.value).toBe('rtl');
  });

  it('should use reactive direction', () => {
    mockedUseConfigProvider.mockReturnValue(null);

    const dir = ref<'ltr' | 'rtl'>('ltr');
    const direction = useDirection(dir);

    expect(direction.value).toBe('ltr');

    dir.value = 'rtl';
    expect(direction.value).toBe('rtl');
  });

  it('should use computed direction', () => {
    mockedUseConfigProvider.mockReturnValue(null);

    const isRtl = ref(false);
    const computedDir = computed(() => (isRtl.value ? 'rtl' : 'ltr'));
    const direction = useDirection(computedDir);

    expect(direction.value).toBe('ltr');

    isRtl.value = true;
    expect(direction.value).toBe('rtl');
  });

  it('should use getter function direction', () => {
    mockedUseConfigProvider.mockReturnValue(null);

    const currentDir = ref<'ltr' | 'rtl'>('ltr');
    const direction = useDirection(() => currentDir.value);

    expect(direction.value).toBe('ltr');

    currentDir.value = 'rtl';
    expect(direction.value).toBe('rtl');
  });

  it('should fallback to context direction when no dir provided', () => {
    const contextDir = ref<'ltr' | 'rtl'>('rtl');
    mockedUseConfigProvider.mockReturnValue({
      dir: contextDir
    } as any);

    const direction = useDirection();
    expect(direction.value).toBe('rtl');

    contextDir.value = 'ltr';
    expect(direction.value).toBe('ltr');
  });

  it('should prefer provided direction over context', () => {
    const contextDir = ref<'ltr' | 'rtl'>('rtl');
    mockedUseConfigProvider.mockReturnValue({
      dir: contextDir
    } as any);

    const direction = useDirection('ltr');
    expect(direction.value).toBe('ltr');
  });

  it('should fallback to context when provided direction is undefined', () => {
    const contextDir = ref<'ltr' | 'rtl'>('rtl');
    mockedUseConfigProvider.mockReturnValue({
      dir: contextDir
    } as any);

    const dir = ref<'ltr' | 'rtl' | undefined>(undefined);
    const direction = useDirection(dir);
    expect(direction.value).toBe('rtl');

    dir.value = 'ltr';
    expect(direction.value).toBe('ltr');
  });

  it('should fallback to ltr when both provided and context are undefined', () => {
    mockedUseConfigProvider.mockReturnValue(null);

    const dir = ref<'ltr' | 'rtl' | undefined>(undefined);
    const direction = useDirection(dir);
    expect(direction.value).toBe('ltr');
  });
});
