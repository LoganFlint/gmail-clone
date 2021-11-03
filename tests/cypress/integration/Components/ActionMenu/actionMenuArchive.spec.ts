    cy.get('[data-cy=tab-bar]').children().each((item, index) => {
            switch(index) {
                case 0:
                    expect(item).to.contain("Primary");
                    expect(item).to.not.contain("Archive");
                    break;
                case 1:
                    expect(item).to.contain("Archive");
                    expect(item).to.not.contain("Trash");
                    break;
                case 2:
                    expect(item).to.contain("Trash");
                    break;
                case 3:
                    expect(item).to.contain("Primary");
                    break;
                default:
                    throw new Error(`There was an error at ${index})in 'Tab Bar:
                    This is likely a bug in the Cypress test function.`)
            }
        });