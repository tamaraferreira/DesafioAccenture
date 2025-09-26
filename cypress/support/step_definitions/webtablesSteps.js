import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";

let register;

Given("que eu acesse a página Web Tables", () => {
    cy.visit("https://demoqa.com/webtables");
});
When("eu criar um novo registro com dados aleatórios", () => {
    register = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 80 }),
        salary: faker.number.int({ min: 1000, max: 10000 }),
        department: faker.commerce.department()
    };

    cy.get("#addNewRecordButton").click();
    cy.get("#firstName").type(register.firstName);
    cy.get("#lastName").type(register.lastName);
    cy.get("#userEmail").type(register.email);
    cy.get("#age").type(register.age.toString());
    cy.get("#salary").type(register.salary.toString());
    cy.get("#department").type(register.department);
    cy.get("#submit").click();
});
Then("o registro criado deve aparecer na tabela", () => {
    cy.contains(".rt-tr-group", register.firstName).should("be.visible")
    .and("contain.text", register.lastName);
});
When("eu editar o registro criado", () => {
    cy.contains(".rt-tr-group", register.firstName).find("#edit-record-4 > svg").click();
    register.department = faker.commerce.department();
    cy.get("#department").clear().type(register.department);
    cy.get("#submit").click();
});
Then("o campo editado deve ser atualizado", () => {
    cy.contains(".rt-tr-group", register.firstName).should("contain.text", register.department);
});
When("eu deletar o registro criado", () => {
    cy.contains(".rt-tr-group", register.firstName).find("[title='Delete']").click();
});
Then("o registro não deve mais existir na tabela", () => {
    cy.contains(".rt-tr-group", register.firstName).should("not.exist");
});