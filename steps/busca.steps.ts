import { createBdd } from 'playwright-bdd';
import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

Given('que acesso a página {string}', async ({ page }, url: string) => {
  await page.goto(url);
});

Then('o menu principal está visível', async ({ navbarPage }) => {
  await expect(navbarPage.getLupaIcon()).toBeVisible();
});

Then('devo ver o ícone de lupa na barra de navegação', async ({ navbarPage }) => {
  await expect(navbarPage.getLupaIcon()).toBeVisible();
});

When('clico na lupa de pesquisa', async ({ navbarPage }) => {
  await navbarPage.openSearch();
});

When('abro a barra de pesquisa', async ({ navbarPage }) => {
  await navbarPage.openSearchByJs();
});

Then('o campo de digitação da pesquisa deve ser exibido', async ({ navbarPage }) => {
  await expect(navbarPage.getSearchField()).toBeVisible();
});

When('digito {string} no campo de busca', async ({ navbarPage }, term: string) => {
  await navbarPage.typeInSearch(term);
});

When('aperto Enter', async ({ navbarPage }) => {
  await navbarPage.pressEnter();
});

When('clico no botão de buscar', async ({ navbarPage }) => {
  await navbarPage.clickSearchButton();
});

Then('devo ver uma caixa com artigos relacionados à minha pesquisa', async ({ navbarPage }) => {
  await expect(navbarPage.getSearchPanel()).toBeVisible();
});

Then('devo ser redirecionado para a página {string}', async ({ page }, path: string) => {
  await expect(page).toHaveURL(new RegExp(path.replace(/[.*+?^${}()|[]\]/g, '\$&')));
});

Then('devo ver a mensagem informando que nenhum resultado foi encontrado', async ({ searchResultsPage }) => {
  const content = searchResultsPage.getResultsContent();
  await expect(content).toBeVisible();
  await expect(content).toContainText(
    'Lamentamos, mas nada foi encontrado para sua pesquisa, tente novamente com outras palavras.',
  );
});