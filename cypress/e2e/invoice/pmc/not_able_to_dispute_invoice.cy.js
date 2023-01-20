before(() => {
        var data_path = Cypress.env(`data`);
        cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                cy.login_with_session(data.pmc.username,data.pmc.password);
        });
        cy.fixture(`data/${data_path}/invoice/pmc/not-able_to_dispute_invoice/data`).then(function (data) {
                this.data = data;
        })
})
describe("Verify that invoices from certain suppliers (setup to not allow disputes) cannot be disputed", function() {
        it(' FC-2107 Verify that invoices from certain suppliers (setup to not allow disputes) cannot be disputed <smoke>', function() {
                cy.visit();
                cy.wait(7000);
                cy.contains("Documents").click()
                cy.contains('a', 'Invoices').click({ force: true })
                cy.contains('a[class=item-menu]', 'Invoices').click({ force: true })
                cy.get('div[id="js-react-InvoiceFilterModalToggle"]').find('i').click({force:true})
                cy.select_by_label('Supplier(s):',this.data['supplier'])
                cy.contains('button','Search').click({force:true})
                cy.get('div[id="document-scroll-search"]').find('li').first().click({force:true})
                cy.contains('button','Dispute',{ timeout: 0}).should('not.exist'); 
        });
});