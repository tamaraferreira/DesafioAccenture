import { faker } from "@faker-js/faker";
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const filePath = "image.jpg";

Given("que eu acesse a página do formulário", () => {
    cy.visit("https://demoqa.com/automation-practice-form");
});
When("eu preencher todos os campos com valores aleatórios", () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const phone = faker.number.int("##########");

    cy.get("#firstName").clear().type(firstName);
    cy.get("#lastName").clear().type(lastName);
    cy.get("#userEmail").clear().type(email);

    const genders = ["Male", "Female", "Other"];
    const chosenGender = faker.helpers.arrayElement(genders);
    cy.contains("label", chosenGender).click();

    cy.get("#userNumber").clear().type(phone);

    const birthDate = faker.date.past(100);
    const year = birthDate.getFullYear().toString();
    const month = birthDate.toLocaleString("en-US", { month: "long" });
    const day = birthDate.getDate().toString().padStart(2, "0");

    cy.get("#dateOfBirthInput").click();
    cy.get(".react-datepicker__year-select").select(year);
    cy.get(".react-datepicker__month-select").select(month);
    cy.get(`.react-datepicker__day--0${day}`).not(".react-datepicker__day--outside-month").click();

    const subjects = ["Maths", "English", "Chemistry", "Computer Science", "Commerce", "Economics",
    "Arts", "Physics", "Biology"];
    const chosenSubject = faker.helpers.arrayElement(subjects);
    cy.get("#subjectsInput").type(`${chosenSubject}{enter}`);

    const hobbies = ["Sports", "Reading", "Music"];
    const chosenHobby = faker.helpers.arrayElement(hobbies);
    cy.contains("label", chosenHobby).click();

    cy.get("#currentAddress").type(faker.location.streetAddress());
    cy.get("#state").click();

    cy.get(".css-26l3qy-menu").last().find(".css-yt9ioa-option").then(($options) => {
        const idx = Math.floor(Math.random() * $options.length);
        cy.wrap($options[idx]).click();
        cy.wrap($options[idx]).invoke("text").then((txt) => Cypress.env("selectedState", txt.trim()));
    });

    cy.get("#city").click();
    cy.get(".css-26l3qy-menu").last().find(".css-yt9ioa-option").then(($options) => {
        const idx = Math.floor(Math.random() * $options.length);
        cy.wrap($options[idx]).click();
        cy.wrap($options[idx]).invoke("text").then((txt) => Cypress.env("selectedCity", txt.trim()));
    });
});
When("eu fizer o upload de um arquivo", () => {
    cy.get("#uploadPicture").selectFile(`cypress/fixtures/${filePath}`);
});
When('eu clicar em "Submit"', () => {
    cy.get('#submit').click();
});
Then("o pop-up de confirmação deve ser exibido", () => {
    cy.get(".modal-content").should("be.visible");
    cy.contains("Thanks for submitting the form").should("be.visible");
});
Then("eu devo fechar o pop-up com sucesso", () => {
    cy.get("#closeLargeModal").click({ force: true });
    cy.get(".modal-content").should("not.exist");
});
