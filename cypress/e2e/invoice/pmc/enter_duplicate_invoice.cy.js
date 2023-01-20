describe('Session Login ',()=>{
    beforeEach(()=>{
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
            cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/invoice/pmc/create/data`).then(function(data) {
            this.data = data;
        })
    })
    describe("To verify that PMC can't enter duplicate INVOICE# while creating Invoice.", function() {
        it('FC-1736 create a new invoice  <smoke>', function() {
            cy.visit()
            cy.contains("Documents").click()
            cy.contains('a', 'Invoices').click({ force: true })
            cy.contains('a[class=item-menu]', 'Invoices').click({ force: true })
            cy.contains('a', 'Create Invoice').click({ force: true })
            cy.contains('a', 'More').click({ force: true })
            cy.execute('script/invoice/pmc/create',this.data)
            cy.contains('Invoice number already exist').should('be.visible')
        });
    });
});