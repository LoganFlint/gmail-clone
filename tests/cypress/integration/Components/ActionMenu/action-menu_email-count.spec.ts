import db from "../../../fixtures/db.json";

import { Email } from "../../../../../src/services/modules/emails";

const primary = (db.emails as Email[]).filter((email: Email) => !email.archived && !email.markedToDelete);
const archived = (db.emails as Email[]).filter((email: Email) => email.archived);
const trash = (db.emails as Email[]).filter((email: Email) => email.markedToDelete);

describe("Action Bar: Validate Tabs", () => {
    it("Rendered inbox", () => {
        cy.visit("/").contains("launchmail");
        cy.get('[alt="launch badge"]').should("be.visible");
    });

    it("Primary inbox count", () => {
        //Add one to the expected number of checkboxes to account for action bar checkbox
        cy.get('[type="checkbox"]').should("have.length", primary.length + 1);
    });

    it("Archived inbox count", () => {
        cy.get("div").contains("Archived").click();
        cy.get('[type="checkbox"]').should("have.length", archived.length + 1);
    });

    it("Trashed inbox count", () => {
        cy.get("div").contains("Trash").click();
        cy.get('[type="checkbox"]').should("have.length", trash.length + 1);
    });
});

describe("Action Bar: Primary Inbox Actions", () => {
    it("Rendered inbox", () => {
        cy.visit("/").contains("launchmail");
        cy.get('[alt="launch badge"]').should("be.visible");
    });

    it("Select all", () => {
        cy.get('[type="checkbox"]').should("not.be.checked");
        const selectAll = cy.get('[type="checkbox"]').first();
        selectAll.should("not.be.checked");
        selectAll.click();
        selectAll.should("be.checked");
        cy.get('[type="checkbox"]').should("be.checked");
        selectAll.first().click();
        selectAll.should("not.be.checked");
        cy.get('[type="checkbox"]').should("not.be.checked");
    });

    it("All actions present", () => {
        cy.get('[type="checkbox"]').first().click();
        cy.get('[data-cy=label]').then((tabNames) => {
            const names = Array.from(tabNames, name => name.innerText); 
            expect(names).to.have.lengthOf(5);
        });

        cy.get('[data-cy=action-bar]').children().each((item, index, actionList) => {
            switch(index) {
                case 0:
                    expect(item).to.contain("Delete");
                    expect(item).to.not.contain("Delete Forever");
                    break;
                case 1:
                    expect(item).to.contain("Archive");
                    expect(item).to.not.contain("Unarchive");
                    break;
                case 2:
                    expect(item).to.contain("Mark as read");
                    break;
                case 3:
                    expect(item).to.contain("Mark as unread");
                    break;
                default:
                    throw new Error(`There is a bad action menu item index (index ${index})in 'Action Bar: Primary Inbox Actions: All items present.' This is likely a bug in the Cypress test function.`)
            }
        });
    });

    it("Archive all", () => {
        cy.visit("/").contains("launchmail");
        cy.get('[type="checkbox"]').first().click();
        cy.get('[data-cy=archive-button]').click({ force: true });
        cy.get('[type="checkbox"]').should("have.length", 1);
    });
});