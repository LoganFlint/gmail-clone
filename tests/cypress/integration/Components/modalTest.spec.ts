import db from "../../fixtures/db.json";

import { Email, toggleRead, toggleArchive, requestAllEmails } from "../../../../src/services/modules/emails";
const archived = (db.emails as Email[]).filter((email: Email) => email.archived);
const read = (db.emails as Email[]).filter((email: Email) => email.read);


it("open and close email modal", () => {
    cy.visit("/")
    cy.get('[data-cy="open-email"]').first().click()
    cy.get('[data-cy="archive-button"]').contains('Archive').click().contains("Un-Archive")
    cy.get('[data-cy="close-modal"]').first().click()
});