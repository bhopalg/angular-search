import 'jest-preset-angular';
import 'jest-localstorage-mock';
import 'hammerjs';
(global as any)['CSS'] = null;

/**
 * ISSUE: https://github.com/angular/material2/issues/7101
 * Workaround for JSDOM missing transform property
 */
Object.defineProperty(document.body.style, 'transform', {
  value: (): { enumerable: boolean; configurable: boolean } => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

window.matchMedia =
  window.matchMedia ||
  function(): any {
    return {
      matches: false,
      addListener: function(): void {},
      removeListener: function(): void {},
    };
  };
