import { defineConfig } from 'vite-plus';
import UnoCSS from 'unocss/vite';
import { ubeanPlugin } from 'ubean/vite';

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  plugins: [ubeanPlugin(), UnoCSS()],
  optimizeDeps: {
    // `@soybeanjs/headless` dev exports are stubbed to src. If the dep
    // optimizer bundles `@soybeanjs/ui`, it inlines headless JS into the
    // optimized chunk while keeping headless .vue files external, creating
    // two instances of each context module whose `Symbol()` provide/inject
    // keys differ (hydration class mismatch on ProgressProvider etc.).
    exclude: ['@soybeanjs/ui', '@soybeanjs/headless']
  }
});
