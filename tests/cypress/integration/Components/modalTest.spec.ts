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

// it("reply to email 3 in list of emails", () => {
//     cy.visit("/")
//     cy.get('[data-cy="open-email"]').first().click()
//     cy.get('[data-cy="reply-to-email"]').contains('Reply').click()
//     cy.get('[data-cy="reply-email-body"]').contains("Newsletter Issue #161")
//     //     cy.get().type("typing from test")
//     // cy.get('[data-cy="send-email"]').click()
// });

it("something", () => {
    cy.visit("/")
    cy.get('[data-cy="open-email"]').first().click()
    cy.get('[data-cy=reply-to-email]').contains("Reply").click();
    cy.get('[name=sendEmailBody]').type('typing from cypress')
    cy.get('input[name=sendEmailBody]').should('have.value', 'typing from cypress')
    //Now on the compose email modal

    // plan to get inputed text as well

    // cy.get('[data-cy=close-modal]').eq(1).click()
});