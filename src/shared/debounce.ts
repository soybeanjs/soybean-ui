export function createDebounce() {
  let debounceTimer: number | undefined;

  return {
    debounce<T extends (...args: any[]) => void>(callback: T): T {
      return ((...args: any[]) => {
        if (debounceTimer) {
          cancelAnimationFrame(debounceTimer);
        }
        debounceTimer = requestAnimationFrame(() => {
          callback(...args);
          debounceTimer = undefined;
        });
      }) as T;
    },
    cancel() {
      if (debounceTimer) {
        cancelAnimationFrame(debounceTimer);
        debounceTimer = undefined;
      }
    }
  };
}
