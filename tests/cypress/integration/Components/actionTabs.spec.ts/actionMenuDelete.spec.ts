describe("validate delete buttons in action menu when in Trash tab", () => {
    it("All actions present in Trash tab", () => {
        cy.visit("/").get('[data-cy="tab-Trash"]').click()
        cy.get('[type="checkbox"]').first().click();
        cy.get('[data-cy=label]').then((tabNames) => {
            const names = Array.from(tabNames, name => name.innerText);
            expect(names).to.have.lengthOf(6);
        });

        cy.get('[data-cy=action-bar]').children().each((item, index) => {
            switch (index) {
                case 0:
                    expect(item).to.contain("Delete Forever");
                    break;
                case 1:
                    expect(item).to.contain("Undelete");
                    break;
                case 2:
                    expect(item).to.contain("Archive");
                    break;
                case 3:
                    expect(item).to.contain("Mark as read");
                    break;
                default:
                    null
            }
        });
    });

    it("Archive all", () => {
        cy.visit("/").get('[data-cy="tab-Archived"]').click()
        cy.get('[type="checkbox"]').first().click();
        cy.get('[data-cy="archive-button"]').click();
        cy.get('[type="checkbox"]').should("have.length", 1);
    });
})