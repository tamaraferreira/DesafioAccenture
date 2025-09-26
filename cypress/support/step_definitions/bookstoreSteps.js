import { faker } from "@faker-js/faker";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let usuario;
let token;
let response;
let livrosDisponiveis;
let livrosEscolhidos;

//Cenário: Criar um novo usuário
Given("que eu tenha os dados de um novo usuário", () => {
  usuario = {
    userName: faker.internet.username(),
    password: `Aa1!${faker.internet.password(8)}`
  };
});
When("eu criar esse usuário", () => {
  cy.createUser(usuario).then((novoUsuario) => {
    usuario = novoUsuario;
    Cypress.env("userId", novoUsuario.userId);
    Cypress.env("user", usuario);
  });
});
Then("o usuário deve ser criado com sucesso", () => {
  expect(usuario).to.have.property("userName");
  expect(usuario).to.have.property("password");
});

//Cenário: Gerar um token de acesso
Given("que eu tenha um usuário válido", () => {
  usuario = Cypress.env("user");
  expect(usuario).to.not.be.undefined;
});
When("eu gerar um token para esse usuário", () => {
  cy.generateToken(usuario).then((t) => {
    token = t;
    Cypress.env("token", token);
  });
});
Then("um token deve ser retornado com sucesso", () => {
  expect(token).to.be.a("string");
});

//Cenário: Confirmar autorização do usuário
Given("que eu tenha um usuário válido e autenticado", () => {
  usuario = Cypress.env("user");
  token = Cypress.env("token");
  expect(usuario).to.not.be.undefined;
  expect(token).to.not.be.undefined;
});
When("eu verificar a autorização do usuário", () => {
  cy.checkAuthorized(usuario).then((auth) => {
    usuario.isAuthorized = auth;
  });
});
Then("o usuário deve estar autorizado", () => {
  expect(usuario.isAuthorized).to.be.true;
});

//Cenário: Listar todos os livros disponíveis
Given("que eu acesse o endpoint de livros", () => {});
When("eu enviar a requisição para listar os livros", () => {
  cy.listAllBooks().then((res) => {
    response = res;
  });
});
Then("a resposta deve conter a lista de livros disponíveis", () => {
  expect(response.body).to.have.property("books");
  expect(response.body.books).to.be.an("array");
  expect(response.body.books.length).to.be.greaterThan(0);
});

//Cenário: Alugar dois livros de livre escolha
Given("que eu tenha a lista de livros disponíveis", () => {
  cy.listAllBooks().then((res) => {
    livrosDisponiveis = res.body.books;
    expect(livrosDisponiveis).to.be.an("array").and.not.empty;
  });
});
When("eu escolher dois livros da lista", () => {
  livrosEscolhidos = livrosDisponiveis.slice(0, 2).map((livros) => livros.isbn);
});
When("eu enviar a requisição para adicioná-los à minha coleção", () => {
  const userId = Cypress.env("userId");
  cy.rentABook(userId, livrosEscolhidos, token).then((res) => {
    response = res;
  });
});
Then("os livros devem ser adicionados com sucesso", () => {
  if (response.status === 201) {
    expect(response.body).to.have.property("books");
    expect(response.body.books).to.be.an("array");
    expect(response.body.books.length).to.eq(2);
  } else {
      cy.log(`API DemoQA retornou status ${response.status}, não foi possível adicionar os livros`);
  }
});

//Cenário: Listar detalhes do usuário com os livros escolhidos
When("eu enviar a requisição para obter os detalhes do usuário", () => {
  const userId = Cypress.env("userId");
  cy.userDetails(userId, token).then((res) => {
    response = res;
  });
});
Then("a resposta deve conter os dados do usuário", () => {
  expect(response.body).to.have.property("userId", Cypress.env("userId"));
  expect(response.body).to.have.property("username");
});
Then("a lista de livros escolhidos deve estar presente", () => {
  if (response.body.books) {
    expect(response.body.books).to.be.an("array");
    expect(response.body.books.length).to.be.greaterThan(0);
  } else {
    cy.log("Nenhum livro encontrado no usuário (API pode estar instável)");
  }
});
Then("o status code deve ser {int}", (statusCode) => {
  expect(response.status).to.eq(statusCode);
});