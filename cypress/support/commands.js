import { faker } from "@faker-js/faker";

Cypress.Commands.add("createUser", (usuario) => {
    return cy.api({
        method: "POST",
        url: "/Account/v1/User",
        body: usuario,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(201);
        return usuario;
    });
});

Cypress.Commands.add("generateToken", (usuario) => {
    return cy.api({
        method: "POST",
        url: "/Account/v1/GenerateToken",
        body: usuario,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200);
        return response.body.token;
    });
});

Cypress.Commands.add("checkAuthorized", (usuario) => {
    return cy.api({
        method: "POST",
        url: "/Account/v1/Authorized",
        body: usuario,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(200);
        return response.body;
    });
});

Cypress.Commands.add("listAllBooks", () => {
    return cy.api({
        method: "GET",
        url: "/BookStore/v1/Books"
    });
});

Cypress.Commands.add("rentABook", (userId, isbns, token) => {
    const body = {
        userId,
        listIsbns: isbns.map(isbn => ({ 
            isbn 
        }))
    };

    return cy.api({
        method: "POST",
        url: "/BookStore/v1/Books",
        headers: { 
            Authorization: `Bearer ${token}` 
        },
        body,
        failOnStatusCode: false
    });
});

Cypress.Commands.add("userDetails", (userId, token) => {
    return cy.api({
        method: "GET",
        url: `/Account/v1/User/${userId}`,
        headers: { 
            Authorization: `Bearer ${token}` 
        },
        failOnStatusCode: false
    });
});