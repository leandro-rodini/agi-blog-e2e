# Agi Blog E2E Challenge

Automação de testes E2E para o [Blog do Agi](https://blogdoagi.com.br/), com foco em cobertura funcional, legibilidade da suíte e execução em CI.

A proposta aqui não foi montar uma suíte gigante. A ideia foi validar os pontos que realmente importam para a experiência do usuário na busca do blog.

# Diagrama da pipeline

![Fluxo da pipeline no GitHub Actions](docs/github-actions-pipeline-flow.gif)

## Relatório público (GitHub Pages)

**Acesse o relatório público no GitHub Pages.**

URL: https://leandro-rodini.github.io/agi-blog-e2e/

## O que este projeto cobre

- Abertura do campo de busca em diferentes páginas;
- Pesquisa com termo inexistente e validação da mensagem de nenhum resultado;
- Redirecionamento para página de resultados ao pesquisar com `Enter`.

Os testes validam o fluxo principal, caminho alternativo e navegação consistente entre páginas.

## Por que montei assim

A estrutura foi pensada para ficar simples de entender e fácil de manter em contexto de avaliação técnica.

- `Playwright` pela estabilidade e velocidade em automação web moderna.
- Em um site feito em `WordPress`, essa escolha faz ainda mais sentido, porque o front costuma ter mais dependência de JavaScript, elementos assíncronos, mudanças de tema/plugin e maior risco de flakiness. O `Playwright` ajuda nesse cenário com auto-wait, boas ferramentas de debug e maior resiliência para interações que mudam com frequência.
- `TypeScript` para clareza e menor risco de erros de implementação.
- `playwright-bdd` para aproximar negócio e teste com cenários em Gherkin, ajudando na comunicação com PO/PM e outros colaboradores não técnicos.
- `Page Object Model` para separar regra de teste da camada de interação com UI.
- `GitHub Actions` para execução padronizada fora da máquina local.

## Estrutura do projeto

```text
agi-blog-e2e/
|-- .github/
|   `-- workflows/
|       `-- playwright.yml
|-- features/
|   `-- busca.feature
|-- fixtures/
|   `-- fixtures.ts
|-- pages/
|   `-- NavbarPage.ts
|   `-- SearchResultsPage.ts
|-- steps/
|   `-- busca.steps.ts
|-- docs/
|   `-- github-actions-pipeline-flow.gif
|-- playwright.config.ts
|-- package.json
|-- tsconfig.json
`-- README.md
```

### Papel de cada parte

- `features/`: cenários escritos em Gherkin.
- `steps/`: ligação entre linguagem natural e implementação.
- `pages/`: seletores e ações encapsulados por página/componente.
- `fixtures/`: setup compartilhado da suíte.
- `.github/workflows/`: pipeline de execução automatizada.

## Estratégia de teste

A estratégia foi objetiva:

- Validar o caminho feliz da busca;
- Validar ausência de resultado com termo inexistente;
- Validar comportamento por teclado (`Enter`);
- Manter a suíte rápida para execução em CI;
- Executar em múltiplos browsers (`chromium` e `firefox`).

## Configuração da base URL

A URL base está centralizada em `playwright.config.ts`, evitando repetição e facilitando manutenção.

## Como executar

### Pré-requisitos

- Node.js 24 ou superior
- npm

### Instalar dependências

```bash
npm install
npx playwright install
```

### Rodar a suite

```bash
npm test
```

### Rodar em modo headed

```bash
npm run test:headed
```

### Rodar por browser

```bash
npm run test:chromium
npm run test:firefox
```

### Abrir relatório HTML local

```bash
npm run test:report
```

## Pipeline

O workflow está em [.github/workflows/playwright.yml](.github/workflows/playwright.yml).

Ele cobre o essencial para uma entrega de QA:

- Roda em `push`, `pull_request` e execução manual;
- Instala dependências e browsers do Playwright;
- Gera os arquivos BDD com `bddgen`;
- Executa E2E em `chromium` e `firefox`;
- Publica artefatos do relatório HTML;
- Grava vídeo das execuções de teste;
- Anexa screenshot `full-page` no report para facilitar debug visual;
- Publica traces quando há falha;
- Publica o relatório no GitHub Pages em `main`/`master`;
- Sempre exibe a URL do relatório no final do job de deploy e no Job Summary.


## Observações práticas

- O deploy no GitHub Pages não roda em `pull_request`.
- O relatório publicado no Pages usa o resultado do job de `chromium`.
- A organização atual facilita adicionar novos cenários sem quebrar a estrutura.

## O que eu manteria se fosse evoluir isso para um cenário real

1. Ampliar cobertura para outros fluxos críticos do blog;
2. Adicionar tags por prioridade e tipo de cenário;
3. Separar suites `smoke` e `regressão`;
4. Incluir verificações básicas de acessibilidade;
5. Criar histórico de relatórios por execução no Pages.
