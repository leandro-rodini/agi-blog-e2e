import { Locator, Page } from '@playwright/test';

export class SearchResultsPage {
  private readonly resultsContent: Locator;

  constructor(private readonly page: Page) {
    this.resultsContent = page.locator('.page-content').first();
  }

  getResultsContent(): Locator {
    return this.resultsContent;
  }
}
