describe('Session Login ',()=>{
        beforeEach(() => {
                var data_path = Cypress.env(`data`)
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.supplier.username,data.supplier.password);
                });
                cy.fixture(`data/${data_path}/invoice/supplier/create_memo/data`).then(function(data) {
                        this.data = data;
                });
        });

        describe("To verify that a supplier is able to create a Credit Memos of an invoice", function() {
                it('FC_2255 To verify that a supplier is able to create a Credit Memos of an invoice <smoke>', function() {
                        cy.visit();
                        cy.wait(7000);
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
                        this.data.supplier_cm = generateString(7);
                        cy.visit('/invoices');
                        cy.wait(3000);
                        cy.get('li[class="list-group-item"]').first().click({force:true});
                        cy.wait(6000);
                        cy.contains('label','FINVOICE#:').parent().find('p').invoke('text')
                        .then(finvoice => {
                                cy.visit("/credit_memos/new?ref_invoice_id="+finvoice);
                                cy.execute('script/invoice/supplier/create_memo',this.data);
                                cy.get('input[value="Submit"]').click({force:true});
                                cy.contains('Credit Memo was successfully created.').should('be.visible');
                        });
                });
                it('create a new credit memo with duplicate "CREDIT MEMO#" <smoke>', function() {
                        cy.visit();
                        cy.wait(2000);
                        cy.visit('/invoices');
                        cy.wait(3000);
                        cy.get('li[class="list-group-item"]').first().dblclick({force:true});
                        cy.wait(6000);
                        cy.contains('label','FINVOICE#:').parent().find('p').invoke('text')
                        .then(finvoice => {
                                cy.visit("/credit_memos/new?ref_invoice_id="+finvoice);
                                cy.execute('script/invoice/supplier/create_memo',this.data);
                                cy.get('input[value="Submit"]').click({force:true});
                                cy.contains('Credit memo number already used.').should('be.visible');
                        });
                });
        });
});