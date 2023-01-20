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
        describe("To verify that user is able to Dispute the Invoice after PMC creating Invoice successfully.", function() {
                it('FC-2090 create a new invoice and dispute  <smoke>', function() {
                        cy.visit()
                        const characters ='0123456789';
                        function generateString(length) {
                                let result = '';
                                const charactersLength = characters.length;
                                for ( let i = 0; i < length; i++ ) {
                                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                                }
                                const common_str = Cypress.env(`common_string`);
               return common_str + result;
                        }
                        this.data.supplier_invoice = generateString(7);
                        cy.contains("Documents").click()
                        cy.contains('a', 'Invoices').click({ force: true })
                        cy.contains('a[class=item-menu]', 'Invoices').click({ force: true })
                        cy.contains('a', 'Create Invoice').click({ force: true })
                        cy.contains('a', 'More').click({ force: true })
                        cy.execute('script/invoice/pmc/create',this.data)
                        cy.contains('button','Submit').click({force:true})
                        cy.contains('Invoice was successfully created').should('be.visible')
                        cy.wait(3000)
                        cy.contains('button','Dispute').click({force:true})
                        cy.contains('Invoice has been disputed').should('be.visible')
                        cy.contains('Disputed').should('be.visible')
                });
        });
});