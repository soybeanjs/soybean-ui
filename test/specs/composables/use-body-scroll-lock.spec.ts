import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useBodyScrollLock } from '@/composables/use-body-scroll-lock';
import { refreshIOSDetection } from '@/shared/env';

describe('useBodyScrollLock', () => {
  let originalWindow: any;
  let originalDocument: any;
  let mockBody: any;
  let mockDocumentElement: any;

  beforeEach(() => {
    // Store original globals
    originalWindow = globalThis.window;
    originalDocument = globalThis.document;

    // Create mock DOM elements
    mockBody = {
      hasAttribute: vi.fn(),
      setAttribute: vi.fn(),
      removeAttribute: vi.fn(),
      style: {},
      classList: {
        add: vi.fn(),
        remove: vi.fn()
      },
      scrollHeight: 1000,
      clientHeight: 800,
      clientWidth: 800,
      scrollWidth: 800,
      tagName: 'BODY'
    };

    mockDocumentElement = {
      classList: {
        add: vi.fn(),
        remove: vi.fn()
      }
    };

    // Setup window mock
    globalThis.window = {
      scrollY: 100,
      innerHeight: 800,
      scrollTo: vi.fn(),
      navigator: {
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
        maxTouchPoints: 0
      },
      getComputedStyle: vi.fn()
    } as any;

    // Setup document mock
    globalThis.document = {
      body: mockBody,
      documentElement: mockDocumentElement,
      getElementById: vi.fn(),
      createElement: vi.fn(),
      head: {
        appendChild: vi.fn()
      },
      addEventListener: vi.fn(),
      removeEventListener: vi.fn()
    } as any;
  });

  afterEach(() => {
    // Restore original globals
    globalThis.window = originalWindow;
    globalThis.document = originalDocument;
  });

  describe('basic functionality', () => {
    it('should apply scroll lock to body', () => {
      vi.mocked(mockBody.hasAttribute).mockReturnValue(false);
      vi.mocked(globalThis.document.getElementById).mockReturnValue(null);

      const createElement = vi.fn().mockReturnValue({
        id: '',
        textContent: ''
      });
      globalThis.document.createElement = createElement;

      const unlock = useBodyScrollLock();

      expect(mockBody.style.top).toBe('-100px');
      expect(mockBody.classList.add).toHaveBeenCalledWith('scroll-lock-body');
      expect(mockDocumentElement.classList.add).toHaveBeenCalledWith('scroll-lock-html');
      expect(mockBody.setAttribute).toHaveBeenCalledWith('data-scroll-lock', 'true');
      expect(typeof unlock).toBe('function');
    });

    it('should unlock scroll when unlock function is called', () => {
      vi.mocked(mockBody.hasAttribute).mockReturnValue(false);
      vi.mocked(globalThis.document.getElementById).mockReturnValue(null);

      const createElement = vi.fn().mockReturnValue({
        id: '',
        textContent: ''
      });
      globalThis.document.createElement = createElement;

      const unlock = useBodyScrollLock();
      unlock();

      expect(mockBody.classList.remove).toHaveBeenCalledWith('scroll-lock-body', 'scroll-lock-body-with-scrollbar');
      expect(mockDocumentElement.classList.remove).toHaveBeenCalledWith('scroll-lock-html');
      expect(mockBody.style.top).toBe('');
      expect(mockBody.removeAttribute).toHaveBeenCalledWith('data-scroll-lock');
      expect(globalThis.window.scrollTo).toHaveBeenCalledWith(0, 100);
    });

    it('should add scrollbar class when vertical scrollbar is needed', () => {
      vi.mocked(mockBody.hasAttribute).mockReturnValue(false);
      mockBody.scrollHeight = 1200; // Greater than window.innerHeight (800)
      vi.mocked(globalThis.document.getElementById).mockReturnValue(null);

      const createElement = vi.fn().mockReturnValue({
        id: '',
        textContent: ''
      });
      globalThis.document.createElement = createElement;

      useBodyScrollLock();

      expect(mockBody.classList.add).toHaveBeenCalledWith('scroll-lock-body-with-scrollbar');
    });

    it('should not add scrollbar class when no vertical scrollbar is needed', () => {
      vi.mocked(mockBody.hasAttribute).mockReturnValue(false);
      mockBody.scrollHeight = 600; // Less than window.innerHeight (800)
      vi.mocked(globalThis.document.getElementById).mockReturnValue(null);

      const createElement = vi.fn().mockReturnValue({
        id: '',
        textContent: ''
      });
      globalThis.document.createElement = createElement;

      useBodyScrollLock();

      expect(mockBody.classList.add).not.toHaveBeenCalledWith('scroll-lock-body-with-scrollbar');
    });
  });

  describe('CSS injection', () => {
    it('should inject CSS styles when not already present', () => {
      vi.mocked(mockBody.hasAttribute).mockReturnValue(false);
      vi.mocked(globalThis.document.getElementById).mockReturnValue(null);

      const mockStyleElement = {
        id: '',
        textContent: ''
      };
      const createElement = vi.fn().mockReturnValue(mockStyleElement);
      globalThis.document.createElement = createElement;

      useBodyScrollLock();

      expect(createElement).toHaveBeenCalledWith('style');
      expect(mockStyleElement.id).toBe('scroll-lock-styles');
      expect(mockStyleElement.textContent).toContain('.scroll-lock-body');
      expect(globalThis.document.head.appendChild).toHaveBeenCalledWith(mockStyleElement);
    });

    it('should not inject CSS styles when already present', () => {
      vi.mocked(mockBody.hasAttribute).mockReturnValue(false);
      vi.mocked(globalThis.document.getElementById).mockReturnValue({ id: 'scroll-lock-styles' } as any);

      const createElement = vi.fn();
      globalThis.document.createElement = createElement;

      useBodyScrollLock();

      expect(createElement).not.toHaveBeenCalled();
      expect(globalThis.document.head.appendChild).not.toHaveBeenCalled();
    });
  });

  describe('multiple lock prevention', () => {
    it('should return empty function when body already has scroll lock', () => {
      vi.mocked(mockBody.hasAttribute).mockReturnValue(true);

      const unlock = useBodyScrollLock();

      expect(mockBody.classList.add).not.toHaveBeenCalled();
      expect(mockBody.setAttribute).not.toHaveBeenCalled();
      expect(typeof unlock).toBe('function');

      // Calling unlock should do nothing
      unlock();
      expect(mockBody.classList.remove).not.toHaveBeenCalled();
    });
  });

  describe('iOS touch handling', () => {
    beforeEach(() => {
      // Mock iOS user agent - use a user agent that matches /iP(?:ad|hone|od)/
      Object.defineProperty(globalThis.window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15',
        writable: true,
        configurable: true
      });
      // Refresh iOS detection to clear cache and re-detect with new user agent
      refreshIOSDetection();
    });

    it('should setup touch event listeners on iOS devices', () => {
      vi.mocked(mockBody.hasAttribute).mockReturnValue(false);
      vi.mocked(globalThis.document.getElementById).mockReturnValue(null);

      const createElement = vi.fn().mockReturnValue({
        id: '',
        textContent: ''
      });
      globalThis.document.createElement = createElement;

      const unlock = useBodyScrollLock();

      expect(globalThis.document.addEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function), {
        passive: false
      });

      // Clean up should remove event listener
      unlock();
      expect(globalThis.document.removeEventListener).toHaveBeenCalledWith('touchmove', expect.any(Function));
    });
  });

  describe('non-iOS devices', () => {
    beforeEach(() => {
      // Mock non-iOS user agent
      Object.defineProperty(globalThis.window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        writable: true,
        configurable: true
      });
      Object.defineProperty(globalThis.window.navigator, 'maxTouchPoints', {
        value: 0,
        writable: true,
        configurable: true
      });
      // Refresh iOS detection to clear cache and re-detect with new user agent
      refreshIOSDetection();
    });

    it('should not setup touch event listeners on non-iOS devices', () => {
      vi.mocked(mockBody.hasAttribute).mockReturnValue(false);
      vi.mocked(globalThis.document.getElementById).mockReturnValue(null);

      const createElement = vi.fn().mockReturnValue({
        id: '',
        textContent: ''
      });
      globalThis.document.createElement = createElement;

      const unlock = useBodyScrollLock();

      expect(globalThis.document.addEventListener).not.toHaveBeenCalled();

      // Clean up should not try to remove non-existent listener
      unlock();
      expect(globalThis.document.removeEventListener).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should handle missing window properties gracefully', () => {
      vi.mocked(mockBody.hasAttribute).mockReturnValue(false);
      vi.mocked(globalThis.document.getElementById).mockReturnValue(null);
      globalThis.window.scrollY = undefined as any;

      const createElement = vi.fn().mockReturnValue({
        id: '',
        textContent: ''
      });
      globalThis.document.createElement = createElement;

      expect(() => useBodyScrollLock()).not.toThrow();
    });

    it('should handle zero scroll position', () => {
      vi.mocked(mockBody.hasAttribute).mockReturnValue(false);
      vi.mocked(globalThis.document.getElementById).mockReturnValue(null);
      globalThis.window.scrollY = 0;

      const createElement = vi.fn().mockReturnValue({
        id: '',
        textContent: ''
      });
      globalThis.document.createElement = createElement;

      const unlock = useBodyScrollLock();

      expect(mockBody.style.top).toBe('-0px');

      unlock();
      expect(globalThis.window.scrollTo).toHaveBeenCalledWith(0, 0);
    });

    it('should handle large scroll position', () => {
      vi.mocked(mockBody.hasAttribute).mockReturnValue(false);
      vi.mocked(globalThis.document.getElementById).mockReturnValue(null);
      globalThis.window.scrollY = 500;

      const createElement = vi.fn().mockReturnValue({
        id: '',
        textContent: ''
      });
      globalThis.document.createElement = createElement;

      const unlock = useBodyScrollLock();

      expect(mockBody.style.top).toBe('-500px');

      unlock();
      expect(globalThis.window.scrollTo).toHaveBeenCalledWith(0, 500);
    });
  });
});
