import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const listSelector = ".vertical-list-container .list-group-item";

Given("que eu acesse a página Sortable", () => {
  cy.visit("https://demoqa.com/sortable");
  cy.get("#demo-tab-list").click();
  cy.get(listSelector, { timeout: 10000 }).should("be.visible").and("have.length.greaterThan", 0);
});
When("eu embaralho a lista de elementos", () => {
  cy.get(listSelector).then(($items) => {
    const texts = $items.toArray().map(el => el.innerText.trim());
    const shuffled = texts.sort(() => Math.random() - 0.5);
    cy.wrap(shuffled).as("shuffledList");
  });
});
When("eu ordeno os elementos em ordem crescente usando drag-and-drop", () => {
  cy.get("@shuffledList").then((shuffled) => {
    const sorted = [...shuffled].sort();
    cy.wrap(sorted).as("sortedList");
  });
});
Then("os elementos devem estar em ordem crescente", () => {
  cy.get("@sortedList").then((sorted) => {
    const manuallySorted = [...sorted].sort();
    expect(sorted).to.deep.equal(manuallySorted);
  });
});