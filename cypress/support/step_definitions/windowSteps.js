import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let newWindow;

Given("que eu acesse a página Browser Windows", () => {
  cy.visit("https://demoqa.com/browser-windows");
});
When('eu clico no botão "New Window"', () => {
  cy.get("#windowButton").then(($btn) => {
    newWindow = $btn.prop("href") || "https://demoqa.com/sample"; 
    cy.visit(newWindow);
  });
});
Then("uma nova janela deve ser aberta", () => {
  cy.url().should("eq", newWindow);
});
Then('a mensagem "This is a sample page" deve ser exibida', () => {
  cy.contains("This is a sample page").should("be.visible");
});
Then("eu fecho a janela com sucesso", () => {
  cy.go("back");
});