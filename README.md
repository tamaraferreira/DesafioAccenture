# Desafio Accenture - Case de automação de testes
Desafio de automação de testes para o cargo de QA Automation Engineer na Accenture.
A automação foi desenvolvida em Cypress com Javascript, utilizando Cucumber com BDD.

##Cenários automátizados

- API: validação do fluxo da loja de livros
  - Criar um novo usuário
  - Gerar um token de acesso
  - Confirmar autorização do usuário
  - Listar todos os livros disponíveis
  - Alugar dois livros de livre escolha
  - Listar detalhes do usuário com os livros escolhidos
 
- Front-end: validações de diversos elementos web
  - Formulário: Preencher e enviar o formulário com sucesso
  - Progress Bar: Manipular a progress bar
  - Ordenação: Embaralhar e ordenar a lista
  - Web Tables: Criar, editar e deletar um registro
  - Janela: Abrir nova janela e validar mensagem
 ---
 ## Pré-requisitos

- [Node.js](https://nodejs.org/) - Versão recomendada: 18 ou superior;
- [npm](https://www.npmjs.com/) - Gerenciador de pacotes;
- [Google Chrome](https://www.google.com/chrome/) - Versão mais recente;
- [Git](https://git-scm.com/) - Instalado e configurado na sua máquina;

---
## Configuração e execução dos testes

1. Clone o repositório do GitHub:

```bash
git clone https://github.com/tamaraferreira/DesafioAccenture.git
```

2. Navegue até a pasta do projeto e instale as dependências:
```bash
cd DesafioAccenture
npm install
```
3. Os testes foram divididos em seis arquivos diferentes:
- bookstore.feature
- form.feature
- progressbar.feature
- sort.feature
- webtables.feature
- window.feature

## Executando os testes:

**Modo interativo (headed):**
```bash
npx cypress open
```

- Selecione o Google Chrome como navegador;
- Clique em "Start E2E Testing";
- Escolha qual arquivo .feature deseja executar;

**Executar uma feature específica:**
```bash
npm run test:feature "cypress/e2e/features/sort.feature"
```

- Substitua o caminho pelo arquivo .feature desejado
---
## Outras tecnologias utilizadas
- [faker.js](https://www.npmjs.com/package/@faker-js/faker)
- [cypress-cucumber-preprocessor](https://www.npmjs.com/package/@badeball/cypress-cucumber-preprocessor)
- [cypress-drag-drop](https://www.npmjs.com/package/@4tw/cypress-drag-drop)
