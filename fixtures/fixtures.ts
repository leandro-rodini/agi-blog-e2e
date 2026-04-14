import { test as base } from 'playwright-bdd';
import { NavbarPage } from '../pages/NavbarPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

type Fixtures = {
  navbarPage: NavbarPage;
  searchResultsPage: SearchResultsPage;
  siteFullPageScreenshot: void;
};

export const test = base.extend<Fixtures>({
  page: async ({ page }, use, testInfo) => {
    const pageErrors: string[] = [];

    page.on('pageerror', (error) => {
      pageErrors.push(error.message);
    });

    await page.addInitScript(() => {
      const styleId = '__playwright_disable_wordpress_motion__';
      const css = `
        *, *::before, *::after {
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
          scroll-behavior: auto !important;
        }
      `;

      const injectStyle = () => {
        if (document.getElementById(styleId)) {
          return;
        }

        const target = document.head ?? document.documentElement;
        if (!target) {
          return;
        }

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = css;
        target.appendChild(style);
      };

      injectStyle();
      document.addEventListener('DOMContentLoaded', injectStyle);
    });

    await use(page);

    if (pageErrors.length > 0) {
      await testInfo.attach('page-errors.log', {
        body: pageErrors.join('\n\n'),
        contentType: 'text/plain',
      });
    }
  },
  navbarPage: async ({ page }, use) => {
    await use(new NavbarPage(page));
  },

  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },

  siteFullPageScreenshot: [
    async ({ page }, use, testInfo) => {
      await use();

      const screenshot = await page.screenshot({ fullPage: true, type: 'png' });
      await testInfo.attach('full-page.png', {
        body: screenshot,
        contentType: 'image/png',
      });
    },
    { auto: true },
  ],
});
