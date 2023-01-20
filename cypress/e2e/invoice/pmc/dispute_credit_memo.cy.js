describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env(`data`);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.login_with_session(data.pmc.username,data.pmc.password);
                });
                cy.fixture(`data/${data_path}/invoice/pmc/create/data`).then(function(data) {
                        this.invoice_data = data;
                })
                cy.fixture(`data/${data_path}/invoice/pmc/create_memo/data`).then(function(data) {
                        this.memo_data = data;
                })
        })
        describe("To verify that PMC is able to Dispute Credit memos.", function() {
                it('FC-2266   <smoke>', function() {
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
                        this.invoice_data.supplier_invoice = generateString(7);
                        this.memo_data.supplier_cm = generateString(7)
                        cy.contains("Documents").click()
                        cy.contains('a', 'Invoices').click({ force: true })
                        cy.contains('a[class=item-menu]', 'Invoices').click({ force: true })
                        cy.contains('a', 'Create Invoice').click({ force: true })
                        cy.contains('a', 'More').click({ force: true })
                        cy.execute('script/invoice/pmc/create',this.invoice_data)
                        cy.contains('button','Submit').click({force:true})
                        cy.contains('Invoice was successfully created').should('be.visible')
                        this.memo_data['invoice'] = this.invoice_data['supplier_invoice'];
                        cy.wait(3000)
                        cy.contains('span','More').parent().click({force:true})
                        cy.contains('label','FINVOICE#:').parent().find('p')
                        .invoke('text')
                        .then(finvoice => {
                                cy.contains('button','Save').click({force:true})
                                cy.contains('button','Approve').click({force:true})
                                cy.visit("/credit_memos/new?ref_invoice_id="+finvoice)
                                cy.execute('script/invoice/pmc/create_memo',this.memo_data)
                                cy.get('input[type=submit]').click({force:true})
                                cy.contains("Credit Memo was successfully created.").should('be.visible')
                                cy.contains('button','Dispute').click({force:true})
                                cy.wait(3000)
                                cy.contains("Disputed").should('be.visible')
                        })
                        
                });
        });
});