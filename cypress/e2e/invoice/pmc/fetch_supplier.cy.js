describe('Session Login ',()=>{
    beforeEach(()=>{
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
    });
       
    describe("To verify that Supplier field is fetching only Non Register Supplier", function() {
        it('FC-1739 able to fetch non register supplier  <smoke>', function() {
            cy.visit('/property_suppliers')
            cy.contains('button','Filter').click()
            cy.wait(10000);
            cy.select_by_label('Registered:','No')
            cy.contains('button','Search').click()
            cy.get('tbody').find('tr').contains('a','Assign').click({force: true});
            cy.wait(20000);
            cy.contains('label','Supplier:').parent().find('input[type=text]')
            .invoke('val')
            .then(supplier => {
                cy.log(supplier)
                cy.contains("Documents").click()
                cy.contains('a', 'Invoices').click({ force: true })
                cy.contains('a[class=item-menu]', 'Invoices').click({ force: true })
                cy.contains('a', 'Create Invoice').click({ force: true })
                cy.contains('label','SUPPLIER NAME:')
                .parent()
                .find(`.Select-input input`)
                .click({ force: true })
                .type(supplier, { force: true });
                cy.get(`[class*="-menu-outer"]`)
                .contains(supplier)
                .should('be.visible')
            });
        });

        it('not able to fetch register supplier  <smoke>', function() {
            cy.visit('/property_suppliers')
            cy.contains('button','Filter').click()
            cy.wait(10000);
            cy.select_by_label('Registered:','Yes')
            cy.contains('button','Search').click()
            cy.get('tbody').find('tr').contains('a','Assign').click({force: true});
            cy.wait(20000);
            cy.contains('label','Supplier:').parent().find('p')
            .invoke('text')
            .then(supplier => {
                cy.log(supplier)
                cy.contains("Documents").click()
                cy.contains('a', 'Invoices').click({ force: true })
                cy.contains('a[class=item-menu]', 'Invoices').click({ force: true })
                cy.contains('a', 'Create Invoice').click({ force: true })
                cy.contains('label','SUPPLIER NAME:')
                .parent()
                .find(`.Select-input input`)
                .click({ force: true })
                .type(supplier, { force: true });
                cy.get(`[class*="-menu-outer"]`)
                .contains('Type to search')
                .should('be.visible')
            })
        });
    });
});

