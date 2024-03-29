describe("validate delete buttons in action menu when in Archive tab", () => {
    it("Rendered inbox", () => {
        cy.visit("/").get('[data-cy="tab-Archived"]').click()
    });

    it("All actions present in archive tab", () => {
        cy.get('[data-cy="tab-Archived"]').click()
        cy.get('[type="checkbox"]').first().click();
        cy.get('[data-cy=label]').then((tabNames) => {
            const names = Array.from(tabNames, name => name.innerText);
            expect(names).to.have.lengthOf(5);
        });

        cy.get('[data-cy=action-bar]').children().each((item, index) => {
            switch (index) {
                case 0:
                    expect(item).to.contain("Delete");
                    expect(item).to.not.contain("Delete Forever");
                    break;
                case 1:
                    expect(item).to.contain("Unarchive");
                    expect(item).to.not.contain("Archive");
                    break;
                case 2:
                    expect(item).to.contain("Mark as read");
                    break;
                case 3:
                    expect(item).to.contain("Mark as unread");
                    break;
                default:
                    throw new Error(`There is a bad action menu item index (index ${index})in 'Action Bar: Archived Actions: All items present.' This is likely a bug in the Cypress test function.`)
            }
        });
    });

    it("Archive all", () => {
        cy.visit("/").contains("launchmail");
        cy.get('[data-cy="tab-Trash"]').click()
        cy.get('[type="checkbox"]').first().click();
        cy.get('[data-cy="undelete-button"]').click();
        cy.get('[type="checkbox"]').should("have.length", 1);
    });
})
