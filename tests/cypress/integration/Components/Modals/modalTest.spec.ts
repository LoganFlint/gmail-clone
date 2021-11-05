it("open and close email modal", () => {
    cy.visit("/")
    cy.get('[data-cy="open-email"]').first().click()
    cy.get('[data-cy="archive-button"]').contains('Archive').click().contains("Un-Archive")
    cy.get('[data-cy="close-modal"]').first().click()
});

it("forward and back emails in modal", () => {
    cy.visit("/")
    cy.get('[data-cy="open-email"]').first().click()
    cy.get('[data-cy="next-email"]').contains('Newer').click()
    cy.get('[data-cy="next-email"]').contains('Newer').click()
    cy.get('[data-cy="prev-email"]').contains('Older').click()
    cy.get('[data-cy="close-modal"]').first().click()
});

it("something", () => {
    cy.visit("/")
    cy.get('[data-cy="open-email"]').first().click()
    cy.get('[data-cy=reply-to-email]').contains("Reply").click();
    cy.get('#emailbody').type('typed from cypress')
    // cant seem to test the value that was typed :()
    cy.get('[data-cy="send-email"]').click()
});