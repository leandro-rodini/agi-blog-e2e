import { Page, Locator, expect } from '@playwright/test';

export class NavbarPage {
  private readonly lupaIcon: Locator;
  private readonly searchLink: Locator;
  private readonly searchOverlay: Locator;
  private readonly searchField: Locator;
  private readonly searchButton: Locator;
  private readonly searchPanel: Locator;

  constructor(private readonly page: Page) {
    this.lupaIcon = page
      .locator('.ast-search-icon > .full-screen > .icon-search')
      .first();
    this.searchLink = page.locator('#ast-desktop-header a.astra-search-icon.full-screen').first();
    this.searchOverlay = page.locator('#ast-seach-full-screen-form');
    this.searchField = page.locator('#ast-seach-full-screen-form input.search-field').first();
    this.searchButton = page.locator('#search_submit');
    this.searchPanel = page
      .locator('.search-form > div')
      .first();
  }

  getLupaIcon(): Locator {
    return this.lupaIcon;
  }

  getSearchField(): Locator {
    return this.searchField;
  }

  getSearchPanel(): Locator {
    return this.searchPanel;
  }

  async openSearch(): Promise<void> {
    await this.searchLink.waitFor({ state: 'attached' });
    await this.searchLink.click({ force: true });
    await expect(this.searchOverlay).toBeVisible();
    await expect(this.searchField).toBeVisible();
  }

  async openSearchByJs(): Promise<void> {
    await this.searchLink.waitFor({ state: 'attached' });
    await this.searchLink.evaluate((el) => {
      (el as HTMLElement).click();
    });
    await expect(this.searchOverlay).toBeVisible();
    await expect(this.searchField).toBeVisible();
  }

  async typeInSearch(term: string): Promise<void> {
    await expect(this.searchField).toBeVisible();
    await this.searchField.fill('');
    await this.searchField.pressSequentially(term);
  }

  async pressEnter(): Promise<void> {
    await expect(this.searchField).toBeVisible();
    await this.searchField.press('Enter');
  }

  async clickSearchButton(): Promise<void> {
    await expect(this.searchButton).toBeVisible();
    await this.searchButton.click();
  }
}