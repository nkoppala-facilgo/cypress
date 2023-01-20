describe('Session Login ',()=>{
        beforeEach(()=>{
                var data_path = Cypress.env(`data`);
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.pmc.username,data.pmc.password);
                });
                cy.fixture(`data/${data_path}/invoice/pmc/create/data`).then(function(data) {
                        this.invoice_data = data;
                });
                cy.fixture(`data/${data_path}/invoice/pmc/create_memo/data`).then(function(data) {
                        this.memo_data = data;
                });
        });
        describe("To verify that PMC is able to Approve Credit memos.", function() {
                it('FC-2103 create invoice and approve credit memo  <smoke>', function() {
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
                        cy.visit();
                        cy.wait(7000);
                        this.invoice_data.supplier_invoice = generateString(7);
                        this.memo_data.supplier_cm = generateString(7);
                        cy.contains("Documents").click({force: true});
                        cy.contains('a', 'Invoices').click({force: true});
                        cy.contains('a[class=item-menu]', 'Invoices').click({force: true});
                        cy.contains('a', 'Create Invoice').click({force: true});
                        cy.contains('a', 'More').click({force: true});
                        cy.execute('script/invoice/pmc/create',this.invoice_data);
                        cy.contains('button','Submit').click({force: true});
                         if(data_path == 'staging'){
                                        cy.contains('button','Do Not Save All Items').click({force:true});
                                }
                        cy.wait(3000)
                        cy.contains('Invoice was successfully created').should('be.visible');
                        this.memo_data['invoice'] = this.invoice_data['supplier_invoice'];
                        cy.wait(6000)
                        cy.contains('span','More').parent().click({force: true});
                        cy.contains('label','FINVOICE#:').parent().find('p').invoke('text')
                        .then(finvoice => {
                                cy.contains('button','Save').click({force: true});
                                cy.contains('button','Update Status').click({force: true});
                                cy.get('.Select-placeholder').contains('- Select Status -').click().type('PendReview').get('.is-open').type('{enter}');
                                cy.get('.modal-footer .btn-primary').contains('button','Save').click({force: true});
                                cy.wait(2000);
                                cy.contains('button','Approve').click({force: true});
                                cy.contains('button','Do Not Save All Items').click({force: true});
                                cy.contains('Success').should('be.visible');
                                cy.visit("/credit_memos/new?ref_invoice_id="+finvoice);
                                cy.execute('script/invoice/pmc/create_memo',this.memo_data);
                                cy.wait(7000);
                                cy.get('input[type=submit]').click({force: true});
                                cy.contains("Credit Memo was successfully created.").should('be.visible');
                                cy.wait(3000);
                                cy.contains("Credit Memo was successfully created.").should('be.visible');
                                cy.contains('label','REFERENCE INV#:').parent().find('span').click({force: true});
                                cy.wait(8000);
                                cy.get('div[class="modal-body"]').find('span[class="invoice-status"]').invoke('text')
                                .then(status => {
                                        cy.log(status);
                                        if(status === "Approved") {
                                                cy.get('button[class="btn btn-default"]').contains('Close').click({force: true});
                                        }
                                        else {
                                                cy.get('div[class="modal-footer"]').contains('button','Approve').click({force: true});
                                                cy.contains('button','Do Not Save All Items').click({force: true});
                                                cy.wait(2000);
                                                cy.contains('button','OK').click({force: true});
                                                cy.wait(2000);
                                                cy.get('button[class="btn btn-default"]').contains('Close').click({force: true});
                                                cy.contains('button','Approve').click({force: true});
                                                cy.wait(1200);
                                                cy.contains('Credit Memo has been approved.').should('be.visible');
                                        }

                                });
                        });
                        
                });
                it('FC-2110 approve credit memo which is in pendReview status <smoke>', function() {
                        cy.visit();
                        cy.wait(7000);
                        cy.contains("Documents").click({force: true});
                        cy.wait(2000);
                        cy.contains('a', 'Invoices').click({force: true});
                        cy.contains('a[class=item-menu]', 'Credit Memos').click({force: true});
                        cy.wait(3000);
                        cy.get('div[data-react-class="CreditMemoFilterModalToggle"]').find('i').click({force: true});
                        cy.select_by_label('Status(es):','PendReview');
                        cy.contains('button','Search').click({force: true});
                        cy.get('div[id="scroll-search"]').find('li').first().find('a').first().click({force: true});
                        cy.wait(7000);
                        cy.select_by_label('WORKFLOW:',this.memo_data['workflow']);
                        cy.wait(3000);
                        cy.contains('label','REFERENCE INV#:').parent().find('span').click({force:true});
                        cy.wait(8000);
                        cy.get('div[class="modal-body"]').find('span[class="invoice-status"]').invoke('text')
                        .then(status => {
                                cy.log(status);
                                if(status === "Approved") {
                                        cy.get('button[class="btn btn-default"]').contains('Close').click({force:true});
                                }
                                else {
                                        cy.get('div[class="modal-footer"]').contains('button','Approve').click({force:true});
                                        cy.wait(2000);
                                        cy.contains('Credit Memo has been approved.').should('be.visible');
                                }

                        });
                });
        });
});