describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env(`data`);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.pmc.username,data.pmc.password);
                });
                cy.fixture(`data/${data_path}/invoice/pmc/create_memo/data`).then(function(data) {
                        this.create_data = data;
                });
                cy.fixture(`data/${data_path}/invoice/pmc/edit_memo/data`).then(function(data) {
                        this.edit_data = data;
                });
        })
        
        describe("To verify that PMC is able to Edit the created Credit Memos", function() {
                it('FC-2096 create and edit new credit memo  <smoke>', function() {
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
                        this.create_data.supplier_cm = generateString(7)
                        cy.contains("Documents").click()
                        cy.contains('a', 'Invoices').click({ force: true })
                        cy.contains('a[class=item-menu]', 'Invoices').click({ force: true })
                        cy.get('div[id=js-react-InvoiceFilterModalToggle]').find('i').click({force:true})
                        cy.wait(2000)
                        cy.select_by_label("Invoice(s)# :",this.create_data['invoice'])
                        cy.contains('button','Search').click({force:true})
                        cy.wait(5000)
                        cy.get('li[class="list-group-item"]').click({force:true})
                        cy.contains('span','More').parent().click({force:true})
                        cy.contains('label','FINVOICE#:').parent().find('p')
                        .invoke('text')
                        .then(finvoice => {
                                cy.visit("/credit_memos/new?ref_invoice_id="+finvoice)
                                cy.execute('script/invoice/pmc/create_memo',this.create_data)
                                cy.get('input[type=submit]').click({force:true})
                                cy.contains("Credit Memo was successfully created.").should('be.visible')
                                cy.contains('button','Edit').click({force:true})
                                cy.wait(4000)
                                cy.execute('script/invoice/pmc/edit_memo',this.edit_data)
                                cy.get('input[value="Save"]').click({force:true})
                                cy.wait(1500)
                                cy.contains('Successfully update credit memo.').should('be.visible')
                        })
                })
        })
});