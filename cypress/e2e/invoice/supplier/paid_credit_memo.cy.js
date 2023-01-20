describe('Session Login ',()=>{
        beforeEach(() => {
                var data_path = Cypress.env(`data`)
                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                        cy.login_with_session(data.supplier.username,data.supplier.password);
                });
                cy.fixture(`data/${data_path}/invoice/supplier/create/data`).then(function(data) {
                        this.invoice_data = data;
                });
                cy.fixture(`data/${data_path}/invoice/supplier/create_memo/data`).then(function(data) {
                        this.memo_data = data;
                });
        });
        describe("To verify that Supplier is able to mark Credit memo as Paid after PMC Approved the Credit memos.", function() {
                it('FC-2269 To verify that Supplier is able to mark Credit memo as Paid after PMC Approved the Credit memos <smoke>', function() {
                        var data_path = Cypress.env(`data`);
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
                        this.invoice_data['supplier_invoice'] = generateString(7);
                        this.memo_data.supplier_cm = generateString(7);
                        cy.contains("Begin Work Menu").click({force: true});
                        cy.contains('a', 'Create Invoice').click({force: true});
                        cy.execute('script/invoice/supplier/create',this.invoice_data);
                        cy.contains('button','Submit').click({force:true});
                        cy.contains('Invoice was successfully created').should('be.visible');
                        cy.contains('label','FINVOICE#:').parent().find('p').invoke('text')
                        .then(finvoice => {
                                cy.visit("/credit_memos/new?ref_invoice_id="+finvoice);
                                cy.execute('script/invoice/supplier/create_memo',this.memo_data);
                                cy.get('input[value="Submit"]').click({force:true});
                                cy.get('span[class=caret]').eq(0).click({force:true});
                                cy.contains('Logout').click({force:true});
                                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                                        cy.execute('script/login/login', data.pmc);
                                });
                                cy.visit('/invoices');
                                cy.get('div[id="js-react-InvoiceFilterModalToggle"]').find('i').click({force:true});
                                cy.wait(1500);
                                cy.select_by_label('Invoice(s)# :',this.invoice_data['supplier_invoice']);
                                cy.contains('button','Search').click({force:true});
                                cy.wait(3000);
                                cy.get('div[id="document-scroll-search"]').find('li').click({force:true});
                                cy.wait(8000);
                                cy.contains('button','Approve').click();
                                cy.wait(3000);
                                cy.contains('button','No, Skip and Approve').click({force:true});
                                cy.wait(1000);
                                if(data_path == 'staging'){
                                        cy.contains('button','Do Not Save All Items').click({force:true});
                                }
                                cy.contains('button','OK').click({force:true});
                                cy.contains('Approval').should('be.visible');
                                cy.wait(2000);
                                cy.visit('/credit_memos');
                                cy.get('div[data-react-class="CreditMemoFilterModalToggle"]').find('i').click({force:true});
                                cy.select_by_label('Credit Memo(s)#',this.memo_data['supplier_cm']);
                                cy.contains('button','Search').click({force:true});
                                cy.get('div[id="js-react-CreditMemoPage"]').find('li').find('a').first().click({force:true});
                                cy.wait(5000);
                                cy.select_by_label('WORKFLOW:',this.memo_data['workflow']);
                                cy.wait(3000);
                                for(let i=0;i<this.memo_data['lineitems'].length;i++){
                                        cy.get('tr[class="items-table__row"]').eq(i).find('div[class="Select-placeholder"]').contains('GL Code').parent().find(`.Select-input input`).click({force: true}).type(this.memo_data['lineitems'][i]['gl_code'], { force: true });
                                        cy.wait(1000);
                                        cy.get(`[class*="-menu"]`).contains(this.memo_data['lineitems'][i]['gl_code']).click({ force: true });
                                }
                                cy.wait(3000);
                                cy.get('.invoiceTable.table-responsive04').find("div").find("table").find("tbody").find("tr").first().find("td").eq(9).find("div").find("div").find('.Select-arrow-zone').type('{enter}', '{force: true}')
                                cy.contains('button','Approve').click();
                                cy.wait(2000);
                                cy.contains('button','Approve').click();
                                cy.waitUntil(()=>cy.contains("Credit Memo has been approved.").should('be.visible'));
                                cy.get('span[class=caret]').eq(0).click({force:true});
                                cy.contains('Logout').click({force:true});
                                cy.fixture(`data/${data_path}/login/data`).then(function (data) {
                                        cy.execute('script/login/login', data.supplier);
                                });
                                cy.visit('/credit_memos');
                                cy.get('div[data-react-class="CreditMemoFilterModalToggle"]').find('i').click({force:true});
                                cy.select_by_label('Credit Memo(s)#',this.memo_data['supplier_cm']);
                                cy.contains('button','Search').click({force:true});
                                cy.get('div[id="js-react-CreditMemoPage"]').find('li').find('a').first().click({force:true});
                                cy.wait(5000);
                                cy.contains('button','Paid').click({force:true});
                                cy.wait(3000);
                                cy.contains('Paid').should('be.visible');
                        });
                });        
        });
});