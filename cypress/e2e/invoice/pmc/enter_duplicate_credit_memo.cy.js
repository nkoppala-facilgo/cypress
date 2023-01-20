describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env(`data`);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.login_with_session(data.pmc.username,data.pmc.password);
                });
                cy.fixture(`data/${data_path}/invoice/pmc/create_memo/data`).then(function(data) {
                        this.data = data;
                });
        });

        describe("To verify that PMC can't enter duplicate CREDIT MEMO# while creating Credit Memos.", function() {
                it('FC-2097 create a new credit memo  <smoke>', function() {
                        cy.visit()
                        cy.contains("Documents").click()
                        cy.contains('a', 'Invoices').click({ force: true })
                        cy.contains('a[class=item-menu]', 'Invoices').click({ force: true })
                        cy.get('div[id=js-react-InvoiceFilterModalToggle]').find('i').click({force:true})
                        cy.select_by_label("Invoice(s)# :",this.data['invoice'])
                        cy.contains('button','Search').click({force:true})
                        cy.wait(5000)
                        cy.get('li[class="list-group-item"]').click({force:true})
                        cy.contains('span','More').parent().click({force:true})
                        cy.contains('label','FINVOICE#:').parent().find('p')
                        .invoke('text')
                        .then(finvoice => {
                                cy.visit("/credit_memos/new?ref_invoice_id="+finvoice)
                                cy.execute('script/invoice/pmc/create_memo',this.data)
                                cy.get('input[type=submit]').click({force:true})
                                cy.contains("Credit memo number already used.").should('be.visible')
                        });
                });
        });
});