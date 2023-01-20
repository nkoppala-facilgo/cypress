describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env(`data`);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.pmc.username,data.pmc.password);
                });
                cy.fixture(`data/${data_path}/invoice/pmc/create/data`).then(function (data) {
                        this.data = data;
                })
        })
        describe("create invoice", function() {
                it('create a new invoice  <smoke>', function() {
                        cy.visit()
                        cy.contains("Documents").click()
                        cy.contains('a', 'Invoices').click({ force: true })
                        cy.contains('a[class=item-menu]', 'Invoices').click({ force: true })
                        cy.contains('a', 'Create Invoice').click({ force: true })
                        cy.contains('a', 'More').click({ force: true })
                        cy.select_by_label('SUPPLIER NAME:',this.data['supplier_name'])
                        cy.contains('label','PROPERTY NAME:').parent().find('input[type=text]').type(this.data['property_name'])
                        cy.contains('label','PROPERTY NAME:').parent().find('a').contains(this.data['property_name']).click({force:true})
                        cy.contains('div', 'Unit#').click({ force: true })
                        cy.get(`[class*="-menu-outer"]`).contains(this.data['unit']).should('be.exist')
                });
        });
});