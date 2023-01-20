describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env(`data`);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                    cy.login_with_session(data.pmc.username,data.pmc.password);
                });
                cy.fixture(`data/${data_path}/invoice/pmc/create_memo/data`).then(function(data) {
                        this.data = data;
                });
        })

        describe("To verify that a PMC is able to create a Credit Memo of an invoice for a Non-Registered Supplier.", function() {
                it('FC-2095 To verify that a PMC is able to create a Credit Memo of an invoice for a Non-Registered Supplier.  <smoke>', function() {
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
                        this.data.supplier_cm = generateString(7)
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
                                cy.contains("Credit Memo was successfully created.").should('be.visible')
                        })
                })
        });
});