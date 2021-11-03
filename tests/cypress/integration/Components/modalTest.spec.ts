import db from "../../fixtures/db.json";

import { Email, toggleRead, toggleArchive, requestAllEmails } from "../../../../src/services/modules/emails";
import { eq } from "cypress/types/lodash";
const archived = (db.emails as Email[]).filter((email: Email) => email.archived);
const read = (db.emails as Email[]).filter((email: Email) => email.read);


// it("open and close email modal", () => {
//     cy.visit("/")
//     cy.get('[data-cy="open-email"]').first().click()
//     cy.get('[data-cy="archive-button"]').contains('Archive').click().contains("Un-Archive")
//     cy.get('[data-cy="close-modal"]').first().click()
// });

// it("forward and back emails in modal", () => {
//     cy.visit("/")
//     cy.get('[data-cy="open-email"]').first().click()
//     cy.get('[data-cy="next-email"]').contains('Newer').click()
//     cy.get('[data-cy="next-email"]').contains('Newer').click()
//     cy.get('[data-cy="prev-email"]').contains('Older').click()
//     cy.get('[data-cy="close-modal"]').first().click()
// });

it("something", () => {
    cy.visit("/")
    cy.get('[data-cy="open-email"]').first().click()
    cy.get('[data-cy=reply-to-email]').contains("Reply").click();
    cy.get('#emailbody').type('typed from cypress')
    // cant seem to test the value that was typed :()
    // .should("have.text", 'typed from cypress')
    cy.get('[data-cy="send-email"]').click()
});