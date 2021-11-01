describe("Inbox", () => {
    it("Shows the emails from db.json", () => {
        cy.visit("/").contains("launchmail");
    });
});