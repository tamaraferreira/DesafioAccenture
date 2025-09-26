import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let progressValue = 0;

Given("que eu acesse a página Progress Bar", () => {
  cy.visit("https://demoqa.com/progress-bar");
});
When("eu iniciar a progress bar", () => {
  cy.clock();
  cy.get("#startStopButton").then(($btn) => {
    if ($btn.text() === "Reset") {
      cy.get("#resetButton").click();
    }
  });
  cy.get("#startStopButton").click();
});
When("eu parar a progress bar antes de 25%", () => {
  function advance25() {
    cy.get("#progressBar").invoke("text").then((text) => {
        progressValue = parseInt(text.replace("%", ""), 10);
        if (progressValue < 25) {
          cy.tick(50);
          advance25();
        } else {
          cy.get("#startStopButton").click();
        }
    });
  }
  advance25();
});
Then("o valor da progress bar deve ser menor ou igual a 25%", () => {
  cy.get("#progressBar").invoke("text").then((text) => {
      progressValue = parseInt(text.replace("%", ""), 10);
      expect(progressValue).to.be.lte(25);
  });
});
When("eu iniciar a progress bar novamente", () => {
  cy.get("#startStopButton").click();
});
When("aguardar a progress bar chegar a 100%", () => {
  function advanceUntil100() {
    cy.get("#progressBar").invoke("text").then((text) => {
        progressValue = parseInt(text.replace("%", ""), 10);
        if (progressValue < 100) {
          cy.tick(50);
          advanceUntil100();
        }
      });
  }
  advanceUntil100();
});
Then("eu devo resetar a progress bar", () => {
  cy.get("#resetButton").click();
});
Then("o valor da progress bar deve ser 0%", () => {
  cy.get("#progressBar").invoke("text").should("eq", "0%");
});