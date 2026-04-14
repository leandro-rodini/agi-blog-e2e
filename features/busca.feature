# language: pt
Funcionalidade: Busca no Blog do Agi

  Esquema do Cenário: Validar se o menu carregou corretamente
    Dado que acesso a página "<url>"
    E o menu principal está visível
    Quando clico na lupa de pesquisa
    Então o campo de digitação da pesquisa deve ser exibido

    Exemplos:
      | url             |
      | /               |
      | /noticias       |
      | /cartoes        |
      | /servicos       |
      | /suas-financas/ |

  Cenário: Validar preview de busca
    Dado que acesso a página "/"
    Quando abro a barra de pesquisa
    E digito "dinheiro" no campo de busca
    Então devo ver uma caixa com artigos relacionados à minha pesquisa

  Cenário: Validar comportamento ao realizar busca por termo inexistente
    Dado que acesso a página "/"
    E abro a barra de pesquisa
    Quando digito "xptoblabla12345" no campo de busca
    E aperto Enter
    Então devo ser redirecionado para a página "/?s=xptoblabla12345"
    E devo ver a mensagem informando que nenhum resultado foi encontrado

  Cenário: Validar comportamento ao realizar busca por termo inexistente clicando no botão de buscar
    Dado que acesso a página "/"
    E abro a barra de pesquisa
    Quando digito "xptoblabla12345" no campo de busca
    E clico no botão de buscar
    Então devo ser redirecionado para a página "/?s=xptoblabla12345"
    E devo ver a mensagem informando que nenhum resultado foi encontrado
